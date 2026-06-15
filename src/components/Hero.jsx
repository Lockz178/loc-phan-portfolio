import { useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'motion/react'
import AnimatedGradient from './ui/animated-gradient'
import { GeometricBackground } from './ui/shape-landing-hero'
import { SpecialText } from './ui/special-text'

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.3 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

export default function Hero() {
  const sectionRef = useRef(null)

  // Cursor-following glow — starts off-screen until the mouse moves
  const mouseX = useMotionValue(-600)
  const mouseY = useMotionValue(-600)
  const spotlight = useMotionTemplate`radial-gradient(550px circle at ${mouseX}px ${mouseY}px, rgba(99,102,241,0.18), transparent 72%)`

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="hero-section"
    >
      {/* Layer 1 — living WebGL Prism gradient (pauses when off-screen) */}
      <AnimatedGradient config={{ preset: 'Prism', speed: 22 }} noise={{ opacity: 0.35, scale: 0.8 }} />

      {/* Layer 2 — floating geometric shapes for depth */}
      <div className="hero-shapes" aria-hidden="true">
        <GeometricBackground />
      </div>

      {/* Layer 3 — cursor-following glow */}
      <motion.div className="hero-spotlight" style={{ background: spotlight }} aria-hidden="true" />

      {/* Content */}
      <div className="hero-content">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="hero-badge">
          <span className="hero-badge-dot" />
          Available for internships &amp; junior roles
        </motion.div>

        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="hero-name">
          Phan Ngoc <span className="hero-name-accent">Phuoc Loc</span>
        </motion.h1>

        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="hero-role">
          <SpecialText delay={1.0} speed={20} className="text-xs tracking-widest uppercase">
            Software Engineering Student · TAMK, Finland
          </SpecialText>
        </motion.p>

        <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible" className="hero-tagline">
          From Vietnam, building full-stack software across mobile, web, and
          server infrastructure. Seeking internships and junior roles.
        </motion.p>

        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="hero-cta">
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#about"    className="btn-secondary-pill">About Me</a>
          <a href="#contact"  className="btn-secondary-pill">Contact</a>
        </motion.div>

        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="hero-meta">
          <span>🇻🇳 Vietnam</span>
          <span className="hero-meta-divider" />
          <span>🇫🇮 Tampere, Finland</span>
          <span className="hero-meta-divider" />
          <span>Expected 2028</span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        className="hero-scroll-cue"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="hero-scroll-text">Scroll</span>
        <span className="hero-scroll-line" />
      </motion.a>
    </section>
  )
}
