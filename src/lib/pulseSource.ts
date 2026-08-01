import { createSimulatedPulse, type PulseSource } from './pulseEngine'
import { createSsePulse } from './pulseSse'

// Resolve the Overview pulse transport. Connects to the SSE endpoint when one
// is configured at build time; otherwise falls back to the in-browser
// simulation. Mirrors resolveMeshSource() for the Field Network.
export function resolvePulseSource(): PulseSource {
  const url = import.meta.env?.VITE_PULSE_SSE_URL
  return url ? createSsePulse(url) : createSimulatedPulse()
}
