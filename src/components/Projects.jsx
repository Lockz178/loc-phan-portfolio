import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import FadeIn from './FadeIn'
import { SpecialText } from './ui/special-text'

const projects = [
  {
    number: '01',
    accent: '#0066cc',
    badge:  'In use at TAMK',
    tag:    'Node.js · Express.js · Raspberry Pi · GitLab',
    title:  'A3 Info Screen',
    desc:   'A Raspberry Pi digital signage system built for Tampere University of Applied Sciences — deployed on campus and used by the school to display announcements, images, and videos in fullscreen kiosk mode, all managed through a web upload dashboard.',
    highlights: ['Deployed & running at TAMK', 'Fullscreen kiosk mode', 'Web upload dashboard'],
    link:   'https://github.com/Lockz178/a3-info-screen',
  },
  {
    number: '02',
    accent: '#ff375f',
    badge:  'Flagship',
    tag:    'React · TypeScript · Yjs · CRDTs · WebRTC · Tiptap',
    title:  'CollabEdit',
    desc:   'A real-time collaborative rich-text editor — type together, see each other’s cursors live, and merge every edit conflict-free with CRDTs. Fully peer-to-peer over WebRTC with no backend server, offline-first persistence, and shareable rooms via URL.',
    highlights: ['Conflict-free CRDT editing', 'Live multiplayer cursors', 'Serverless P2P over WebRTC'],
    link:   'https://github.com/Lockz178/collabedit',
    live:   'https://collabedit-live.vercel.app',
  },
  {
    number: '03',
    accent: '#00add8',
    tag:    'Go · Raft Consensus · Distributed Systems · Docker',
    title:  'Raft KV Store',
    desc:   'A distributed, fault-tolerant key-value store implementing the Raft consensus algorithm from scratch in pure Go — zero dependencies. Handles leader election, log replication, and snapshotting while staying consistent through node crashes and network partitions. Ships with a live cluster dashboard, REST API, a raftctl CLI, and a one-command 5-node Docker cluster.',
    highlights: ['Raft consensus from scratch', 'Survives crashes & partitions', 'Live 5-node Docker cluster'],
    link:   'https://github.com/Lockz178/raft-kv',
  },
  {
    number: '04',
    accent: '#5856d6',
    tag:    'Flutter · Dart · Provider · GoRouter',
    title:  'StudyFlow App',
    desc:   'A Flutter study planning application that helps users organize study plans, view study tips, and manage learning activities. Features navigation, persistent settings via SharedPreferences, study plan models, and a built-in tips library.',
    highlights: ['Cross-platform mobile', 'State management', 'Persistent storage'],
    link:   'https://github.com/Lockz178/studyflow-app',
  },
  {
    number: '05',
    accent: '#34c759',
    tag:    'Python · AI · Distributed Systems · DevOps',
    title:  'Distributed AI Ops Challenge',
    desc:   'A distributed AI operations challenge project exploring orchestration, monitoring, and deployment of AI workloads across distributed infrastructure.',
    highlights: ['Distributed systems', 'AI orchestration', 'DevOps pipelines'],
    link:   'https://github.com/Lockz178/distributed-ai-ops-challenge',
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
        {project.badge ? (
          <span className="project-badge">
            <span className="project-badge-dot" />
            {project.badge}
          </span>
        ) : (
          <div className="project-accent-bar" />
        )}
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
        <div className="project-links">
          {project.live && (
            <a href={project.live} className="project-link project-link-live" style={{ '--accent': project.accent }} target="_blank" rel="noopener">
              Live Demo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
          <a href={project.link} className="project-link" target="_blank" rel="noopener">
            View on GitHub
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
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
