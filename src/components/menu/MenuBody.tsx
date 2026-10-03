'use client';

/*
 * The menu: every dish, with starting prices. Edit PRICES in
 * src/lib/content.ts to change the numbers; the layout does the rest.
 */

import Link from 'next/link';
import { useLang } from '@/components/providers/LangProvider';
import Reveal from '@/components/ui/Reveal';
import { CARE, MENU, SIDES } from '@/lib/content';
import styles from '../pages.module.css';

export default function MenuBody() {
  const { t } = useLang();
  return (
    <main id="content" className={`container-narrow ${styles.menuMain}`}>
      <Reveal className={styles.pageHead}>
        <span className="label">{t('The menu')}</span>
        <h1 className={styles.pageTitle}>{t('Everything I serve')}</h1>
        <p className={styles.pageLead}>
          {t('Every dish has a starting price. No two jobs are the same size, so the final quote is cut to your plate and lands inside a day.')}
        </p>
        <span className={styles.headRule} />
      </Reveal>

      {MENU.map((sec) => (
        <section key={sec.head} className={styles.menuSection}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>{t(sec.head)}</h2>
            <span className="rule" />
            <span className={styles.sectionNote}>{t(sec.note)}</span>
          </div>
          <div>
            {sec.rows.map((row) => (
              <div key={row.title} className={styles.menuRow}>
                <div className={styles.menuRowHead}>
                  <h3 className={styles.menuRowTitle}>{t(row.title)}</h3>
                  <span className={styles.menuRowMeta}>{t(row.meta)}</span>
                </div>
                <p className={styles.menuRowBody}>{t(row.body)}</p>
                <div className={styles.menuRowPrice}>
                  {row.from ? (
                    <>
                      <span className={styles.priceFrom}>{t('From')}</span>
                      <span className={styles.priceAmount}>{row.from}</span>
                    </>
                  ) : (
                    <span className={styles.priceQuote}>{t('Quote in a day')}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className={styles.menuSection}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>{t('Sides')}</h2>
          <span className="rule" />
          <span className={styles.sectionNote}>{t('Good with anything above')}</span>
        </div>
        <div className={styles.sidesGrid}>
          {SIDES.map((s) => (
            <div key={s.title} className={styles.sideCard}>
              <h3 className={styles.sideTitle}>{t(s.title)}</h3>
              <p className={styles.sideBody}>{t(s.body)}</p>
            </div>
          ))}
        </div>
      </section>

      <Reveal className={styles.careBanner}>
        <div className={styles.careLeft}>
          <span className={styles.careKicker}>{t(CARE.kicker)}</span>
          <h2 className={styles.careTitle}>{t(CARE.title)}</h2>
        </div>
        <p className={styles.careBody}>{t(CARE.body)}</p>
        <div className={styles.carePrice}>
          <span className={styles.careFrom}>{t('From')}</span>
          <span className={styles.careAmount}>
            {CARE.from} {t('/ month')}
          </span>
        </div>
      </Reveal>

      <Reveal className={styles.menuCta}>
        <span className={styles.menuCtaLine}>{t('Nothing here quite fits?')}</span>
        <Link href="/book" className="btn btn-solid">
          {t('Ask the kitchen')}
        </Link>
      </Reveal>
    </main>
  );
}
