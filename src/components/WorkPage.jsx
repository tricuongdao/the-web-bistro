import { Hov } from './ui.jsx';
import { pageHref } from '../i18n.js';

const TABLES = [
  {
    label: 'Table one',
    title: 'Shops, cafés and trades',
    items: [
      'A site that answers the three questions people phone you to ask',
      'Menu, price list or service pages you can edit yourself',
      'Bookings or enquiries landing in your inbox, not a portal',
      'Google Business and maps set up properly',
    ],
  },
  {
    label: 'Table two',
    title: 'Startups and founders',
    items: [
      'A launch page written to explain what you actually do',
      'Waitlist or sign-up wired to your email tool',
      'Room to add pages as the story changes',
      'Analytics that show which message lands',
    ],
  },
  {
    label: 'Table three',
    title: 'Agencies and studios',
    items: [
      'Your designs built to the pixel, on the date I gave you',
      'Clean handover: readable code and a written walkthrough',
      'I stay invisible to your client if that is how you want it',
      'Cover for overflow weeks without a full-time hire',
    ],
  },
];

const CARD = {
  background: '#FFFBF3',
  border: '1px solid #E2D7C3',
  minWidth: 0,
  padding: '32px 30px',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  transition: 'transform .25s, box-shadow .25s, border-color .25s',
};
const CARD_HV = { transform: 'translateY(-6px)', boxShadow: '0 18px 40px -24px rgba(16,50,47,0.45)', borderColor: '#B07C1F' };

export default function WorkPage({ t }) {
  return (
    <main style={{ maxWidth: 1240, margin: '0 auto', padding: '88px 32px 96px', display: 'flex', flexDirection: 'column', gap: 52 }}>
      <div data-reveal="1" style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: '64ch' }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#B07C1F' }}>{t('Opening offer')}</div>
        <h1 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 62, fontWeight: 600, lineHeight: 1, textWrap: 'balance' }}>
          {t('The first three tables eat at the opening rate.')}
        </h1>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.85, color: '#3C5A50', textWrap: 'pretty' }}>
          {t("Here's the honest trade. I opened this kitchen in 2026 and I need three sites worth showing off. You need a site that brings in work. So for the first three bookings I cut a third off the quote and put the saved hours straight back into the build.")}
        </p>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.85, color: '#3C5A50', textWrap: 'pretty' }}>
          {t('In return I ask two things: let me photograph the finished site for this page, and tell me the truth about what it changed for your business.')}
        </p>
      </div>

      <div data-reveal="1" style={{ background: '#10322F', padding: '30px 34px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#E0A93B', animation: 'wb-blink 1.6s ease-in-out infinite' }} />
          <span style={{ fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: '#F6EFE2' }}>
            {t('Two of three opening tables still free')}
          </span>
        </div>
        <span style={{ fontSize: 13, color: '#C8D6CD' }}>{t('Bookings close as soon as the third one goes.')}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 26 }}>
        {TABLES.map((table) => (
          <Hov key={table.label} data-reveal="1" hv={CARD_HV} style={CARD}>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#B07C1F' }}>{t(table.label)}</div>
            <h3 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 27, fontWeight: 600, lineHeight: 1.1 }}>{t(table.title)}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {table.items.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 10, fontSize: 14, lineHeight: 1.7, color: '#3C5A50' }}>
                  <span style={{ color: '#B07C1F' }}>✦</span>
                  <span style={{ textWrap: 'pretty' }}>{t(item)}</span>
                </div>
              ))}
            </div>
          </Hov>
        ))}
      </div>

      <div data-reveal="1" style={{ background: '#EFE5D3', border: '1px solid #E2D7C3', padding: '44px 42px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 34 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#B07C1F' }}>{t('The risk is mine')}</div>
          <h2 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 34, fontWeight: 600, lineHeight: 1.05 }}>{t('Nothing to lose by ordering')}</h2>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: '#3C5A50', textWrap: 'pretty' }}>
            {t('A new business asking for money up front should give you something back. Here it is.')}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            'See the first draft in week one. If you hate it, your deposit comes back with no argument.',
            'The quote holds. I absorb my own mistakes and estimate errors.',
            'I keep working past launch until your site does the job we agreed on.',
            'Every login, file and line of code lands in your hands on day one.',
          ].map((item, i) => (
            <div key={item} style={{ display: 'flex', gap: 12, fontSize: 14, lineHeight: 1.7, color: '#10322F' }}>
              <span style={{ color: '#B07C1F' }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ textWrap: 'pretty' }}>{t(item)}</span>
            </div>
          ))}
        </div>
      </div>

      <div data-reveal="1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap', paddingTop: 8 }}>
        <span style={{ fontFamily: 'var(--wb-serif)', fontStyle: 'italic', fontSize: 21, color: '#3C5A50' }}>{t('Want one of the three?')}</span>
        <Hov
          as="a"
          href={pageHref('book')}
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
          {t('Claim a table')}
        </Hov>
      </div>
    </main>
  );
}
