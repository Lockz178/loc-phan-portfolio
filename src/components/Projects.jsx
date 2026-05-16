import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import FadeIn from './FadeIn'
import { SpecialText } from './ui/special-text'

const projects = [
  {
    number: '01',
    accent: '#0066cc',
    tag:    'Node.js · Express.js · Raspberry Pi · GitLab',
    title:  'A3 Info Screen',
    desc:   'A Raspberry Pi-based digital signage system for a school information screen. Displays images and videos in fullscreen slideshow mode with a web dashboard for uploading and managing media files. Designed to run in kiosk mode on a TV or large display.',
    highlights: ['Fullscreen kiosk mode', 'Web upload dashboard', 'Media file management'],
    link:   'https://github.com/Lockz178',
  },
  {
    number: '02',
    accent: '#5856d6',
    tag:    'Flutter · Dart · Provider · GoRouter',
    title:  'StudyFlow App',
    desc:   'A Flutter study planning application that helps users organize study plans, view study tips, and manage learning activities. Features navigation, persistent settings via SharedPreferences, study plan models, and a built-in tips library.',
    highlights: ['Cross-platform mobile', 'State management', 'Persistent storage'],
    link:   'https://github.com/Lockz178',
  },
]

function ProjectCard({ project, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -8 }}
    >
      <div className="project-card-header" style={{ '--accent': project.accent }}>
        <span className="project-number">{project.number}</span>
        <div className="project-accent-bar" />
      </div>
      <div className="project-card-body">
        <span className="project-tag">{project.tag}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        <ul className="project-highlights">
          {project.highlights.map(h => (
            <li key={h}><span className="highlight-dot" style={{ background: project.accent }} />{h}</li>
          ))}
        </ul>
        <a href={project.link} className="project-link" target="_blank" rel="noopener">
          View on GitHub
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section className="section tile-parchment" id="projects">
      <div className="container">
        <FadeIn>
          <p className="section-eyebrow">
            <SpecialText inView={true} speed={16}>Selected Work</SpecialText>
          </p>
          <h2 className="section-headline">Projects</h2>
        </FadeIn>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 0.13} />
          ))}
        </div>
      </div>
    </section>
  )
}
