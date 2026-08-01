// Live "pulse" for the dashboard Overview.
//
// Same pattern as the mesh engine: a PulseSource emits Overview snapshots on a
// timer so the headline acoustic index, species count and latest recordings
// update in real time. Simulated here; a real source would implement the same
// interface and emit the same shape.

import { kpis, recordings as seedRecordings, sites, type Recording } from '../data/naturumData'

export interface LiveRecording extends Recording {
  receivedAt: number
}

export interface OverviewPulse {
  now: number
  connected: boolean
  meanIndex: number
  speciesDetected: number
  recordersActive: number
  recordings: LiveRecording[]
  lastEventAt: number
}

export interface PulseSource {
  subscribe(cb: (p: OverviewPulse) => void): () => void
}

const MAX_FEED = 6
const TICK_MS = 1000
const EVENT_EVERY = 4 // ticks between meaningful updates

const wave = (seed: number): number[] =>
  Array.from({ length: 48 }, (_, i) => {
    const a = Math.sin((i + seed) * 0.7) * 0.5 + 0.5
    const b = Math.sin((i + seed) * 0.23) * 0.3
    const c = Math.sin((i + seed) * 1.9) * 0.18
    return Math.min(1, Math.max(0.08, a * 0.6 + b + c + 0.35))
  })

// Species that can be freshly detected in a new recording.
const pool = [
  { dominant: 'Cetti’s warbler', period: 'Morning' as const },
  { dominant: 'Water rail', period: 'Dusk' as const },
  { dominant: 'Grasshopper warbler', period: 'Dawn' as const },
  { dominant: 'Tawny owl', period: 'Night' as const },
  { dominant: 'Willow warbler', period: 'Morning' as const },
  { dominant: 'Snipe', period: 'Dusk' as const },
  { dominant: 'Cuckoo', period: 'Dawn' as const },
]

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]
const clock = (t: number) => {
  const d = new Date(t)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function createSimulatedPulse(): PulseSource {
  const subs = new Set<(p: OverviewPulse) => void>()
  let timer: ReturnType<typeof setInterval> | null = null
  let tick = 0
  let seq = 0

  const start = Date.now()
  let meanIndex = kpis.meanIndex
  let speciesDetected = kpis.speciesDetected
  let recordersActive = kpis.recordersActive
  let lastEventAt = start
  const recordings: LiveRecording[] = seedRecordings.map((r, i) => ({
    ...r,
    receivedAt: start - (i + 1) * 30_000,
  }))

  const snapshot = (): OverviewPulse => ({
    now: Date.now(),
    connected: true,
    meanIndex,
    speciesDetected,
    recordersActive,
    recordings: recordings.map((r) => ({ ...r })),
    lastEventAt,
  })

  const emit = () => subs.forEach((cb) => cb(snapshot()))

  const advance = () => {
    const now = Date.now()
    const roll = Math.random()

    // Index does a gentle bounded random walk around its baseline.
    meanIndex = Math.max(kpis.meanIndex - 2, Math.min(kpis.meanIndex + 3, meanIndex + (roll < 0.5 ? -1 : 1)))

    // Active recorders flicker within a plausible band.
    if (roll < 0.25) recordersActive = Math.max(36, Math.min(40, recordersActive + (roll < 0.12 ? -1 : 1)))

    // A new recording lands now and then, sometimes revealing a new species.
    if (roll < 0.4) {
      const site = pick(sites)
      const p = pick(pool)
      recordings.unshift({
        id: `pulse-${seq++}`,
        site: site.name,
        siteId: site.id,
        time: clock(now),
        period: p.period,
        durationMin: pick([15, 20, 30]),
        dominant: p.dominant,
        species: 12 + Math.floor(Math.random() * 18),
        index: 55 + Math.floor(Math.random() * 35),
        waveform: wave(seq * 3 + 5),
        receivedAt: now,
      })
      if (recordings.length > MAX_FEED) recordings.length = MAX_FEED
      if (roll < 0.12) speciesDetected += 1 // occasionally a brand-new species
      lastEventAt = now
    }
  }

  const run = () => {
    tick += 1
    if (tick % EVENT_EVERY === 0) advance()
    emit()
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
  }
}
