import { motion } from 'motion/react'
import { SESSIONS } from '../data'

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
