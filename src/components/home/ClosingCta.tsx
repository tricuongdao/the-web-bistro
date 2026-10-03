'use client';

/*
 * Closing call: the hearth. Flames along the bottom edge, one button.
 */

import Link from 'next/link';
import { useLang } from '@/components/providers/LangProvider';
import Reveal from '@/components/ui/Reveal';
import { FLAME_BG, FLAMES } from '@/lib/content';
import styles from './home.module.css';

export default function ClosingCta() {
  const { t } = useLang();
  return (
    <section className={`container ${styles.ctaWrap}`}>
      <Reveal className={styles.cta}>
        <div className={styles.hearth} aria-hidden="true">
          <div className={styles.hearthGlow} />
          {FLAMES.map(([left, w, h, dur, delay]) => (
            <span
              key={left}
              className={styles.flame}
              style={{
                left,
                width: w,
                height: h,
                marginLeft: -w / 2,
                animationDuration: dur,
                animationDelay: delay,
                background: FLAME_BG,
              }}
            />
          ))}
          <div className={styles.emberLine} />
        </div>
        <div className={styles.ctaCopy}>
          <h2 className={styles.ctaTitle}>{t('Hungry? Tell me what you need.')}</h2>
          <p className={styles.ctaBody}>
            {t('Send two lines about your business and what the site has to do. You get a quote and a start date, not a five-email sales sequence. Two of my three opening slots are still free.')}
          </p>
        </div>
        <Link href="/book" className="btn btn-gold">
          {t('Book a table')}
        </Link>
      </Reveal>
    </section>
  );
}
