import { ShaderAnimation } from './ui/shader-animation'

export default function ShaderVisual() {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <ShaderAnimation />

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
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '16px',
          }}
        >
          Under Construction
        </p>
        <h2
          style={{
            fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(36px, 6vw, 80px)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-2px',
            lineHeight: 1.05,
            textAlign: 'center',
            maxWidth: '700px',
            padding: '0 24px',
          }}
        >
          Always Learning,<br />Always Building.
        </h2>
        <p
          style={{
            marginTop: '20px',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.4)',
            fontWeight: 300,
            letterSpacing: '0.02em',
          }}
        >
          More projects coming soon.
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
