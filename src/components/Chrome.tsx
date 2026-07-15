import { motion, AnimatePresence } from 'motion/react'
import { useState, useRef, useEffect } from 'react'
import { SESSIONS } from '../data'

/**
 * The Programme menu. Lists every session so you can jump straight to one from
 * the top of any page, not only from the rail. Opens on hover and on keyboard
 * focus; on touch, where there is no hover, tapping the trigger opens it.
 */
function ProgrammeMenu({
  current,
  onNavigate,
}: {
  current?: number
  onNavigate: (path: string) => void
}) {
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  // Click anywhere else closes it. Without this a tap-opened menu on touch
  // has no way to dismiss.
  useEffect(() => {
    if (!open) return
    const away = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', away)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', away)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  return (
    <div
      ref={box}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] text-muted transition hover:bg-white/6 hover:text-mist"
      >
        Programme
        <svg
          viewBox="0 0 12 12"
          aria-hidden
          className={`h-2.5 w-2.5 fill-none stroke-current stroke-[1.8] transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-white/10 bg-void-2/95 p-2 shadow-2xl backdrop-blur-2xl"
          >
            {SESSIONS.map((s) => {
              const live = Boolean(s.slug)
              const here = current === s.n
              if (!live)
                return (
                  <span
                    key={s.n}
                    aria-disabled="true"
                    className="flex cursor-default items-baseline gap-3 rounded-xl px-3 py-2.5 text-[13px] text-muted/50"
                  >
                    <span className="w-4 shrink-0 font-semibold tabular-nums">{s.n}</span>
                    <span className="flex-1">{s.title}</span>
                    <span className="shrink-0 text-[10px] tracking-wider uppercase">Not yet run</span>
                  </span>
                )
              return (
                <a
                  key={s.n}
                  href={`#/${s.slug}`}
                  onClick={(e) => {
                    e.preventDefault()
                    setOpen(false)
                    onNavigate(`/${s.slug}`)
                  }}
                  aria-current={here ? 'page' : undefined}
                  className={`flex items-baseline gap-3 rounded-xl px-3 py-2.5 text-[13px] transition ${
                    here ? 'bg-ember/15 text-ember' : 'text-mist hover:bg-white/6 hover:text-ember'
                  }`}
                >
                  <span className="w-4 shrink-0 font-semibold tabular-nums text-ember">{s.n}</span>
                  <span className="flex-1">{s.title}</span>
                </a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * The top bar. Carries identity and the section anchors on the home page,
 * and a way back plus the session name on a session page. The left rail
 * handles session-to-session movement; this handles orientation.
 */
export function TopNav({ current, onNavigate }: RailProps) {
  const session = SESSIONS.find((s) => s.n === current)

  const go = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    onNavigate(path)
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-void/65 backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
        <div className="flex min-w-0 items-center gap-3">
          <a
            href="#/"
            onClick={go('/')}
            className="shrink-0 text-[15px] font-semibold tracking-tight text-mist transition hover:text-ember"
          >
            AI for Educators
          </a>
          {session && (
            <>
              <span aria-hidden className="text-muted/40">
                /
              </span>
              <span className="truncate text-[14px] text-muted">
                Session {session.n}
                <span className="hidden sm:inline">: {session.title}</span>
              </span>
            </>
          )}
        </div>

        <nav aria-label="Sections" className="flex items-center gap-1">
          {session ? (
            <>
              {/* The Programme menu rides along on session pages too, so you can
                  hop straight to another session without going home first. */}
              <ProgrammeMenu current={current} onNavigate={onNavigate} />
              <a
                href="#/"
                onClick={go('/')}
                className="ml-1 rounded-full border border-white/12 bg-white/4 px-4 py-1.5 text-[13px] font-medium text-mist/80 transition hover:border-ember/60 hover:bg-ember/10 hover:text-mist"
              >
                Back<span className="hidden sm:inline">&nbsp;to the workshop</span>
              </a>
            </>
          ) : (
            <>
              <a
                href="#overview"
                className="hidden rounded-full px-3 py-1.5 text-[13px] text-muted transition hover:bg-white/6 hover:text-mist md:block"
              >
                Overview
              </a>
              <ProgrammeMenu current={current} onNavigate={onNavigate} />
              {[
                ['How it runs', '#approach'],
                ['Who runs it', '#who'],
              ].map(([label, hash]) => (
                <a
                  key={hash}
                  href={hash}
                  className="hidden rounded-full px-3 py-1.5 text-[13px] text-muted transition hover:bg-white/6 hover:text-mist md:block"
                >
                  {label}
                </a>
              ))}
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

type RailProps = {
  /** Session number currently being viewed; undefined on the home page. */
  current?: number
  onNavigate: (path: string) => void
}

/**
 * The floating navigator.
 *
 * Desktop: a vertical glass rail pinned to the left edge, labels sliding out
 * on hover so the resting state stays quiet.
 * Mobile: the same items as a horizontal pill floating at the bottom, where
 * thumbs actually reach. A left rail on a phone would sit under the gesture
 * area and cover content.
 */
export function LeftRail({ current, onNavigate }: RailProps) {
  const onHome = current === undefined

  const go = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    onNavigate(path)
  }

  return (
    <nav
      aria-label="Workshop navigation"
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 md:top-1/2 md:bottom-auto md:left-5 md:-translate-x-0 md:-translate-y-1/2"
    >
      <div className="flex items-center gap-1.5 rounded-full border border-white/12 bg-void/70 p-2 shadow-2xl backdrop-blur-2xl md:flex-col md:gap-2 md:rounded-3xl md:p-2.5">
        {/* Home */}
        <RailItem
          label="The workshop"
          active={onHome}
          href="#/"
          onClick={go('/')}
          glyph={
            <svg viewBox="0 0 24 24" aria-hidden className="h-[15px] w-[15px] fill-current">
              <path d="M12 3 3 10.2V21h6v-6h6v6h6V10.2z" />
            </svg>
          }
        />

        <span aria-hidden className="h-6 w-px bg-white/12 md:h-px md:w-6" />

        {/* Sessions */}
        {SESSIONS.map((s) => {
          const live = Boolean(s.slug)
          const active = current === s.n

          if (!live)
            return (
              <span
                key={s.n}
                title={`Session ${s.n} — ${s.title} (not yet run)`}
                aria-disabled="true"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-white/15 text-[13px] font-semibold text-muted/50"
              >
                {s.n}
              </span>
            )

          return (
            <RailItem
              key={s.n}
              label={s.title}
              sub={`Session ${s.n}`}
              active={active}
              href={`#/${s.slug}`}
              onClick={go(`/${s.slug}`)}
              glyph={<span className="text-[13px] font-semibold tabular-nums">{s.n}</span>}
            />
          )
        })}
      </div>
    </nav>
  )
}

function RailItem({
  label,
  sub,
  active,
  href,
  onClick,
  glyph,
}: {
  label: string
  sub?: string
  active: boolean
  href: string
  onClick: (e: React.MouseEvent) => void
  glyph: React.ReactNode
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      aria-label={sub ? `${sub}: ${label}` : label}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
        active
          ? 'border-ember bg-ember text-void shadow-[0_0_20px_rgba(255,90,54,.6)]'
          : 'border-white/12 bg-white/4 text-mist/70 hover:border-ember/60 hover:text-ember'
      }`}
    >
      {glyph}

      {/* Label flyout — desktop only; on mobile there is no hover to trigger it */}
      <span className="pointer-events-none absolute left-full ml-3 hidden origin-left scale-90 items-center rounded-xl border border-white/12 bg-void-2/95 px-3 py-2 whitespace-nowrap opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 md:flex">
        {sub && <span className="mr-2 text-[11px] tracking-wider text-ember uppercase">{sub}</span>}
        <span className="text-[13px] text-mist">{label}</span>
      </span>
    </motion.a>
  )
}

export function Footer({ label }: { label: string }) {
  return (
    <footer className="relative z-10 border-t border-white/8 py-10 pb-24 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-5 text-[13px] text-muted md:pl-24">
        <span>{label}</span>
        <span>
          MIT License ·{' '}
          <a
            href="https://github.com/myExperimentsWithTruth/aiforeducators"
            className="underline transition hover:text-ember"
          >
            Source
          </a>
        </span>
      </div>
    </footer>
  )
}
