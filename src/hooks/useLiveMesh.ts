import { useEffect, useRef, useState } from 'react'
import { createSimulatedMesh, type MeshSource, type MeshSnapshot } from '../lib/meshEngine'

// Subscribes to a live mesh source and returns the latest snapshot plus a
// pause control. Swap `createSimulatedMesh()` for a real transport later.
export function useLiveMesh() {
  const sourceRef = useRef<MeshSource | null>(null)
  const [snap, setSnap] = useState<MeshSnapshot | null>(null)

  useEffect(() => {
    const source = createSimulatedMesh()
    sourceRef.current = source
    const unsubscribe = source.subscribe(setSnap)
    return unsubscribe
  }, [])

  const setPaused = (p: boolean) => sourceRef.current?.setPaused(p)

  return { snap, setPaused }
}
