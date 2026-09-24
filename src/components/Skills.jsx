import './Skills.css'

const GROUPS = [
  {
    title: 'Languages',
    items: [
      'JavaScript',
      'Python',
      'Dart',
      'Java',
      'C++',
      'SQL',
      'HTML',
      'CSS',
    ],
  },
  {
    title: 'Frontend and mobile',
    items: ['React', 'Flutter', 'Responsive UI', 'HTML/CSS layouts'],
  },
  {
    title: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'File handling',
      'Server routing',
    ],
  },
  {
    title: 'Databases and data',
    items: ['PostgreSQL', 'SQLite', 'Power BI', 'Data modeling'],
  },
  {
    title: 'DevOps and systems',
    items: [
      'Linux',
      'Ubuntu Server',
      'Apache',
      'Docker',
      'Ansible',
      'SSH',
      'NFS',
      'Raspberry Pi',
    ],
  },
  {
    title: 'Tools and workflow',
    items: [
      'Git',
      'GitHub',
      'GitLab',
      'VS Code',
      'Android Studio',
      'PowerShell',
      'Bash',
      'Cursor',
    ],
  },
  {
    title: 'Embedded and IoT',
    items: [
      'Arduino',
      'ESP8266',
      'Sensors',
      'Motor control',
      'Device communication',
    ],
  },
  {
    title: 'Exploring now',
    items: ['Distributed systems', 'Consensus algorithms', 'AI infrastructure'],
    current: true,
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <h2 id="skills-title" className="section-title">
          Skills
        </h2>
        <div className="skills">
          {GROUPS.map((group) => (
            <div
              key={group.title}
              className={`skill-group${group.current ? ' skill-group--now' : ''}`}
            >
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
