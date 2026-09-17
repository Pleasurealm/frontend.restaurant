import { useState } from 'react'

interface Props {
  data: number[] // 24 values, 0–100
}

// Mean acoustic activity across a 24h cycle — a bar-per-hour chart that
// surfaces the dawn and dusk chorus peaks. Per-bar hover tooltip.
export default function HourBars({ data }: Props) {
  const [hover, setHover] = useState<number | null>(null)
  const peak = Math.max(...data)

  const fmtHour = (h: number) => `${String(h).padStart(2, '0')}:00`
  const band = (h: number) =>
    h >= 5 && h <= 8 ? 'Dawn chorus' : h >= 18 && h <= 20 ? 'Dusk chorus' : h >= 21 || h <= 4 ? 'Night' : 'Daytime'

  return (
    <div className="chart-wrap">
      <div className="hours-list">
        {data.map((v, h) => {
          const isPeak = v > peak * 0.82
          return (
            <div
              key={h}
              onMouseEnter={() => setHover(h)}
              onMouseLeave={() => setHover(null)}
              style={{
                flex: 1,
                height: `${Math.max(4, (v / 100) * 100)}%`,
                minHeight: 4,
                borderRadius: '4px 4px 2px 2px',
                background: isPeak ? 'var(--brand-forest)' : 'var(--brand-fern)',
                opacity: hover === null || hover === h ? 1 : 0.5,
                transition: 'opacity 0.12s',
                cursor: 'pointer',
              }}
            />
          )
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.7rem', color: 'var(--ink-3)' }}>
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:00</span>
      </div>
      {hover !== null && (
        <div className="tooltip" style={{ left: `${((hover + 0.5) / 24) * 100}%`, top: '4px' }}>
          <div><b>{fmtHour(hover)}</b> · {band(hover)}</div>
          <div className="t-row">Activity <b>{data[hover]}</b>/100</div>
        </div>
      )}
    </div>
  )
}
