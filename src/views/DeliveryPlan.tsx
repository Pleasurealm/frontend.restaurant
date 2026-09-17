import StatCard from '../components/StatCard'
import { IconReport, IconLeaf, IconClock, IconCompass } from '../components/Icons'
import {
  workstreams,
  planStats,
  planStatusLabel,
  wsStatus,
  wsDone,
  type PlanStatus,
} from '../data/planData'

const StatusPill = ({ s }: { s: PlanStatus }) => (
  <span className={`pstatus ${s}`}>
    <span className="pd" />
    {planStatusLabel[s]}
  </span>
)

export default function DeliveryPlan() {
  return (
    <>
      <div className="insight">
        <div className="insight-icon"><IconReport size={24} style={{ color: '#fff' }} /></div>
        <div>
          <h3>Phase 1 delivery plan</h3>
          <p>The web-first pilot at the named habitat bank — ten workstreams from mobilisation to the rollout decision. {planStats.done} of {planStats.totalTasks} deliverables complete.</p>
        </div>
      </div>

      <div className="grid grid-kpi">
        <StatCard icon={<IconLeaf size={19} />} label="Overall progress" value={`${planStats.progress}%`} note="Phase 1" />
        <StatCard icon={<IconReport size={19} />} label="Deliverables complete" value={String(planStats.done)} unit={`/ ${planStats.totalTasks}`} note={`${planStats.planned} upcoming`} />
        <StatCard icon={<IconClock size={19} />} label="Workstreams active" value={String(planStats.activeWorkstreams)} note="in progress now" />
        <StatCard icon={<IconCompass size={19} />} label="Workstreams to come" value={String(planStats.upcomingWorkstreams)} note="not yet started" />
      </div>

      <div className="card card-pad">
        <div className="card-head">
          <div>
            <h3>Phase timeline</h3>
            <p>Ten workstreams, mobilisation through rollout decision</p>
          </div>
          <div className="legend">
            <span className="legend-item"><span className="swatch" style={{ background: 'var(--brand-forest)' }} />Complete</span>
            <span className="legend-item"><span className="swatch" style={{ background: 'var(--warn)' }} />In progress</span>
            <span className="legend-item"><span className="swatch" style={{ background: 'var(--ink-3)' }} />Upcoming</span>
          </div>
        </div>
        <div className="phase-strip">
          {workstreams.map((w) => {
            const s = wsStatus(w)
            return (
              <div key={w.n} className={`phase-step s-${s}`}>
                <div className="phase-dot">{s === 'done' ? '✓' : w.n}</div>
                <div className="phase-name">{w.name}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="ws-list">
        {workstreams.map((w) => {
          const done = wsDone(w)
          const pct = Math.round((done / w.tasks.length) * 100)
          return (
            <div className="card ws-card" key={w.n}>
              <div className="ws-head">
                <span className="ws-num">{w.n}</span>
                <span className="ws-title">{w.name}</span>
                <StatusPill s={wsStatus(w)} />
                <div className="ws-progress">
                  <span className="ws-bar"><span style={{ width: `${pct}%` }} /></span>
                  <span className="frac">{done}/{w.tasks.length}</span>
                </div>
              </div>
              <div className="table-scroll">
                <table className="table plan-table">
                  <thead>
                    <tr>
                      <th style={{ width: 44 }}>#</th>
                      <th>Task</th>
                      <th>Deliverable</th>
                      <th style={{ width: 130 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {w.tasks.map((t) => (
                      <tr key={t.id} className={t.status === 'done' ? 'plan-task-done' : undefined}>
                        <td><span className="tid">{t.id}</span></td>
                        <td><span className="tdesc">{t.task}</span></td>
                        <td><span className="tdel">{t.deliverable}</span></td>
                        <td><StatusPill s={t.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
