'use client';

/*
 * Opening offer: three tables at the opening rate, and the risk reversal
 * that backs them.
 */

import Link from 'next/link';
import { useLang } from '@/components/providers/LangProvider';
import Reveal from '@/components/ui/Reveal';
import { RISK, TABLES } from '@/lib/content';
import styles from '../pages.module.css';

export default function WorkBody() {
  const { t } = useLang();
  return (
    <main id="content" className={`container ${styles.workMain}`}>
      <Reveal className={styles.pageHeadWide}>
        <span className="label">{t('Opening offer')}</span>
        <h1 className={styles.pageTitle}>{t('The first three tables eat at the opening rate.')}</h1>
        <p className={styles.pageLead}>
          {t("Here's the honest trade. I opened this kitchen in 2026 and I need three sites worth showing off. You need a site that brings in work. So for the first three bookings I cut a third off the quote and put the saved hours straight back into the build.")}
        </p>
        <p className={styles.pageLead}>
          {t('In return I ask two things: let me photograph the finished site for this page, and tell me the truth about what it changed for your business.')}
        </p>
      </Reveal>

      <Reveal className={styles.offerBanner}>
        <span className={styles.offerDot} />
        <span className={styles.offerStatus}>{t('Two of three opening tables still free')}</span>
        <span className={styles.offerNote}>{t('Bookings close as soon as the third one goes.')}</span>
      </Reveal>

      <div className={styles.tableGrid}>
        {TABLES.map((table, i) => (
          <Reveal key={table.label} delay={i * 0.07} className={styles.tableCard}>
            <span className="label">{t(table.label)}</span>
            <h3 className={styles.tableTitle}>{t(table.title)}</h3>
            <div className={styles.tableItems}>
              {table.items.map((item) => (
                <div key={item} className={styles.tableItem}>
                  <span className={styles.tableStar}>✦</span>
                  <span>{t(item)}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className={styles.riskPanel}>
        <div className={styles.riskLeft}>
          <span className="label">{t('The risk is mine')}</span>
          <h2 className={styles.riskTitle}>{t('Nothing to lose by ordering')}</h2>
          <p className={styles.riskIntro}>
            {t('A new business asking for money up front should give you something back. Here it is.')}
          </p>
        </div>
        <div className={styles.riskList}>
          {RISK.map((item, i) => (
            <div key={item} className={styles.riskItem}>
              <span className={styles.riskNum}>{String(i + 1).padStart(2, '0')}</span>
              <span>{t(item)}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className={styles.workCta}>
        <span className={styles.workCtaLine}>{t('Want one of the three?')}</span>
        <Link href="/book" className="btn btn-ember">
          {t('Claim a table')}
        </Link>
      </Reveal>
    </main>
  );
}
