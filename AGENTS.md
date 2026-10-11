# AGENTS.md

Single-page personal portfolio (Irgi Febryansyah). Next.js 16 App Router + React 19, Tailwind v4, GSAP/ScrollTrigger/Flip, Lenis smooth scroll. Deployed on Vercel.

## Commands

```bash
npm run dev          # next dev (port 3000)
npm run build        # next build (Turbopack); also runs typecheck
npm start            # serve the production build
npm run lint         # eslint (flat config, eslint-config-next)
npx tsc --noEmit     # typecheck — there is no script for this
```

No tests, no CI, no Prettier config, no `src/`. Path alias `@/*` points at the **repo root**, so imports read `@/components/...`, `@/lib/...`.

## Layout

- `app/page.tsx` — the entire page (~790 lines: hero, services, about, experience, work, process, contact, footer). Section components live in the same file below the page.
- `lib/projects.ts` — **all copy/content lives here** (projects, stacks, services, process steps, socials, accent-class maps). Edit content here, not in `page.tsx`.
- `components/*` — client-only widgets (`"use client"`): `SmoothScroll`, `PageAnimations`, `Nav`, `VideoCard`, `VideoModal`, `CursorGlow`, `Marquee`, `TiltCard`, `Typewriter`, `LiveClock`, `ThemeToggle`.
- `app/globals.css` — the whole design system (see tokens + component classes like `.card`, `.btn`, `.pill`, `.eyebrow`, `.display-*`).
- `public/videos/*.mp4` — demo clips referenced by `lib/projects.ts`; `app/opengraph-image.tsx` renders the OG image (`runtime = "nodejs"`), `app/sitemap.ts` the sitemap.
- `BASE_URL` (`https://irgifebry.vercel.app`) is hardcoded in `app/layout.tsx` and drives metadata, OG, JSON-LD. Change the domain there.

## Design tokens (Tailwind v4)

No `tailwind.config.js` — tokens are CSS-first in `app/globals.css`:

- `@theme` maps `--color-*` / `--font-*` / `--radius-*` to utility classes (`bg-panel`, `text-signal`, `text-steel`, …).
- Raw values live in **two** blocks: `:root, html.dark` and `html.light`. A new color or changed accent must be added to both, plus registered in `@theme`.
- Accent set is fixed: `signal`, `pop`, `grape`, `aqua` (`accentClass` / `accentBgClass` in `lib/projects.ts`).
- Fonts come only from `next/font/google` in `app/layout.tsx` → `--font-display` (Space Grotesk), `--font-body` (Plus Jakarta Sans), `--font-mono` (JetBrains Mono). Don't add font imports or raw font stacks elsewhere.

## Theming

- `<html>` ships with `dark`; a blocking inline script in `app/layout.tsx` swaps `light`/`dark` from `localStorage.theme` before paint (hence `suppressHydrationWarning`).
- `ThemeToggle` mutates the `html` classes + `localStorage.theme` directly. Don't introduce a theme context or a competing source of truth.

## Animation contract (easy to break)

- **Lenis owns scrolling.** `SmoothScroll` is mounted in `app/layout.tsx` *before* `{children}` and already drives its own rAF loop plus a global `a[href^="#"]` click interceptor. Never add a second rAF, `scrollIntoView`, or `scroll-behavior` handler. `Nav` intentionally does not `preventDefault()`.
- **Never nest `[data-reveal]` scopes.** Each `[data-reveal-item]` must get exactly one tween; a nested scope re-applies `opacity: 0` and content stays invisible.
- Don't call `ScrollTrigger.refresh()` after mount — it restarts every `from` tween and replays the reveal. A 4s failsafe force-reveals anything still hidden; if content looks stuck, look for a double tween, not the failsafe.
- Hooks read by the animation layer: `data-reveal`, `data-reveal-item`, `data-line-hero`, `data-rule`, `data-parallax`, `data-sticker`, `data-magnetic`.
- `prefers-reduced-motion` is honored in both CSS and JS (`PageAnimations`, `VideoCard`, `VideoModal`). Gate new motion on `window.matchMedia("(prefers-reduced-motion: reduce)").matches`.
- Video modal: `VideoCard` dispatches `window` `CustomEvent("open-video", { detail: { src, slug, rect } })`; `VideoModal` (mounted in `page.tsx`) listens and animates from the card rect. Both it and the `Nav` drawer set `document.body.style.overflow` — only one at a time.
- `VideoCard` lazy-assigns `video.src` on intersect (`preload="none"`); don't hardcode `src` on the element or the clips load eagerly.

## Other gotchas

- `eslint.config.mjs` deliberately turns off `react-hooks/set-state-in-effect` (used by `ThemeToggle`, `LiveClock`). Don't "fix" it.
- `@microsoft/clarity` is installed but never imported — analytics is not wired.
- `dev.log` / `start.log` are stale local run logs, not sources of truth.