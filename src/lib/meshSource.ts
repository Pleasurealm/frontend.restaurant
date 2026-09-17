import { createSimulatedMesh, type MeshSource } from './meshEngine'
import { createWebSocketMesh } from './meshSocket'

// Resolve the mesh transport. If a live endpoint is configured at build time,
// connect to it; otherwise fall back to the in-browser simulation. This is the
// single line that flips the whole Field Network from demo to production data.
export function resolveMeshSource(): MeshSource {
  const url = import.meta.env?.VITE_MESH_WS_URL
  return url ? createWebSocketMesh(url) : createSimulatedMesh()
}
