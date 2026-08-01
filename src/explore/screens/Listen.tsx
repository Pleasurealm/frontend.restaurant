import { useState } from 'react'
import Waveform from '../../components/charts/Waveform'
import { IconPlay, IconWave, IconSparkle } from '../../components/Icons'
import { questions } from '../exploreData'

export default function Listen() {
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [done, setDone] = useState(false)

  const q = questions[idx]
  const correct = picked === q.answer

  const pick = (opt: string) => {
    if (picked) return
    setPicked(opt)
    if (opt === q.answer) {
      setScore((s) => s + 10 + streak * 2)
      setStreak((s) => s + 1)
    } else {
      setStreak(0)
    }
  }

  const next = () => {
    if (idx + 1 >= questions.length) {
      setDone(true)
      return
    }
    setIdx((i) => i + 1)
    setPicked(null)
    setPlaying(false)
  }

  const restart = () => {
    setIdx(0)
    setPicked(null)
    setScore(0)
    setStreak(0)
    setDone(false)
    setPlaying(false)
  }

  if (done) {
    return (
      <div className="ex-card ex-listen-card" style={{ marginTop: 8 }}>
        <div style={{ fontSize: '3.4rem' }}>🎉</div>
        <div className="ex-h">Nice ears!</div>
        <div className="ex-sub">You scored</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: 'var(--leaf)' }}>{score}</div>
        <div className="ex-sub" style={{ marginBottom: 16 }}>+1 species added to your collection</div>
        <button className="ex-cta" style={{ background: 'var(--leaf)', color: '#fff' }} onClick={restart}>
          <IconSparkle size={18} /> Play again
        </button>
      </div>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '4px 4px 14px' }}>
        <div className="ex-h" style={{ fontSize: '1.15rem' }}>Listen &amp; Identify</div>
        <span className="ex-coins">⭐ {score}</span>
      </div>

      <div className="ex-card ex-listen-card">
        <div className="ex-sub" style={{ marginBottom: 4 }}>What can you hear?</div>
        <button className={`ex-playbig${playing ? ' playing' : ''}`} onClick={() => setPlaying((p) => !p)} aria-label="Play the sound">
          {playing ? <IconWave size={30} /> : <IconPlay size={28} />}
        </button>
        <div className="ex-wave-box">
          <Waveform data={q.waveform} height={52} color={playing ? 'var(--leaf)' : 'var(--e-line)'} />
        </div>
        {picked && <div className="ex-sub" style={{ marginBottom: 10 }}>💡 {q.hint}</div>}

        <div className="ex-options">
          {q.options.map((opt) => {
            let cls = 'ex-opt'
            if (picked) {
              if (opt === q.answer) cls += ' correct'
              else if (opt === picked) cls += ' wrong'
              else cls += ' dim'
            }
            return (
              <button key={opt} className={cls} onClick={() => pick(opt)}>
                {opt}
              </button>
            )
          })}
        </div>

        {picked && (
          <>
            <div className={`ex-feedback${correct ? ' good' : ''}`}>
              {correct ? (
                <>🎯 Yes! {q.emoji} That’s a <b>{q.answer}</b>.{streak > 1 ? ` ${streak} in a row!` : ''}</>
              ) : (
                <>Not quite — that was a <b>{q.answer}</b> {q.emoji}. Listen again next time!</>
              )}
            </div>
            <button className="ex-cta" style={{ background: 'var(--leaf)', color: '#fff' }} onClick={next}>
              {idx + 1 >= questions.length ? 'See results' : 'Next sound'} →
            </button>
          </>
        )}

        <div className="ex-progress-dots">
          {questions.map((_, i) => (
            <i key={i} className={i < idx ? 'on' : i === idx ? 'now' : ''} />
          ))}
        </div>
      </div>
    </>
  )
}
