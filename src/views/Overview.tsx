import StatCard from '../components/StatCard'
import TrendChart from '../components/charts/TrendChart'
import Donut from '../components/charts/Donut'
import HourBars from '../components/charts/HourBars'
import SitesTable from '../components/SitesTable'
import RecordingsList from '../components/RecordingsList'
import { IconPin, IconMic, IconSpecies, IconLeaf } from '../components/Icons'
import { kpis, networkTrend, speciesGroups, dailyActivity } from '../data/naturumData'
import { useLivePulse } from '../hooks/useLivePulse'

export default function Overview() {
  const pulse = useLivePulse()

  const meanIndex = pulse?.meanIndex ?? kpis.meanIndex
  const speciesDetected = pulse?.speciesDetected ?? kpis.speciesDetected
  const recordersActive = pulse?.recordersActive ?? kpis.recordersActive
  const recordings = pulse?.recordings ?? undefined
  // Recordings that arrived in the last few seconds get the "New" flash.
  const newIds = new Set(
    (pulse?.recordings ?? []).filter((r) => (pulse ? pulse.now - r.receivedAt < 6000 : false)).map((r) => r.id),
  )

  return (
    <>
      <div className="insight">
        <div className="insight-icon"><IconLeaf size={24} style={{ color: '#fff' }} /></div>
        <div>
          <h3>Nature is measurably returning</h3>
          <p>The network-wide acoustic index has climbed 41% since monitoring began — every restored habitat is getting louder, richer and more alive.</p>
        </div>
      </div>

      <div className="grid grid-kpi">
        <StatCard icon={<IconPin size={19} />} label="Habitat sites" value={String(kpis.sites)} note="6 regions" />
        <StatCard icon={<IconMic size={19} />} label="Active recorders" value={`${recordersActive}`} unit={`/ ${kpis.recordersTotal}`} note="online now" />
        <StatCard icon={<IconLeaf size={19} />} label="Acoustic index" value={String(meanIndex)} delta={kpis.meanIndexChange} deltaSuffix=" pts" note="network mean" />
        <StatCard icon={<IconSpecies size={19} />} label="Species detected" value={String(speciesDetected)} delta={kpis.speciesChange} deltaSuffix=" yr" note="this year" />
      </div>

      <div className="grid grid-2">
        <div className="card card-pad chart-card">
          <div className="card-head">
            <div>
              <h3>Acoustic Complexity Index</h3>
              <p>Network-wide monthly mean — the sound of habitats recovering</p>
            </div>
            <span className="live-pill"><span className="live-dot" />Live</span>
          </div>
          <TrendChart data={networkTrend} live />
        </div>

        <div className="card card-pad">
          <div className="card-head">
            <div>
              <h3>Detections by group</h3>
              <p>85,840 identified calls</p>
            </div>
          </div>
          <Donut data={speciesGroups} />
        </div>
      </div>

      <div className="card card-pad">
        <div className="card-head">
          <div>
            <h3>Habitat sites</h3>
            <p>Live acoustic index and species richness across the estate</p>
          </div>
        </div>
        <SitesTable />
      </div>

      <div className="grid grid-2e">
        <div className="card card-pad">
          <div className="card-head">
            <div>
              <h3>A day of sound</h3>
              <p>Mean activity across 24 hours</p>
            </div>
          </div>
          <HourBars data={dailyActivity} />
          <div className="legend" style={{ marginTop: 18 }}>
            <span className="legend-item"><span className="swatch" style={{ background: 'var(--brand-forest)' }} />Chorus peak</span>
            <span className="legend-item"><span className="swatch" style={{ background: 'var(--brand-fern)' }} />Baseline activity</span>
          </div>
        </div>

        <div className="card card-pad">
          <div className="card-head">
            <div>
              <h3>Latest soundscapes</h3>
              <p>Fresh recordings from across the estate</p>
            </div>
            <span className="live-pill"><span className="live-dot" />Live</span>
          </div>
          <RecordingsList items={recordings} limit={3} newIds={newIds} />
        </div>
      </div>
    </>
  )
}
