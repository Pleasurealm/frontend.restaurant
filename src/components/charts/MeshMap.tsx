import { useState } from 'react'
import { meshLinks, nodeStatusLabel, type MeshNode } from '../../data/meshData'

const statusColor: Record<string, string> = {
  synced: 'var(--brand-moss)',
  relaying: 'var(--brand-dawn)',
  offline: 'var(--ink-3)',
}

interface Props {
  nodes: MeshNode[]
}

// Bluetooth mesh topology — nodes positioned on a 0–100 grid, BLE links drawn
// with opacity by quality, and relay pulses animating along active links toward
// the gateway to convey store-and-forward sync.
export default function MeshMap({ nodes }: Props) {
  const [hover, setHover] = useState<MeshNode | null>(null)
  const byId = (id: string) => nodes.find((n) => n.id === id)!
  const W = 100
  const H = 92

  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }} role="img" aria-label="Bluetooth mesh network of field capture devices relaying to a gateway.">
        {meshLinks.map((l, i) => {
          const a = byId(l.from)
          const b = byId(l.to)
          const active = a.status !== 'offline' && b.status !== 'offline'
          return (
            <g key={i}>
              <line
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={active ? 'var(--brand-fern)' : 'var(--border-strong)'}
                strokeWidth={0.5 + l.strength * 0.8}
                strokeOpacity={active ? 0.35 + l.strength * 0.45 : 0.4}
                strokeDasharray={active ? undefined : '2 2'}
                strokeLinecap="round"
              />
              {active && (
                <circle r="1" fill="var(--brand-moss)">
                  <animateMotion dur={`${2.4 - l.strength}s`} repeatCount="indefinite" path={`M${b.x},${b.y} L${a.x},${a.y}`} />
                </circle>
              )}
            </g>
          )
        })}

        {nodes.map((n) => {
          const isGw = n.type === 'gateway'
          const rr = isGw ? 5 : 3.6
          return (
            <g
              key={n.id}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(null)}
            >
              {n.status === 'relaying' && (
                <circle cx={n.x} cy={n.y} r={rr} fill="none" stroke={statusColor[n.status]} strokeWidth="0.6" opacity="0.6">
                  <animate attributeName="r" values={`${rr};${rr + 4}`} dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0" dur="1.8s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={n.x} cy={n.y} r={rr} fill={statusColor[n.status]} stroke="var(--surface)" strokeWidth="1" />
              {isGw && <circle cx={n.x} cy={n.y} r="2" fill="var(--surface)" />}
              {n.queued > 0 && !isGw && (
                <g>
                  <circle cx={n.x + rr - 0.5} cy={n.y - rr + 0.5} r="2" fill="var(--brand-forest)" stroke="var(--surface)" strokeWidth="0.5" />
                  <text x={n.x + rr - 0.5} y={n.y - rr + 1.4} textAnchor="middle" fontSize="2.4" fill="#fff" fontWeight="700">{n.queued}</text>
                </g>
              )}
            </g>
          )
        })}
      </svg>

      {hover && (
        <div className="tooltip" style={{ left: `${hover.x}%`, top: `${(hover.y / H) * 100}%` }}>
          <div><b>{hover.label}</b></div>
          <div className="t-row">{nodeStatusLabel[hover.status]} · {hover.hops === 0 ? 'gateway' : `${hover.hops} hop${hover.hops > 1 ? 's' : ''}`}</div>
          <div className="t-row">{hover.battery}% battery · {hover.queued} queued</div>
        </div>
      )}
    </div>
  )
}
