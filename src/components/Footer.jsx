import { ArrowUp } from '@phosphor-icons/react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Phan Ngoc Phuoc Loc</p>
        <a href="#home" className="text-link">
          Back to top
          <ArrowUp size={14} weight="bold" aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
