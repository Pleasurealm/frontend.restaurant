import MeshMap from '../components/charts/MeshMap'
import { IconBluetooth, IconRadio, IconCamera, IconWave, IconMic } from '../components/Icons'
import {
  meshNodes,
  captures,
  meshStats,
  nodeStatusLabel,
  syncLabel,
  type NodeStatus,
  type SyncState,
  type CaptureKind,
} from '../data/meshData'

const statusColor: Record<NodeStatus, string> = {
  synced: 'var(--brand-moss)',
  relaying: 'var(--brand-dawn)',
  offline: 'var(--ink-3)',
}

const battColor = (b: number) => (b < 20 ? 'var(--serious)' : b < 45 ? 'var(--warn)' : 'var(--brand-moss)')

const kindIcon = (k: CaptureKind) =>
  k === 'sound' ? <IconWave size={12} /> : k === 'photo' ? <IconCamera size={12} /> : <IconMic size={12} />
const kindLabel = (k: CaptureKind) => (k === 'both' ? 'Photo + sound' : k === 'sound' ? 'Sound' : 'Photo')

export default function FieldNetwork() {
  return (
    <>
      <div className="mesh-note">
        <IconBluetooth size={20} />
        <span>
          Many habitat sites have no phone signal. Field devices capture nature offline and relay it
          hop-by-hop over a <strong>Bluetooth mesh</strong> — storing and forwarding until the gateway
          reaches connectivity and syncs the batch.
        </span>
      </div>

      <div className="grid grid-2">
        <div className="card card-pad">
          <div className="card-head">
            <div>
              <h3>Mesh topology</h3>
              <p>Live Bluetooth links relaying captures to the Barn Gateway</p>
            </div>
            <IconRadio size={20} style={{ color: 'var(--ink-3)' }} />
          </div>
          <MeshMap />
          <div className="legend" style={{ marginTop: 14 }}>
            <span className="legend-item"><span className="swatch" style={{ background: 'var(--brand-moss)' }} />Synced</span>
            <span className="legend-item"><span className="swatch" style={{ background: 'var(--brand-dawn)' }} />Relaying</span>
            <span className="legend-item"><span className="swatch" style={{ background: 'var(--ink-3)' }} />Offline</span>
          </div>
        </div>

        <div className="card card-pad">
          <div className="card-head">
            <div>
              <h3>Field devices</h3>
              <p>{meshStats.nodesOnline}/{meshStats.nodesTotal} online · {meshStats.queued} captures queued</p>
            </div>
          </div>

          <div className="mesh-stats" style={{ marginBottom: 8 }}>
            <div className="mesh-stat"><div className="v">{meshStats.longestChain}</div><div className="l">Longest hop chain</div></div>
            <div className="mesh-stat"><div className="v">{meshStats.relayedMb}<small style={{ fontSize: '0.9rem' }}> MB</small></div><div className="l">Relayed today</div></div>
            <div className="mesh-stat"><div className="v">{meshStats.lastSync}</div><div className="l">Last gateway sync</div></div>
          </div>

          <div className="node-list">
            {meshNodes.map((n) => (
              <div className="node-row" key={n.id}>
                <span className="node-dot" style={{ background: statusColor[n.status] }} />
                <div className="node-main">
                  <div className="nm">{n.label}</div>
                  <div className="ns">
                    {nodeStatusLabel[n.status]} · {n.hops === 0 ? 'gateway' : `${n.hops} hop${n.hops > 1 ? 's' : ''} away`}
                    {n.queued > 0 && ` · ${n.queued} queued`}
                  </div>
                </div>
                <div className="battery">
                  <span className="batt-track"><span style={{ width: `${n.battery}%`, background: battColor(n.battery) }} /></span>
                  {n.battery}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card card-pad">
        <div className="card-head">
          <div>
            <h3>Field capture feed</h3>
            <p>Photos and sounds documented in the field, moving across the mesh</p>
          </div>
          <span className="chip">{captures.length} captures</span>
        </div>
        <div className="capture-grid">
          {captures.map((c) => (
            <figure className="capture" key={c.id}>
              <div className="capture-photo" style={{ background: `linear-gradient(150deg, ${c.grad[0]}, ${c.grad[1]})` }}>
                <span className="kind">{kindIcon(c.kind)} {kindLabel(c.kind)}</span>
                <span className="emoji">{c.emoji}</span>
                <span className="hops">{c.hops === 0 ? 'direct' : `${c.hops} hop${c.hops > 1 ? 's' : ''}`}</span>
              </div>
              <figcaption className="capture-body">
                <div className="sp">{c.species}</div>
                <div className="mt">{c.site} · {c.by} · {c.time}</div>
                <div className={`sync-badge ${c.sync.replace(' ', '-') as SyncState}`}>
                  <span className="sd" style={{ background: 'currentColor' }} />
                  {syncLabel[c.sync]}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </>
  )
}
