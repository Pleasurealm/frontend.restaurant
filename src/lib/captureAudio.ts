import { seedFromId } from './soundscape'

// Field captures don't carry an amplitude envelope, so derive a stable one from
// the capture id to drive its synthesized soundscape clip.
export function recordingWaveform(id: string, len = 40): number[] {
  const s = seedFromId(id) % 100
  return Array.from({ length: len }, (_, i) => {
    const a = Math.sin((i + s) * 0.55) * 0.5 + 0.5
    const b = Math.sin((i + s) * 1.7) * 0.22
    return Math.min(1, Math.max(0.14, a * 0.65 + b + 0.3))
  })
}
