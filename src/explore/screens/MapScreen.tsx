import { useState } from 'react'
import { streak } from '../exploreData'
import { useLivePulse } from '../../hooks/useLivePulse'
import { ago } from '../../lib/meshEngine'
import { toNearby, fmtDistance } from '../nearby'

export default function MapScreen() {
  const [active, setActive] = useState<string | null>(null)
  const pulse = useLivePulse()

  const now = pulse?.now ?? Date.now()
  // Community captures streaming in from the live pulse, nearest-first.
  const captures = (pulse?.recordings ?? [])
    .map(toNearby)
    .sort((a, b) => a.distanceM - b.distanceM)
    .slice(0, 6)
  const isFresh = (t: number) => now - t < 6000
  const freshCount = captures.filter((c) => isFresh(c.receivedAt)).length
  const activePin = captures.find((c) => c.id === active)

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 4px 14px' }}>
        <div className="ex-h" style={{ fontSize: '1.15rem' }}>Nearby echoes</div>
        <span className={`ex-live${pulse?.connected === false ? ' off' : ''}`} style={{ marginLeft: 'auto' }}>
          <span className="ex-live-dot" />
          {pulse?.connected === false ? 'Reconnecting' : 'Live'}
        </span>
      </div>

      <div className="ex-card">
        <div className="ex-map">
          <svg className="river" viewBox="0 0 100 66" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-2 20 C20 26 26 40 44 44 S80 52 102 46" fill="none" stroke="#7fb8e6" strokeWidth="6" strokeOpacity="0.7" strokeLinecap="round" />
            <path d="M62 -2 C60 16 70 26 66 40 S60 60 64 68" fill="none" stroke="#7fb8e6" strokeWidth="4" strokeOpacity="0.5" strokeLinecap="round" />
          </svg>
          <div className="ex-you" title="You are here" />
          {captures.map((p) => (
            <button
              key={p.id}
              className={`ex-pin${isFresh(p.receivedAt) ? ' fresh' : ''}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onClick={() => setActive(active === p.id ? null : p.id)}
              title={p.species}
            >
              {p.emoji}
            </button>
          ))}
          {activePin && (
            <div
              className="tooltip"
              style={{ position: 'absolute', left: `${activePin.x}%`, top: `${activePin.y}%`, transform: 'translate(-50%, -135%)', background: 'var(--e-ink)', color: 'var(--e-surface)' }}
            >
              <b>{activePin.species}</b> · {fmtDistance(activePin.distanceM)}
            </div>
          )}
        </div>

        <div className="ex-sub" style={{ margin: '12px 2px 0' }}>
          {captures.length} captures nearby{freshCount > 0 ? ` · ${freshCount} just now` : ''}
        </div>
        <div className="ex-nearby">
          {captures.map((p) => (
            <div className={`ex-nearby-row${isFresh(p.receivedAt) ? ' fresh' : ''}`} key={p.id}>
              <span className="ne">{p.emoji}</span>
              <div>
                <div className="nn">
                  {p.species}
                  {isFresh(p.receivedAt) && <span className="ex-new-tag">New</span>}
                </div>
                <div className="nd">Heard {ago(p.receivedAt, now)}</div>
              </div>
              <span className="nx">{fmtDistance(p.distanceM)} away</span>
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
