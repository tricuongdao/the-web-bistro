'use client';

/*
 * 404: this table is not set.
 */

import Link from 'next/link';
import { useLang } from '@/components/providers/LangProvider';
import Wordmark from '@/components/ui/Wordmark';
import styles from '@/components/pages.module.css';

export default function NotFound() {
  const { t } = useLang();
  return (
    <main id="content" className={styles.notFound}>
      <Wordmark size="xl" />
      <h1 className={styles.nfTitle}>{t("This table's not set.")}</h1>
      <p className={styles.nfBody}>
        {t('The page you asked for is not on the menu. It may have moved, or it may never have existed.')}
      </p>
      <div className={styles.nfCtas}>
        <Link href="/" className="btn btn-ember">
          {t('Front of house')}
        </Link>
        <Link href="/menu" className="btn btn-glass">
          {t('The menu')}
        </Link>
      </div>
    </main>
  );
}
