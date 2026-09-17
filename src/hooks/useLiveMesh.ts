import { useEffect, useRef, useState } from 'react'
import type { MeshSource, MeshSnapshot } from '../lib/meshEngine'
import { resolveMeshSource } from '../lib/meshSource'

// Subscribes to a live mesh source and returns the latest snapshot plus a
// pause control. The source is simulated unless VITE_MESH_WS_URL is set, in
// which case it connects to the real WebSocket transport — see meshSource.ts.
export function useLiveMesh() {
  const sourceRef = useRef<MeshSource | null>(null)
  const [snap, setSnap] = useState<MeshSnapshot | null>(null)

  useEffect(() => {
    const source = resolveMeshSource()
    sourceRef.current = source
    const unsubscribe = source.subscribe(setSnap)
    return unsubscribe
  }, [])

  const setPaused = (p: boolean) => sourceRef.current?.setPaused(p)

  return { snap, setPaused }
}
