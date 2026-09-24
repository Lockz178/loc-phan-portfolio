import { ArrowUpRight, DownloadSimple } from '@phosphor-icons/react'
import RaftCluster from './RaftCluster'
import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-inner container">
        <div className="hero-copy">
          <p className="hero-status rise" style={{ '--i': 0 }}>
            <span className="status-dot" aria-hidden="true" />
            Open to internships and junior roles
          </p>
          <h1 id="hero-title" className="hero-name rise" style={{ '--i': 1 }}>
            Phan Ngoc
            <br />
            Phuoc Loc
          </h1>
          <p className="hero-lede rise" style={{ '--i': 2 }}>
            Software engineering student at TAMK, Finland. I build full-stack
            apps and distributed systems that keep working when parts fail.
          </p>
          <div className="hero-actions rise" style={{ '--i': 3 }}>
            <a href="/cv.pdf" className="btn btn-primary" download>
              <DownloadSimple size={18} weight="bold" aria-hidden="true" />
              Download CV
            </a>
            <a href="mailto:phuocloc5406@gmail.com" className="btn btn-quiet">
              Email me
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-visual rise" style={{ '--i': 2 }}>
          <RaftCluster />
        </div>
      </div>
    </section>
  )
}
