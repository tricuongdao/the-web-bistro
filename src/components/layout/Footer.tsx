'use client';

/*
 * Footer: the last page of the menu. Brand, pages, contact, policy line.
 */

import Link from 'next/link';
import Wordmark from '@/components/ui/Wordmark';
import { useLang } from '@/components/providers/LangProvider';
import { CONTACT, NAV } from '@/lib/content';
import styles from './layout.module.css';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGlow} aria-hidden="true" />
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.footBrand}>
          <Wordmark disc size="md" />
          <span className={styles.footBrandCol}>
            <span className={styles.footName}>The Web Bistro</span>
            <span className={styles.footTag}>{t('Web development')}</span>
          </span>
        </div>
        <div className={styles.footCols}>
          <div className={styles.footCol}>
            <span className={styles.footLabel}>{t('Pages')}</span>
            {NAV.map(([label, href]) => (
              <Link key={href} href={href} className={styles.footLink}>
                {t(label)}
              </Link>
            ))}
          </div>
          <div className={styles.footCol}>
            <span className={styles.footLabel}>{t('Get in touch')}</span>
            <a className={styles.footLink} href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
            <a className={styles.footLink} href={CONTACT.instagram} target="_blank" rel="noreferrer">
              {t('@thewebbistro on Instagram')}
            </a>
            <span className={styles.footLine}>{t('Open 7 days a week, 9 to 6')}</span>
          </div>
        </div>
      </div>
      <div className={`container ${styles.footBottom}`}>
        <span>{`© ${new Date().getFullYear()} The Web Bistro.`}</span>
        <Link href="/privacy" className={styles.footLink}>
          {t('Privacy')}
        </Link>
      </div>
    </footer>
  );
}
