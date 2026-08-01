import { sites, statusLabels } from '../data/naturumData'
import Sparkline from './charts/Sparkline'

interface LiveSite {
  index: number
  trend: number[]
}

interface Props {
  limit?: number
  // Live per-site overrides keyed by site id; falls back to static data.
  live?: Record<string, LiveSite>
}

export default function SitesTable({ limit, live }: Props) {
  const rows = limit ? sites.slice(0, limit) : sites
  return (
    <div className="table-scroll">
      <table className="table">
        <thead>
          <tr>
            <th>Site</th>
            <th>Habitat</th>
            <th>Status</th>
            <th>Index</th>
            <th className="num">Species</th>
            <th>12-month trend</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => {
            const index = live?.[s.id]?.index ?? s.index
            const trend = live?.[s.id]?.trend ?? s.trend
            return (
              <tr key={s.id}>
                <td>
                  <div className="site-name">{s.name}</div>
                  <div className="site-meta">{s.region} · {s.areaHa} ha</div>
                </td>
                <td>{s.habitat}</td>
                <td>
                  <span className={`badge ${s.status}`}>
                    <span className="dot" />
                    {statusLabels[s.status]}
                  </span>
                </td>
                <td style={{ minWidth: 130 }}>
                  <div className="idx-cell">
                    <span className="idx-val">{index}</span>
                    <span className="idx-bar"><span style={{ width: `${index}%` }} /></span>
                  </div>
                </td>
                <td className="num">{s.speciesRichness}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Sparkline data={trend} />
                    <span className="delta up" style={{ fontSize: '0.78rem' }}>+{s.indexChange}</span>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
