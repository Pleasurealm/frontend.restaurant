/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Optional live mesh endpoint. When set, the Field Network connects to this
  // WebSocket instead of the in-browser simulation. e.g. wss://echo.naturum.co.uk/mesh
  readonly VITE_MESH_WS_URL?: string

  // Optional Overview pulse endpoint. When set, the dashboard subscribes to this
  // Server-Sent Events stream instead of the simulation. e.g. https://echo.naturum.co.uk/pulse
  readonly VITE_PULSE_SSE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
