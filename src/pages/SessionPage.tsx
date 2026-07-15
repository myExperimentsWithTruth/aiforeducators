import { motion } from 'motion/react'
import { Reveal, ScrollFade } from '../components/Primitives'
import type { Artefact, ArtefactGroup, Session } from '../data'

/** Headings per shelf. Sessions without groups fall back to 'material'. */
const GROUPS: Record<ArtefactGroup, { eyebrow: string; heading: string; lead: string }> = {
  material: {
    eyebrow: 'Session content',
    heading: 'The material',
    lead: 'Everything from the session, open in your browser. Each is a self-contained page, so you can save it and keep it.',
  },
  output: {
    eyebrow: 'What the session produced',
    heading: 'The outputs',
    lead: 'The course itself, and the working behind it. These are the things the session made, rather than the material it was taught from.',
  },
}
const ORDER: ArtefactGroup[] = ['material', 'output']

export function SessionPage({ s }: { s: Session }) {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <ScrollFade>
        <section className="relative z-10 flex min-h-[62vh] flex-col items-center justify-center px-5 py-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 rounded-full border border-ember/40 bg-ember/10 px-4 py-1.5 text-[13px] font-medium text-ember backdrop-blur-xl"
          >
            Session {s.n}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="kinetic max-w-[16ch] text-[clamp(2.2rem,6vw,4.6rem)] leading-[1.02] font-bold tracking-[-0.035em]"
          >
            {s.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-5 max-w-[42ch] text-[clamp(1rem,1.9vw,1.35rem)] leading-snug tracking-tight text-muted"
          >
            {s.tag}
          </motion.p>
        </section>
      </ScrollFade>

      <main id="main" className="relative z-10">
        {/* ---------------- What it covered ---------------- */}
        {s.covered && (
          <section className="mx-auto max-w-6xl px-5 py-24">
            <Reveal>
              <p className="mb-3 text-[15px] font-semibold text-ember">What this session covered</p>
              <h2 className="max-w-[20ch] text-[clamp(1.8rem,3.8vw,2.9rem)] leading-[1.1] font-bold tracking-[-0.03em]">
                The ground it puts under you
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {s.covered.map((c, i) => (
                <Reveal key={c} delay={i * 0.08}>
                  <div className="halo relative flex h-full gap-4 rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl transition hover:bg-white/6">
                    <span className="text-lg font-bold tabular-nums text-ember">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[15px] leading-relaxed text-muted">{c}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ---------------- Artefacts, one section per shelf ---------------- */}
        {ORDER.map((g, gi) => {
          const items = (s.artefacts ?? []).filter((a) => (a.group ?? 'material') === g)
          if (!items.length) return null
          const copy = GROUPS[g]
          return (
            <section
              key={g}
              className={`scroll-mt-20 py-24 ${
                gi % 2 === 0 ? 'border-y border-white/8 bg-white/2' : 'border-b border-white/8'
              }`}
            >
              <div className="mx-auto max-w-6xl px-5">
                <Reveal>
                  <p className="mb-3 text-[15px] font-semibold text-ember">{copy.eyebrow}</p>
                  <h2 className="max-w-[16ch] text-[clamp(1.8rem,3.8vw,2.9rem)] leading-[1.1] font-bold tracking-[-0.03em]">
                    {copy.heading}
                  </h2>
                  <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-muted">{copy.lead}</p>
                </Reveal>

                <div className="mt-11 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((a: Artefact, i: number) => (
                    <Reveal key={a.href} delay={i * 0.09}>
                      <motion.a
                        href={a.href}
                        /* External links leave the site, so they open in a new tab
                           and get rel=noopener. Internal ones stay in place. */
                        target={a.external ? '_blank' : undefined}
                        rel={a.external ? 'noopener noreferrer' : undefined}
                        whileHover={{ y: -6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                        className="halo relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/4 p-7 backdrop-blur-xl transition hover:bg-white/8"
                      >
                        <span className="flex items-center gap-2 self-start rounded-full border border-ember/35 bg-ember/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-ember uppercase">
                          {a.kind}
                          {a.external && (
                            <svg viewBox="0 0 12 12" aria-hidden className="h-2.5 w-2.5 fill-none stroke-current stroke-[1.6]">
                              <path d="M4.5 1.5h6v6M10.5 1.5L5 7M8 9.5v1h-6.5V4h1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <h3 className="mt-5 text-xl font-semibold tracking-tight">{a.title}</h3>
                        <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-muted">
                          {a.blurb}
                        </p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ember">
                          {a.cta}
                        </span>
                      </motion.a>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        {/* ---------------- Note ---------------- */}
        <section className="mx-auto max-w-6xl px-5 py-24">
          <Reveal>
            <p className="mb-3 text-[15px] font-semibold text-ember">A note on the material</p>
            <h2 className="max-w-[20ch] text-[clamp(1.8rem,3.8vw,2.9rem)] leading-[1.1] font-bold tracking-[-0.03em]">
              Built the way the session teaches
            </h2>
            <div className="mt-6 border-l-2 border-ember/70 pl-6">
              <p className="max-w-[72ch] text-[15px] leading-relaxed text-muted">
                These pages were made with the same tools the session covers, and grounded and
                checked the way the session shows. Treat them as a starting point rather than a
                finished text: adapt them to your own paper, and verify anything you intend to put
                your name to.
              </p>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  )
}
