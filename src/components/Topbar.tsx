import { IconBell, IconChevron, IconSun, IconMoon } from './Icons'
import type { ViewKey } from './Sidebar'

const titles: Record<ViewKey, { title: string; sub: string }> = {
  overview: { title: 'Overview', sub: 'The sound of nature returning, across every habitat' },
  sites: { title: 'Habitat Sites', sub: 'Acoustic signatures across the Naturum estate' },
  soundscapes: { title: 'Soundscapes', sub: 'Recent recordings and daily acoustic rhythms' },
  species: { title: 'Species', sub: 'What the landscape is telling us, by group' },
  field: { title: 'Field Network', sub: 'Bluetooth mesh capture across off-grid habitats' },
}

interface Props {
  view: ViewKey
  dark: boolean
  toggleDark: () => void
}

export default function Topbar({ view, dark, toggleDark }: Props) {
  const { title, sub } = titles[view]
  return (
    <header className="topbar">
      <div className="topbar-titles">
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
      <div className="topbar-actions">
        <div className="pill-select">
          All regions <strong>·</strong> <strong>Last 18 months</strong>
          <IconChevron size={15} />
        </div>
        <button className="icon-btn" onClick={toggleDark} aria-label="Toggle colour theme" title="Toggle theme">
          {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
        </button>
        <button className="icon-btn" aria-label="Notifications">
          <IconBell size={18} />
        </button>
        <div className="avatar" title="Naturum team">NE</div>
      </div>
    </header>
  )
}
