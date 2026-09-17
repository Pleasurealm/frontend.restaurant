import HourBars from '../components/charts/HourBars'
import RecordingsList from '../components/RecordingsList'
import { dailyActivity } from '../data/naturumData'
import { IconClock } from '../components/Icons'

export default function Soundscapes() {
  return (
    <>
      <div className="grid grid-2">
        <div className="card card-pad">
          <div className="card-head">
            <div>
              <h3>Daily acoustic rhythm</h3>
              <p>Mean activity across a 24-hour cycle — the dawn and dusk choruses stand out</p>
            </div>
            <IconClock size={20} style={{ color: 'var(--ink-3)' }} />
          </div>
          <HourBars data={dailyActivity} />
          <div className="legend" style={{ marginTop: 18 }}>
            <span className="legend-item"><span className="swatch" style={{ background: 'var(--brand-forest)' }} />Chorus peak</span>
            <span className="legend-item"><span className="swatch" style={{ background: 'var(--brand-fern)' }} />Baseline activity</span>
          </div>
        </div>

        <div className="card card-pad" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
          <div>
            <div className="section-title" style={{ marginBottom: 12 }}>Why it matters</div>
            <h3 style={{ fontSize: '1.3rem', lineHeight: 1.3 }}>
              Every habitat has a unique acoustic signature.
            </h3>
            <p className="muted" style={{ marginTop: 12, fontSize: '0.92rem' }}>
              By recording soundscapes over time, Naturum Echo turns ecological progress
              into something people can hear — connecting scientific monitoring with the
              communities, schools and investors behind habitat restoration.
            </p>
          </div>
        </div>
      </div>

      <div className="card card-pad">
        <div className="card-head">
          <div>
            <h3>Recent recordings</h3>
            <p>Listen to the landscape — dawn chorus to nightjar</p>
          </div>
          <span className="chip">{5} clips</span>
        </div>
        <RecordingsList showWaveform />
      </div>
    </>
  )
}
