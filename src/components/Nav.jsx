import { ThemeToggle } from '@/components/ui/curtain-theme-toggle'
import { AnimatedNavFramer } from '@/components/ui/navigation-menu'

export default function Nav() {
  return (
    <>
      <AnimatedNavFramer />
      <div style={{ position: 'fixed', top: '18px', right: '24px', zIndex: 51 }}>
        <ThemeToggle defaultTheme="dark" buttonSize={32} />
      </div>
    </>
  )
}
