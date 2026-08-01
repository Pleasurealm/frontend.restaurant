import { useEffect, useState } from 'react'
import type { OverviewPulse } from '../lib/pulseEngine'
import { resolvePulseSource } from '../lib/pulseSource'

// Subscribes to the Overview pulse source and returns the latest snapshot. The
// source is simulated unless VITE_PULSE_SSE_URL is set, in which case it
// connects to the real SSE stream — see pulseSource.ts.
export function useLivePulse() {
  const [pulse, setPulse] = useState<OverviewPulse | null>(null)

  useEffect(() => {
    const source = resolvePulseSource()
    return source.subscribe(setPulse)
  }, [])

  return pulse
}
