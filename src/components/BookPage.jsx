import { useState } from 'react';
import { MarkAwning } from './Marks.jsx';
import { Hov, Field } from './ui.jsx'
import { useResponsive } from './responsive.js';
import { DISHES, DISHES_VI, CONTACT, FORM_ENDPOINT } from '../i18n.js';

const INPUT = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 15,
  padding: '14px 16px',
  // Longhands (not the `border` shorthand) so React's style diff restores the
  // base color on blur instead of dropping the declaration (currentColor bug).
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#E2D7C3',
  background: '#F6EFE2',
  color: '#10322F',
  outline: 'none',
};
const INPUT_FOCUS = { borderColor: '#B07C1F' };
const LABEL = { fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#7C8A7F' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { name: '', email: '', note: '', picked: [] };

export default function BookPage({ t, lang }) {
  const { isMobile, isTablet } = useResponsive();
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [showMailFallback, setShowMailFallback] = useState(false);
  const { name, email, note, picked } = form;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const togglePick = (label) =>
    setForm((f) => ({
      ...f,
      picked: f.picked.includes(label) ? f.picked.filter((p) => p !== label) : f.picked.concat(label),
    }));

  // The order, formatted for a plain email body
  const mailtoHref = () => {
    const subject = encodeURIComponent(`Booking enquiry — ${name || 'the website'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInterested in: ${picked.join(', ') || '—'}\n\n${note}`
    );
    return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  const submit = async (e) => {
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
      // Form service configured: POST the order; the service forwards it to
      // CONTACT.email as a regular email. Falls back to the mail client on error.
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
            _subject: `Booking enquiry — ${name}`,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setSent(true);
        window.scrollTo(0, 0);
      } catch {
        setError(t('Something went wrong — please email me directly:'));
        setShowMailFallback(true);
      } finally {
        setBusy(false);
      }
    } else {
      // No backend configured: hand the order to the visitor's mail client,
      // pre-filled and addressed straight to the bistro inbox.
      window.location.href = mailtoHref();
      setSent(true);
      window.scrollTo(0, 0);
    }
  };

  const reset = () => {
    setForm(EMPTY);
    setSent(false);
    setError('');
    setShowMailFallback(false);
  };

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: isMobile ? '56px 20px 64px' : isTablet ? '72px 32px 80px' : '88px 32px 96px',
        display: 'grid',
        gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 1.15fr)',
        gap: isMobile ? 44 : 56,
        alignItems: 'start',
      }}
    >
      <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#B07C1F' }}>{t('Reservations')}</div>
        <h1 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 58, fontWeight: 600, lineHeight: 1 }}>{t('Book a table')}</h1>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: '#3C5A50', textWrap: 'pretty' }}>
          {t('Two lines are plenty: what your business does, and what the site needs to do. I come back with a quote, a start date, and the list of what I need from you.')}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, borderTop: '1px solid #E2D7C3', paddingTop: 26 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={LABEL}>Email</span>
            <a href={`mailto:${CONTACT.email}`} style={{ fontFamily: 'var(--wb-serif)', fontSize: isMobile ? 19 : 24, fontWeight: 600, wordBreak: 'break-all' }}>
              {CONTACT.email}
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={LABEL}>Instagram</span>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--wb-serif)', fontSize: 22, fontWeight: 600 }}>
              @thewebbistro
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={LABEL}>{t('Kitchen hours')}</span>
            <span style={{ fontSize: 14, color: '#3C5A50' }}>{t('Open 7 days a week, 9 to 6. You get a reply within a day.')}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={LABEL}>{t('Taking bookings for')}</span>
            <span style={{ fontSize: 14, color: '#3C5A50' }}>
              {t('Two of the three opening tables are still free. Bookings close when the third one goes.')}
            </span>
          </div>
        </div>
      </div>
      <div data-reveal="1" style={{ background: '#FFFBF3', border: '1px solid #E2D7C3', padding: isMobile ? 24 : 40, boxSizing: 'border-box', minWidth: 0 }}>
        {sent ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start', padding: '20px 0' }}>
            <MarkAwning size={72} variant="icon" stripeB="#10322F" trim="#10322F" />
            <h2 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 34, fontWeight: 600 }}>{t("Table's booked.")}</h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: '#3C5A50' }}>
              {t('Thanks. I have your details and I will reply within a day.')}
            </p>
            <Hov
              as="button"
              type="button"
              onClick={reset}
              hv={{ color: '#B07C1F' }}
              style={{ appearance: 'none', background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer', alignSelf: 'flex-start', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: '#10322F', borderBottom: '1px solid #B07C1F', paddingBottom: 4 }}
            >
              {t('Send another')}
            </Hov>
          </div>
        ) : (
          <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {FORM_ENDPOINT && (
              // Honeypot: bots fill it in, humans never see it. Dropped server-side.
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 0, height: 0, opacity: 0 }}
              />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label htmlFor="bk-name" style={LABEL}>{t('Your name')}</label>
              <Field
                id="bk-name"
                name="name"
                type="text"
                value={name}
                onChange={set('name')}
                placeholder={lang === 'vi' ? 'Kelvin Nguyễn' : 'Kelvin Nguyen'}
                style={INPUT}
                focusStyle={INPUT_FOCUS}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label htmlFor="bk-email" style={LABEL}>Email</label>
              <Field
                id="bk-email"
                name="email"
                type="email"
                value={email}
                onChange={set('email')}
                placeholder={lang === 'vi' ? 'ban@doanhnghiep.com' : 'you@yourbusiness.com'}
                style={INPUT}
                focusStyle={INPUT_FOCUS}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span id="bk-dishes" style={LABEL}>{t('What are you after?')}</span>
              <div role="group" aria-labelledby="bk-dishes" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {DISHES.map((label) => {
                  const on = picked.includes(label);
                  return (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={on}
                      onClick={() => togglePick(label)}
                      style={{
                        cursor: 'pointer',
                        fontSize: 12,
                        fontFamily: 'inherit',
                        padding: '10px 14px',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: on ? '#10322F' : '#E2D7C3',
                        background: on ? '#10322F' : '#F6EFE2',
                        color: on ? '#F6EFE2' : '#3C5A50',
                        transition: 'border-color .2s, background .2s',
                      }}
                    >
                      {lang === 'vi' ? DISHES_VI[label] || label : label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label htmlFor="bk-note" style={LABEL}>{t('The order')}</label>
              <Field
                id="bk-note"
                name="note"
                as="textarea"
                rows={5}
                value={note}
                onChange={set('note')}
                placeholder={lang === 'vi'
                  ? 'Chúng tôi có hai tiệm bánh và đang nhận đơn qua điện thoại. Tôi muốn khách đặt bánh online.'
                  : 'We run a two-site bakery and take orders over the phone. I want people to order cakes online.'}
                style={{ ...INPUT, lineHeight: 1.7, resize: 'vertical' }}
                focusStyle={INPUT_FOCUS}
              />
            </div>
            {error && (
              <div role="alert" style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: '#A33B2E' }}>
                {error}{' '}
                {showMailFallback && (
                  <a href={mailtoHref()} style={{ color: '#A33B2E', fontWeight: 700 }}>
                    {CONTACT.email}
                  </a>
                )}
              </div>
            )}
            <Hov
              as="button"
              type="submit"
              hv={{ background: '#B07C1F', transform: 'translateY(-2px)' }}
              style={{
                appearance: 'none',
                border: 'none',
                fontFamily: 'inherit',
                width: '100%',
                cursor: busy ? 'wait' : 'pointer',
                textAlign: 'center',
                fontSize: 12,
                letterSpacing: 2,
                textTransform: 'uppercase',
                background: '#10322F',
                color: '#F6EFE2',
                padding: 18,
                transition: 'background .2s, transform .2s',
              }}
            >
              {busy ? t('Sending…') : t('Send the order')}
            </Hov>
            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.7, color: '#7C8A7F' }}>
              {t('Or email')} <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              {t('. Same inbox, same reply time.')}
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
