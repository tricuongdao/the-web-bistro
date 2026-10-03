import type Lenis from 'lenis';

declare global {
  interface Window {
    /** the live Lenis instance (absent under reduced motion) */
    __lenis?: Lenis;
  }
}

/** Jump (or glide) back to the top of the page. */
export function scrollToTop(immediate = false) {
  const l = window.__lenis;
  if (l) l.scrollTo(0, { immediate });
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}

/** Glide to an element by id, leaving room for the sticky header. */
export function scrollToId(id: string, offset = -96) {
  const el = document.getElementById(id);
  if (!el) return;
  const l = window.__lenis;
  if (l) l.scrollTo(el, { offset });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
