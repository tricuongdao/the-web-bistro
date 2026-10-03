'use client';

/*
 * Questions from the floor: a two-column question list, no accordion games.
 */

import { useLang } from '@/components/providers/LangProvider';
import Reveal from '@/components/ui/Reveal';
import { FAQ } from '@/lib/content';
import styles from './home.module.css';

export default function Faq() {
  const { t } = useLang();
  return (
    <section className={`container ${styles.faq}`} id="questions">
      <Reveal className={styles.faqHead}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowRule} />
          {t('Ask the kitchen')}
        </div>
        <h2 className={styles.faqTitle}>{t('Fair questions, straight answers.')}</h2>
      </Reveal>
      <div className={styles.faqGrid}>
        {FAQ.map(([q, a], i) => (
          <Reveal key={q} delay={(i % 2) * 0.06} className={styles.faqItem}>
            <h3 className={styles.faqQ}>{t(q)}</h3>
            <p className={styles.faqA}>{t(a)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
