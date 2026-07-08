import FadeIn from './FadeIn'

export default function HireMe() {
  const scrollTo = (id) => () =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="section cta-band tile-parchment" id="hire">
      <div className="container">
        <div className="cta-inner">
          <FadeIn>
            <span className="cta-badge">
              <span className="hero-badge-dot" />
              Open to internships &amp; junior roles
            </span>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h2 className="cta-headline">
              Let&apos;s build<br />
              <span className="cta-headline-accent">something great.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="cta-sub">
              I&apos;m a software engineering student from Vietnam studying at TAMK, Finland.
              If you&apos;re looking for a motivated junior developer for your team, I&apos;d love to connect.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="cta-actions">
              <button className="btn-primary" onClick={scrollTo('contact')}>Get in Touch</button>
              <button className="btn-secondary-pill" onClick={scrollTo('projects')}>View Projects</button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
