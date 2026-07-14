# AI for Educators

A five-session, hands-on faculty workshop at **G.B. Pant University of
Agriculture and Technology, Pantnagar** — helping faculty use AI with
judgement rather than hype.

The workshop is based on the idea of **Brain 3.0**, an initiative of the
Hon'ble Vice-Chancellor, Dr. Shivendra Kumar Kashyap.

This repository is the workshop's website and its session material. Everything
here — the slides, the run sheets, and the site itself — was built with the
same AI tools the sessions teach, and grounded and verified the way the
sessions show.

## What's here

| Path | Purpose |
|------|---------|
| `index.html` | The workshop home page. |
| `session-1.html` | Session 1 — Foundations and landscape. |
| `session-1/deck.html` | The Session 1 slide deck. |
| `session-1/takeaway-card.html` | The Session 1 takeaway card. |
| `session-2.html` | Session 2 — Grounded material with NotebookLM. |
| `session-2/case-study.html` | Case study: inventing a course with AI. |
| `session-2/run-sheet.html` | The Session 2 class run sheet. |
| `session-2/takeaways.html` | The Session 2 key takeaways. |
| `assets/style.css` | The shared stylesheet for the site pages. |
| `LICENSE` | MIT License. |

Sessions 3 to 5 are added as they run.

## How it's built

Plain, static HTML. No build step, no dependencies, no JavaScript framework —
edit a file and push, and the change is live.

- **Type and layout** follow an Apple-style system: the native system font
  stack (`-apple-system`, SF Pro), large tight-tracked headlines, and generous
  spacing. Nothing is downloaded from a font CDN, so the site pages make no
  external requests and render instantly offline.
- **Colour** is GBPUAT maroon (`#79211C`) on Apple's neutral greys. Every text
  and background pair meets the WCAG AA contrast minimum of 4.5:1.
- **Accessibility** is built in: a skip link, visible focus rings for keyboard
  users, `aria-current` on the active session, and full support for
  `prefers-reduced-motion`.
- **The session pages** share `assets/style.css`. The session material — decks,
  cards, run sheets — is deliberately self-contained in a single file each, so
  any one of them can be saved, mailed, or opened on its own.

## Running it locally

Open `index.html` in a browser. That's it.

## License

Released under the **MIT License** — free to reuse, adapt and redistribute,
with attribution. See [`LICENSE`](LICENSE).

Faculty anywhere are welcome to take this material, adapt it to their own
discipline, and run it themselves.
