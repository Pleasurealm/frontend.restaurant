import { useEffect, useState } from 'react'
import { createSimulatedPulse, type OverviewPulse } from '../lib/pulseEngine'

// Subscribes to the Overview pulse source and returns the latest snapshot.
export function useLivePulse() {
  const [pulse, setPulse] = useState<OverviewPulse | null>(null)

  useEffect(() => {
    const source = createSimulatedPulse()
    return source.subscribe(setPulse)
  }, [])

  return pulse
}
