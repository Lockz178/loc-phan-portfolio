import ShaderHero from './ui/animated-shader-hero'

export default function HireMe() {
  return (
    <ShaderHero
      trustBadge={{
        text: 'Open to internships & junior roles',
      }}
      headline={{
        line1: "Let's Build",
        line2: 'Something Great',
      }}
      subtitle="I'm a software engineering student from Vietnam studying at TAMK, Finland. If you're looking for a motivated junior developer for your team, I'd love to connect."
      buttons={{
        primary: {
          text: 'Get in Touch',
          onClick: () => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          },
        },
        secondary: {
          text: 'View Projects',
          onClick: () => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
          },
        },
      }}
    />
  )
}
