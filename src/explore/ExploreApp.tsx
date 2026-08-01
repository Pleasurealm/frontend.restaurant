import { useState } from 'react'
import './explore.css'
import Home from './screens/Home'
import Listen from './screens/Listen'
import Capture from './screens/Capture'
import Collection from './screens/Collection'
import MapScreen from './screens/MapScreen'
import { IconGrid, IconWave, IconCamera, IconSpecies, IconCompass, IconLeaf, IconChevron } from '../components/Icons'
import { collectedCount } from './exploreData'

export type ExploreTab = 'home' | 'listen' | 'capture' | 'collection' | 'map'

const nav: { tab: ExploreTab; label: string; icon: typeof IconGrid }[] = [
  { tab: 'home', label: 'Home', icon: IconGrid },
  { tab: 'listen', label: 'Listen', icon: IconWave },
  { tab: 'capture', label: 'Capture', icon: IconCamera },
  { tab: 'collection', label: 'Echoes', icon: IconSpecies },
  { tab: 'map', label: 'Nearby', icon: IconCompass },
]

export default function ExploreApp({ onExit }: { onExit: () => void }) {
  const [tab, setTab] = useState<ExploreTab>('home')

  return (
    <div className="explore">
      <div className="ex-shell">
        <div className="ex-top">
          <div className="ex-brand">
            <span className="ex-tile-ic" style={{ width: 40, height: 40, borderRadius: 13, background: 'linear-gradient(150deg, var(--leaf), #1f8a44)' }}>
              <IconLeaf size={20} />
            </span>
            <div>
              <div className="ex-brand-name">Naturum <span>Echo</span></div>
              <div className="ex-brand-sub">Explore</div>
            </div>
          </div>
          <div className="ex-top-right">
            <span className="ex-coins">🍃 {collectedCount}</span>
            <button className="ex-back" onClick={onExit}>
              <IconChevron size={15} style={{ transform: 'rotate(90deg)' }} /> Platform
            </button>
          </div>
        </div>

        {tab === 'home' && <Home go={setTab} />}
        {tab === 'listen' && <Listen />}
        {tab === 'capture' && <Capture />}
        {tab === 'collection' && <Collection />}
        {tab === 'map' && <MapScreen />}
      </div>

      <nav className="ex-nav">
        {nav.map(({ tab: t, label, icon: Icon }) => (
          <button key={t} className={`ex-nav-item${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            <Icon size={20} />
            {label}
          </button>
        ))}
      </nav>
    </div>
  )
}
