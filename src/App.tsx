import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Aurora, ScrollProgress } from './components/Primitives'
import { LeftRail, TopNav, Footer } from './components/Chrome'
import { Home } from './pages/Home'
import { SessionPage } from './pages/SessionPage'
import { SESSIONS } from './data'

/**
 * Hash routing on purpose: GitHub Pages serves static files and has no
 * rewrite rule, so a deep link like /session-2 would 404 on refresh.
 * Hash routes survive a reload from any entry point.
 */
function usePath() {
  const read = () => window.location.hash.replace(/^#/, '') || '/'
  const [path, setPath] = useState(read)

  useEffect(() => {
    const on = () => setPath(read())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  const go = useCallback((next: string) => {
    window.location.hash = next
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return [path, go] as const
}

export default function App() {
  const [path, go] = usePath()

  // An in-page anchor (#overview) is not a route — only /session-N is.
  const session = SESSIONS.find((s) => s.slug && `/${s.slug}` === path)
  const title = session ? `Session ${session.n} — ${session.title}` : 'AI for Educators'

  useEffect(() => {
    document.title = session
      ? `${title} · AI for Educators · GBPUAT`
      : 'AI for Educators — a faculty workshop · GBPUAT'
  }, [title, session])

  return (
    <div className="grain relative min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-100 focus:rounded-br-xl focus:bg-ember focus:px-5 focus:py-3 focus:font-semibold focus:text-void"
      >
        Skip to content
      </a>

      <Aurora />
      <ScrollProgress />
      <TopNav current={session?.n} onNavigate={go} />
      <LeftRail current={session?.n} onNavigate={go} />

      <AnimatePresence mode="wait">
        <motion.div
          key={path}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="md:pl-20"
        >
          {session ? <SessionPage s={session} /> : <Home onNavigate={go} />}
        </motion.div>
      </AnimatePresence>

      <Footer
        label={
          session
            ? `Session ${session.n} · AI for Educators · GBPUAT`
            : 'AI for Educators · G.B. Pant University of Agriculture and Technology'
        }
      />
    </div>
  )
}
