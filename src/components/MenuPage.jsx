import { Hov } from './ui.jsx';
import { pageHref } from '../i18n.js';

const ROW = {
  padding: '24px 0',
  borderBottom: '1px solid #E2D7C3',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
  gap: 32,
  transition: 'background .2s, padding-left .2s',
};
const ROW_HV = { background: '#FFFBF3', paddingLeft: 12 };

function Row({ t, title, meta, body }) {
  return (
    <Hov hv={ROW_HV} style={ROW}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 24, fontWeight: 600 }}>{t(title)}</h3>
        <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#B07C1F' }}>{t(meta)}</span>
      </div>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: '#3C5A50', textWrap: 'pretty' }}>{t(body)}</p>
    </Hov>
  );
}

function SectionHead({ t, title, note }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 12 }}>
      <h2 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 34, fontWeight: 600 }}>{t(title)}</h2>
      <div style={{ flex: 1, height: 1, background: '#E2D7C3' }} />
      <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#7C8A7F' }}>{t(note)}</span>
    </div>
  );
}

export default function MenuPage({ t }) {
  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '88px 32px 96px', display: 'flex', flexDirection: 'column', gap: 64 }}>
      <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#B07C1F' }}>{t('The menu')}</div>
        <h1 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 64, fontWeight: 600, lineHeight: 1 }}>{t('Everything I serve')}</h1>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: '#3C5A50', maxWidth: '58ch', textWrap: 'pretty' }}>
          {t("No fixed prices, because no two jobs are the same size. Tell me the dish and I'll quote the plate inside a day.")}
        </p>
        <div style={{ width: 56, height: 1, background: '#B07C1F', marginTop: 8 }} />
      </div>

      <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionHead t={t} title="Starters" note="Small, fast, done in a week" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Row t={t} title="Landing Page" meta="1 page · 1 week" body="One page built around a single action: call, book or buy. Copy, form and tracking come with it." />
          <Row t={t} title="Site Rescue" meta="Audit · fix · hand back" body="Your current site, fast and readable again. I strip the bloat, fix what broke, and write down every change I made." />
        </div>
      </div>
      <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionHead t={t} title="Mains" note="The full build" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Row t={t} title="Marketing Website" meta="5–8 pages · 3–4 weeks" body="The site your customers judge you by. Structure, words and design built around what you sell, plus an editor you can use without me." />
          <Row t={t} title="Online Store" meta="Payments · stock · shipping" body="A shop that takes money without drama and holds up at Christmas. Handover walks you through every screen you'll touch." />
          <Row t={t} title="Web App" meta="Scoped per project" body="Booking systems, client portals, dashboards. Custom software with a front door your customers understand." />
        </div>
      </div>

      <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionHead t={t} title="Sides" note="Good with anything above" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {[
            ['SEO Groundwork', 'Speed, structure and the words your customers type. I build it in from day one instead of bolting it on.'],
            ['Analytics Setup', 'Privacy-friendly tracking that shows you which page brought the money in.'],
          ].map(([title, body]) => (
            <Hov
              key={title}
              hv={{ borderColor: '#B07C1F', transform: 'translateY(-4px)' }}
              style={{ background: '#FFFBF3', borderWidth: 1, borderStyle: 'solid', borderColor: '#E2D7C3', padding: 26, display: 'flex', flexDirection: 'column', gap: 10, transition: 'border-color .2s, transform .2s' }}
            >
              <h3 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 22, fontWeight: 600 }}>{t(title)}</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: '#3C5A50', textWrap: 'pretty' }}>{t(body)}</p>
            </Hov>
          ))}
        </div>
      </div>

      <div data-reveal="1" style={{ background: '#10322F', padding: '44px 48px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)', gap: 32, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#E0A93B' }}>{t('Standing order')}</span>
          <h2 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 32, fontWeight: 600, color: '#F6EFE2' }}>{t('Hosting & Care')}</h2>
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: '#C8D6CD', textWrap: 'pretty' }}>
          {t('Monthly hosting, backups, updates and a slice of my time for small changes. Cancel when you like. Your site and domain stay yours.')}
        </p>
      </div>

      <div data-reveal="1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--wb-serif)', fontStyle: 'italic', fontSize: 20, color: '#3C5A50' }}>{t('Nothing here quite fits?')}</span>
        <Hov
          as="a"
          href={pageHref('book')}
          hv={{ background: '#B07C1F' }}
          style={{
            fontSize: 12,
            letterSpacing: 2,
            textTransform: 'uppercase',
            background: '#10322F',
            color: '#F6EFE2',
            padding: '16px 26px',
            transition: 'background .2s',
          }}
        >
          {t('Ask the kitchen')}
        </Hov>
      </div>
    </main>
  );
}
