import ScrollExpandMedia from './ui/scroll-expansion-hero'
import { SpecialText } from './ui/special-text'
import { GeometricBackground } from './ui/shape-landing-hero'

function HeroContent() {
  return (
    <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      {/* Availability badge */}
      <div
        className="hero-badge"
        style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '32px' }}
      >
        <span className="hero-badge-dot" />
        Available for internships &amp; junior roles
      </div>

      {/* Name */}
      <h2
        style={{
          fontFamily: '"SF Pro Display", system-ui, -apple-system, sans-serif',
          fontSize: 'clamp(34px, 5vw, 58px)',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-1.5px',
          lineHeight: 1.05,
          marginBottom: '14px',
        }}
      >
        Phan Ngoc Phuoc Loc
      </h2>

      {/* Role — scramble-reveals itself after the video expansion fades in */}
      <p style={{ marginBottom: '22px' }}>
        <SpecialText
          delay={0.9}
          speed={18}
          className="text-xs tracking-widest uppercase"
        >
          Software Engineering Student · TAMK, Finland
        </SpecialText>
      </p>

      {/* Tagline */}
      <p
        style={{
          fontSize: '17px',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.52)',
          marginBottom: '40px',
          maxWidth: '460px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        From Vietnam, building full-stack software across mobile, web, and
        server infrastructure. Seeking internships and junior roles.
      </p>

      {/* CTAs */}
      <div className="hero-cta" style={{ justifyContent: 'center' }}>
        <a href="#projects" className="btn-primary">View Projects</a>
        <a href="#about"    className="btn-secondary-pill">About Me</a>
        <a href="#contact"  className="btn-secondary-pill">Contact</a>
      </div>

      {/* Origin meta */}
      <div className="hero-meta" style={{ marginTop: '36px' }}>
        <span>🇻🇳 Vietnam</span>
        <span className="hero-meta-divider" />
        <span>🇫🇮 Tampere, Finland</span>
        <span className="hero-meta-divider" />
        <span>Expected 2028</span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <ScrollExpandMedia
      id="home"
      mediaType="video"
      mediaSrc="/space-video.mp4"
      backgroundElement={<GeometricBackground />}
      title="Phan Ngoc Phuoc Loc"
      date="Vietnam → Finland"
      scrollToExpand="↓ scroll to explore"
    >
      <HeroContent />
    </ScrollExpandMedia>
  )
}
