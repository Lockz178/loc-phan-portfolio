import {
  ArrowUpRight,
  Check,
  Copy,
  DownloadSimple,
  GithubLogo,
  LinkedinLogo,
} from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import './Contact.css'

const EMAIL = 'phuocloc5406@gmail.com'

function CopyButton() {
  const [state, setState] = useState('idle') // idle | copied | failed
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setState('copied')
    } catch {
      setState('failed')
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState('idle'), 2200)
  }

  const label = {
    idle: 'Copy address',
    copied: 'Copied',
    failed: 'Copy failed, select the address instead',
  }[state]

  return (
    <button
      type="button"
      className="btn btn-ink btn-sm copy-btn"
      data-state={state}
      onClick={copy}
    >
      <span className="copy-btn-label" key={state}>
        {state === 'copied' ? (
          <Check size={16} weight="bold" aria-hidden="true" />
        ) : (
          <Copy size={16} weight="bold" aria-hidden="true" />
        )}
        {label}
      </span>
      <span className="sr-only" aria-live="polite">
        {state === 'copied' ? 'Email address copied to clipboard' : ''}
      </span>
    </button>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <h2 id="contact-title" className="contact-title">
          Get in touch
        </h2>
        <p className="contact-lede">
          I’m open to internship opportunities, junior developer roles, and
          interesting software projects.
        </p>
        <div className="contact-email-row">
          <a href={`mailto:${EMAIL}`} className="contact-email">
            {EMAIL}
          </a>
          <CopyButton />
        </div>
        <ul className="contact-links">
          <li>
            <a
              href="https://github.com/Lockz178"
              target="_blank"
              rel="noopener"
            >
              <GithubLogo size={20} aria-hidden="true" />
              GitHub
              <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/ngoc-phuoc-loc-phan-117146330/"
              target="_blank"
              rel="noopener"
            >
              <LinkedinLogo size={20} aria-hidden="true" />
              LinkedIn
              <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href="/cv.pdf" download>
              <DownloadSimple size={20} aria-hidden="true" />
              Download CV
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
