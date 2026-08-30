# The Web Bistro

Single-page-style portfolio site for The Web Bistro, built with React 19 + Vite. No router, no state library, no CSS framework — hash routing and inline styles keep the bundle tiny.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint     # oxlint
```

## Contact form → your email

The booking form on `#/book` sends every order to **tricuongdao75@gmail.com**. It is wired to Formspree via one constant in `src/i18n.js`:

```js
export const FORM_ENDPOINT = 'https://formspree.io/f/xdeokvek';
```

- **With the endpoint set (current):** submissions POST as JSON to Formspree ([form xdeokvek](https://formspree.io/f/xdeokvek)), which emails them to the bistro inbox — no mail-client hop for the visitor. Manage submissions at [formspree.io/forms](https://formspree.io/forms).
- **`''` (fallback mode):** submitting opens the visitor's mail client with the order pre-filled (name, email, dishes picked, message) and addressed to the bistro inbox.

> **One-time Formspree setting:** AJAX submissions are rejected with a 403 until reCAPTCHA is disabled for this form. Go to <https://formspree.io/forms/xdeokvek/settings> → **reCAPTCHA** → toggle **off** (the site already ships its own `_gotcha` honeypot, so spam protection is covered).

How the submission works (Formspree's AJAX API — plain `fetch`, no SDK dependency):

- POSTs JSON with `Accept: application/json` (fields: `name`, `email`, `message`, `dishes`, plus `_replyto` and `_subject`).
- A honeypot field (`_gotcha`) is rendered in this mode to catch spam bots.
- The visitor's email is validated client-side first; server-side errors surface in a `role="alert"` region (EN/VI).
- On any send failure the form shows a direct `mailto:` fallback link, so no order is ever silently lost.

## Pages & routing

Hash routing (`#/`, `#/menu`, `#/work`, `#/book`) — deep links and browser back/forward work with no router dependency. Nav links are real `<a>` elements; each page sets its own `document.title`.

## i18n

All copy lives in `src/i18n.js`. English strings are the source of truth; Vietnamese translations are looked up at render time. `<html lang>` stays in sync and the choice persists in `localStorage`.

## Verification scripts

All verification tooling lives in `dev tooling/` and is wired to npm scripts:

```bash
npm run lint             # oxlint
npm run check:i18n       # every EN string has a VI translation
npm run check:render     # SSR-render all pages, assert content (33 checks)
npm run check:hover      # CDP hover/sticky-hover checks (dev server on :5173)
```

## Performance notes

- The 55ms hero animation interval only runs on the home page and pauses in hidden tabs.
- Google Fonts load via `preconnect` + `<link>` in `index.html` (not a blocking `@import` inside CSS).
- Reveal stagger timers are cleaned up on page change; hover state is skipped on touch-only devices.
