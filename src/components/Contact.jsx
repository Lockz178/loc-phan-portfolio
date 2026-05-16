import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import FadeIn from './FadeIn'
import { SpecialText } from './ui/special-text'

const channels = [
  {
    icon:  '✉',
    label: 'Email',
    value: 'phuocloc5406@gmail.com',
    href:  'mailto:phuocloc5406@gmail.com',
  },
  {
    icon:  '⌥',
    label: 'GitHub',
    value: 'github.com/Lockz178',
    href:  'https://github.com/Lockz178',
  },
  {
    icon:  'in',
    label: 'LinkedIn',
    value: 'Ngoc Phuoc Loc Phan',
    href:  'https://www.linkedin.com/in/ngoc-phuoc-loc-phan-117146330/',
  },
]

function ContactCard({ channel, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <motion.a
      ref={ref}
      href={channel.href}
      target={channel.href.startsWith('mailto') ? '_self' : '_blank'}
      rel="noopener"
      className="contact-card"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.25)' }}
    >
      <span className="contact-card-icon">{channel.icon}</span>
      <div>
        <p className="contact-card-label">{channel.label}</p>
        <p className="contact-card-value">{channel.value}</p>
      </div>
      <svg className="contact-card-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.a>
  )
}

export default function Contact() {
  return (
    <section className="section tile-dark" id="contact">
      <div className="container">
        <FadeIn>
          <p className="section-eyebrow on-dark">
            <SpecialText inView={true} speed={16}>Let's Connect</SpecialText>
          </p>
          <h2 className="section-headline on-dark">Get in Touch</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="contact-intro">
            I'm open to internship opportunities, junior developer roles, and interesting software projects. Feel free to reach out through any of these channels.
          </p>
        </FadeIn>

        <div className="contact-cards">
          {channels.map((c, i) => (
            <ContactCard key={c.label} channel={c} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  )
}
