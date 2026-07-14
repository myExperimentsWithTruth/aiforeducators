export type Artefact = {
  kind: string
  title: string
  blurb: string
  href: string
  cta: string
}

export type Session = {
  n: number
  slug: string | null
  title: string
  tag: string
  blurb: string
  outcome: string
  covered?: string[]
  artefacts?: Artefact[]
}

/** The base path Vite serves under. Artefacts are static files, not routes. */
export const BASE = import.meta.env.BASE_URL

export const SESSIONS: Session[] = [
  {
    n: 1,
    slug: 'session-1',
    title: 'Foundations and landscape',
    tag: 'A shared mental model of AI, and how to ask for what you want.',
    blurb:
      'A shared mental model of AI, prompting with Context, Role, Task and Format, the tool landscape, and responsible-use guardrails.',
    outcome: 'You can prompt well and know where AI fits.',
    covered: [
      'A working mental model of what AI is and what it is not.',
      'Prompting with Context, Role, Task and Format.',
      'The tool landscape, covered evenhandedly rather than sold.',
      'Responsible use: what to share, what to verify, what you own.',
    ],
    artefacts: [
      {
        kind: 'Slides',
        title: 'The Session 1 deck',
        blurb:
          'The full slide deck as it ran in the room, from the mental model through prompting to the landscape and guardrails.',
        href: `${BASE}session-1/deck.html`,
        cta: 'View the deck',
      },
      {
        kind: 'One-pager',
        title: 'The key takeaway card',
        blurb:
          'The single sheet worth keeping: the Context, Role, Task, Format prompt pattern and the pattern map, on one page.',
        href: `${BASE}session-1/takeaway-card.html`,
        cta: 'View the takeaway card',
      },
    ],
  },
  {
    n: 2,
    slug: 'session-2',
    title: 'Grounded material with NotebookLM',
    tag: 'Your own readings in, cited and verifiable material out.',
    blurb:
      'Turn your own readings and course PDFs into grounded, low-hallucination material.',
    outcome:
      'Study guides, summaries and quizzes from your own sources, cited and verifiable.',
    covered: [
      'What grounding is, and why a prompt cannot replicate it.',
      'Two tools, two jobs: where a chat assistant ends and NotebookLM begins.',
      'Decomposing the work so quality holds across a long build.',
      'Verifying a citation, every time, before you rely on it.',
    ],
    artefacts: [
      {
        kind: 'Case study',
        title: 'Inventing a course with AI',
        blurb:
          'The worked example the session is built around: a full course invented from nothing, grounded in real sources, with the wrong turns left in.',
        href: `${BASE}session-2/case-study.html`,
        cta: 'View the case study',
      },
      {
        kind: 'Run sheet',
        title: 'The class run sheet',
        blurb:
          'The live build, step by step: write the objectives, find the research, draft the outline, gather sources, then consolidate and ground it.',
        href: `${BASE}session-2/run-sheet.html`,
        cta: 'View the run sheet',
      },
      {
        kind: 'One-pager',
        title: 'The key takeaways',
        blurb:
          'The single sheet worth keeping: what grounding is, which tool does which job, and why a citation is only worth as much as your check of it.',
        href: `${BASE}session-2/takeaways.html`,
        cta: 'View the takeaways',
      },
    ],
  },
  {
    n: 3,
    slug: null,
    title: 'Communication and reports',
    tag: 'Sharper writing and reporting, built to carry weight.',
    blurb:
      'Sharper writing and reporting with AI, building to a full-length report.',
    outcome: 'A top-notch reporting workflow you can reuse.',
  },
  {
    n: 4,
    slug: null,
    title: 'Course materials and assessment',
    tag: 'Outlines, materials and assessment, grounded in your sources.',
    blurb:
      'Build outlines, materials and assessments faster, grounded in your sources.',
    outcome: 'A course toolkit you can apply to your own paper.',
  },
  {
    n: 5,
    slug: null,
    title: 'Responsible use and action planning',
    tag: 'Privacy, disclosure and accountability, turned into a plan.',
    blurb:
      'Data privacy, disclosure, verification and accountability, turned into a plan.',
    outcome: 'A personal, responsible AI plan for your department.',
  },
]

export const PILLARS = [
  {
    title: 'Capability, not tools',
    body: 'Prompting, grounding, agents and patterns: the ideas that outlast any single product.',
  },
  {
    title: 'Judgement over hype',
    body: 'Where AI helps, where it fails, and how to verify, so the output is safe to use.',
  },
  {
    title: 'Hands-on, always',
    body: 'You do every step yourself, on your own material, in the session.',
  },
]
