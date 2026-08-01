import { useEffect, useState } from 'react'
import Sidebar, { type ViewKey } from './components/Sidebar'
import Topbar from './components/Topbar'
import Overview from './views/Overview'
import Sites from './views/Sites'
import Soundscapes from './views/Soundscapes'
import Species from './views/Species'

const views: Record<ViewKey, () => JSX.Element> = {
  overview: Overview,
  sites: Sites,
  soundscapes: Soundscapes,
  species: Species,
}

function App() {
  const [view, setView] = useState<ViewKey>('overview')
  const [dark, setDark] = useState(() =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false,
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  const View = views[view]

  return (
    <div className="app">
      <Sidebar view={view} setView={setView} />
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
