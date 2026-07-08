import { motion } from 'motion/react'
import { SpecialText } from './ui/special-text'

const fadeUp = {
  hidden:  { opacity: 0, y: 26 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.22, 0.61, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      {/* Subtle light-mode depth: soft accent glows */}
      <span className="hero-glow hero-glow--a" aria-hidden="true" />
      <span className="hero-glow hero-glow--b" aria-hidden="true" />

      <div className="hero-content">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="hero-badge">
          <span className="hero-badge-dot" />
          Available for internships &amp; junior roles
        </motion.div>

        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="hero-name">
          Phan Ngoc<br /><span className="hero-name-accent">Phuoc Loc</span>
        </motion.h1>

        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="hero-role">
          <SpecialText delay={0.9} speed={20}>
            Software Engineering Student · TAMK, Finland
          </SpecialText>
        </motion.p>

        <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible" className="hero-tagline">
          From Vietnam, building full-stack software across mobile, web, and
          server infrastructure — with a soft spot for distributed systems.
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

      <motion.a
        href="#about"
        className="hero-scroll-cue"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="hero-scroll-text">Scroll</span>
        <span className="hero-scroll-line" />
      </motion.a>
    </section>
  )
}
