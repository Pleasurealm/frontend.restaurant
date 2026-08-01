import { useState } from 'react'
import type { SpeciesGroup } from '../../data/naturumData'

interface Props {
  data: SpeciesGroup[]
}

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

const arc = (cx: number, cy: number, r: number, r2: number, start: number, end: number) => {
  const o1 = polar(cx, cy, r, end)
  const o2 = polar(cx, cy, r, start)
  const i1 = polar(cx, cy, r2, start)
  const i2 = polar(cx, cy, r2, end)
  const large = end - start > 180 ? 1 : 0
  return `M${o1.x},${o1.y} A${r},${r} 0 ${large} 0 ${o2.x},${o2.y} L${i1.x},${i1.y} A${r2},${r2} 0 ${large} 1 ${i2.x},${i2.y} Z`
}

// Species composition — a donut with a 2px surface gap between arcs, per-arc
// hover, and a fully labelled legend (identity never relies on colour alone).
export default function Donut({ data }: Props) {
  const total = data.reduce((n, d) => n + d.detections, 0)
  const [active, setActive] = useState<number | null>(null)
  const size = 190
  const cx = size / 2
  const cy = size / 2
  const r = 88
  const r2 = 58
  const gap = 3

  let cursor = 0
  const segs = data.map((d) => {
    const sweep = (d.detections / total) * 360
    const seg = { d, start: cursor + gap / 2, end: cursor + sweep - gap / 2 }
    cursor += sweep
    return seg
  })

  const shown = active !== null ? data[active] : null

  return (
    <div className="donut-wrap">
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label="Detections by species group">
        {segs.map((s, i) => (
          <path
            key={s.d.key}
            d={arc(cx, cy, r, r2, s.start, s.end)}
            fill={s.d.color}
            opacity={active === null || active === i ? 1 : 0.35}
            style={{ transition: 'opacity 0.15s', cursor: 'pointer' }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          />
        ))}
        <text x={cx} y={cy - 4} textAnchor="middle" className="donut-total" fill="var(--ink)" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22 }}>
          {shown ? `${Math.round((shown.detections / total) * 100)}%` : (total / 1000).toFixed(0) + 'k'}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="9" fill="var(--ink-3)" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {shown ? shown.label : 'detections'}
        </text>
      </svg>

      <div className="donut-legend">
        {data.map((d, i) => (
          <div
            className="donut-legend-row"
            key={d.key}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{ cursor: 'pointer', opacity: active === null || active === i ? 1 : 0.55, transition: 'opacity 0.15s' }}
          >
            <span className="swatch" style={{ background: d.color }} />
            <span className="name">{d.label}</span>
            <span className="val">{d.detections.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
