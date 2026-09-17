import Sparkline from '../components/charts/Sparkline'
import { IconPin, IconMic } from '../components/Icons'
import { sites, statusLabels } from '../data/naturumData'

export default function Sites() {
  return (
    <>
      <div className="site-cards">
        {sites.map((s) => (
          <div className="card site-card" key={s.id}>
            <div className="site-card-head">
              <div>
                <h3>{s.name}</h3>
                <div className="site-meta">
                  <IconPin size={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />
                  {s.region} · {s.habitat}
                </div>
              </div>
              <span className={`badge ${s.status}`}>
                <span className="dot" />
                {statusLabels[s.status]}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div className="site-stat">
                <div className="label">Acoustic index</div>
                <div className="value">{s.index}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Sparkline data={s.trend} width={120} height={40} />
                <span className="delta up" style={{ fontSize: '0.78rem' }}>+{s.indexChange} pts / yr</span>
              </div>
            </div>

            <div className="site-stats" style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
              <div className="site-stat">
                <div className="label">Area</div>
                <div className="value" style={{ fontSize: '1.05rem' }}>{s.areaHa} ha</div>
              </div>
              <div className="site-stat">
                <div className="label">Species</div>
                <div className="value" style={{ fontSize: '1.05rem' }}>{s.speciesRichness}</div>
              </div>
              <div className="site-stat">
                <div className="label">Recorders</div>
                <div className="value" style={{ fontSize: '1.05rem' }}>
                  <IconMic size={15} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 3, color: 'var(--brand-moss)' }} />
                  {s.recordersActive}/{s.recorders}
                </div>
              </div>
            </div>

            <div className="site-meta">Last recording {s.lastRecording}</div>
          </div>
        ))}
      </div>
    </>
  )
}
