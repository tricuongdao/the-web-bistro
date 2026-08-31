import { useEffect, useRef } from 'react';
import { MarkAwning } from './Marks.jsx';
import { Hov } from './ui.jsx';
import { PAGES, pageHref, CONTACT } from '../i18n.js';

export default function Header({ t, langLabel, onToggleLang }) {
  // Scroll progress bar inside the striped strip (as in the design's progressRef)
  const progRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (!progRef.current) return;
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      const y = window.scrollY || d.scrollTop || 0;
      progRef.current.style.width = `${(max > 0 ? Math.min(1, y / max) * 100 : 0).toFixed(2)}%`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: '#10322F',
        borderBottom: '1px solid rgba(246,239,226,0.14)',
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        {/* Real anchor: keyboard focusable, middle-click, back/forward aware */}
        <Hov
          as="a"
          href={pageHref('home')}
          hv={{ transform: 'translateY(-3px)' }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', cursor: 'pointer', transition: 'transform .3s cubic-bezier(.3,1.4,.4,1)' }}
        >
          <MarkAwning size={42} variant="icon" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span
              style={{
                fontFamily: 'var(--wb-serif)',
                fontSize: 21,
                fontWeight: 600,
                color: '#F6EFE2',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              The Web Bistro
            </span>
            <span style={{ fontSize: 8, letterSpacing: 3, textTransform: 'uppercase', color: '#E0A93B' }}>
              {t('Web development')}
            </span>
          </div>
        </Hov>
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            gap: '14px 22px',
          }}
        >
          {PAGES.map(([label, pg]) => (
            <Hov
              key={pg}
              as="a"
              href={pageHref(pg)}
              hv={{ color: '#E0A93B', borderBottomColor: '#E0A93B' }}
              style={{
                whiteSpace: 'nowrap',
                fontSize: 12,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#F6EFE2',
                paddingBottom: 4,
                // Longhands (not the `borderBottom` shorthand) so React's style
                // diff restores the transparent color on hover-out instead of
                // dropping the declaration (which falls back to currentColor).
                borderBottomWidth: 2,
                borderBottomStyle: 'solid',
                borderBottomColor: 'transparent',
                transition: 'color .2s, border-color .2s',
              }}
            >
              {t(label)}
            </Hov>
          ))}
          <Hov
            as="button"
            type="button"
            onClick={onToggleLang}
            hv={{ borderColor: '#E0A93B', color: '#E0A93B' }}
            style={{
              cursor: 'pointer',
              appearance: 'none',
              background: 'transparent',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#F6EFE2',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'rgba(246,239,226,0.4)',
              padding: '11px 14px',
              transition: 'border-color .2s, color .2s',
            }}
          >
            {langLabel}
          </Hov>
          <Hov
            as="a"
            href={`mailto:${CONTACT.email}`}
            hv={{ background: '#F6EFE2', transform: 'translateY(-2px)' }}
            style={{
              whiteSpace: 'nowrap',
              fontSize: 12,
              letterSpacing: 2,
              textTransform: 'uppercase',
              background: '#E0A93B',
              color: '#10322F',
              padding: '12px 18px',
              transition: 'background .2s, transform .2s',
            }}
          >
            {t('Email me')}
          </Hov>
        </nav>
      </div>
      <div
        style={{
          position: 'relative',
          height: 5,
          background: 'repeating-linear-gradient(90deg, #E0A93B 0 28px, #F6EFE2 28px 56px)',
          overflow: 'hidden',
          transformOrigin: '50% 0',
          animation: 'wb-drop .8s cubic-bezier(.3,1.35,.4,1) both',
        }}
      >
        <div ref={progRef} style={{ height: '100%', width: '0%', background: '#10322F', opacity: 0.55 }} />
      </div>
    </header>
  );
}
