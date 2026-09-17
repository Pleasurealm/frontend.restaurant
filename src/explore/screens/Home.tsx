import Mascot from '../Mascot'
import ProgressRing from '../components/ProgressRing'
import { IconWave, IconCamera, IconSpecies, IconCompass, IconArrowUp } from '../../components/Icons'
import { echoes, collectedCount, streak } from '../exploreData'
import type { ExploreTab } from '../ExploreApp'

const tiles: { tab: ExploreTab; title: string; sub: string; color: string; icon: JSX.Element }[] = [
  { tab: 'listen', title: 'Listen & ID', sub: 'Guess the sound', color: 'var(--sky)', icon: <IconWave size={22} /> },
  { tab: 'capture', title: 'Capture', sub: 'Snap + record', color: 'var(--coral)', icon: <IconCamera size={22} /> },
  { tab: 'collection', title: 'My Echoes', sub: `${collectedCount} collected`, color: 'var(--grape)', icon: <IconSpecies size={22} /> },
  { tab: 'map', title: 'Nearby', sub: 'Explore the map', color: 'var(--leaf)', icon: <IconCompass size={22} /> },
]

export default function Home({ go }: { go: (t: ExploreTab) => void }) {
  const pct = Math.round((collectedCount / echoes.length) * 100)
  return (
    <>
      <div className="ex-hero">
        <div className="ex-hero-row">
          <div className="ex-hero-body">
            <h1>Hear nature coming back to life</h1>
            <p>Listen to real habitats, collect the species you hear, and add your own captures.</p>
            <button className="ex-cta" onClick={() => go('listen')}>
              <IconWave size={18} /> Start listening
            </button>
          </div>
          <Mascot size={104} />
        </div>
      </div>

      <div className="ex-section-label">Play & explore</div>
      <div className="ex-tiles">
        {tiles.map((t) => (
          <button key={t.tab} className="ex-tile" onClick={() => go(t.tab)}>
            <span className="ex-tile-ic" style={{ background: t.color }}>{t.icon}</span>
            <span>
              <span className="tt">{t.title}</span>
              <br />
              <span className="ts">{t.sub}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="ex-section-label">Your progress</div>
      <div className="ex-row">
        <div className="ex-card ex-ring-card">
          <ProgressRing pct={pct} size={92} label="echoes" value={`${collectedCount}/${echoes.length}`} color="var(--grape)" />
          <div>
            <div className="ex-h" style={{ fontSize: '1.1rem' }}>Echo collection</div>
            <div className="ex-sub">You’ve heard {collectedCount} of {echoes.length} species. {echoes.length - collectedCount} still out there!</div>
          </div>
        </div>

        <div className="ex-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="ex-h" style={{ fontSize: '1.1rem' }}>🔥 {streak.current}-day streak</div>
            <span className="ex-mesh-chip" style={{ marginTop: 0, background: 'rgba(244,181,42,0.16)', color: '#c68806' }}>
              <IconArrowUp size={13} /> best {streak.best}
            </span>
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
      </div>

      <div className="ex-section-label">Today at Wyckham Fen</div>
      <div className="ex-card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ fontSize: '2.4rem' }}>🌅</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700 }}>Dawn chorus is peaking</div>
          <div className="ex-sub">27 species singing right now — the loudest morning this week.</div>
        </div>
        <button className="ex-cta" style={{ marginTop: 0, padding: '11px 20px', fontSize: '0.88rem', background: 'var(--leaf)', color: '#fff' }} onClick={() => go('listen')}>
          Play
        </button>
      </div>
    </>
  )
}
