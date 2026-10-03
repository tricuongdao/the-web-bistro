'use client';

/*
 * The board strip: what tonight's kitchen is cooking, in one endless
 * ribbon. One marquee per page, by house rules.
 */

import { useLang } from '@/components/providers/LangProvider';
import { FLAP } from '@/lib/i18n';
import styles from './ui.module.css';

export default function Marquee() {
  const { lang } = useLang();
  const words = FLAP[lang];
  const group = (hidden: boolean) => (
    <div className={styles.marqueeGroup} aria-hidden={hidden}>
      {words.map((w) => (
        <span key={w} className={styles.marqueeItem}>
          {w}
          <span className={styles.marqueeStar}>✳</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
