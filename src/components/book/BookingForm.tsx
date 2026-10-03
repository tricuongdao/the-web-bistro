'use client';

/*
 * The order pad. Posts JSON to Formspree (see FORM_ENDPOINT in content.ts),
 * with the visitor's mail client as the fallback. Same behaviour as the
 * live site: validate, send, land on the ticket stub.
 */

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/components/providers/LangProvider';
import { CONTACT, DISHES, DISHES_VI, FORM_ENDPOINT } from '@/lib/content';
import Wordmark from '@/components/ui/Wordmark';
import styles from '../pages.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { name: '', email: '', note: '', picked: [] as string[] };

export default function BookingForm() {
  const { t, lang, c } = useLang();
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [showMailFallback, setShowMailFallback] = useState(false);
  const { name, email, note, picked } = form;

  const set =
    (key: 'name' | 'email' | 'note') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const togglePick = (label: string) =>
    setForm((f) => ({
      ...f,
      picked: f.picked.includes(label) ? f.picked.filter((p) => p !== label) : f.picked.concat(label),
    }));

  const mailtoHref = () => {
    const subject = encodeURIComponent(`Booking enquiry - ${name || 'the website'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInterested in: ${picked.join(', ') || 'not sure yet'}\n\n${note}`,
    );
    return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(t('Please add your name.'));
      setShowMailFallback(false);
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError(t('Please add a valid email address.'));
      setShowMailFallback(false);
      return;
    }
    setError('');
    if (FORM_ENDPOINT) {
      setBusy(true);
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name,
            email,
            message: note,
            dishes: picked.join(', '),
            _replyto: email,
            _subject: `Booking enquiry - ${name}`,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setSent(true);
        window.scrollTo({ top: 0 });
      } catch {
        setError(t('Something went wrong. Please email me directly:'));
        setShowMailFallback(true);
      } finally {
        setBusy(false);
      }
    } else {
      window.location.href = mailtoHref();
      setSent(true);
      window.scrollTo({ top: 0 });
    }
  };

  const reset = () => {
    setForm(EMPTY);
    setSent(false);
    setError('');
    setShowMailFallback(false);
  };

  return (
    <div className={styles.formCard}>
      {sent ? (
        <div className={styles.sentBox}>
          <Wordmark size="xl" />
          <h2 className={styles.sentTitle}>{t("Table's booked.")}</h2>
          <p className={styles.sentBody}>{t('Thanks. I have your details and I will reply within a day.')}</p>
          <button type="button" className={`btn-link ${styles.sentAgain}`} onClick={reset}>
            {t('Send another')}
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className={styles.form}>
          {FORM_ENDPOINT ? (
            /* Honeypot: bots fill it in, humans never see it. Dropped server-side. */
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className={styles.gotcha}
            />
          ) : null}
          <div className={styles.fieldBlock}>
            <label htmlFor="bk-name" className={styles.fieldLabel}>
              {t('Your name')}
            </label>
            <input
              id="bk-name"
              name="name"
              type="text"
              className="field"
              value={name}
              onChange={set('name')}
              placeholder={c.phName}
              aria-invalid={error !== '' && !name.trim() ? true : undefined}
            />
          </div>
          <div className={styles.fieldBlock}>
            <label htmlFor="bk-email" className={styles.fieldLabel}>
              Email
            </label>
            <input
              id="bk-email"
              name="email"
              type="email"
              className="field"
              value={email}
              onChange={set('email')}
              placeholder={c.phEmail}
              aria-invalid={error !== '' && !EMAIL_RE.test(email.trim()) ? true : undefined}
            />
          </div>
          <div className={styles.fieldBlock}>
            <span id="bk-dishes" className={styles.fieldLabel}>
              {t('What are you after?')}
            </span>
            <div role="group" aria-labelledby="bk-dishes" className={styles.chips}>
              {DISHES.map((label) => {
                const on = picked.includes(label);
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={on}
                    onClick={() => togglePick(label)}
                    className={`${styles.chip}${on ? ` ${styles.chipOn}` : ''}`}
                  >
                    {lang === 'vi' ? DISHES_VI[label] || label : label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className={styles.fieldBlock}>
            <label htmlFor="bk-note" className={styles.fieldLabel}>
              {t('The order')}
            </label>
            <textarea
              id="bk-note"
              name="note"
              rows={5}
              className={`field ${styles.note}`}
              value={note}
              onChange={set('note')}
              placeholder={c.phNote}
            />
          </div>
          {error ? (
            <div role="alert" className={styles.formError}>
              {error}{' '}
              {showMailFallback ? (
                <a href={mailtoHref()} className={styles.formErrorLink}>
                  {CONTACT.email}
                </a>
              ) : null}
            </div>
          ) : null}
          <button type="submit" className={`btn btn-ember ${styles.submit}`} disabled={busy}>
            {busy ? t('Sending…') : t('Send the order')}
          </button>
          <p className={styles.formFoot}>
            {t('Or email')} <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            {t('. Same inbox, same reply time.')}
          </p>
          <p className={styles.formFootDim}>
            {t('Your details go to my inbox and nowhere else.')}{' '}
            <Link href="/privacy">{t('Privacy')}</Link>
          </p>
        </form>
      )}
    </div>
  );
}
