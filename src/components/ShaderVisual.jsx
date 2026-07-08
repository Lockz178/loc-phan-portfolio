import { ShaderAnimation } from './ui/shader-animation'

export default function ShaderVisual() {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <ShaderAnimation />

      {/* Soft dark scrim so the headline stays legible over the bright shader */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 46% 34% at 50% 46%, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 45%, transparent 72%)',
        }}
      />

      {/* Centered text overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: '16px',
          }}
        >
          Approach
        </p>
        <h2
          style={{
            fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(38px, 6.5vw, 84px)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.04em',
            lineHeight: 1.02,
            textAlign: 'center',
            maxWidth: '760px',
            padding: '0 24px',
          }}
        >
          Always learning.<br />Always building.
        </h2>
        <p
          style={{
            marginTop: '22px',
            fontSize: '17px',
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 400,
            letterSpacing: '0.01em',
            maxWidth: '520px',
            textAlign: 'center',
            padding: '0 24px',
          }}
        >
          Currently going deep on distributed systems, consensus algorithms, and AI infrastructure.
        </p>
      </div>

      {/* Bottom fade to next section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, #000)',
          pointerEvents: 'none',
          zIndex: 11,
        }}
      />
    </div>
  )
}
