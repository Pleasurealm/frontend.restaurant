// Real Overview pulse over Server-Sent Events — a drop-in for createSimulatedPulse().
//
// The pulse is a read-only server->client stream (no client controls), so SSE
// fits better than a WebSocket: it's one-directional and the browser handles
// reconnection for us. Same PulseSource interface, same OverviewPulse shape, so
// the view needs no changes. There is no server in this build; set
// VITE_PULSE_SSE_URL to point it at one.
//
// ── Wire protocol (SSE, JSON in each event's data:) ────────────────────────
//   event: hello      data: { meanIndex, speciesDetected, recordersActive, recordings }
//   event: metrics    data: { meanIndex?, speciesDetected?, recordersActive? }
//   event: recording  data: { recording }        a new soundscape landed
//   (: comment lines act as keep-alives)

import { kpis, recordings as seedRecordings, type Recording } from '../data/naturumData'
import type { LiveRecording, OverviewPulse, PulseSource } from './pulseEngine'

type WireRecording = Omit<LiveRecording, 'receivedAt'> & { receivedAt?: number }

interface HelloData {
  meanIndex: number
  speciesDetected: number
  recordersActive: number
  recordings: WireRecording[]
}
interface MetricsData {
  meanIndex?: number
  speciesDetected?: number
  recordersActive?: number
}

const MAX_FEED = 6
const EMIT_MS = 1000

export interface SsePulseOptions {
  /** Injectable for tests; defaults to the global EventSource. */
  eventSourceFactory?: (url: string) => EventSource
}

export function createSsePulse(url: string, opts: SsePulseOptions = {}): PulseSource {
  const makeSource = opts.eventSourceFactory ?? ((u: string) => new EventSource(u))
  const subs = new Set<(p: OverviewPulse) => void>()

  // Seeded working state so the UI has content before `hello` arrives.
  let meanIndex = kpis.meanIndex
  let speciesDetected = kpis.speciesDetected
  let recordersActive = kpis.recordersActive
  let lastEventAt = Date.now()
  let recordings: LiveRecording[] = seedRecordings.map((r, i) => ({
    ...r,
    receivedAt: Date.now() - (i + 1) * 30_000,
  }))
  let connected = false

  let es: EventSource | null = null
  let emitTimer: ReturnType<typeof setInterval> | null = null

  const snapshot = (): OverviewPulse => ({
    now: Date.now(),
    connected,
    meanIndex,
    speciesDetected,
    recordersActive,
    recordings: recordings.map((r) => ({ ...r })),
    lastEventAt,
  })

  const emit = () => subs.forEach((cb) => cb(snapshot()))

  const hydrate = (r: WireRecording): LiveRecording => ({
    ...(r as Recording),
    receivedAt: r.receivedAt ?? Date.now(),
  })

  const parse = <T,>(ev: MessageEvent): T | null => {
    try {
      return JSON.parse(ev.data as string) as T
    } catch {
      return null
    }
  }

  const connect = () => {
    es = makeSource(url)

    es.onopen = () => {
      connected = true
      emit()
    }
    // Browser EventSource retries automatically; just reflect the state.
    es.onerror = () => {
      connected = false
      emit()
    }

    es.addEventListener('hello', (ev) => {
      const d = parse<HelloData>(ev as MessageEvent)
      if (!d) return
      meanIndex = d.meanIndex
      speciesDetected = d.speciesDetected
      recordersActive = d.recordersActive
      recordings = d.recordings.map(hydrate).slice(0, MAX_FEED)
      lastEventAt = Date.now()
      emit()
    })

    es.addEventListener('metrics', (ev) => {
      const d = parse<MetricsData>(ev as MessageEvent)
      if (!d) return
      if (d.meanIndex != null) meanIndex = d.meanIndex
      if (d.speciesDetected != null) speciesDetected = d.speciesDetected
      if (d.recordersActive != null) recordersActive = d.recordersActive
      lastEventAt = Date.now()
      emit()
    })

    es.addEventListener('recording', (ev) => {
      const d = parse<{ recording: WireRecording }>(ev as MessageEvent)
      if (!d) return
      recordings = [hydrate(d.recording), ...recordings].slice(0, MAX_FEED)
      lastEventAt = Date.now()
      emit()
    })
  }

  return {
    subscribe(cb) {
      subs.add(cb)
      cb(snapshot())
      if (!es) connect()
      if (!emitTimer) emitTimer = setInterval(emit, EMIT_MS) // keep relative timers fresh
      return () => {
        subs.delete(cb)
        if (subs.size === 0) {
          es?.close()
          es = null
          if (emitTimer) {
            clearInterval(emitTimer)
            emitTimer = null
          }
        }
      }
    },
  }
}
