'use client';

/*
 * By the numbers: four dial gauges that read the kitchen's promises.
 */

import { useLang } from '@/components/providers/LangProvider';
import DialCard from '@/components/ui/DialCard';
import Reveal from '@/components/ui/Reveal';
import { NUMBERS } from '@/lib/content';
import styles from './home.module.css';

export default function Numbers() {
  const { t } = useLang();
  return (
    <section className={`container ${styles.numbers}`}>
      <Reveal className={styles.numbersHead}>
        <span className="label">{t('By the numbers')}</span>
        <span className="rule" />
      </Reveal>
      <div className={styles.numbersGrid}>
        {NUMBERS.map((n, i) => (
          <Reveal key={n.label} delay={i * 0.06}>
            <DialCard value={n.value} unit={n.unit} label={t(n.label)} dial={n.dial} delay={i * 140} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
