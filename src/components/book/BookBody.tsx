'use client';

/*
 * Reservations: the details column and the order pad.
 */

import { useLang } from '@/components/providers/LangProvider';
import Reveal from '@/components/ui/Reveal';
import BookingForm from './BookingForm';
import { CONTACT } from '@/lib/content';
import styles from '../pages.module.css';

export default function BookBody() {
  const { t } = useLang();
  return (
    <main id="content" className={`container ${styles.bookMain}`}>
      <Reveal className={styles.bookInfo}>
        <span className="label">{t('Reservations')}</span>
        <h1 className={styles.pageTitle}>{t('Book a table')}</h1>
        <p className={styles.pageLead}>
          {t('Two lines are plenty: what your business does, and what the site needs to do. I come back with a quote, a start date, and the list of what I need from you.')}
        </p>
        <div className={styles.bookRows}>
          <div className={styles.bookRow}>
            <span className={styles.fieldLabel}>Email</span>
            <a href={`mailto:${CONTACT.email}`} className={styles.bookBig}>
              {CONTACT.email}
            </a>
          </div>
          <div className={styles.bookRow}>
            <span className={styles.fieldLabel}>Instagram</span>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className={styles.bookBig}>
              @thewebbistro
            </a>
          </div>
          <div className={styles.bookRow}>
            <span className={styles.fieldLabel}>{t('Kitchen hours')}</span>
            <span className={styles.bookLine}>{t('Open 7 days a week, 9 to 6. You get a reply within a day.')}</span>
          </div>
          <div className={styles.bookRow}>
            <span className={styles.fieldLabel}>{t('Taking bookings for')}</span>
            <span className={styles.bookLine}>
              {t('Two of the three opening tables are still free. Bookings close when the third one goes.')}
            </span>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <BookingForm />
      </Reveal>
    </main>
  );
}
