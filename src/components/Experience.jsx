import './Experience.css'

const ITEMS = [
  {
    date: '2025 - Present',
    kind: 'Education',
    title: 'Bachelor of Engineering, Software Engineering',
    org: 'Tampere University of Applied Sciences (TAMK)',
    place: 'Tampere, Finland',
    desc: 'Full-stack development, systems administration, databases, and practical software project work. Expected graduation 2028. Active participation in school projects involving real client deliverables.',
  },
  {
    date: '2024 - Present',
    kind: 'Experience',
    title: 'Student Developer, Practical Training',
    org: 'A3 Info Screen Project',
    place: 'TAMK, Tampere, Finland',
    desc: 'Built a Raspberry Pi-powered digital signage system with a Node.js/Express backend and HTML/CSS/JS frontend, now deployed and in use on campus. Responsible for the full development cycle: planning, coding, testing, and deployment.',
  },
  {
    date: '2024 - 2025',
    kind: 'Education',
    title: 'Bachelor of Engineering, Information Technology',
    org: 'South-Eastern Finland University of Applied Sciences (XAMK)',
    place: 'Mikkeli, Finland',
    desc: 'Completed my first year of IT engineering studies (programming fundamentals, mathematics, and core computing courses) before transferring to TAMK to continue toward Software Engineering.',
  },
]

export default function Experience() {
  return (
    <section
      id="experience"
      className="section"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <h2 id="experience-title" className="section-title">
          Education &amp; experience
        </h2>
        <ol className="ledger">
          {ITEMS.map((item) => (
            <li key={item.title} className="ledger-row">
              <div className="ledger-when">
                <span className="ledger-date">{item.date}</span>
                <span className="ledger-kind">{item.kind}</span>
              </div>
              <div className="ledger-body">
                <h3>{item.title}</h3>
                <p className="ledger-org">
                  {item.org}
                  <span>{item.place}</span>
                </p>
                <p className="ledger-desc">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
