'use client';

/*
 * Privacy, in plain words: what the form collects, what it does not.
 */

import Link from 'next/link';
import { useLang } from '@/components/providers/LangProvider';
import Reveal from '@/components/ui/Reveal';
import styles from '../pages.module.css';

export default function PrivacyBody() {
  const { t } = useLang();
  return (
    <main id="content" className={`container-narrow ${styles.privacyMain}`}>
      <Reveal className={styles.pageHead}>
        <span className="label">{t('House policy')}</span>
        <h1 className={styles.pageTitle}>{t('Privacy, in plain words')}</h1>
      </Reveal>
      <Reveal delay={0.08} className={styles.privacyBody}>
        <p>
          {t('The only thing this site collects is what you type into the booking form: your name, email and the note you send. The order is delivered to my inbox through Formspree, an email service, and it is used for one thing only: replying to you.')}
        </p>
        <p>
          {t('No analytics scripts, no advertising cookies, no tracking pixels. If you email me directly, the same applies. Your message lives in my inbox and nowhere else.')}
        </p>
        <p>{t('Want your details gone? Ask and I delete them, confirmation included.')}</p>
        <Link href="/" className={styles.backLink}>
          {t('Back to the front of house')}
        </Link>
      </Reveal>
    </main>
  );
}
