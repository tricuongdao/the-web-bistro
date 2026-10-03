'use client';

/*
 * Closing call: one warm panel, one button, glow doing the fire's job.
 */

import Link from 'next/link';
import { useLang } from '@/components/providers/LangProvider';
import Reveal from '@/components/ui/Reveal';
import styles from './home.module.css';

export default function ClosingCta() {
  const { t } = useLang();
  return (
    <section className={`container ${styles.ctaWrap}`}>
      <Reveal className={styles.cta}>
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.ctaCopy}>
          <h2 className={styles.ctaTitle}>{t('Hungry? Tell me what you need.')}</h2>
          <p className={styles.ctaBody}>
            {t('Send two lines about your business and what the site has to do. You get a quote and a start date, not a five-email sales sequence. Two of my three opening slots are still free.')}
          </p>
        </div>
        <Link href="/book" className="btn btn-ember">
          {t('Book a table')}
        </Link>
      </Reveal>
    </section>
  );
}
