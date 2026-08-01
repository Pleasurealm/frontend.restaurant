import { useState } from 'react'
import { mapPins, streak } from '../exploreData'

export default function MapScreen() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <>
      <div className="ex-h" style={{ fontSize: '1.15rem', margin: '4px 4px 14px' }}>Nearby echoes</div>

      <div className="ex-card">
        <div className="ex-map">
          <svg className="river" viewBox="0 0 100 66" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-2 20 C20 26 26 40 44 44 S80 52 102 46" fill="none" stroke="#7fb8e6" strokeWidth="6" strokeOpacity="0.7" strokeLinecap="round" />
            <path d="M62 -2 C60 16 70 26 66 40 S60 60 64 68" fill="none" stroke="#7fb8e6" strokeWidth="4" strokeOpacity="0.5" strokeLinecap="round" />
          </svg>
          <div className="ex-you" title="You are here" />
          {mapPins.map((p) => (
            <button
              key={p.id}
              className="ex-pin"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onClick={() => setActive(active === p.id ? null : p.id)}
              title={p.species}
            >
              {p.emoji}
            </button>
          ))}
          {active && (
            <div
              className="tooltip"
              style={{ position: 'absolute', left: `${mapPins.find((p) => p.id === active)!.x}%`, top: `${mapPins.find((p) => p.id === active)!.y}%`, transform: 'translate(-50%, -135%)', background: 'var(--e-ink)', color: 'var(--e-surface)' }}
            >
              <b>{mapPins.find((p) => p.id === active)!.species}</b> · {mapPins.find((p) => p.id === active)!.distance}
            </div>
          )}
        </div>

        <div className="ex-nearby">
          {mapPins.map((p) => (
            <div className="ex-nearby-row" key={p.id}>
              <span className="ne">{p.emoji}</span>
              <div>
                <div className="nn">{p.species}</div>
                <div className="nd">Heard {p.when}</div>
              </div>
              <span className="nx">{p.distance} away</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ex-section-label">Keep your streak going</div>
      <div className="ex-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: '1.8rem' }}>🔥</div>
          <div>
            <div className="ex-h" style={{ fontSize: '1.1rem' }}>{streak.current}-day streak</div>
            <div className="ex-sub">Visit a habitat each day to keep it alive — best so far is {streak.best} days.</div>
          </div>
        </div>
        <div className="ex-streak-days">
          {streak.days.map((d, i) => (
            <div key={i} className={`ex-day${d.done ? ' done' : ''}${d.today ? ' today' : ''}`}>
              <div className="dot">{d.done ? '✓' : d.today ? '•' : ''}</div>
              <div className="dl">{d.d}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
