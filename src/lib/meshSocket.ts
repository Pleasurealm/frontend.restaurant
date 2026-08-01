// Real mesh transport over WebSocket — a drop-in for createSimulatedMesh().
//
// This is a sketch of the production source: it implements the same MeshSource
// interface the view already consumes, so switching to it needs no UI changes.
// It maintains snapshot state from a small server->client event protocol,
// reconnects with exponential backoff, and heartbeats to detect dead sockets.
// There is no server in this build; set VITE_MESH_WS_URL to point it at one.
//
// ── Wire protocol ─────────────────────────────────────────────────────────
// server -> client (JSON per frame):
//   { t: 'hello',   nodes, captures, relayedMb, lastSyncAt }   full state
//   { t: 'capture', capture }                                  new capture (on-device)
//   { t: 'state',   id, sync }                                 capture changed relay state
//   { t: 'node',    id, patch }                                node battery/status/queued change
//   { t: 'stats',   relayedMb?, lastSyncAt? }                  running totals
//   { t: 'pong' }
// client -> server:
//   { t: 'subscribe', site? }   { t: 'pause', paused }   { t: 'ping' }

import {
  meshNodes,
  meshLinks,
  captures as seedCaptures,
  type MeshNode,
  type SyncState,
} from '../data/meshData'
import type { LiveCapture, MeshSnapshot, MeshSource } from './meshEngine'

interface WireCapture extends Omit<LiveCapture, 'receivedAt' | 'stateSince'> {
  receivedAt?: number
  stateSince?: number
}

type ServerMessage =
  | { t: 'hello'; nodes: MeshNode[]; captures: WireCapture[]; relayedMb: number; lastSyncAt: number }
  | { t: 'capture'; capture: WireCapture }
  | { t: 'state'; id: string; sync: SyncState }
  | { t: 'node'; id: string; patch: Partial<MeshNode> }
  | { t: 'stats'; relayedMb?: number; lastSyncAt?: number }
  | { t: 'pong' }

const MAX_FEED = 12
const EMIT_MS = 1000 // re-emit cadence to keep relative timers fresh
const PING_MS = 20_000
const PONG_TIMEOUT_MS = 8_000
const BACKOFF_BASE = 1_000
const BACKOFF_MAX = 30_000

export interface WebSocketMeshOptions {
  site?: string
  /** Injectable for tests; defaults to the global WebSocket. */
  socketFactory?: (url: string) => WebSocket
}

export function createWebSocketMesh(url: string, opts: WebSocketMeshOptions = {}): MeshSource {
  const makeSocket = opts.socketFactory ?? ((u: string) => new WebSocket(u))
  const subs = new Set<(s: MeshSnapshot) => void>()

  // Working state, seeded so the UI has something before `hello` arrives.
  const nodes: MeshNode[] = meshNodes.map((n) => ({ ...n }))
  let captures: LiveCapture[] = seedCaptures.map((c, i) => ({
    ...c,
    receivedAt: Date.now() - (i + 1) * 40_000,
    stateSince: Date.now() - (i + 1) * 40_000,
  }))
  let relayedMb = 128
  let lastSyncAt = Date.now() - 3 * 60_000

  let ws: WebSocket | null = null
  let connected = false
  let paused = false
  let attempts = 0
  let closedByUs = false
  let emitTimer: ReturnType<typeof setInterval> | null = null
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null
  let pingTimer: ReturnType<typeof setInterval> | null = null
  let pongDeadline: ReturnType<typeof setTimeout> | null = null

  const nodeById = (id: string) => nodes.find((n) => n.id === id)

  const snapshot = (): MeshSnapshot => {
    const online = nodes.filter((n) => n.status !== 'offline').length
    return {
      now: Date.now(),
      connected,
      paused,
      nodes: nodes.map((n) => ({ ...n })),
      links: meshLinks,
      captures: captures.map((c) => ({ ...c })),
      stats: {
        nodesOnline: online,
        nodesTotal: nodes.length,
        queued: nodes.reduce((s, n) => s + n.queued, 0),
        longestChain: Math.max(...nodes.map((n) => n.hops)),
        relayedMb,
        lastSyncAt,
      },
    }
  }

  const emit = () => subs.forEach((cb) => cb(snapshot()))

  const hydrate = (c: WireCapture): LiveCapture => ({
    ...c,
    receivedAt: c.receivedAt ?? Date.now(),
    stateSince: c.stateSince ?? Date.now(),
  })

  const reduce = (msg: ServerMessage) => {
    switch (msg.t) {
      case 'hello':
        for (const wn of msg.nodes) {
          const n = nodeById(wn.id)
          if (n) Object.assign(n, wn)
          else nodes.push({ ...wn })
        }
        captures = msg.captures.map(hydrate).slice(0, MAX_FEED)
        relayedMb = msg.relayedMb
        lastSyncAt = msg.lastSyncAt
        break
      case 'capture':
        captures = [hydrate(msg.capture), ...captures].slice(0, MAX_FEED)
        break
      case 'state': {
        const c = captures.find((x) => x.id === msg.id)
        if (c) {
          c.sync = msg.sync
          c.stateSince = Date.now()
        }
        break
      }
      case 'node': {
        const n = nodeById(msg.id)
        if (n) Object.assign(n, msg.patch)
        break
      }
      case 'stats':
        if (msg.relayedMb != null) relayedMb = msg.relayedMb
        if (msg.lastSyncAt != null) lastSyncAt = msg.lastSyncAt
        break
      case 'pong':
        clearPongDeadline()
        break
    }
  }

  const send = (obj: unknown) => {
    if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(obj))
  }

  const clearPongDeadline = () => {
    if (pongDeadline) {
      clearTimeout(pongDeadline)
      pongDeadline = null
    }
  }

  const startHeartbeat = () => {
    stopHeartbeat()
    pingTimer = setInterval(() => {
      send({ t: 'ping' })
      clearPongDeadline()
      pongDeadline = setTimeout(() => ws?.close(), PONG_TIMEOUT_MS) // no pong -> force reconnect
    }, PING_MS)
  }
  const stopHeartbeat = () => {
    if (pingTimer) clearInterval(pingTimer)
    pingTimer = null
    clearPongDeadline()
  }

  const scheduleReconnect = () => {
    if (closedByUs || reconnectTimer) return
    const delay = Math.min(BACKOFF_MAX, BACKOFF_BASE * 2 ** attempts) * (0.7 + Math.random() * 0.6)
    attempts += 1
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null
      connect()
    }, delay)
  }

  const connect = () => {
    try {
      ws = makeSocket(url)
    } catch {
      scheduleReconnect()
      return
    }
    ws.onopen = () => {
      connected = true
      attempts = 0
      send({ t: 'subscribe', site: opts.site })
      if (paused) send({ t: 'pause', paused: true })
      startHeartbeat()
      emit()
    }
    ws.onmessage = (ev) => {
      let msg: ServerMessage
      try {
        msg = JSON.parse(ev.data as string)
      } catch {
        return
      }
      reduce(msg)
      if (!paused) emit()
    }
    ws.onclose = () => {
      connected = false
      stopHeartbeat()
      emit()
      scheduleReconnect()
    }
    ws.onerror = () => ws?.close()
  }

  return {
    subscribe(cb) {
      subs.add(cb)
      cb(snapshot())
      if (!ws) {
        closedByUs = false
        connect()
      }
      if (!emitTimer) emitTimer = setInterval(() => { if (!paused) emit() }, EMIT_MS)
      return () => {
        subs.delete(cb)
        if (subs.size === 0) {
          closedByUs = true
          if (reconnectTimer) { clearTimeout(reconnectTimer); reconnectTimer = null }
          stopHeartbeat()
          if (emitTimer) { clearInterval(emitTimer); emitTimer = null }
          ws?.close()
          ws = null
        }
      }
    },
    setPaused(p) {
      paused = p
      send({ t: 'pause', paused: p })
      emit()
    },
  }
}
