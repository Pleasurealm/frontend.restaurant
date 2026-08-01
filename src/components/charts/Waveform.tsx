interface Props {
  data: number[]
  color?: string
  height?: number
}

// Amplitude envelope for a recording, drawn as symmetric bars around a centre
// line — a familiar "audio clip" motif for the soundscape cards.
export default function Waveform({ data, color = 'var(--brand-moss)', height = 44 }: Props) {
  const barW = 3
  const gap = 2
  const width = data.length * (barW + gap)
  const mid = height / 2

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ width: '100%', height }} aria-hidden="true">
      {data.map((v, i) => {
        const h = Math.max(2, v * (height - 4))
        return (
          <rect
            key={i}
            x={i * (barW + gap)}
            y={mid - h / 2}
            width={barW}
            height={h}
            rx={1.5}
            fill={color}
            opacity={0.45 + v * 0.55}
          />
        )
      })}
    </svg>
  )
}
