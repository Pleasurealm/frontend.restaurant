import type { LiveRecording } from '../lib/pulseEngine'

// Turn a live soundscape recording into a positioned "nearby" community capture.
// Positions and distance are derived deterministically from the id so a pin
// stays put across re-renders (no jitter as the pulse ticks).

const emojiBySpecies: Record<string, string> = {
  Nightingale: '🎶',
  'Reed warbler': '🐦',
  Curlew: '🪶',
  Nightjar: '🌙',
  Skylark: '🕊️',
  'Cetti’s warbler': '🐦',
  'Water rail': '🐤',
  'Grasshopper warbler': '🦗',
  'Tawny owl': '🦉',
  'Willow warbler': '🐦',
  Snipe: '🪶',
  Cuckoo: '🎶',
}

export function speciesEmoji(name: string): string {
  return emojiBySpecies[name] ?? '🐦'
}

// FNV-1a hash → unit float in [0, 1), salted so one id yields several stable draws.
function hashUnit(str: string, salt: number): number {
  let h = 2166136261 ^ salt
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 100000) / 100000
}

export interface NearbyCapture {
  id: string
  species: string
  emoji: string
  x: number
  y: number
  distanceM: number
  receivedAt: number
  waveform: number[]
}

export function toNearby(r: LiveRecording): NearbyCapture {
  return {
    id: r.id,
    species: r.dominant,
    emoji: speciesEmoji(r.dominant),
    x: 12 + hashUnit(r.id, 1) * 76, // keep inside the map with margins
    y: 22 + hashUnit(r.id, 2) * 54,
    distanceM: 60 + Math.round(hashUnit(r.id, 3) * 620),
    receivedAt: r.receivedAt,
    waveform: r.waveform,
  }
}

export const fmtDistance = (m: number) => (m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${m} m`)
