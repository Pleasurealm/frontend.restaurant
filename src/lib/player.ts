// App-wide soundscape player: only one clip plays at a time across the whole
// app (dashboard and Explore share it). Components subscribe to the currently
// playing id to reflect their play/stop state.

import { playSoundscape, seedFromId, type Clip } from './soundscape'

type Listener = (id: string | null) => void

const listeners = new Set<Listener>()
let ctx: AudioContext | null = null
let clip: Clip | null = null
let currentId: string | null = null

const notify = () => listeners.forEach((l) => l(currentId))

const ensureContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  if (!ctx) ctx = new Ctor()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

export function subscribe(l: Listener): () => void {
  listeners.add(l)
  l(currentId)
  return () => {
    listeners.delete(l)
  }
}

export function stop(): void {
  clip?.stop()
  clip = null
  currentId = null
  notify()
}

// Play the given capture, or stop it if it's already the one playing.
export function toggle(id: string, waveform: number[], seedSource = id): void {
  if (currentId === id) {
    stop()
    return
  }
  clip?.stop()
  const audio = ensureContext()
  if (!audio) return
  currentId = id
  clip = playSoundscape(audio, waveform, seedFromId(seedSource), () => {
    // onEnd — clear only if this clip is still the active one.
    if (currentId === id) {
      clip = null
      currentId = null
      notify()
    }
  })
  notify()
}
