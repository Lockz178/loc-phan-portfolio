import './About.css'

const FACTS = [
  { term: 'Studying', detail: 'BEng Software Engineering, TAMK' },
  { term: 'Graduating', detail: '2028' },
  { term: 'Based in', detail: 'Tampere, Finland' },
  { term: 'From', detail: 'Ho Chi Minh City, Vietnam' },
]

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="about container">
        <div className="about-portrait">
          <img
            src="/avatar-1120.webp"
            srcSet="/avatar-700.webp 700w, /avatar-1120.webp 1120w"
            sizes="(max-width: 900px) 380px, 460px"
            alt="Portrait of Phan Ngoc Phuoc Loc"
            width={1120}
            height={928}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="about-copy">
          <h2 id="about-title" className="section-title">
            From Ho Chi Minh City to Tampere.
          </h2>
          <p>
            I’m Phan Ngoc Phuoc Loc, a software engineering student at Tampere
            University of Applied Sciences in Finland, originally from Vietnam.
            I moved to Finland to study and build a career in tech.
          </p>
          <p>
            I work across the full stack: React and Flutter on the frontend,
            Node.js on the backend, PostgreSQL and SQLite for data, and Linux
            server administration for deployment. I enjoy solving real problems
            with clean, practical code.
          </p>
          <p>
            Right now I’m going deep on distributed systems, consensus
            algorithms, and AI infrastructure.
          </p>
          <dl className="facts">
            {FACTS.map(({ term, detail }) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
