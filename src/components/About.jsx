import FadeIn from './FadeIn'
import { SpecialText } from './ui/special-text'

const stats = [
  { value: '3+',  label: 'Projects Built' },
  { value: '7',   label: 'Skill Areas' },
  { value: '2028', label: 'Expected Grad' },
]

export default function About() {
  return (
    <section className="section tile-light" id="about">
      <div className="about-inner container">

        <FadeIn className="about-photo-wrap" x={-32} y={0}>
          <img src="/avatar.png" alt="Phan Ngoc Phuoc Loc" className="avatar" />
          <div className="about-origin-badge">
            <span>🇻🇳</span> Ho Chi Minh City → <span>🇫🇮</span> Tampere
          </div>
        </FadeIn>

        <div className="about-text">
          <FadeIn delay={0.05}>
            <p className="about-eyebrow">
              <SpecialText inView={true} speed={16}>About Me</SpecialText>
            </p>
            <h2 className="section-headline">Building software,<br />one project at a time.</h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="body-text">
              I'm <strong>Phan Ngoc Phuoc Loc</strong>, a software engineering student at Tampere University of Applied Sciences in Finland, originally from Vietnam. I moved to Finland to study and build a career in tech — expected to graduate in 2028.
            </p>
            <p className="body-text">
              I work across the full stack: React and Flutter on the frontend, Node.js on the backend, PostgreSQL and SQLite for data, and Linux server administration for deployment. I enjoy solving real problems with clean, practical code.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="stats-row">
              {stats.map(s => (
                <div className="stat-item" key={s.label}>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.35}>
            <div className="about-links">
              <a href="https://github.com/Lockz178" className="text-link" target="_blank" rel="noopener">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/ngoc-phuoc-loc-phan-117146330/" className="text-link" target="_blank" rel="noopener">LinkedIn ↗</a>
              <a href="/cv.pdf" className="btn-pill-sm" download>Download CV</a>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  )
}
