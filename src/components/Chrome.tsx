import { motion } from 'motion/react'
import { SESSIONS } from '../data'

const HOME_SECTIONS = [
  ['Overview', '#overview'],
  ['Programme', '#programme'],
  ['How it runs', '#approach'],
  ['Who runs it', '#who'],
] as const

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
            <a
              href="#/"
              onClick={go('/')}
              className="rounded-full border border-white/12 bg-white/4 px-4 py-1.5 text-[13px] font-medium text-mist/80 transition hover:border-ember/60 hover:bg-ember/10 hover:text-mist"
            >
              Back<span className="hidden sm:inline">&nbsp;to the workshop</span>
            </a>
          ) : (
            HOME_SECTIONS.map(([label, hash]) => (
              <a
                key={hash}
                href={hash}
                className="hidden rounded-full px-3 py-1.5 text-[13px] text-muted transition hover:bg-white/6 hover:text-mist md:block"
              >
                {label}
              </a>
            ))
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
