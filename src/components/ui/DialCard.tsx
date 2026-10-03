'use client';

/*
 * A dial gauge: the needle sweeps to its reading when the card scrolls
 * into view, then settles into a gentle sway.
 */

import { useEffect, useRef } from 'react';
import styles from './ui.module.css';

type Props = {
  value: string;
  unit: string;
  label: string;
  dial: number;
  delay?: number;
};

const TICKS = [-135, -67.5, 0, 67.5, 135];

export default function DialCard({ value, unit, label, dial, delay = 0 }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const needle = needleRef.current;
    if (!root || !needle) return;

    const timers: number[] = [];
    const run = () => {
      needle.style.transform = `rotate(${dial}deg)`;
      timers.push(
        window.setTimeout(() => {
          needle.style.setProperty('--wb-a', `${dial}deg`);
          needle.style.transition = 'none';
          needle.style.animation = 'wb-needle 3.2s ease-in-out infinite';
        }, 1700),
      );
    };

    if (typeof IntersectionObserver === 'undefined') {
      run();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          timers.push(window.setTimeout(run, 120 + delay));
        });
      },
      { threshold: 0.4 },
    );
    io.observe(root);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [dial, delay]);

  return (
    <div ref={rootRef} className={styles.dialCard}>
      <div className={styles.dialFace}>
        {TICKS.map((a) => (
          <span key={a} className={styles.dialTick} style={{ transform: `rotate(${a}deg)` }} />
        ))}
        <span ref={needleRef} className={styles.dialNeedle} />
        <span className={styles.dialHub} />
      </div>
      <div className={styles.dialRead}>
        <div className={styles.dialValue}>
          <span className={styles.dialNumber}>{value}</span>
          {unit ? <span className={styles.dialUnit}>{unit}</span> : null}
        </div>
        <span className={styles.dialLabel}>{label}</span>
      </div>
    </div>
  );
}
