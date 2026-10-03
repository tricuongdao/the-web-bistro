'use client';

/*
 * Smooth cursor, XimiTech style: the native pointer hides and an amber dot
 * follows with a light spring while a glass ring trails behind and grows
 * over links and buttons. Fine pointers only, never under reduced motion,
 * never on touch.
 */

import { useEffect, useRef, useState } from 'react';
import styles from './cursor.module.css';

export default function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (fine && !reduced) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('wb-cursor-on');

    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    let dx = px;
    let dy = py;
    let rx = px;
    let ry = py;
    let hot = false;
    let down = false;
    let seen = false;
    let raf = 0;

    const show = () => {
      if (dot.style.opacity !== '1') dot.style.opacity = '1';
      if (ring.style.opacity !== '1') ring.style.opacity = '1';
    };
    const snap = (x: number, y: number) => {
      px = x;
      py = y;
      dx = x;
      dy = y;
      rx = x;
      ry = y;
      seen = true;
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!seen) snap(px, py);
      show();
      const t = e.target as Element | null;
      hot = !!(
        t &&
        typeof t.closest === 'function' &&
        t.closest('a, button, [role="button"], label, input, textarea, select, summary')
      );
    };
    const onEnter = (e: PointerEvent) => {
      snap(e.clientX, e.clientY);
      show();
    };
    const onDown = () => {
      down = true;
    };
    const onUp = () => {
      down = false;
    };
    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      /* re-arm so the next move snaps straight to the pointer instead of
         streaking in from the old spot */
      seen = false;
    };

    const tick = () => {
      /* dot: light spring; ring: long trailing ease */
      dx += (px - dx) * 0.55;
      dy += (py - dy) * 0.55;
      rx += (px - rx) * 0.16;
      ry += (py - ry) * 0.16;
      dot.style.transform = `translate3d(${dx - 5}px, ${dy - 5}px, 0)`;
      const s = 1 + (hot ? 0.75 : 0) - (down ? 0.15 : 0);
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0) scale(${s.toFixed(3)})`;
      ring.classList.toggle(styles.hot, hot);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerenter', onEnter);
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerenter', onEnter);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('wb-cursor-on');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} data-wb-cursor="dot" className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} data-wb-cursor="ring" className={styles.ring} aria-hidden="true" />
    </>
  );
}
