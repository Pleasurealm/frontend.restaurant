import type { ReactNode } from 'react'
import { IconArrowUp } from './Icons'

interface Props {
  icon: ReactNode
  label: string
  value: string
  unit?: string
  delta?: number
  deltaSuffix?: string
  note?: string
}

export default function StatCard({ icon, label, value, unit, delta, deltaSuffix = '%', note }: Props) {
  const flat = delta !== undefined && Math.abs(delta) < 0.5
  return (
    <div className="card stat">
      <div className="stat-top">
        <div className="stat-icon">{icon}</div>
        <div className="stat-label">{label}</div>
      </div>
      <div className="stat-value">
        {value}
        {unit && <small> {unit}</small>}
      </div>
      <div className="stat-foot">
        {delta !== undefined && (
          <span className={`delta ${flat ? 'flat' : 'up'}`}>
            {!flat && <IconArrowUp size={13} />}
            {delta > 0 ? '+' : ''}
            {delta}
            {deltaSuffix}
          </span>
        )}
        {note && <span>{note}</span>}
      </div>
    </div>
  )
}
