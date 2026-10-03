# The Web Bistro

Websites that bring customers in. One chef, no agency, no template tricks.

v3 (2026) — the kitchen at night: a dark obsidian world with a real 3D crest,
extruded brass type, drifting embers, glass surfaces and scroll-driven
storytelling. Bilingual: English and Tiếng Việt.

## Stack

| Piece | What it does |
| --- | --- |
| Next.js 16 + React 19 + TypeScript | App Router, real URLs (`/`, `/menu`, `/work`, `/book`, `/privacy`) |
| three.js + @react-three/fiber + drei | Two scenes: the hero crest and the cloche plate — `src/components/scene/` |
| Glyph pipeline | The "WB;" crest is extruded from real DM Serif Display outlines — `dev tooling/gen-glyphs.mjs` → `src/components/scene/glyphs.json` |
| GSAP + ScrollTrigger | Pinned "how service runs" station pan, header scroll-progress line |
| Lenis | Smooth scrolling — `src/components/providers/SmoothScroll.tsx` |
| Motion | Blur-to-sharp entrances and reveals — `src/components/ui/Reveal.tsx` |
| CSS tokens + CSS modules | No CSS framework. Tokens in `src/app/globals.css` |

All motion collapses under `prefers-reduced-motion`; the boot loader is skipped,
the 3D scenes freeze, pins fall back to plain lists.

## Brand

- **Colours** — obsidian `#0A0806`, cream `#F7F1E6`, copper `#D98E4A`, ember `#E2603A`.
- **Type** — DM Serif Display (also the crest's source font), Manrope (body),
  JetBrains Mono (tickets & labels). VI swaps the display serif to Noto Serif Display.
- **Mark** — "WB;" — the semicolon is the house punctuation, served on a brass plate.
- **Favicon** — `src/app/icon.svg`, drawn from the same glyph outlines.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint       # oxlint
```

## Editing content (no code needed)

- **`src/lib/content.ts`** — services, prices, FAQ, process stations, house
  rules, contact details, the form endpoint.
  - ⚠ **`PRICES` are launch placeholders** (marked in the file). Replace the
    amounts with real numbers before launch; the hero chip, menu, specials and
    care banner all read from there.
- **`src/lib/i18n.ts`** — every English → Vietnamese translation. English
  strings are the source of truth; `t('...')` looks them up.

House punctuation rule: **no em dashes or en dashes anywhere user-visible.**
Hyphen only. The `check:i18n` and `check:render` scripts enforce coverage.

## The 3D scenes

- **Hero crest** (`CrestScene.tsx`): extruded "WB;" glyphs above a turning
  brass plate, cutlery crossed behind, steam + ember particles. The letters
  come from `glyphs.json` (font-unit accurate), not a runtime font.
- **Plate scene** (`PlateScene.tsx`): the cloche lifts on hover or on its own
  service rhythm and reveals the little site being served.
- To rebuild the glyph data after a font change:
  `node "dev tooling/gen-glyphs.mjs"` (see the header of that script for the
  TTF download it expects in `gen/`).

## The booking form

`/book` posts JSON to Formspree (form `xdeokvek`) → tricuongdao75@gmail.com.
Configured via `FORM_ENDPOINT` in `src/lib/content.ts`; falls back to the
visitor's mail client if the POST fails.

> One-time Formspree setting: AJAX submissions are rejected with a 403 until
> reCAPTCHA is disabled for this form (https://formspree.io/forms/xdeokvek/settings).

## Verification

```bash
npm run check:i18n     # every rendered string has a VI translation
npm run check:render   # needs a server on :3000 — drives headless Edge via
                       # CDP: asserts all routes (EN + VI), watches console
                       # errors, saves screenshots to dev tooling/shots/
node "dev tooling/capture.mjs" / home   # scroll-through screenshots
```

## Deploying (Vercel)

- `vercel.json` declares `"framework": "nextjs"`.
- If the Vercel project still has the old **Framework Preset pinned to Vite**
  (Project → Settings → Build & Development), switch it to **Next.js** once.
- The old Vite version of the site lives on the local `legacy-vite` git branch;
  the cream/green v2 lives in the git history before the v3 commit.

## Layout

```
src/
  app/            routes (layout, page, menu, work, book, privacy, 404,
                  icon.svg, sitemap, robots)
  components/
    home/         hero + home sections
    scene/        CrestScene, PlateScene, glyphs, canvas textures
    layout/       header pill, footer, boot loader, route sweep
    ui/           wordmark, reveals, marquee, split-flap, dials, ticket
    providers/    language, smooth scroll, sweep
    menu/ work/ book/ legal/   page bodies
  lib/            content.ts (copy & data), i18n.ts (translations)
```
