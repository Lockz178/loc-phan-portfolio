import { lazy, Suspense } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

const ShaderVisual = lazy(() => import('./components/ShaderVisual'))
const HireMe       = lazy(() => import('./components/HireMe'))

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Suspense fallback={<div style={{ height: '100vh', background: '#000' }} />}>
          <ShaderVisual />
        </Suspense>
        <Experience />
        <Suspense fallback={<div style={{ height: '100vh', background: '#000' }} />}>
          <HireMe />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </>
  )
}
