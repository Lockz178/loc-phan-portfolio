import FadeIn from './FadeIn'
import { SpecialText } from './ui/special-text'

const items = [
  {
    date:     '2024 — 2025',
    type:     'Education',
    title:    'Bachelor of Engineering — Information Technology',
    org:      'South-Eastern Finland University of Applied Sciences (XAMK)',
    location: 'Mikkeli, Finland',
    desc:     'Completed my first year of IT engineering studies — programming fundamentals, mathematics, and core computing courses — before transferring to TAMK to continue toward Software Engineering.',
  },
  {
    date:     '2025 — 2028',
    type:     'Education',
    title:    'Bachelor of Engineering — Software Engineering',
    org:      'Tampere University of Applied Sciences (TAMK)',
    location: 'Tampere, Finland',
    desc:     'Full-stack development, systems administration, databases, and practical software project work. Active participation in school projects involving real client deliverables.',
  },
  {
    date:     '2024 — Present',
    type:     'Experience',
    title:    'Student Developer — Practical Training',
    org:      'A3 Info Screen Project',
    location: 'School Project',
    desc:     'Built a Raspberry Pi-powered digital signage system with a Node.js/Express backend and HTML/CSS/JS frontend. Responsible for full development cycle: planning, coding, testing, and deployment.',
  },
]

export default function Experience() {
  return (
    <section className="section tile-light" id="experience">
      <div className="container">
        <FadeIn>
          <p className="section-eyebrow">
            <SpecialText inView={true} speed={16}>Background</SpecialText>
          </p>
          <h2 className="section-headline">Education &amp; Experience</h2>
        </FadeIn>

        <div className="timeline">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.15} x={-24} y={0}>
              <div className="timeline-item">
                <div className="timeline-left">
                  <span className="timeline-type">{item.type}</span>
                  <span className="timeline-date">{item.date}</span>
                  <span className="timeline-location">{item.location}</span>
                </div>
                <div className="timeline-connector">
                  <div className="timeline-dot" />
                  {i < items.length - 1 && <div className="timeline-line" />}
                </div>
                <div className="timeline-body">
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-org">{item.org}</p>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
