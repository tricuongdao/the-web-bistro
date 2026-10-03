'use client';

/*
 * Split-flap board: the word flips like a station departure board every
 * few seconds; the next two dishes wait behind it.
 */

import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/components/providers/LangProvider';
import { FLAP } from '@/lib/i18n';
import styles from './ui.module.css';

export default function SplitFlap() {
  const { t, lang } = useLang();
  const words = FLAP[lang];
  const [i, setI] = useState(0);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = setInterval(() => {
      const el = wordRef.current;
      if (el) {
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = 'wb-flip .58s cubic-bezier(.45,0,.2,1)';
      }
      setTimeout(() => setI((v) => v + 1), 250);
    }, 2800);
    return () => clearInterval(h);
  }, []);

  const word = words[i % words.length];
  const next1 = words[(i + 1) % words.length];
  const next2 = words[(i + 2) % words.length];

  return (
    <div className={styles.flapWrap}>
      <div className={styles.flapBoard}>
        <div ref={wordRef} className={styles.flapWord}>
          {word}
        </div>
        <div className={styles.flapSplit} />
      </div>
      <div className={styles.flapNext}>
        <span>{t('Next up')}</span>
        <span className={styles.flapNext1}>{next1}</span>
        <span className={styles.flapSlash}>/</span>
        <span className={styles.flapNext2}>{next2}</span>
      </div>
    </div>
  );
}
