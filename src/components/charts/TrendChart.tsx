import { useRef, useState } from 'react'
import type { TrendPoint } from '../../data/naturumData'

interface Props {
  data: TrendPoint[]
}

// Network-wide Acoustic Complexity Index over time — an area+line chart with a
// crosshair-and-tooltip hover layer. Single series, so no legend box.
export default function TrendChart({ data }: Props) {
  const W = 760
  const H = 280
  const padL = 34
  const padR = 16
  const padT = 18
  const padB = 34
  const innerW = W - padL - padR
  const innerH = H - padT - padB

  const svgRef = useRef<SVGSVGElement>(null)
  const [hover, setHover] = useState<number | null>(null)

  const yMin = 40
  const yMax = 80
  const x = (i: number) => padL + (i / (data.length - 1)) * innerW
  const y = (v: number) => padT + innerH - ((v - yMin) / (yMax - yMin)) * innerH

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(d.index)}`).join(' ')
  const areaPath = `${linePath} L${x(data.length - 1)},${padT + innerH} L${x(0)},${padT + innerH} Z`

  const gridVals = [40, 50, 60, 70, 80]

  const onMove = (e: React.MouseEvent) => {
    const rect = svgRef.current!.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * W
    const i = Math.round(((px - padL) / innerW) * (data.length - 1))
    setHover(Math.max(0, Math.min(data.length - 1, i)))
  }

  const labelEvery = 3

  return (
    <div className="chart-wrap">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto' }}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
        role="img"
        aria-label="Acoustic Complexity Index across the network over 18 months, rising from 51 to 72."
      >
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-moss)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--brand-moss)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridVals.map((v) => (
          <g key={v}>
            <line x1={padL} x2={W - padR} y1={y(v)} y2={y(v)} stroke="var(--border)" strokeWidth="1" />
            <text x={padL - 8} y={y(v) + 3} textAnchor="end" fontSize="10" fill="var(--ink-3)">
              {v}
            </text>
          </g>
        ))}

        <path d={areaPath} fill="url(#trendFill)" />
        <path d={linePath} fill="none" stroke="var(--brand-forest)" strokeWidth="2.5" />

        {data.map((d, i) =>
          i % labelEvery === 0 ? (
            <text key={d.month} x={x(i)} y={H - 12} textAnchor="middle" fontSize="10" fill="var(--ink-3)">
              {d.month}
            </text>
          ) : null,
        )}

        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={padT} y2={padT + innerH} stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx={x(hover)} cy={y(data[hover].index)} r="5.5" fill="var(--brand-forest)" stroke="var(--surface)" strokeWidth="2.5" />
          </g>
        )}
      </svg>

      {hover !== null && (
        <div
          className="tooltip"
          style={{
            left: `${(x(hover) / W) * 100}%`,
            top: `${(y(data[hover].index) / H) * 100}%`,
          }}
        >
          <div><b>{data[hover].month}</b></div>
          <div className="t-row">Index <b>{data[hover].index}</b></div>
          <div className="t-row">{data[hover].species} species</div>
        </div>
      )}
    </div>
  )
}
