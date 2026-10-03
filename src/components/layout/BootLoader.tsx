'use client';

/*
 * Boot loader: on every full page load, a brief dark curtain with the WB
 * mark breathing and a copper progress line, then it lifts. Skipped
 * entirely under prefers-reduced-motion. Client-side navigation never
 * shows it (it only mounts once, on hard loads).
 */

import { useEffect, useState } from 'react';
import styles from './boot.module.css';

export default function BootLoader() {
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true);
      return;
    }
    const t1 = window.setTimeout(() => setHide(true), 1000);
    const t2 = window.setTimeout(() => setGone(true), 1650);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`${styles.boot}${hide ? ` ${styles.bootOut}` : ''}`} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.mark}>
        WB<span className={styles.semi}>;</span>
      </div>
      <div className={styles.track}>
        <span className={styles.fill} />
      </div>
      <div className={styles.word}>The Web Bistro</div>
    </div>
  );
}
