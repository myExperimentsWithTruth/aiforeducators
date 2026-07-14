# AI for Educators

A five-session, hands-on faculty workshop at **G.B. Pant University of
Agriculture and Technology, Pantnagar** — helping faculty use AI with
judgement rather than hype.

The workshop is based on the idea of **Brain 3.0**, an initiative of the
Hon'ble Vice-Chancellor, Dr. Shivendra Kumar Kashyap.

**Live at [myexperimentswithtruth.github.io/aiforeducators](https://myexperimentswithtruth.github.io/aiforeducators/)**

Everything here — the slides, the run sheets, and the site itself — was built
with the same AI tools the sessions teach, and grounded and verified the way
the sessions show.

## Stack

React 19, Vite, Tailwind CSS 4 and Motion, built to static files and served by
GitHub Pages.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # serve the production build
```

Pushing to `main` builds and deploys automatically via
`.github/workflows/deploy.yml`.

## Layout

| Path | Purpose |
|------|---------|
| `src/App.tsx` | Router and page shell. |
| `src/data.ts` | The single source of truth for sessions and their material. |
| `src/pages/` | Home and the session page. |
| `src/components/Primitives.tsx` | Motion primitives: reveal, scroll-fade, aurora, progress. |
| `src/components/Chrome.tsx` | The floating navigation rail and footer. |
| `src/index.css` | Theme tokens and keyframes. |
| `public/session-*/` | Session material, served verbatim. |

### Adding a session

Add an entry to `SESSIONS` in `src/data.ts` and drop its material into
`public/session-N/`. The rail, the programme list and the routes all read from
that array, so nothing else needs touching.

## Design notes

- **Hash routing** (`#/session-1`) is deliberate. GitHub Pages has no rewrite
  rule, so a real path would 404 on refresh or on a shared deep link.
- **Session material is self-contained.** Each deck, card and run sheet is a
  single standalone file with its own styles, so any one of them can be saved,
  mailed, or opened on its own. They are served as static files and are not
  part of the React build.
- **Motion respects the user.** Every animation — the aurora, the kinetic
  headline, the scroll-linked hero, the magnetic buttons — switches off under
  `prefers-reduced-motion`. Reveals degrade to a plain fade.
- **The system font stack** (`-apple-system`, SF Pro) means no font CDN and no
  external requests.

## License

Released under the **MIT License** — free to reuse, adapt and redistribute,
with attribution. See [`LICENSE`](LICENSE).

Faculty anywhere are welcome to take this material, adapt it to their own
discipline, and run it themselves.
