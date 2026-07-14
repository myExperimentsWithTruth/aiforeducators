import { motion } from 'motion/react'
import { Reveal, ScrollFade, Magnetic } from '../components/Primitives'
import { SESSIONS, PILLARS } from '../data'

export function Home({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <ScrollFade>
        <section className="relative z-10 flex min-h-[88vh] flex-col items-center justify-center px-5 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 rounded-full border border-white/12 bg-white/4 px-4 py-1.5 text-[13px] text-mist/70 backdrop-blur-xl"
          >
            G.B. Pant University of Agriculture and Technology
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="kinetic max-w-[14ch] text-[clamp(2.75rem,8.5vw,6.5rem)] leading-[0.98] font-bold tracking-[-0.04em]"
          >
            AI for Educators
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[34ch] text-[clamp(1.1rem,2.2vw,1.6rem)] leading-snug tracking-tight text-muted"
          >
            From basics to practice. Five hands-on sessions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-9 flex flex-wrap justify-center gap-2.5"
          >
            {['5 sessions', 'Every discipline', 'Fully hands-on', 'Tool-neutral'].map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/10 bg-white/4 px-4 py-2 text-[13px] text-mist/70 backdrop-blur-xl"
              >
                {c}
              </span>
            ))}
          </motion.div>

          <motion.a
            href="#programme"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="absolute bottom-8 text-xs tracking-widest text-muted/60 uppercase"
          >
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="block"
            >
              Scroll
            </motion.span>
          </motion.a>
        </section>
      </ScrollFade>

      <main id="main" className="relative z-10">
        {/* ---------------- Overview ---------------- */}
        <section id="overview" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
          <Reveal>
            <p className="mb-3 text-[15px] font-semibold text-ember">Overview</p>
            <h2 className="max-w-[18ch] text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.08] font-bold tracking-[-0.03em]">
              What this workshop does
            </h2>
            <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">
              A practical programme to help faculty use AI with judgement, not hype. Each session is
              led by example and then done live, so by the end you can run the workflow yourself, on
              your own teaching and research.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="halo relative mt-9 max-w-[70ch] overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <p className="text-[15px] leading-relaxed text-mist/80">
                The workshop is based on the idea of{' '}
                <span className="font-semibold text-gold">Brain 3.0</span>, an initiative of the
                Hon'ble Vice-Chancellor,{' '}
                <span className="font-semibold text-gold">Dr. Shivendra Kumar Kashyap</span>, at
                G.B. Pant University of Agriculture and Technology, Pantnagar.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="halo relative h-full rounded-2xl border border-white/10 bg-white/3 p-7 backdrop-blur-xl transition hover:bg-white/6">
                  <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Programme ---------------- */}
        <section id="programme" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
          <Reveal>
            <p className="mb-3 text-[15px] font-semibold text-ember">The programme</p>
            <h2 className="max-w-[18ch] text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.08] font-bold tracking-[-0.03em]">
              Five sessions, five outcomes
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-col gap-5">
            {SESSIONS.map((s, i) => {
              const live = Boolean(s.slug)
              return (
                <Reveal key={s.n} delay={i * 0.06}>
                  <div
                    className={`halo relative grid grid-cols-1 gap-6 rounded-2xl border p-7 backdrop-blur-xl transition sm:grid-cols-[auto_1fr] sm:p-8 ${
                      live
                        ? 'border-white/12 bg-white/4 hover:bg-white/7'
                        : 'border-white/8 bg-white/2'
                    }`}
                  >
                    <div
                      className={`text-4xl font-bold tracking-tighter tabular-nums sm:w-14 ${
                        live ? 'text-ember' : 'text-muted/40'
                      }`}
                    >
                      {String(s.n).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        {live ? (
                          <a
                            href={`#/${s.slug}`}
                            onClick={(e) => {
                              e.preventDefault()
                              onNavigate(`/${s.slug}`)
                            }}
                            className="transition hover:text-ember"
                          >
                            {s.title}
                          </a>
                        ) : (
                          <span className="text-mist/70">{s.title}</span>
                        )}
                      </h3>
                      <p className="mt-2 max-w-[68ch] text-[15px] leading-relaxed text-muted">
                        {s.blurb}{' '}
                        <span className="text-mist/85">Outcome: {s.outcome}</span>
                      </p>
                      {live ? (
                        <Magnetic className="mt-5 inline-block">
                          <a
                            href={`#/${s.slug}`}
                            onClick={(e) => {
                              e.preventDefault()
                              onNavigate(`/${s.slug}`)
                            }}
                            className="inline-flex min-h-10 items-center rounded-full bg-ember px-6 py-2.5 text-sm font-medium text-void shadow-[0_0_26px_rgba(255,90,54,.4)] transition hover:bg-gold"
                          >
                            View details
                          </a>
                        </Magnetic>
                      ) : (
                        <span className="mt-5 inline-block rounded-full border border-dashed border-white/15 px-4 py-1.5 text-xs tracking-wide text-muted/70 uppercase">
                          Not yet run
                        </span>
                      )}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* ---------------- Approach ---------------- */}
        <section id="approach" className="scroll-mt-20 border-y border-white/8 bg-white/2 py-28">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <p className="mb-3 text-[15px] font-semibold text-ember">How it runs</p>
              <h2 className="max-w-[20ch] text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.08] font-bold tracking-[-0.03em]">
                Lead by example, then everyone does it
              </h2>
            </Reveal>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {['Instructor demos a step', 'You repeat it live', 'We pace the room'].map((step, i) => (
                <Reveal key={step} delay={i * 0.12}>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-white/12 bg-white/5 px-5 py-3 text-[15px] backdrop-blur-xl">
                      {step}
                    </span>
                    {i < 2 && <span className="text-sm text-muted">then</span>}
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-[70ch] text-[15px] leading-relaxed text-muted">
                Sessions are tool-neutral. Gemini, ChatGPT, Claude and NotebookLM all appear where
                they fit, and every attendee works on their own laptop with their own teaching and
                research. Responsible use runs through every session: only share what you may, verify
                before you use, and remember the output goes out under your name.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------------- About ---------------- */}
        <section className="mx-auto max-w-6xl px-5 py-28">
          <Reveal>
            <p className="mb-3 text-[15px] font-semibold text-ember">About</p>
            <h2 className="max-w-[18ch] text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.08] font-bold tracking-[-0.03em]">
              Built with the tools it teaches
            </h2>
            <div className="mt-6 border-l-2 border-ember/70 pl-6">
              <p className="max-w-[72ch] text-[15px] leading-relaxed text-muted">
                This workshop was run for the faculty of G.B. Pant University of Agriculture and
                Technology. Its materials, the slides, the run sheets and even this site, were built
                with the same AI tools the sessions teach, and grounded and verified the way the
                sessions show.
              </p>
              <p className="mt-4 max-w-[72ch] text-[15px] leading-relaxed text-muted">
                <span className="font-semibold text-mist">Openly licensed.</span> Released under the
                MIT License, free to reuse, adapt and redistribute, with attribution.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ---------------- Who runs it ---------------- */}
        <section id="who" className="scroll-mt-20 border-t border-white/8 bg-white/2 py-28">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <p className="mb-3 text-[15px] font-semibold text-ember">Who runs it</p>
              <h3 className="text-3xl font-bold tracking-tight">Vaibhav Dobriyal</h3>
              <p className="mt-1.5 text-[15px] text-muted">
                Co-Founder and Chief Product Officer, AI Native Services, LUMIQ
              </p>

              <Magnetic className="mt-5 inline-block">
                <a
                  href="https://www.linkedin.com/in/vaibhavdobriyal/"
                  aria-label="Vaibhav Dobriyal on LinkedIn"
                  className="inline-flex min-h-10 items-center gap-2.5 rounded-full border border-white/12 bg-white/4 px-5 py-2.5 text-sm text-mist/80 backdrop-blur-xl transition hover:border-[#0a66c2] hover:bg-[#0a66c2]/12 hover:text-mist"
                >
                  <svg viewBox="0 0 24 24" aria-hidden className="h-[17px] w-[17px] fill-[#0a66c2]">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </Magnetic>

              <div className="mt-7 border-l-2 border-ember/70 pl-6">
                <p className="max-w-[72ch] text-[15px] leading-relaxed text-muted">
                  Vaibhav Dobriyal is an alumnus of the university. He holds a bachelor's degree in
                  engineering from the College of Technology, GBPUAT, and a master's degree in
                  engineering from IIT Kanpur.
                </p>
                <p className="mt-4 max-w-[72ch] text-[15px] leading-relaxed text-muted">
                  He is Co-Founder and Chief Product Officer of AI Native Services at{' '}
                  <a href="https://www.lumiq.ai" className="text-ember underline-offset-2 hover:underline">
                    LUMIQ
                  </a>
                  , which works exclusively with the financial services industry across the globe.
                  LUMIQ uses LiteCone to take any role in a financial services process and turn it
                  into an AI Coworker.
                </p>
                <p className="mt-4 max-w-[72ch] text-[15px] leading-relaxed text-muted">
                  He works in AI as a practitioner rather than as an educator or a researcher: these
                  are the tools he uses daily on real problems, and the sessions teach them the way
                  he actually uses them. That shapes how the workshop runs. It shows the working
                  process honestly, including the false starts and the corrections, because the
                  judgement worth teaching lives in those moments rather than in a rehearsed result.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  )
}
