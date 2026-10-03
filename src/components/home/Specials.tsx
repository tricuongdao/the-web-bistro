'use client';

/*
 * Today's specials: the three dishes cooked most, with starting prices.
 */

import Link from 'next/link';
import { useLang } from '@/components/providers/LangProvider';
import Reveal from '@/components/ui/Reveal';
import { SPECIALS } from '@/lib/content';
import styles from './home.module.css';

export default function Specials() {
  const { t } = useLang();
  return (
    <section className={`container ${styles.specials}`}>
      <div className={styles.specialsHead}>
        <Reveal>
          <div className={styles.tag}>
            <span className={styles.tagDot} />
            {t("Today's specials")}
          </div>
          <h2 className={styles.specialsTitle}>{t('Three things I cook most')}</h2>
        </Reveal>
        <Link href="/work" className={styles.specialsLink}>
          {t('See the opening offer →')}
        </Link>
      </div>
      <div className={styles.specialGrid}>
        {SPECIALS.map((s, i) => (
          <Reveal
            key={s.title}
            delay={i * 0.08}
            className={`${styles.specialCard}${s.dark ? ` ${styles.specialCardHot}` : ''}`}
          >
            <span className={`${styles.specialKicker}${s.dark ? ` ${styles.specialKickerHot}` : ''}`}>
              {t(s.kicker)}
            </span>
            <h3 className={styles.specialTitle}>{t(s.title)}</h3>
            <p className={styles.specialBody}>{t(s.body)}</p>
            <div className={styles.specialFoot}>
              <span className={styles.specialMeta}>{t(s.meta)}</span>
              {s.from ? (
                <span className={styles.specialPrice}>
                  {t('From')} {s.from}
                  {s.per ? ` ${t('/ month')}` : ''}
                </span>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
