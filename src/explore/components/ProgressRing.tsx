interface Props {
  pct: number
  size?: number
  value: string
  label: string
  color?: string
}

export default function ProgressRing({ pct, size = 92, value, label, color = 'var(--leaf)' }: Props) {
  const stroke = 9
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c - (pct / 100) * c
  return (
    <div className="ex-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--e-line)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="rc">
        <div className="rn">{value}</div>
        <div className="rl">{label}</div>
      </div>
    </div>
  )
}
