import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import FadeIn from './FadeIn'
import AnimatedGradient from './ui/animated-gradient'
import { SpecialText } from './ui/special-text'

const categories = [
  {
    title: 'Programming Languages',
    icon:  '{ }',
    chips: ['JavaScript', 'Python', 'Dart', 'Java', 'C++', 'SQL', 'HTML', 'CSS'],
  },
  {
    title: 'Frontend / Mobile',
    icon:  '◻',
    chips: ['React', 'Flutter', 'Responsive UI', 'HTML/CSS Layouts'],
  },
  {
    title: 'Backend',
    icon:  '⌁',
    chips: ['Node.js', 'Express.js', 'REST APIs', 'File Handling', 'Server Routing'],
  },
  {
    title: 'Databases & Data',
    icon:  '▤',
    chips: ['PostgreSQL', 'SQLite', 'Power BI', 'Data Modeling'],
  },
  {
    title: 'DevOps & Systems',
    icon:  '⚙',
    chips: ['Linux', 'Ubuntu Server', 'Apache', 'Docker', 'Ansible', 'SSH', 'NFS', 'Raspberry Pi'],
  },
  {
    title: 'Tools & Workflow',
    icon:  '◈',
    chips: ['Git', 'GitHub', 'GitLab', 'VS Code', 'Android Studio', 'PowerShell', 'Bash', 'Cursor'],
  },
  {
    title: 'Embedded & IoT',
    icon:  '⊞',
    chips: ['Arduino', 'ESP8266', 'Sensors', 'Motor Control', 'Device Communication'],
  },
]

function SkillCategory({ category, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <motion.div
      ref={ref}
      className="skill-card"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="skill-card-header">
        <span className="skill-icon" aria-hidden="true">{category.icon}</span>
        <h3 className="skill-cat-title">{category.title}</h3>
      </div>
      <div className="skill-chips">
        {category.chips.map((chip, i) => (
          <motion.span
            key={chip}
            className="chip"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.28, delay: delay + 0.04 * i, ease: 'easeOut' }}
          >
            {chip}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section
      className="section tile-dark"
      id="skills"
      style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}
    >
      {/* WebGL animated gradient — Prism preset (dark → blue, matches portfolio accent) */}
      <AnimatedGradient
        config={{ preset: 'Prism' }}
        noise={{ opacity: 0.4, scale: 0.8 }}
      />

      {/* All content sits above the gradient */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <FadeIn>
          <p className="section-eyebrow on-dark">
            <SpecialText inView={true} speed={18}>Technical Stack</SpecialText>
          </p>
          <h2 className="section-headline on-dark">Skills</h2>
        </FadeIn>
        <div className="skills-grid">
          {categories.map((cat, i) => (
            <SkillCategory key={cat.title} category={cat} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  )
}
