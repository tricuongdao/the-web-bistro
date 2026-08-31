import { MarkAwning } from './Marks.jsx';
import { Hov } from './ui.jsx'
import { useResponsive } from './responsive.js';
import { PAGES, pageHref, CONTACT } from '../i18n.js';

export default function Footer({ t }) {
  const { isMobile } = useResponsive();
  return (
    <footer style={{ background: '#0B2422', borderTop: '4px solid #E0A93B' }}>
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: isMobile ? '40px 20px 28px' : '56px 32px 40px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          gap: isMobile ? 32 : 40,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <MarkAwning size={56} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontFamily: 'var(--wb-serif)', fontSize: 24, fontWeight: 600, color: '#F6EFE2' }}>
              The Web Bistro
            </span>
            <span style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: '#E0A93B' }}>
              {t('Web development')}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: isMobile ? 36 : 56, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#7C8A7F' }}>
              {t('Pages')}
            </span>
            {PAGES.map(([label, pg]) => (
              <Hov
                key={pg}
                as="a"
                href={pageHref(pg)}
                hv={{ color: '#E0A93B' }}
                style={{ fontSize: 13, color: '#C8D6CD', transition: 'color .2s' }}
              >
                {t(label)}
              </Hov>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#7C8A7F' }}>
              {t('Get in touch')}
            </span>
            <Hov
              as="a"
              href={`mailto:${CONTACT.email}`}
              hv={{ color: '#E0A93B' }}
              style={{ fontSize: 13, color: '#C8D6CD' }}
            >
              {CONTACT.email}
            </Hov>
            <Hov
              as="a"
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              hv={{ color: '#E0A93B' }}
              style={{ fontSize: 13, color: '#C8D6CD' }}
            >
              {t('@thewebbistro on Instagram')}
            </Hov>
            <span style={{ fontSize: 13, color: '#C8D6CD' }}>{t('Open 7 days a week, 9 to 6')}</span>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px 40px', fontSize: 11, color: '#6E8279' }}>
        {`© ${new Date().getFullYear()} The Web Bistro.`}
      </div>
    </footer>
  );
}
