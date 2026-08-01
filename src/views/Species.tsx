import Donut from '../components/charts/Donut'
import { speciesGroups, sites } from '../data/naturumData'
import { IconBird } from '../components/Icons'

// Illustrative "recently added" species per group.
const notable: Record<string, string[]> = {
  birds: ['Nightingale', 'Bittern', 'Turtle dove', 'Woodlark'],
  insects: ['Marsh fritillary', 'Field cricket', 'Emperor moth'],
  amphibians: ['Natterjack toad', 'Great crested newt'],
  mammals: ['Barbastelle bat', 'Harvest mouse', 'Otter'],
}

export default function Species() {
  const total = speciesGroups.reduce((n, g) => n + g.detections, 0)
  const maxRichness = Math.max(...sites.map((s) => s.speciesRichness))

  return (
    <>
      <div className="grid grid-2">
        <div className="card card-pad">
          <div className="card-head">
            <div>
              <h3>Detections by group</h3>
              <p>{total.toLocaleString()} identified calls across the network</p>
            </div>
            <IconBird size={20} style={{ color: 'var(--ink-3)' }} />
          </div>
          <Donut data={speciesGroups} />
        </div>

        <div className="card card-pad">
          <div className="card-head">
            <div>
              <h3>Share of soundscape</h3>
              <p>Proportion of all detections, by group</p>
            </div>
          </div>
          <div className="sp-rows">
            {speciesGroups.map((g) => {
              const pct = Math.round((g.detections / total) * 100)
              return (
                <div key={g.key}>
                  <div className="sp-row-head">
                    <span className="swatch" style={{ background: g.color, width: 12, height: 12, borderRadius: 4 }} />
                    <span className="name">{g.label}</span>
                    <span className="count">{g.detections.toLocaleString()} · {pct}%</span>
                  </div>
                  <div className="sp-track"><span style={{ width: `${pct}%`, background: g.color }} /></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-2e">
        <div className="card card-pad">
          <div className="card-head">
            <div>
              <h3>Notable returns</h3>
              <p>Species newly detected as habitats recover</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {speciesGroups.map((g) => (
              <div key={g.key}>
                <div className="sp-row-head" style={{ marginBottom: 8 }}>
                  <span className="swatch" style={{ background: g.color, width: 12, height: 12, borderRadius: 4 }} />
                  <span className="name">{g.label}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {notable[g.key].map((n) => (
                    <span className="chip" key={n}>{n}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-pad">
          <div className="card-head">
            <div>
              <h3>Species richness by site</h3>
              <p>Distinct species identified acoustically</p>
            </div>
          </div>
          <div className="sp-rows">
            {[...sites].sort((a, b) => b.speciesRichness - a.speciesRichness).map((s) => (
              <div key={s.id}>
                <div className="sp-row-head">
                  <span className="name" style={{ fontSize: '0.9rem' }}>{s.name}</span>
                  <span className="count">{s.speciesRichness}</span>
                </div>
                <div className="sp-track">
                  <span style={{ width: `${(s.speciesRichness / maxRichness) * 100}%`, background: 'linear-gradient(90deg, var(--brand-moss), var(--brand-forest))' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
