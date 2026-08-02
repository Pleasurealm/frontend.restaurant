import { recordings as defaultRecordings, type Recording } from '../data/naturumData'
import Waveform from './charts/Waveform'
import { IconPlay, IconStop } from './Icons'
import { usePlayer } from '../hooks/usePlayer'

interface Props {
  items?: Recording[]
  limit?: number
  showWaveform?: boolean
  newIds?: Set<string>
}

export default function RecordingsList({ items, limit, showWaveform = false, newIds }: Props) {
  const source = items ?? defaultRecordings
  const rows = limit ? source.slice(0, limit) : source
  const { playingId, toggle } = usePlayer()
  return (
    <div className="rec-list">
      {rows.map((r) => {
        const fresh = newIds?.has(r.id)
        const playing = playingId === r.id
        return (
          <div className={`rec${fresh ? ' fresh' : ''}`} key={r.id}>
            <button
              className={`play-btn${playing ? ' playing' : ''}`}
              aria-label={playing ? `Stop ${r.site} recording` : `Play recording from ${r.site}`}
              aria-pressed={playing}
              onClick={() => toggle(r.id, r.waveform)}
            >
              {playing ? <IconStop size={15} /> : <IconPlay size={16} />}
            </button>
            <div className="rec-body">
              <div className="rec-title">
                <span className="site">{r.site}</span>
                <span className="chip">{r.period}</span>
                <span className="time">{r.time} · {r.durationMin} min</span>
                {fresh && <span className="rec-new">New</span>}
              </div>
              {showWaveform ? (
                <div style={{ margin: '8px 0 4px' }}>
                  <Waveform data={r.waveform} color={playing ? 'var(--brand-forest)' : 'var(--brand-moss)'} />
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
        )
      })}
    </div>
  )
}
