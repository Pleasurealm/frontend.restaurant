// Synthesize a short nature-soundscape clip with the Web Audio API — no audio
// files needed. A capture's amplitude envelope (its waveform) shapes a layer of
// gentle bird-like chirps over soft filtered ambience, seeded per capture so
// each one sounds a little different. This is what makes "the sound of nature
// returning" literally audible in the app.

export interface Clip {
  stop: () => void
  durationMs: number
}

// Small seeded PRNG so a given capture always renders the same clip.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function seedFromId(id: string): number {
  let h = 2166136261
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function playSoundscape(
  ctx: AudioContext,
  waveform: number[],
  seed: number,
  onEnd: () => void,
): Clip {
  const rng = mulberry32(seed)
  const start = ctx.currentTime
  const dur = 3.4

  const master = ctx.createGain()
  master.gain.setValueAtTime(0.0001, start)
  master.gain.exponentialRampToValueAtTime(0.85, start + 0.1)
  master.gain.setValueAtTime(0.85, start + dur - 0.3)
  master.gain.exponentialRampToValueAtTime(0.0001, start + dur)
  master.connect(ctx.destination)

  // Slow amplitude envelope taken from the capture's waveform.
  const env = ctx.createGain()
  env.connect(master)
  const curve = Float32Array.from(waveform.length ? waveform : [0.6], (v) => 0.3 + v * 0.7)
  try {
    env.gain.setValueCurveAtTime(curve, start, dur)
  } catch {
    env.gain.value = 0.7
  }

  // Soft ambience: brown-ish noise through a low-pass, kept quiet.
  const noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate)
  const nd = noiseBuf.getChannelData(0)
  let last = 0
  for (let i = 0; i < nd.length; i++) {
    const white = rng() * 2 - 1
    last = (last + 0.02 * white) / 1.02
    nd[i] = last * 3
  }
  const noise = ctx.createBufferSource()
  noise.buffer = noiseBuf
  const noiseLp = ctx.createBiquadFilter()
  noiseLp.type = 'lowpass'
  noiseLp.frequency.value = 700
  const noiseGain = ctx.createGain()
  noiseGain.gain.value = 0.1
  noise.connect(noiseLp)
  noiseLp.connect(noiseGain)
  noiseGain.connect(env)
  noise.start(start)
  noise.stop(start + dur)

  // Bird-like chirps: short triangle bursts with a quick pitch sweep, band-passed.
  const chirps = 9 + Math.floor(rng() * 8)
  const oscs: OscillatorNode[] = []
  for (let k = 0; k < chirps; k++) {
    const t = start + rng() * (dur - 0.4)
    const base = 1500 + rng() * 2600
    const o = ctx.createOscillator()
    o.type = rng() < 0.5 ? 'triangle' : 'sine'
    o.frequency.setValueAtTime(base, t)
    o.frequency.exponentialRampToValueAtTime(base * (0.65 + rng() * 0.7), t + 0.09)

    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = base
    bp.Q.value = 5

    const g = ctx.createGain()
    const peak = 0.18 + rng() * 0.22
    const len = 0.07 + rng() * 0.09
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(peak, t + 0.012)
    g.gain.exponentialRampToValueAtTime(0.0001, t + len)

    o.connect(bp)
    bp.connect(g)
    g.connect(env)
    o.start(t)
    o.stop(t + len + 0.05)
    oscs.push(o)
  }

  let ended = false
  const endTimer = setTimeout(() => {
    ended = true
    onEnd()
  }, dur * 1000)

  const stop = () => {
    if (ended) return
    ended = true
    clearTimeout(endTimer)
    const t = ctx.currentTime
    try {
      master.gain.cancelScheduledValues(t)
      master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), t)
      master.gain.exponentialRampToValueAtTime(0.0001, t + 0.08)
    } catch {
      /* ignore */
    }
    try {
      noise.stop(t + 0.1)
      oscs.forEach((o) => o.stop(t + 0.1))
    } catch {
      /* already stopped */
    }
    setTimeout(onEnd, 100)
  }

  return { stop, durationMs: dur * 1000 }
}
