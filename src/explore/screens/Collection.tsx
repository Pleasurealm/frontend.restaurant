import ProgressRing from '../components/ProgressRing'
import { echoes, badges, rarityLabel, collectedCount } from '../exploreData'

export default function Collection() {
  const pct = Math.round((collectedCount / echoes.length) * 100)
  const earned = badges.filter((b) => b.earned).length

  return (
    <>
      <div className="ex-card ex-ring-card" style={{ marginTop: 8 }}>
        <ProgressRing pct={pct} size={92} label="echoes" value={`${collectedCount}/${echoes.length}`} color="var(--grape)" />
        <div>
          <div className="ex-h" style={{ fontSize: '1.15rem' }}>My Echoes</div>
          <div className="ex-sub">Every species you’ve heard becomes a collectible card. {earned} of {badges.length} badges earned.</div>
        </div>
      </div>

      <div className="ex-section-label">Species cards</div>
      <div className="ex-grid">
        {echoes.map((e) => (
          <div key={e.id} className={`ex-echo${e.collected ? '' : ' locked'}`}>
            {!e.collected && <span className="lock">🔒</span>}
            <div className="em" style={{ background: e.collected ? `${e.color}22` : undefined }}>
              {e.collected ? e.emoji : '❔'}
            </div>
            <div className="en">{e.collected ? e.name : '???'}</div>
            <div className="eg">{e.collected ? e.habitat : 'Not heard yet'}</div>
            <span className={`rar ${e.rarity}`}>{rarityLabel[e.rarity]}</span>
          </div>
        ))}
      </div>

      <div className="ex-section-label">Badges</div>
      <div className="ex-badges">
        {badges.map((b) => (
          <div key={b.id} className={`ex-badge${b.earned ? ' earned' : ' locked'}`}>
            <span className="be">{b.earned ? b.emoji : '🔒'}</span>
            <div>
              <div className="bn">{b.name}</div>
              <div className="bd">{b.earned ? b.desc : `${b.desc}${b.progress ? ` · ${b.progress}` : ''}`}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
