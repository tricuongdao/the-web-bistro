'use client';

/*
 * Page-change sweep: the dark panel with an awning stripe wipes across the
 * screen on every navigation (the bistro's curtain between rooms).
 */

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import styles from './providers.module.css';

export default function RouteSweep() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tl = gsap.timeline();
    tl.set(el, { display: 'block', xPercent: -101 })
      .to(el, { xPercent: 0, duration: 0.38, ease: 'power3.in' })
      .to(el, { xPercent: 101, duration: 0.42, ease: 'power3.out', delay: 0.06 })
      .set(el, { display: 'none' });
    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div ref={ref} className={styles.sweep} aria-hidden="true">
      <div className={styles.sweepStripe} />
    </div>
  );
}
