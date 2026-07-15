import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'motion/react'
import type { ReactNode } from 'react'
import { useRef, useEffect } from 'react'

/* ------------------------------------------------------------------
   Reveal — fades and lifts a block into view as it enters the
   viewport. Collapses to a plain fade when the user asks for less
   motion, and to nothing at all if they ask for none.
   ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const still = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={still ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={still ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------
   ScrollFade — the Apple move. Pins nothing, but scales, fades and
   blurs the hero as it leaves, so the page feels like depth rather
   than a list of sections.
   ------------------------------------------------------------------ */
export function ScrollFade({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(8px)'])

  if (still) return <div ref={ref}>{children}</div>
  return (
    <motion.div ref={ref} style={{ opacity, scale, filter: blur }}>
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------
   Aurora — the drifting colour field behind the whole page.
   Pure CSS animation; no per-frame JS.
   ------------------------------------------------------------------ */
export function Aurora({ rich = false }: { rich?: boolean }) {
  const still = useReducedMotion()

  // A glow that follows the cursor. Springs smooth the raw pointer so it
  // trails rather than snaps. Pointer events only; there is no hover on
  // touch, and no per-frame work when the mouse is still.
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.35)
  const sx = useSpring(px, { stiffness: 50, damping: 20, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 50, damping: 20, mass: 0.6 })

  useEffect(() => {
    if (still || !rich) return
    const move = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth)
      py.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [still, rich, px, py])

  const gx = useTransform(sx, (v) => `${v * 100}vw`)
  const gy = useTransform(sy, (v) => `${v * 100}vh`)

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* Colour field */}
      <div className="aurora absolute -top-1/3 -left-1/4 h-[85vh] w-[85vw] rounded-full bg-ember/18 blur-[130px]" />
      <div className="aurora-slow absolute top-1/4 -right-1/4 h-[70vh] w-[70vw] rounded-full bg-violet/16 blur-[140px]" />
      <div className="aurora absolute -bottom-1/4 left-1/5 h-[60vh] w-[60vw] rounded-full bg-gold/10 blur-[150px]" />
      {rich && (
        <div className="aurora-b absolute top-[10%] left-[36%] h-[52vh] w-[44vw] rounded-full bg-cyan/10 blur-[110px]" />
      )}

      {/* Cursor glow. Translated, never repainted. */}
      {rich && !still && (
        <motion.div
          style={{ left: gx, top: gy, x: '-50%', y: '-50%' }}
          className="absolute h-[44vw] w-[44vw] rounded-full bg-ember/12 blur-[100px]"
        />
      )}

      {/* Faint grid, for the machined feel */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, #000 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, #000 20%, transparent 75%)',
        }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------
   ScrollProgress — a thin ember line across the top.
   ------------------------------------------------------------------ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed top-0 left-0 z-50 h-[2px] w-full origin-left bg-gradient-to-r from-ember via-gold to-violet"
    />
  )
}

/* ------------------------------------------------------------------
   Magnetic — a button that leans toward the cursor. Disabled for
   reduced motion and irrelevant on touch, where there is no hover.
   ------------------------------------------------------------------ */
export function Magnetic({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const still = useReducedMotion()
  if (still) return <span className={className}>{children}</span>
  return (
    <motion.span
      ref={ref}
      className={className}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
    >
      {children}
    </motion.span>
  )
}
