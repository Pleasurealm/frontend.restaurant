// Live mesh stream for the Field Network.
//
// There is no field backend in this build, so this simulates the mesh in the
// browser: captures arrive from field devices, advance through relay states
// (on-device -> relaying -> synced), and node queues / stats update in real
// time. It is written behind a small `MeshSource` interface so a real transport
// (WebSocket, Supabase Realtime, ...) can replace `createSimulatedMesh` without
// touching the view — implement `subscribe`/`setPaused` and emit `MeshSnapshot`s.

import {
  meshNodes,
  meshLinks,
  captures as seedCaptures,
  capturePool,
  type MeshNode,
  type MeshLink,
  type Capture,
  type SyncState,
} from '../data/meshData'

export interface LiveCapture extends Capture {
  receivedAt: number
  stateSince: number
}

export interface MeshStats {
  nodesOnline: number
  nodesTotal: number
  queued: number
  longestChain: number
  relayedMb: number
  lastSyncAt: number
}

export interface MeshSnapshot {
  now: number
  connected: boolean
  paused: boolean
  nodes: MeshNode[]
  links: MeshLink[]
  captures: LiveCapture[]
  stats: MeshStats
}

export interface MeshSource {
  subscribe(cb: (s: MeshSnapshot) => void): () => void
  setPaused(paused: boolean): void
}

const MAX_FEED = 12
const TICK_MS = 1000
const TRANSITION_EVERY = 3 // ticks between relay-state advances
const SPAWN_CHANCE = 0.5 // chance, per transition, of a brand-new capture

// Field devices that originate captures (everything except the gateway).
const originNodes = meshNodes.filter((n) => n.type !== 'gateway')
const siteFor: Record<string, string> = {
  'Recorder · Fen North': 'Wyckham Fen',
  'Recorder · Reedbed': 'Wyckham Fen',
  'Warden phone': 'Alder Carr',
  'Recorder · Willow Scrub': 'Alder Carr',
  'School group': 'Blackmoor Heath',
  'Recorder · Far Marsh': 'Tarn Hollow',
}

const clock = (t: number) => {
  const d = new Date(t)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

export function createSimulatedMesh(): MeshSource {
  const subs = new Set<(s: MeshSnapshot) => void>()
  let paused = false
  let tick = 0
  let seq = 0
  let timer: ReturnType<typeof setInterval> | null = null

  // Mutable working copies seeded from the static data.
  const start = Date.now()
  const nodes: MeshNode[] = meshNodes.map((n) => ({ ...n }))
  let relayedMb = 128
  let lastSyncAt = start - 3 * 60 * 1000

  const captures: LiveCapture[] = seedCaptures.map((c, i) => ({
    ...c,
    receivedAt: start - (i + 1) * 40_000,
    stateSince: start - (i + 1) * 40_000,
  }))

  const nodeByLabel = (label: string) => nodes.find((n) => n.label === label)

  const snapshot = (): MeshSnapshot => {
    const online = nodes.filter((n) => n.status !== 'offline').length
    return {
      now: Date.now(),
      connected: !paused,
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

  const advance = () => {
    const now = Date.now()

    // 1. Promote the oldest relaying capture to synced; drain its origin queue.
    const relaying = captures.filter((c) => c.sync === 'relaying')
    if (relaying.length) {
      const c = relaying.reduce((a, b) => (a.stateSince < b.stateSince ? a : b))
      c.sync = 'synced'
      c.stateSince = now
      const node = nodeByLabel(c.by)
      if (node && node.queued > 0) node.queued -= 1
      relayedMb += 4 + Math.floor(Math.random() * 16)
      lastSyncAt = now
    }

    // 2. Promote an on-device capture to relaying.
    const onDevice = captures.filter((c) => c.sync === 'on-device')
    if (onDevice.length) {
      const c = onDevice.reduce((a, b) => (a.stateSince < b.stateSince ? a : b))
      c.sync = 'relaying'
      c.stateSince = now
    }

    // 3. Occasionally a device records something new (held on device first).
    if (Math.random() < SPAWN_CHANCE) {
      const origin = pick(originNodes.filter((n) => n.status !== 'offline'))
      const seed = pick(capturePool)
      const kind = pick<Capture['kind']>(['photo', 'sound', 'both'])
      captures.unshift({
        id: `live-${seq++}`,
        ...seed,
        kind,
        site: siteFor[origin.label] ?? 'Wyckham Fen',
        by: origin.label,
        time: clock(now),
        hops: origin.hops,
        sync: 'on-device' as SyncState,
        receivedAt: now,
        stateSince: now,
      })
      const node = nodeByLabel(origin.label)
      if (node) node.queued += 1
      if (captures.length > MAX_FEED) captures.length = MAX_FEED
    }

    // 4. Slow battery drift on active relayers.
    const active = nodes.filter((n) => n.status === 'relaying' && n.battery > 5)
    if (active.length && Math.random() < 0.4) {
      const n = pick(active)
      n.battery -= 1
    }
  }

  const run = () => {
    tick += 1
    if (!paused && tick % TRANSITION_EVERY === 0) advance()
    emit() // emit every tick so relative timers stay fresh
  }

  return {
    subscribe(cb) {
      subs.add(cb)
      cb(snapshot())
      if (!timer) timer = setInterval(run, TICK_MS)
      return () => {
        subs.delete(cb)
        if (subs.size === 0 && timer) {
          clearInterval(timer)
          timer = null
        }
      }
    },
    setPaused(p) {
      paused = p
      emit()
    },
  }
}

// Relative "time ago" for live labels, computed against a snapshot's `now`.
export function ago(ms: number, now: number): string {
  const s = Math.max(0, Math.floor((now - ms) / 1000))
  if (s < 5) return 'just now'
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  return `${Math.floor(m / 60)}h ago`
}
