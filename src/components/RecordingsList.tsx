import { recordings } from '../data/naturumData'
import Waveform from './charts/Waveform'
import { IconPlay } from './Icons'

interface Props {
  limit?: number
  showWaveform?: boolean
}

export default function RecordingsList({ limit, showWaveform = false }: Props) {
  const rows = limit ? recordings.slice(0, limit) : recordings
  return (
    <div className="rec-list">
      {rows.map((r) => (
        <div className="rec" key={r.id}>
          <button className="play-btn" aria-label={`Play recording from ${r.site}`}>
            <IconPlay size={16} />
          </button>
          <div className="rec-body">
            <div className="rec-title">
              <span className="site">{r.site}</span>
              <span className="chip">{r.period}</span>
              <span className="time">{r.time} · {r.durationMin} min</span>
            </div>
            {showWaveform ? (
              <div style={{ margin: '8px 0 4px' }}>
                <Waveform data={r.waveform} />
              </div>
            ) : null}
            <div className="rec-sub">
              Dominant <b>{r.dominant}</b> · {r.species} species identified
            </div>
          </div>
          <div className="rec-meta">
            <div className="idx">{r.index}</div>
            <div>index</div>
          </div>
        </div>
      ))}
    </div>
  )
}
