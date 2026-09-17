import { useState } from 'react'
import { IconCamera, IconMic, IconBluetooth, IconSparkle } from '../../components/Icons'

type Stage = 'ready' | 'photo' | 'sound' | 'sent'

export default function Capture() {
  const [stage, setStage] = useState<Stage>('ready')

  const steps = [
    { key: 'photo', t: 'Snap a photo', s: 'Frame the plant, bird or bug' },
    { key: 'sound', t: 'Record 20 seconds', s: 'Hold still and stay quiet' },
    { key: 'sent', t: 'Relay over the mesh', s: 'Sent even with no signal' },
  ]
  const stageIndex = stage === 'ready' ? -1 : stage === 'photo' ? 0 : stage === 'sound' ? 1 : 2

  if (stage === 'sent') {
    return (
      <div className="ex-card ex-listen-card" style={{ marginTop: 8 }}>
        <div style={{ fontSize: '3.2rem' }}>📡</div>
        <div className="ex-h">Capture sent!</div>
        <div className="ex-sub" style={{ maxWidth: 320, margin: '6px auto 0' }}>
          No signal out here — so your photo and sound are hopping across nearby phones and recorders to reach the gateway.
        </div>
        <span className="ex-mesh-chip"><IconBluetooth size={15} /> Relaying · 2 hops to gateway</span>
        <div style={{ marginTop: 16 }}>
          <button className="ex-cta" style={{ background: 'var(--leaf)', color: '#fff' }} onClick={() => setStage('ready')}>
            <IconSparkle size={18} /> Capture another
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="ex-h" style={{ fontSize: '1.15rem', margin: '4px 4px 14px' }}>Capture nature</div>

      <div className="ex-card">
        <div className="ex-capture-stage">
          <div className="frame" />
          <div className="big">{stage === 'ready' ? '🌿' : stage === 'photo' ? '📷' : '🎙️'}</div>
        </div>

        <div className="ex-shutter">
          {stage === 'ready' && (
            <button className="primary" onClick={() => setStage('photo')}>
              <IconCamera size={18} /> Take photo
            </button>
          )}
          {stage === 'photo' && (
            <button className="primary" onClick={() => setStage('sound')}>
              <IconMic size={18} /> Record sound
            </button>
          )}
          {stage === 'sound' && (
            <button className="primary" onClick={() => setStage('sent')}>
              <IconBluetooth size={18} /> Send over mesh
            </button>
          )}
        </div>
      </div>

      <div className="ex-section-label">How it works</div>
      <div className="ex-card">
        <div className="ex-steps">
          {steps.map((s, i) => (
            <div key={s.key} className={`ex-step${i <= stageIndex ? ' on' : ''}`}>
              <span className="sn">{i <= stageIndex ? '✓' : i + 1}</span>
              <div>
                <div className="st">{s.t}</div>
                <div className="ss">{s.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
