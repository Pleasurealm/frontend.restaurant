interface Props {
  data: number[]
  width?: number
  height?: number
  color?: string
}

// Compact per-site index trend. Decorative summary — no axis, no hover.
export default function Sparkline({ data, width = 96, height = 30, color = 'var(--brand-moss)' }: Props) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const x = (i: number) => (i / (data.length - 1)) * width
  const y = (v: number) => height - 3 - ((v - min) / span) * (height - 6)
  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${width},${height} L0,${height} Z`
  const id = `spark-${data.join('-').slice(0, 12)}`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r="2.4" fill={color} />
    </svg>
  )
}
