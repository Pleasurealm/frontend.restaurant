// Naturum Echo — Field Network (Bitchat-style Bluetooth mesh).
//
// Many habitat sites have no cellular coverage. Field devices — fixed acoustic
// recorders and citizen-scientist phones — capture nature photos and sounds
// offline and relay them hop-by-hop over a Bluetooth Low Energy mesh, storing
// and forwarding until a gateway node reaches connectivity and syncs the batch.
// This models that mesh: nodes, links, and the capture queue moving across it.

export type NodeType = 'gateway' | 'recorder' | 'field'
export type NodeStatus = 'synced' | 'relaying' | 'offline'

export interface MeshNode {
  id: string
  label: string
  type: NodeType
  status: NodeStatus
  battery: number
  hops: number // hops to the gateway
  queued: number // captures held on-device, awaiting relay/sync
  x: number // 0–100 layout coordinate
  y: number
}

export interface MeshLink {
  from: string
  to: string
  strength: number // 0–1 BLE link quality
}

export const meshNodes: MeshNode[] = [
  { id: 'gw', label: 'Barn Gateway', type: 'gateway', status: 'synced', battery: 100, hops: 0, queued: 0, x: 50, y: 16 },
  { id: 'r1', label: 'Recorder · Fen North', type: 'recorder', status: 'synced', battery: 82, hops: 1, queued: 2, x: 24, y: 40 },
  { id: 'r2', label: 'Recorder · Reedbed', type: 'recorder', status: 'relaying', battery: 64, hops: 1, queued: 5, x: 74, y: 40 },
  { id: 'f1', label: 'Warden phone', type: 'field', status: 'relaying', battery: 47, hops: 2, queued: 3, x: 14, y: 68 },
  { id: 'r3', label: 'Recorder · Willow Scrub', type: 'recorder', status: 'relaying', battery: 71, hops: 2, queued: 4, x: 40, y: 66 },
  { id: 'f2', label: 'School group', type: 'field', status: 'relaying', battery: 90, hops: 2, queued: 8, x: 68, y: 68 },
  { id: 'r4', label: 'Recorder · Far Marsh', type: 'recorder', status: 'offline', battery: 12, hops: 3, queued: 6, x: 88, y: 74 },
]

export const meshLinks: MeshLink[] = [
  { from: 'gw', to: 'r1', strength: 0.92 },
  { from: 'gw', to: 'r2', strength: 0.78 },
  { from: 'r1', to: 'f1', strength: 0.61 },
  { from: 'r1', to: 'r3', strength: 0.7 },
  { from: 'r2', to: 'f2', strength: 0.66 },
  { from: 'r2', to: 'r4', strength: 0.34 },
  { from: 'r3', to: 'f2', strength: 0.52 },
]

export type CaptureKind = 'photo' | 'sound' | 'both'
export type SyncState = 'synced' | 'relaying' | 'on-device'

export interface Capture {
  id: string
  species: string
  emoji: string
  group: 'Birds' | 'Insects' | 'Amphibians' | 'Mammals' | 'Plants'
  kind: CaptureKind
  site: string
  by: string
  time: string
  hops: number
  sync: SyncState
  // Two-stop gradient standing in for the field photo.
  grad: [string, string]
}

export const captures: Capture[] = [
  { id: 'c1', species: 'Bittern', emoji: '🪶', group: 'Birds', kind: 'both', site: 'Wyckham Fen', by: 'Recorder · Reedbed', time: '05:41', hops: 1, sync: 'synced', grad: ['#6a8b4a', '#26482f'] },
  { id: 'c2', species: 'Marsh fritillary', emoji: '🦋', group: 'Insects', kind: 'photo', site: 'Silverdale Meadow', by: 'School group', time: '09:12', hops: 2, sync: 'relaying', grad: ['#e0a33a', '#a85f2a'] },
  { id: 'c3', species: 'Common frog', emoji: '🐸', group: 'Amphibians', kind: 'both', site: 'Alder Carr', by: 'Warden phone', time: '07:58', hops: 2, sync: 'relaying', grad: ['#3f8f6b', '#1e4f3a'] },
  { id: 'c4', species: 'Nightingale', emoji: '🎶', group: 'Birds', kind: 'sound', site: 'Alder Carr', by: 'Recorder · Willow Scrub', time: '05:06', hops: 2, sync: 'relaying', grad: ['#7a6f4a', '#3a3320'] },
  { id: 'c5', species: 'Otter', emoji: '🦦', group: 'Mammals', kind: 'photo', site: 'Estuary Reach', by: 'Warden phone', time: '18:44', hops: 3, sync: 'on-device', grad: ['#5f7d8b', '#2a3f4a'] },
  { id: 'c6', species: 'Southern hawker', emoji: '🪰', group: 'Insects', kind: 'photo', site: 'Blackmoor Heath', by: 'School group', time: '13:22', hops: 2, sync: 'synced', grad: ['#4a86a8', '#244258'] },
  { id: 'c7', species: 'Bog asphodel', emoji: '🌼', group: 'Plants', kind: 'photo', site: 'Tarn Hollow', by: 'Recorder · Far Marsh', time: '11:05', hops: 3, sync: 'on-device', grad: ['#c8a83a', '#7a5f1e' ] },
  { id: 'c8', species: 'Reed warbler', emoji: '🐦', group: 'Birds', kind: 'sound', site: 'Wyckham Fen', by: 'Recorder · Fen North', time: '06:19', hops: 1, sync: 'synced', grad: ['#6f9a5a', '#33502f'] },
]

// The live mesh engine (src/lib/meshEngine.ts) derives running stats from the
// nodes above; the seed values here are its starting point.

// Species the live mesh can surface as new captures arrive from the field.
export interface CaptureSeed {
  species: string
  emoji: string
  group: Capture['group']
  grad: [string, string]
}

export const capturePool: CaptureSeed[] = [
  { species: 'Wren', emoji: '🐦', group: 'Birds', grad: ['#6f9a5a', '#33502f'] },
  { species: 'Water vole', emoji: '🐭', group: 'Mammals', grad: ['#5f7d8b', '#2a3f4a'] },
  { species: 'Emperor moth', emoji: '🦋', group: 'Insects', grad: ['#8b6f4a', '#3a2c1a'] },
  { species: 'Great crested newt', emoji: '🦎', group: 'Amphibians', grad: ['#3f8f6b', '#1e4f3a'] },
  { species: 'Cuckoo', emoji: '🎶', group: 'Birds', grad: ['#7a6f4a', '#3a3320'] },
  { species: 'Grass snake', emoji: '🐍', group: 'Amphibians', grad: ['#5f8b4a', '#2c481f'] },
  { species: 'Ragged robin', emoji: '🌸', group: 'Plants', grad: ['#c86f8b', '#7a2c48'] },
  { species: 'Roe deer', emoji: '🦌', group: 'Mammals', grad: ['#8b7a5a', '#3a3320'] },
  { species: 'Lapwing', emoji: '🪶', group: 'Birds', grad: ['#4a86a8', '#244258'] },
  { species: 'Common lizard', emoji: '🦎', group: 'Amphibians', grad: ['#6a8b4a', '#26482f'] },
]

export const nodeStatusLabel: Record<NodeStatus, string> = {
  synced: 'Synced',
  relaying: 'Relaying',
  offline: 'Offline',
}

export const syncLabel: Record<SyncState, string> = {
  synced: 'Synced to cloud',
  relaying: 'Relaying over mesh',
  'on-device': 'Held on device',
}
