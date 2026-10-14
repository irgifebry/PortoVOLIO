# AGENTS.md

Single-page personal portfolio (Irgi Febryansyah). Next.js 16 App Router + React 19,
Tailwind v4, GSAP/ScrollTrigger, Lenis smooth scroll. Deployed on Vercel.

Design direction is **"loud and flat"** (see REDESIGN-PLAN.md). Flat saturated colour
fields, one condensed cut of one typeface, square corners throughout, no shadows at rest.

## Commands

```bash
npm run dev          # next dev (port 3000)
npm run build        # next build (Turbopack); also runs typecheck
npm start            # serve the production build
npm run lint         # eslint (flat config, eslint-config-next)
npx tsc --noEmit     # typecheck — there is no script for this
```

No tests, no CI, no Prettier config, no `src/`. Path alias `@/*` points at the **repo
root**, so imports read `@/components/...`, `@/lib/...`.

The design gate needs a browser. Chromium lives in the Playwright cache and the
inspector does not find it on its own:

```bash
export CHROME_PATH=$HOME/.cache/ms-playwright/chromium-*/chrome-linux64/chrome
node <taste-skill>/scripts/lint.mjs app components lib
node <taste-skill>/scripts/inspect.mjs http://localhost:3000
```

## Layout

- `app/page.tsx` — the entire page: pinned work run, intro, capabilities (lens), index,
  about, numbers, experience, contact, footer. Section components live in the same file.
- `lib/projects.ts` — **all copy/content lives here** (panels, index projects, services,
  statements, figures, socials, stacks). Edit content here, not in `page.tsx`.
- `components/*` — client-only widgets (`"use client"`): `SmoothScroll`, `PageAnimations`,
  `Nav`, `PinnedPoster`, `PanelVideo`, `Lens`, `ThemeToggle`.
- `app/globals.css` — the whole design system (tokens, both themes, and component classes
  like `.btn`, `.field-red`, `.capability`, `.tile`, `.bar`, `.row-link`, `.poster-*`).
- `public/videos/*.mp4` + `public/posters/*.jpg` — the four project demos. These ARE the
  page's imagery; there is no stock photography and none should be added.
- `app/opengraph-image.tsx` (`runtime = "nodejs"`), `app/sitemap.ts`.
- `BASE_URL` (`https://irgifebry.vercel.app`) is hardcoded in `app/layout.tsx`.

## Design tokens (Tailwind v4)

No `tailwind.config.js` — tokens are CSS-first in `app/globals.css`.

- `@theme` maps `--color-*` / `--font-*` / `--text-*` to utilities (`bg-s2`, `text-accent`,
  `text-head`, …).
- Ground/surfaces/ink/muted/accent live in **two** blocks: `:root, html.dark` and
  `html.light`. A new colour must be added to BOTH.
- Colour **fields** (`--f-red`, `--f-maroon`, `--f-mustard`, `--f-slate`, `--f-bone`) are
  declared once in `:root` and are identical in both themes on purpose.
- **Pick a field's class against what surrounds it, never against `--c-accent`.** The
  accent is mustard in dark mode, so an accent-coloured tile on the mustard stats section
  is invisible. This has already happened once.
- Fonts come only from `next/font/google` in `app/layout.tsx` → `--f-display` (Archivo).
  `--font-sans` and `--font-body` all alias the same variable.

## Type

One family: **Archivo**, loaded with `axes: ["wdth"]`. Without that axis argument
`font-stretch` is silently ignored and display type loses its condensed cut. Check the
built CSS contains `font-stretch:62% 125%` if the headline ever looks too wide.

Display is set at `font-weight: 800` + `font-stretch: 62%` (see `.display`,
`.section-title`, `.head`, `.capability__name`, `.tile__figure`). Small sub-heads stay
at normal width — condensing a small size costs legibility.

Five size steps, and `--text-section` is not a spare: `--text-head` is already the
poster-scale step the capabilities list and the experience band use, so section titles
set in `head` came out the same size as the subsection names beneath them and the page
could not be scanned for position. Hierarchy is `--text-display` (hero name) →
`--text-section` (`.section-title`, **always the first thing in its section**) →
`--text-head` (subsection names) → `--text-lead` → `--text-body` (`--text-small` aliases
body). Don't add a sixth, and don't reintroduce a container-unit heading size — a
section title outside this scale is what broke scannability once already.

## Theming

`<html>` ships with `dark`; a blocking inline script in `app/layout.tsx` swaps
`light`/`dark` from `localStorage.theme` before paint (`suppressHydrationWarning`).
`ThemeToggle` mutates the html classes + localStorage directly. Don't introduce a theme
context.

## Animation contract (easy to break)

- **Lenis owns scrolling.** `SmoothScroll` is mounted in `app/layout.tsx` *before*
  `{children}`, runs its own rAF loop, and intercepts `a[href^="#"]` clicks. Never add a
  second rAF, `scrollIntoView`, `scroll-behavior`, or `preventDefault` in `Nav`.
- **Never nest `[data-reveal]` scopes.** A nested scope re-applies `opacity: 0`.
- **Don't call `ScrollTrigger.refresh()` after mount** — it replays every reveal.
- **The masked hero reveal has three traps, all hit at least once.** The hidden state is
  `transform: translateY(105%)` in CSS. GSAP parses that as `y: 72.81px`, so a tween that
  sets only `yPercent` never rises. Always set **both** `yPercent` and `y: 0`. Also: do
  not put the `js-lines` class on anything but `<html>` — the rule is scoped as
  `html.js-lines` precisely so it cannot be inherited from a wrapper. And do not
  `clearProps` the settled transform, or the hidden-state CSS rule re-applies.
- **`gsap.from` + `scrollTrigger` needs `immediateRender: true`.** GSAP makes the
  from-half of a `from()` tween lazy, so with a ScrollTrigger the items paint
  *visible* and only snap to opacity 0 when the trigger fires — the entrance plays
  once, but from a visible state, which reads as a flash.
- A 4s failsafe force-reveals `[data-reveal-item]` **and** `[data-hero-line]`, but
  **only groups whose ScrollTrigger is no longer in `ScrollTrigger.getAll()`**. A blind
  "reveal everything under 0.9 opacity" rescued sections the visitor had not reached,
  and each of them then replayed its entrance on the way down — the page looked like
  it reloaded twice. Rescuing a live trigger's items races it, so don't.
- Hooks: `data-reveal`, `data-reveal-item`, `data-hero-line`.
- `prefers-reduced-motion` honoured in CSS and JS (`PageAnimations`, `PanelVideo`).
- `PanelVideo` assigns `video.src` lazily on intersect (`preload="none"`); never hardcode
  `src` on the element or all four clips load eagerly.

## House-style rules this page holds to

No shadows at rest, no gradients, no glass, no outlines as decoration, no index numbers
(`01/02/03`), no eyebrow labels, no tiny tracked caps, no monospace outside real code, no
icon-topped card rows, no emoji.

One is load-bearing and was caught by the gate:

- A small label directly above a heading reads as an **eyebrow badge**. Fold the
  information into the sentence instead (this is why "Shipped as X." is now part of the
  blurb, and why the year sits inside the panel's meta run).

Don't reintroduce panel rotation. Two frames used to carry a `tilt` flag rotated ±2.2deg to
break the run of equal rectangles; it read as crooked video, not as a deliberate poster cut.
Every `.poster-panel` is square to the grid.

## Gotchas

- `eslint.config.mjs` turns off `react-hooks/set-state-in-effect` on purpose
  (`ThemeToggle`). Don't "fix" it.
- `@microsoft/clarity` is installed but never imported.
- The lens toggle (`components/Lens.tsx`) is CSS-only: radio inputs + `html:has()`.
  No state, no context, no hydration. Keep it that way.
- `dev.log` / `start.log` are stale local run logs, not sources of truth.