import { List, Moon, Sun, X } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import './Nav.css'

const LINKS = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const THEME_COLOR = { dark: '#111317', light: '#f5f6f8' }

function currentTheme() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function ThemeToggle() {
  const [theme, setTheme] = useState('dark')
  useEffect(() => setTheme(currentTheme()), [])

  const toggle = (event) => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark'
    const apply = () => {
      document.documentElement.classList.toggle('dark', next === 'dark')
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', THEME_COLOR[next])
      try {
        localStorage.setItem('theme', next)
      } catch {
        /* storage unavailable: the choice just won't persist */
      }
      setTheme(next)
    }

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (!document.startViewTransition || reduced) {
      apply()
      return
    }

    // Grow the new theme out of the button in a circle.
    const box = event.currentTarget.getBoundingClientRect()
    const x = box.left + box.width / 2
    const y = box.top + box.height / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )
    const transition = document.startViewTransition(() => flushSync(apply))
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 520,
          easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
  }

  const label =
    theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef(null)

  // Solid bar once the page has scrolled past a 1px sentinel at the top.
  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel')
    if (!sentinel) return
    const io = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    )
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  // Highlight the section occupying the middle of the viewport.
  useEffect(() => {
    const sections = LINKS.map(({ id }) => document.getElementById(id)).filter(
      Boolean,
    )
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const section of sections) io.observe(section)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className={`site-nav${scrolled || open ? ' site-nav--solid' : ''}`}>
      <nav className="nav-inner container" aria-label="Main">
        <a href="#home" className="wordmark">
          Loc Phan
        </a>
        <ul className="nav-links">
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="nav-link"
                aria-current={active === id ? 'true' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="icon-btn nav-menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </nav>
      <div
        id="mobile-menu"
        className="mobile-menu"
        data-open={open}
        hidden={!open}
      >
        <ul className="container">
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
