import { Hov } from './ui.jsx';
import { CONTACT, pageHref } from '../i18n.js';

export default function HomePage({ t, url, o, score, secs, perfLabel, paintLabel, buildStatus, ticket, ticketStatus }) {
  return (
    <main>
      <section
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '96px 32px 72px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
          gap: 64,
          alignItems: 'center',
        }}
      >
        <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#B07C1F' }}>
            <span style={{ width: 28, height: 1, background: '#B07C1F' }} />
            {t('Two of three opening tables free')}
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--wb-serif)',
              fontSize: 78,
              fontWeight: 600,
              lineHeight: 0.98,
              letterSpacing: '-1px',
              textWrap: 'balance',
            }}
          >
            {t('Websites, made to order.')}
          </h1>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: '#3C5A50', maxWidth: '46ch', textWrap: 'pretty' }}>
            {t('You tell me what your business needs to do. I build the site that does it, then hand you the keys. No page builders, no plugin sprawl, and no invoice you cannot read.')}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Hov
              as="a"
              href={`mailto:${CONTACT.email}`}
              hv={{ background: '#B07C1F', transform: 'translateY(-2px)' }}
              style={{
                fontSize: 12,
                letterSpacing: 2,
                textTransform: 'uppercase',
                background: '#10322F',
                color: '#F6EFE2',
                padding: '17px 28px',
                transition: 'background .2s, transform .2s',
              }}
            >
              {t('Email me')}
            </Hov>
            <Hov
              as="a"
              href={pageHref('menu')}
              hv={{ background: '#10322F', color: '#F6EFE2' }}
              style={{
                cursor: 'pointer',
                fontSize: 12,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#10322F',
                padding: '17px 28px',
                border: '1px solid #10322F',
                transition: 'background .2s, color .2s',
              }}
            >
              {t('Read the menu')}
            </Hov>
          </div>
          <div style={{ fontSize: 12, color: '#7C8A7F' }}>
            {t('You will get a reply within a day')}
            <span style={{ animation: 'wb-blink 1.1s steps(1) infinite', color: '#B07C1F' }}>_</span>
          </div>
        </div>
        <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 14 }}>
          <div style={{ background: '#FFFBF3', border: '1px solid #E2D7C3', boxShadow: '0 34px 64px -36px rgba(16,50,47,0.55)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: '#EFE5D3', borderBottom: '1px solid #E2D7C3' }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#B07C1F' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#C3B79F' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#C3B79F' }} />
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#F6EFE2',
                  border: '1px solid #E2D7C3',
                  padding: '7px 10px',
                  fontSize: 11,
                  color: '#3C5A50',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                <span style={{ color: '#7C8A7F' }}>https://</span>
                <span>{url}</span>
                <span style={{ width: 6, height: 12, background: '#B07C1F', animation: 'wb-blink 1s steps(1) infinite' }} />
              </div>
            </div>
            <div style={{ padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 286 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: o[0], transition: 'opacity .45s ease' }}>
                <span style={{ width: 26, height: 12, background: '#10322F' }} />
                <span style={{ width: 40, height: 7, background: '#E2D7C3' }} />
                <span style={{ width: 32, height: 7, background: '#E2D7C3' }} />
                <span style={{ width: 36, height: 7, background: '#E2D7C3' }} />
                <span style={{ marginLeft: 'auto', width: 62, height: 20, background: '#E0A93B' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, opacity: o[1], transition: 'opacity .45s ease' }}>
                <span style={{ width: '88%', height: 20, background: '#10322F' }} />
                <span style={{ width: '58%', height: 20, background: '#10322F' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, opacity: o[2], transition: 'opacity .45s ease' }}>
                <span style={{ width: '100%', height: 7, background: '#E2D7C3' }} />
                <span style={{ width: '76%', height: 7, background: '#E2D7C3' }} />
                <span style={{ marginTop: 6, width: 104, height: 30, background: '#10322F' }} />
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', gap: 10 }}>
                {[o[3], o[4], o[5]].map((op, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      height: 76,
                      background: '#F6EFE2',
                      border: '1px solid #E2D7C3',
                      padding: 12,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 7,
                      opacity: op,
                      transition: 'opacity .45s ease',
                    }}
                  >
                    <span style={{ width: '60%', height: 8, background: '#B07C1F' }} />
                    <span style={{ width: '100%', height: 6, background: '#E2D7C3' }} />
                    <span style={{ width: '80%', height: 6, background: '#E2D7C3' }} />
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                padding: '13px 14px',
                background: '#10322F',
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#F6EFE2',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              <span style={{ whiteSpace: 'nowrap' }}>
                {perfLabel} <span style={{ display: 'inline-block', minWidth: 30, textAlign: 'right' }}>{score}</span>
              </span>
              <span style={{ whiteSpace: 'nowrap', color: '#E0A93B' }}>
                <span style={{ display: 'inline-block', minWidth: 26, textAlign: 'right' }}>{secs}</span>
                {paintLabel}
              </span>
            </div>
          </div>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#7C8A7F', textAlign: 'right', whiteSpace: 'nowrap' }}>
            {buildStatus}
          </div>
        </div>
      </section>
      <section
        style={{
          background: '#10322F',
          borderTop: '1px solid rgba(246,239,226,0.12)',
          borderBottom: '1px solid rgba(246,239,226,0.12)',
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '76px 32px',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.9fr)',
            gap: 56,
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#E0A93B' }}>
              <span style={{ width: 28, height: 1, background: '#E0A93B' }} />
              {t('On the pass')}
            </div>
            <h2 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 46, fontWeight: 600, color: '#F6EFE2', lineHeight: 1.05, textWrap: 'balance' }}>
              {t('Every job leaves the kitchen the same way.')}
            </h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.85, color: '#C8D6CD', maxWidth: '44ch', textWrap: 'pretty' }}>
              {t('Brief in, ticket up, built, served. Ask me on a Tuesday what happened on Monday and you get a straight answer, not a status page.')}
            </p>
            <Hov
              as="a"
              href={pageHref('book')}
              hv={{ background: '#E0A93B', color: '#10322F', borderColor: '#E0A93B' }}
              style={{
                cursor: 'pointer',
                alignSelf: 'flex-start',
                marginTop: 6,
                fontSize: 12,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#F6EFE2',
                border: '1px solid rgba(246,239,226,0.35)',
                padding: '15px 24px',
                transition: 'background .2s, color .2s, border-color .2s',
              }}
            >
              {t('Put a ticket in')}
            </Hov>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: '100%',
                maxWidth: 400,
                background: '#F6EFE2',
                padding: '30px 28px 22px',
                boxShadow: '0 30px 60px -30px rgba(0,0,0,0.6)',
                transform: 'rotate(-1deg)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#7C8A7F' }}>
                <span>The Web Bistro</span>
                <span>Order #0142</span>
              </div>
              <div style={{ margin: '14px 0 18px', borderTop: '1px dashed #C3B79F' }} />
              <div style={{ minHeight: 176, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, lineHeight: 1.5, color: '#10322F' }}>
                {ticket.map((line, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, whiteSpace: 'pre-wrap' }}>
                    {line}
                  </div>
                ))}
                <span style={{ width: 8, height: 15, background: '#B07C1F', animation: 'wb-blink 1.05s steps(1) infinite' }} />
              </div>
              <div style={{ margin: '18px 0 12px', borderTop: '1px dashed #C3B79F' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#7C8A7F' }}>
                <span>{t('Served hot')}</span>
                <span>{ticketStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '88px 32px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div data-reveal="1" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#B07C1F' }}>{t("Today's specials")}</div>
            <h2 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 46, fontWeight: 600, lineHeight: 1 }}>{t('Three things I cook most')}</h2>
          </div>
          <a
            href={pageHref('work')}
            style={{ display: 'inline-block', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: '#10322F', borderBottom: '1px solid #B07C1F', paddingBottom: 4 }}
          >
            {t('See the opening offer →')}
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <Hov
            data-reveal="1"
            hv={{ transform: 'translateY(-6px)', boxShadow: '0 18px 40px -24px rgba(16,50,47,0.45)', borderColor: '#B07C1F' }}
            style={{ background: '#FFFBF3', border: '1px solid #E2D7C3', padding: '34px 30px', display: 'flex', flexDirection: 'column', gap: 16, transition: 'transform .25s, box-shadow .25s, border-color .25s' }}
          >
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#B07C1F' }}>{t('Starter')}</div>
            <h3 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 30, fontWeight: 600 }}>{t('Landing Page')}</h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: '#3C5A50', textWrap: 'pretty' }}>
              {t('One page, one job: turn a visitor into an enquiry. You get the copy, the form, and the tracking that proves it pays.')}
            </p>
            <div style={{ marginTop: 'auto', fontSize: 12, color: '#7C8A7F' }}>{t('Copy · build · launch')}</div>
          </Hov>
          <Hov
            data-reveal="1"
            hv={{ transform: 'translateY(-6px)', boxShadow: '0 18px 40px -24px rgba(16,50,47,0.45)', borderColor: '#B07C1F' }}
            style={{ background: '#FFFBF3', border: '1px solid #E2D7C3', padding: '34px 30px', display: 'flex', flexDirection: 'column', gap: 16, transition: 'transform .25s, box-shadow .25s, border-color .25s' }}
          >
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#B07C1F' }}>{t('Main')}</div>
            <h3 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 30, fontWeight: 600 }}>{t('Online Store')}</h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: '#3C5A50', textWrap: 'pretty' }}>
              {t('Products, payments, stock and shipping, set up so you can run the shop without calling me.')}
            </p>
            <div style={{ marginTop: 'auto', fontSize: 12, color: '#7C8A7F' }}>{t('Payments · stock · training')}</div>
          </Hov>
          <Hov
            data-reveal="1"
            hv={{ transform: 'translateY(-6px)', boxShadow: '0 18px 40px -24px rgba(16,50,47,0.55)' }}
            style={{ background: '#10322F', border: '1px solid #10322F', padding: '34px 30px', display: 'flex', flexDirection: 'column', gap: 16, transition: 'transform .25s, box-shadow .25s' }}
          >
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#E0A93B' }}>{t('Standing order')}</div>
            <h3 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 30, fontWeight: 600, color: '#F6EFE2' }}>{t('Hosting & Care')}</h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: '#C8D6CD', textWrap: 'pretty' }}>
              {t('Hosting, backups, updates and small changes each month. You email a person, not a ticket queue.')}
            </p>
            <div style={{ marginTop: 'auto', fontSize: 12, color: '#8FA79A' }}>{t('Monthly · cancel any time')}</div>
          </Hov>
        </div>
      </section>
      <section style={{ background: '#EFE5D3', borderTop: '1px solid #E2D7C3', borderBottom: '1px solid #E2D7C3' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '88px 32px', display: 'flex', flexDirection: 'column', gap: 44 }}>
          <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: '66ch' }}>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#B07C1F' }}>{t('House rules')}</div>
            <h2 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 46, fontWeight: 600, lineHeight: 1 }}>{t('What you get, in writing')}</h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.85, color: '#3C5A50', textWrap: 'pretty' }}>
              {t("The kitchen is new, so I'll skip the wall of client logos. These four rules go in every quote I send. Hold me to them.")}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              ['Fixed quote first', 'You approve a number and a start date before I write a line of code. If the job grows, I tell you what it costs before I touch it.'],
              ['You own the lot', 'Code, domain, hosting login, content. Walk away whenever you like and take all of it with you.'],
              ['Real pages in week one', 'You click through your site in a browser within the first week. No slide decks and no mockups you cannot use.'],
              ['Words you can follow', 'I write emails in plain English. When a technical choice matters, I tell you what it costs and let you pick.'],
            ].map(([title, body]) => (
              <div key={title} data-reveal="1" style={{ background: '#F6EFE2', border: '1px solid #E2D7C3', minWidth: 0, padding: '30px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 24, fontWeight: 600, lineHeight: 1.15 }}>{t(title)}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: '#3C5A50', textWrap: 'pretty' }}>{t(body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '88px 32px' }}>
        <div data-reveal="1" style={{ background: '#10322F', padding: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: '52ch' }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 44, fontWeight: 600, color: '#F6EFE2', lineHeight: 1.05 }}>
              {t('Hungry? Tell me what you need.')}
            </h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: '#C8D6CD', textWrap: 'pretty' }}>
              {t('Send two lines about your business and what the site has to do. You get a quote and a start date, not a five-email sales sequence. Two of my three opening slots are still free.')}
            </p>
          </div>
          <Hov
            onClick={() => go('book')}
            hv={{ background: '#F6EFE2', transform: 'translateY(-2px)' }}
            style={{
              cursor: 'pointer',
              fontSize: 12,
              letterSpacing: 2,
              textTransform: 'uppercase',
              background: '#E0A93B',
              color: '#10322F',
              padding: '19px 32px',
              transition: 'background .2s, transform .2s',
            }}
          >
            {t('Book a table')}
          </Hov>
        </div>
      </section>
    </main>
  );
}
