import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react'
import './Projects.css'

function Stack({ items }) {
  return (
    <ul className="stack" aria-label="Tech stack">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function SourceLink({ href }) {
  return (
    <a href={href} className="text-link" target="_blank" rel="noopener">
      <GithubLogo size={17} aria-hidden="true" />
      Source on GitHub
      <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
    </a>
  )
}

function Shot({ src, srcSet, sizes, alt, width, height, variant = '' }) {
  return (
    <figure className={`shot ${variant}`}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </figure>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <h2 id="projects-title" className="section-title">
          Projects
        </h2>

        <article className="project project--feature">
          <div className="project-copy">
            <h3 className="project-title">CollabEdit</h3>
            <p className="project-desc">
              A real-time collaborative rich-text editor: type together, see
              each other’s cursors live, and merge every edit conflict-free with
              CRDTs. Fully peer-to-peer over WebRTC with no backend server,
              offline-first persistence, and shareable rooms via URL.
            </p>
            <ul className="project-points">
              <li>Conflict-free CRDT editing</li>
              <li>Live multiplayer cursors</li>
              <li>Serverless P2P over WebRTC</li>
            </ul>
            <Stack
              items={[
                'React',
                'TypeScript',
                'Yjs',
                'CRDTs',
                'WebRTC',
                'Tiptap',
              ]}
            />
            <div className="project-links">
              <a
                href="https://collabedit-live.vercel.app"
                className="btn btn-primary btn-sm"
                target="_blank"
                rel="noopener"
              >
                Open live demo
                <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
              </a>
              <SourceLink href="https://github.com/Lockz178/collabedit" />
            </div>
          </div>
          <Shot
            src="/projects/collabedit.webp"
            srcSet="/projects/collabedit-800.webp 800w, /projects/collabedit.webp 1600w"
            sizes="(max-width: 900px) calc(100vw - 40px), 680px"
            alt="CollabEdit editor with a formatted document, toolbar, word count and peer status bar"
            width={1600}
            height={900}
          />
        </article>

        <article className="project project--feature project--flip">
          <div className="project-copy">
            <h3 className="project-title">Raft KV Store</h3>
            <p className="project-desc">
              A distributed, fault-tolerant key-value store implementing the
              Raft consensus algorithm from scratch in pure Go, with zero
              dependencies. Handles leader election, log replication, and
              snapshotting while staying consistent through node crashes and
              network partitions.
            </p>
            <p className="project-note">
              Ships with a live cluster dashboard, REST API, a raftctl CLI, and
              a one-command 5-node Docker cluster. The cluster at the top of
              this page runs a simplified version of the same leader election in
              your browser.
            </p>
            <Stack items={['Go', 'Raft', 'Docker', 'REST']} />
            <div className="project-links">
              <SourceLink href="https://github.com/Lockz178/raft-kv" />
            </div>
          </div>
          <Shot
            src="/projects/raft-kv-dashboard.webp"
            srcSet="/projects/raft-kv-dashboard-720.webp 720w, /projects/raft-kv-dashboard.webp 1440w"
            sizes="(max-width: 900px) calc(100vw - 40px), 680px"
            alt="Raft KV dashboard showing a five-node topology with leader B, a key-value table and per-node term and commit cards"
            width={1440}
            height={1000}
          />
        </article>

        <div className="project-pair">
          <article className="project project--compact">
            <div className="project-copy">
              <p className="project-status">
                <span className="status-dot" aria-hidden="true" />
                In use at TAMK
              </p>
              <h3 className="project-title">A3 Info Screen</h3>
              <p className="project-desc">
                A Raspberry Pi digital signage system built for Tampere
                University of Applied Sciences, deployed on campus and used by
                the school to display announcements, images, and videos in
                fullscreen kiosk mode, all managed through a web upload
                dashboard.
              </p>
              <Stack
                items={['Node.js', 'Express.js', 'Raspberry Pi', 'GitLab']}
              />
              <div className="project-links">
                <SourceLink href="https://github.com/Lockz178/a3-info-screen" />
              </div>
            </div>
          </article>

          <article className="project project--compact project--with-phone">
            <div className="project-copy">
              <h3 className="project-title">StudyFlow App</h3>
              <p className="project-desc">
                A Flutter study planning app that helps users organize study
                plans, view study tips, and manage learning activities, with
                persistent settings via SharedPreferences and a built-in tips
                library.
              </p>
              <Stack items={['Flutter', 'Dart', 'Provider', 'GoRouter']} />
              <div className="project-links">
                <SourceLink href="https://github.com/Lockz178/studyflow-app" />
              </div>
            </div>
            <Shot
              src="/projects/studyflow.webp"
              srcSet="/projects/studyflow-440.webp 440w, /projects/studyflow.webp 720w"
              sizes="220px"
              alt="StudyFlow home screen with a learning tip and a recommended study plan card"
              width={720}
              height={993}
              variant="shot--phone"
            />
          </article>
        </div>

        <article className="project project--slim">
          <h3 className="project-title">Distributed AI Ops Challenge</h3>
          <p className="project-desc">
            A distributed AI operations challenge project exploring
            orchestration, monitoring, and deployment of AI workloads across
            distributed infrastructure.
          </p>
          <Stack items={['Python', 'AI', 'Distributed systems', 'DevOps']} />
          <SourceLink href="https://github.com/Lockz178/distributed-ai-ops-challenge" />
        </article>
      </div>
    </section>
  )
}
