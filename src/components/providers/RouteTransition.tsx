'use client';

/*
 * Route transition — the pass curtain.
 *
 * Clicking an internal link drops a dark panel over the page, copper edge
 * leading and the waybill on it (the house mark, then the destination),
 * while the next route renders behind it. The panel then carries on up and
 * off the top. Navigation is held behind the curtain, so a slow route
 * shows something made instead of a half-painted page.
 *
 * The interception is deliberately light. It only takes plain left clicks
 * on same-origin links that actually change the route; modified clicks,
 * downloads, external links and in-page anchors are left alone. Under
 * prefers-reduced-motion nothing is intercepted at all. A route change we
 * did not start (back button, another component's push) still gets the
 * curtain, just without the wait, so the motion language stays whole.
 *
 * The panel is animated imperatively: it is decoration, and the label has
 * to be on the screen in the same frame the curtain starts moving.
 */

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { useLang } from '@/components/providers/LangProvider';
import { NAV } from '@/lib/content';
import styles from './providers.module.css';

/** seconds: how long the curtain takes to cover, to hold, and to leave */
const COVER = 0.3;
const HOLD = 0.1;
const REVEAL = 0.4;
/** if a route never lands (offline, a cold compile), show the page anyway */
const PATIENCE = 4000;

/** destinations that are not in the main nav, so the curtain can name them */
const ALSO: [label: string, href: string][] = [['Privacy', '/privacy']];
const ROUTES = [...NAV, ...ALSO];

/** what we print on the curtain for a destination */
function routeLabel(path: string): string {
  const hit = ROUTES.find(([, href]) => href === path);
  if (hit) return hit[0];
  const seg = path.split('/').filter(Boolean).pop();
  return seg ? seg.replace(/-/g, ' ') : 'Front of house';
}

/**
 * The destination of an internal link click, or null when the browser
 * should keep the click (modified click, download, external link, an
 * anchor on the page we are already on).
 */
function destination(a: HTMLAnchorElement, e: MouseEvent, current: string): string | null {
  if (e.defaultPrevented || e.button !== 0) return null;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  if (a.target && a.target !== '_self') return null;
  if (a.hasAttribute('download')) return null;
  const raw = a.getAttribute('href');
  if (!raw || raw.startsWith('#')) return null;

  let url: URL;
  try {
    url = new URL(a.href, window.location.href);
  } catch {
    return null;
  }
  if (url.origin !== window.location.origin) return null;
  const trim = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);
  if (trim(url.pathname) === trim(current)) return null; // same page: in-page anchors, repeat clicks
  return `${url.pathname}${url.search}${url.hash}`;
}

export default function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLang();

  const panel = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const first = useRef(true);
  const here = useRef(pathname);
  const busy = useRef(false);
  /** a click we are covering for: covered = curtain is down, landed = route is in */
  const pending = useRef<{ covered: boolean; landed: boolean; timer: number } | null>(null);

  useEffect(() => {
    const el = panel.current;
    const box = inner.current;
    if (!el) return;

    const paint = (dest: string) => {
      if (label.current) label.current.textContent = t(routeLabel(dest));
    };

    /* cover the page: the panel rises, the waybill rides up with it */
    const coverIn = () => {
      tl.current?.kill();
      gsap.set(el, { display: 'block', yPercent: 100 });
      if (box) gsap.set(box, { autoAlpha: 0, y: 28, filter: 'blur(10px)' });
      const line = gsap.timeline();
      line.to(el, { yPercent: 0, duration: COVER, ease: 'power3.out' });
      if (box) {
        line.to(box, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.3, ease: 'power3.out' }, 0.05);
      }
      tl.current = line;
      return line;
    };

    /* and leave the way it came, carrying on up and off the top */
    const coverOut = () => {
      tl.current?.kill();
      const line = gsap.timeline({ onComplete: () => gsap.set(el, { display: 'none' }) });
      if (box) line.to(box, { autoAlpha: 0, y: -18, duration: 0.2, ease: 'power2.in' }, 0);
      line.to(el, { yPercent: -100, duration: REVEAL, ease: 'power2.in' }, 0.04);
      tl.current = line;
      return line;
    };

    /* the route changed under our feet, or before we arrived: one quick pass */
    const wipe = (dest: string) => {
      paint(dest);
      coverIn().eventCallback('onComplete', coverOut);
    };

    const reveal = () => {
      const p = pending.current;
      if (!p || !p.covered || !p.landed) return;
      window.clearTimeout(p.timer);
      pending.current = null;
      busy.current = false;
      coverOut();
    };

    const onClick = (e: MouseEvent) => {
      if (busy.current) return; // a second click rides the curtain we are already under
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const dest = destination(a, e, window.location.pathname);
      if (!dest) return;

      /* Link gives up on a prevented click, so the curtain owns this one */
      e.preventDefault();
      busy.current = true;
      paint(dest);
      pending.current = {
        covered: false,
        landed: false,
        timer: window.setTimeout(() => {
          const p = pending.current;
          if (!p) return;
          p.covered = true;
          p.landed = true;
          reveal();
        }, PATIENCE),
      };
      coverIn().eventCallback('onComplete', () => {
        /* hold the waybill for a beat, so it is read rather than glimpsed */
        window.setTimeout(() => {
          const p = pending.current;
          if (!p) return;
          p.covered = true;
          reveal();
        }, HOLD * 1000);
      });
      router.push(dest);
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return; // no curtain, no interception: the browser does it all

    if (first.current) {
      first.current = false;
    } else if (pathname !== here.current) {
      here.current = pathname;
      if (pending.current) {
        pending.current.landed = true;
        reveal();
      } else {
        wipe(pathname);
      }
    }

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname, router, t]);

  return (
    <div ref={panel} className={styles.curtain} aria-hidden="true">
      <div className={styles.curtainEdge} />
      <div className={styles.curtainGlow} />
      <div ref={inner} className={styles.curtainInner}>
        <span className={styles.curtainMark}>
          WB<span className={styles.curtainSemi}>;</span>
        </span>
        <span className={styles.curtainRule} />
        <span ref={label} className={styles.curtainLabel} />
      </div>
      <div className={styles.curtainFoot} />
    </div>
  );
}
