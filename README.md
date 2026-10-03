# The Web Bistro

Websites that bring customers in. One chef, no agency, no template tricks.

Rebuilt in 2026 on **Next.js (App Router)**: real routes, a WebGL hero, scroll-driven
storytelling, and smooth scrolling. Bilingual: English and Tiếng Việt.

## Stack

| Piece | What it does |
| --- | --- |
| Next.js 16 + React 19 + TypeScript | App Router, real URLs (`/`, `/menu`, `/work`, `/book`, `/privacy`) |
| three.js + @react-three/fiber + drei | The hero scene: brass cloche, floating order tickets, steam — `src/components/scene/` |
| GSAP + ScrollTrigger | Pinned "how service runs" station pan, header scroll progress |
| Lenis | Smooth scrolling — `src/components/providers/SmoothScroll.tsx` |
| Motion | Reveals and micro-interactions — `src/components/ui/Reveal.tsx` |
| CSS tokens + CSS modules | No CSS framework. Palette/type tokens in `src/app/globals.css` |

All motion collapses cleanly under `prefers-reduced-motion` (no Lenis, no pins,
the 3D scene freezes, every reveal is instant).

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint       # oxlint
```

## Editing content (no code needed)

- **`src/lib/content.ts`** — everything structured: services, prices, FAQ,
  process stations, house rules, contact details, the form endpoint.
  - ⚠ **`PRICES` are launch placeholders** (marked in the file). Replace the
    amounts with real numbers before launch; the menu, specials and care banner
    all read from there.
- **`src/lib/i18n.ts`** — every English → Vietnamese translation. English
  strings are the source of truth; `t('...')` looks them up.

House punctuation rule: **no em dashes or en dashes anywhere user-visible.**
Hyphen only. The `check:i18n` and `check:render` scripts enforce coverage and
flag stray dashes.

## The booking form

`/book` posts JSON to Formspree (form `xdeokvek`) → tricuongdao75@gmail.com.
Configured via `FORM_ENDPOINT` in `src/lib/content.ts`:

- **Set (current):** submissions POST via Formspree's AJAX API with a `_gotcha`
  honeypot and `_replyto`. If the POST fails, the form shows a direct `mailto:`
  fallback so no order is ever silently lost.
- **`''` (fallback mode):** submitting opens the visitor's mail client with the
  order pre-filled.

> One-time Formspree setting: AJAX submissions are rejected with a 403 until
> reCAPTCHA is disabled for this form (https://formspree.io/forms/xdeokvek/settings).

## Verification

```bash
npm run check:i18n     # every rendered string has a VI translation
npm run check:render   # needs `npm run dev` on :3000 — drives headless Edge
                       # via CDP: asserts all routes (EN + VI), watches for
                       # console errors, saves screenshots to dev tooling/shots/
```

## Deploying (Vercel)

- `vercel.json` declares `"framework": "nextjs"`.
- If the Vercel project still has the old **Framework Preset pinned to Vite**
  (Project → Settings → Build & Development), switch it to **Next.js** once.
  After that, every push to the production branch ships.
- The old Vite version of the site lives on the local `legacy-vite` git branch.

## Layout

```
src/
  app/            routes (layout, page, menu, work, book, privacy, 404, sitemap)
  components/
    home/         hero + home sections
    scene/        the WebGL pass (cloche, tickets, steam, textures)
    layout/       header, footer, route sweep
    ui/           awning mark, reveals, marquee, split-flap, dials, ticket
    providers/    language, smooth scroll, sweep
    menu/ work/ book/ legal/   page bodies
  lib/            content.ts (copy & data), i18n.ts (translations)
```
