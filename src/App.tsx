import { useEffect, useState } from 'react'
import Sidebar, { type ViewKey } from './components/Sidebar'
import Topbar from './components/Topbar'
import Overview from './views/Overview'
import Sites from './views/Sites'
import Soundscapes from './views/Soundscapes'
import Species from './views/Species'
import FieldNetwork from './views/FieldNetwork'
import DeliveryPlan from './views/DeliveryPlan'
import ExploreApp from './explore/ExploreApp'

const views: Record<ViewKey, () => JSX.Element | null> = {
  overview: Overview,
  sites: Sites,
  soundscapes: Soundscapes,
  species: Species,
  field: FieldNetwork,
  plan: DeliveryPlan,
}

type Mode = 'platform' | 'explore'

function App() {
  const [mode, setMode] = useState<Mode>('platform')
  const [view, setView] = useState<ViewKey>('overview')
  const [dark, setDark] = useState(() =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false,
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  if (mode === 'explore') {
    return <ExploreApp onExit={() => setMode('platform')} />
  }

  const View = views[view]

  return (
    <div className="app">
      <Sidebar view={view} setView={setView} onOpenExplore={() => setMode('explore')} />
      <div className="main">
        <Topbar view={view} dark={dark} toggleDark={() => setDark((d) => !d)} />
        <div className="content">
          <View />
        </div>
      </div>
    </div>
  )
}

export default App
