/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Optional live mesh endpoint. When set, the Field Network connects to this
  // WebSocket instead of the in-browser simulation. e.g. wss://echo.naturum.co.uk/mesh
  readonly VITE_MESH_WS_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
