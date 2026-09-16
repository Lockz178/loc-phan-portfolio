import { lazy, Suspense } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Projects from './components/Projects'
import Skills from './components/Skills'

const ShaderVisual = lazy(() => import('./components/ShaderVisual'))
const HireMe = lazy(() => import('./components/HireMe'))

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Suspense
          fallback={<div style={{ height: '100vh', background: '#08080a' }} />}
        >
          <ShaderVisual />
        </Suspense>
        <Experience />
        <Suspense fallback={<div style={{ minHeight: '420px' }} />}>
          <HireMe />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </>
  )
}
