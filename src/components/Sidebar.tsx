import { IconGrid, IconPin, IconWave, IconSpecies, IconReport, IconLeaf, IconBluetooth, IconCompass } from './Icons'

export type ViewKey = 'overview' | 'sites' | 'soundscapes' | 'species' | 'field'

const items: { key: ViewKey; label: string; icon: typeof IconGrid }[] = [
  { key: 'overview', label: 'Overview', icon: IconGrid },
  { key: 'sites', label: 'Habitat Sites', icon: IconPin },
  { key: 'soundscapes', label: 'Soundscapes', icon: IconWave },
  { key: 'species', label: 'Species', icon: IconSpecies },
  { key: 'field', label: 'Field Network', icon: IconBluetooth },
]

interface Props {
  view: ViewKey
  setView: (v: ViewKey) => void
  onOpenExplore: () => void
}

export default function Sidebar({ view, setView, onOpenExplore }: Props) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <IconLeaf size={22} style={{ color: '#fff' }} />
        </div>
        <div>
          <div className="brand-name">Naturum <span>Echo</span></div>
          <div className="brand-tag">Acoustic monitoring</div>
        </div>
      </div>

      <nav className="nav">
        <div className="nav-label">Platform</div>
        {items.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`nav-item${view === key ? ' active' : ''}`}
            onClick={() => setView(key)}
            aria-current={view === key ? 'page' : undefined}
          >
            <Icon size={19} />
            {label}
          </button>
        ))}
        <div className="nav-label" style={{ marginTop: 14 }}>Insights</div>
        <button className="nav-item">
          <IconReport size={19} />
          Reports
        </button>
        <button className="nav-item" onClick={onOpenExplore}>
          <IconCompass size={19} />
          Open Explore
        </button>
      </nav>

      <div className="sidebar-foot">
        <div className="pulse-row">
          <span className="pulse" />
          <strong style={{ fontSize: '0.8rem' }}>Live</strong>
        </div>
        <p><strong>41 recorders</strong> streaming across 6 sites right now.</p>
      </div>
    </aside>
  )
}
