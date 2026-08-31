import { useEffect, useRef, useState } from 'react';
import { Hov } from './ui.jsx';
import { CONTACT, pageHref, FLAP } from '../i18n.js';

// Hearth flames under the closing CTA (positions/sizes/durations exactly as the design)
const FLAMES = [
  ['5%', 30, 58, '1.05s', '-0.4s'],
  ['14%', 38, 72, '1.32s', '-1.1s'],
  ['23%', 28, 52, '0.92s', '-0.2s'],
  ['32%', 42, 80, '1.44s', '-0.8s'],
  ['41%', 32, 62, '1.14s', '-1.5s'],
  ['50%', 46, 88, '1.5s', '-0.35s'],
  ['59%', 30, 58, '0.98s', '-1.2s'],
  ['68%', 40, 76, '1.36s', '-0.6s'],
  ['77%', 28, 54, '1.08s', '-1.4s'],
  ['86%', 36, 68, '1.24s', '-0.15s'],
  ['95%', 30, 56, '0.95s', '-0.9s'],
];

const FLAME_BG =
  'radial-gradient(ellipse at 50% 82%, #FFFBF3 0%, #E0A93B 30%, #B07C1F 58%, rgba(176,124,31,0) 80%)';

// Dial gauge cards in "By the numbers" (values and needle angles from the design)
const NUMBERS = [
  { value: '3', unit: '×', label: 'Opening tables', dial: 122 },
  { value: '24', unit: 'h', label: 'Reply, at the latest', dial: 48 },
  { value: '100', unit: '', label: 'Performance target', dial: 135 },
  { value: '7', unit: 'd', label: 'Kitchen open weekly', dial: 135 },
];

function DialCard({ t, value, unit, label, dial }) {
  return (
    <Hov
      hv={{ transform: 'translateY(-6px)', borderColor: '#B07C1F', boxShadow: '0 18px 40px -26px rgba(16,50,47,0.45)' }}
      style={{
        background: '#FFFBF3',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#E2D7C3',
        padding: '26px 22px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        minWidth: 0,
        transition: 'transform .25s, border-color .25s, box-shadow .25s',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 88,
          height: 88,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 36% 30%, #FFFBF3, #EFE5D3 62%, #DCCFB8)',
          border: '2px solid #E2D7C3',
          boxShadow: 'inset 0 3px 8px rgba(16,50,47,0.14), 0 6px 16px -10px rgba(16,50,47,0.5)',
        }}
      >
        {[-135, -67.5, 0, 67.5, 135].map((a) => (
          <span
            key={a}
            style={{
              position: 'absolute',
              left: '50%',
              top: 5,
              width: 2,
              height: 9,
              marginLeft: -1,
              transformOrigin: '50% 39px',
              transform: `rotate(${a}deg)`,
              background: '#C3B79F',
            }}
          />
        ))}
        <span
          data-dial={dial}
          style={{
            position: 'absolute',
            left: '50%',
            top: 12,
            width: 3,
            height: 32,
            marginLeft: -1.5,
            borderRadius: 2,
            background: '#B07C1F',
            transformOrigin: '50% 32px',
            transform: 'rotate(-135deg)',
            transition: 'transform 1.5s cubic-bezier(.22,1.3,.36,1)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 14,
            height: 14,
            margin: '-7px 0 0 -7px',
            borderRadius: '50%',
            background: '#10322F',
            boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <span
            style={{
              fontFamily: 'var(--wb-serif)',
              fontSize: 38,
              fontWeight: 600,
              lineHeight: 1,
              color: '#10322F',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {value}
          </span>
          {unit && (
            <span style={{ fontFamily: 'var(--wb-serif)', fontSize: 21, fontWeight: 600, color: '#B07C1F' }}>
              {unit}
            </span>
          )}
        </div>
        <span style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#7C8A7F', textAlign: 'center' }}>
          {t(label)}
        </span>
      </div>
    </Hov>
  );
}

export default function HomePage({ t, lang, url, o, score, secs, perfLabel, paintLabel, buildStatus, ticket, ticketStatus }) {
  // Pass-board flap words cycle every 2.8s with a split-flap flip (as in the design)
  const flapRef = useRef(null);
  const [flapI, setFlapI] = useState(0);
  useEffect(() => {
    const h = setInterval(() => {
      const el = flapRef.current;
      if (el) {
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = 'wb-flip .58s cubic-bezier(.45,0,.2,1)';
      }
      setTimeout(() => setFlapI((v) => v + 1), 250);
    }, 2800);
    return () => clearInterval(h);
  }, []);
  const flaps = lang === 'vi' ? FLAP.vi : FLAP.en;
  const flapWord = flaps[flapI % flaps.length];
  const flapNext1 = flaps[(flapI + 1) % flaps.length];
  const flapNext2 = flaps[(flapI + 2) % flaps.length];

  // Order ticket: kicks when a line finishes typing (as in the design's kick())
  const ticketRef = useRef(null);
  useEffect(() => {
    const el = ticketRef.current;
    if (!el) return;
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = 'wb-kick .55s cubic-bezier(.3,1.4,.4,1)';
  }, [ticket.length]);

  // Dial gauges: needle sweeps to its angle when scrolled into view, then
  // settles into a gentle infinite sway (as in the design's counts()).
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-dial]'));
    if (!nodes.length) return;
    const timers = [];
    const set = (n) => {
      n.style.transform = `rotate(${n.getAttribute('data-dial')}deg)`;
      timers.push(
        setTimeout(() => {
          n.style.setProperty('--wb-a', `${n.getAttribute('data-dial')}deg`);
          n.style.transition = 'none';
          n.style.animation = 'wb-needle 3.2s ease-in-out infinite';
        }, 1700)
      );
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          timers.push(setTimeout(() => set(e.target), 120 + i * 140));
        });
      },
      { threshold: 0.4 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

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
            <span style={{ width: 28, height: 1, background: '#B07C1F', animation: 'wb-rule .8s cubic-bezier(.2,.8,.25,1) .1s both' }} />
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
              animation: 'wb-wipe 1.1s cubic-bezier(.22,.9,.24,1) .16s both',
            }}
          >
            {t('Websites that bring customers in.')}
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
          <div data-para="-22" style={{ background: '#FFFBF3', border: '1px solid #E2D7C3', boxShadow: '0 34px 64px -36px rgba(16,50,47,0.55)', willChange: 'transform' }}>
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
            <div style={{ position: 'relative', width: '100%', maxWidth: 400, paddingTop: 30 }}>
              {/* Rail + hooks the ticket hangs from */}
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  left: -18,
                  right: -18,
                  height: 8,
                  borderRadius: 4,
                  background: 'linear-gradient(#C8D6CD, #4C6A60 55%, #10322F)',
                  boxShadow: '0 3px 9px rgba(0,0,0,0.55)',
                }}
              />
              <div style={{ position: 'absolute', top: 8, left: 52, width: 13, height: 30, borderRadius: 3, background: 'linear-gradient(#E2D7C3, #7C8A7F)' }} />
              <div style={{ position: 'absolute', top: 8, right: 52, width: 13, height: 30, borderRadius: 3, background: 'linear-gradient(#E2D7C3, #7C8A7F)' }} />
              <div ref={ticketRef} style={{ transformOrigin: '50% 0%' }}>
              <div
                style={{
                  position: 'relative',
                  background: '#F6EFE2',
                  padding: '30px 28px 22px',
                  boxShadow: '0 30px 60px -30px rgba(0,0,0,0.6)',
                  transformOrigin: '50% 0%',
                  animation: 'wb-swing 5.6s ease-in-out infinite',
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
              {/* Torn bottom edge */}
              <div
                style={{
                  margin: '16px -28px -22px',
                  height: 10,
                  background:
                    'linear-gradient(-45deg, #F6EFE2 7px, transparent 0) 0 0 / 14px 14px repeat-x, linear-gradient(45deg, #F6EFE2 7px, transparent 0) 0 0 / 14px 14px repeat-x',
                }}
              />
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── The pass board: split-flap word board + cloche scene ── */}
      <section style={{ position: 'relative', background: '#0B2422', overflow: 'hidden' }}>
        <div
          data-para="38"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(700px circle at 78% 40%, rgba(224,169,59,0.13), transparent 65%)',
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '84px 32px',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.92fr)',
            gap: 44,
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div data-reveal="1" style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#E0A93B' }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#E0A93B', animation: 'wb-ember 2.1s ease-in-out infinite' }} />
              {t('The pass board')}
            </div>
            <h2 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 44, fontWeight: 600, color: '#F6EFE2', lineHeight: 1.05 }}>
              {t('Tonight the kitchen is cooking')}
            </h2>
            <div
              style={{
                position: 'relative',
                background: '#10322F',
                border: '1px solid rgba(224,169,59,0.32)',
                boxShadow: 'inset 0 0 70px rgba(0,0,0,0.5)',
                padding: '30px 34px 30px 44px',
                overflow: 'hidden',
                perspective: 900,
              }}
            >
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 7, background: 'linear-gradient(#E0A93B, #B07C1F)' }} />
              <div
                ref={flapRef}
                style={{
                  fontFamily: 'var(--wb-serif)',
                  fontSize: 54,
                  fontWeight: 600,
                  lineHeight: 1.08,
                  color: '#E0A93B',
                  transformOrigin: '50% 50%',
                  textWrap: 'balance',
                  minHeight: 60,
                }}
              >
                {flapWord}
              </div>
              <div style={{ position: 'absolute', left: 7, right: 0, top: '50%', height: 2, background: '#0B2422', opacity: 0.85 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13, flexWrap: 'wrap', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#7C8A7F' }}>
              <span>{t('Next up')}</span>
              <span style={{ color: '#C8D6CD' }}>{flapNext1}</span>
              <span style={{ color: '#4C6A60' }}>/</span>
              <span style={{ color: '#8FA79A' }}>{flapNext2}</span>
            </div>
          </div>
          <div data-reveal="1" style={{ display: 'flex', justifyContent: 'center', minWidth: 0 }}>
            <div data-para="-28" style={{ position: 'relative', width: 300, height: 384, willChange: 'transform' }}>
              {/* Kitchen rail */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 18,
                  right: 18,
                  height: 11,
                  borderRadius: 3,
                  background: 'linear-gradient(#4C6A60, #10322F)',
                  borderBottom: '1px solid rgba(224,169,59,0.45)',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.5)',
                }}
              />
              {/* Heat lamps */}
              {[74, 150, 226].map((left) => (
                <span
                  key={left}
                  style={{
                    position: 'absolute',
                    top: 12,
                    left,
                    width: 74,
                    height: 176,
                    marginLeft: -37,
                    background: 'linear-gradient(rgba(224,169,59,0.5), rgba(224,169,59,0))',
                    clipPath: 'polygon(38% 0, 62% 0, 100% 100%, 0 100%)',
                    animation: 'wb-lamp 9.4s ease-in-out infinite',
                  }}
                />
              ))}
              {/* Saucer */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 34,
                  width: 206,
                  height: 38,
                  marginLeft: -103,
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse at 50% 26%, #FFFBF3 0%, #EFE5D3 44%, #C3B79F 82%, #A2957E 100%)',
                  boxShadow: '0 18px 32px -14px rgba(0,0,0,0.8), inset 0 -2px 4px rgba(0,0,0,0.18)',
                }}
              />
              {/* Plate with a tiny page on it, revealed as the cloche lifts */}
              <div style={{ position: 'absolute', left: '50%', bottom: 74, width: 128, marginLeft: -64, animation: 'wb-plate 9.4s cubic-bezier(.3,1.3,.4,1) infinite' }}>
                <div style={{ background: '#FFFBF3', border: '1px solid #C3B79F', boxShadow: '0 10px 20px -12px rgba(0,0,0,0.6)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '5px 6px', background: '#10322F' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#E0A93B' }} />
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(246,239,226,0.4)' }} />
                    <span style={{ flex: 1, height: 5, marginLeft: 3, background: 'rgba(246,239,226,0.22)' }} />
                  </div>
                  <div style={{ padding: '9px 10px 11px', display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <span style={{ width: '74%', height: 8, background: '#10322F' }} />
                    <span style={{ width: '92%', height: 4, background: '#E2D7C3' }} />
                    <span style={{ width: '60%', height: 4, background: '#E2D7C3' }} />
                    <span style={{ width: 42, height: 12, marginTop: 3, background: '#E0A93B' }} />
                  </div>
                </div>
              </div>
              {/* Steam billows */}
              {[
                [112, 26, '0.1s'],
                [150, 34, '0.5s'],
                [188, 24, '0.9s'],
              ].map(([left, size, delay]) => (
                <span
                  key={left}
                  style={{
                    position: 'absolute',
                    left,
                    bottom: 96,
                    width: size,
                    height: size,
                    marginLeft: -size / 2,
                    borderRadius: '50%',
                    background: 'rgba(246,239,226,0.8)',
                    filter: 'blur(9px)',
                    animation: `wb-billow 9.4s ease-out ${delay} infinite`,
                  }}
                />
              ))}
              {/* Cloche */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 22,
                  marginLeft: -120,
                  transformOrigin: '50% 100%',
                  animation: 'wb-cloche 9.4s cubic-bezier(.36,1.3,.45,1) infinite',
                }}
              >
                <svg width="240" height="240" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cloche">
                  <ellipse cx="100" cy="158" rx="72" ry="9" fill="rgba(0,0,0,0.35)" />
                  <path d="M40 150 A 62 74 0 0 1 160 150 Z" fill="#F6EFE2" />
                  <path d="M40 150 A 62 74 0 0 1 160 150 Z" fill="url(#wbSheen)" />
                  <ellipse cx="76" cy="114" rx="8" ry="27" transform="rotate(-16 76 114)" fill="rgba(255,255,255,0.75)" />
                  <rect x="20" y="149" width="160" height="13" rx="6.5" fill="#E0A93B" />
                  <rect x="20" y="149" width="160" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
                  <rect x="95" y="58" width="10" height="24" rx="3" fill="#E0A93B" />
                  <rect x="82" y="38" width="36" height="22" rx="5" fill="#E0A93B" />
                  <rect x="82" y="38" width="36" height="7" rx="3.5" fill="rgba(255,255,255,0.35)" />
                  <defs>
                    <linearGradient id="wbSheen" x1="40" y1="76" x2="160" y2="150" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFFFFF" stopOpacity="0.55" />
                      <stop offset="0.5" stopColor="#F6EFE2" stopOpacity="0" />
                      <stop offset="1" stopColor="#C3B79F" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                </svg>
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
            data-reveal="tilt"
            hv={{ transform: 'translateY(-6px)', boxShadow: '0 18px 40px -24px rgba(16,50,47,0.45)', borderColor: '#B07C1F' }}
            style={{ background: '#FFFBF3', borderWidth: 1, borderStyle: 'solid', borderColor: '#E2D7C3', padding: '34px 30px', display: 'flex', flexDirection: 'column', gap: 16, transition: 'transform .25s, box-shadow .25s, border-color .25s' }}
          >
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#B07C1F' }}>{t('Starter')}</div>
            <h3 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 30, fontWeight: 600 }}>{t('Landing Page')}</h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: '#3C5A50', textWrap: 'pretty' }}>
              {t('One page, one job: turn a visitor into an enquiry. You get the copy, the form, and the tracking that proves it pays.')}
            </p>
            <div style={{ marginTop: 'auto', fontSize: 12, color: '#7C8A7F' }}>{t('Copy · build · launch')}</div>
          </Hov>
          <Hov
            data-reveal="tilt"
            hv={{ transform: 'translateY(-6px)', boxShadow: '0 18px 40px -24px rgba(16,50,47,0.45)', borderColor: '#B07C1F' }}
            style={{ background: '#FFFBF3', borderWidth: 1, borderStyle: 'solid', borderColor: '#E2D7C3', padding: '34px 30px', display: 'flex', flexDirection: 'column', gap: 16, transition: 'transform .25s, box-shadow .25s, border-color .25s' }}
          >
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#B07C1F' }}>{t('Main')}</div>
            <h3 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 30, fontWeight: 600 }}>{t('Online Store')}</h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: '#3C5A50', textWrap: 'pretty' }}>
              {t('Products, payments, stock and shipping, set up so you can run the shop without calling me.')}
            </p>
            <div style={{ marginTop: 'auto', fontSize: 12, color: '#7C8A7F' }}>{t('Payments · stock · training')}</div>
          </Hov>
          <Hov
            data-reveal="tilt"
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
      {/* ── By the numbers: animated dial gauges ── */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px 88px', display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div data-reveal="1" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#B07C1F' }}>{t('By the numbers')}</span>
          <span style={{ flex: 1, height: 1, background: '#E2D7C3' }} />
        </div>
        <div data-reveal="1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(178px, 1fr))', gap: 20 }}>
          {NUMBERS.map((n) => (
            <DialCard key={n.label} t={t} value={n.value} unit={n.unit} label={n.label} dial={n.dial} />
          ))}
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
        <div data-reveal="1" style={{ position: 'relative', overflow: 'hidden', background: '#10322F', padding: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          {/* Hearth glow + flames along the bottom edge */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 150, pointerEvents: 'none', overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(0deg, rgba(224,169,59,0.34) 0%, rgba(176,124,31,0.12) 42%, rgba(176,124,31,0) 76%)',
                animation: 'wb-hearth 3.6s ease-in-out infinite',
              }}
            />
            {FLAMES.map(([left, w, h, dur, delay]) => (
              <span
                key={left}
                style={{
                  position: 'absolute',
                  bottom: -16,
                  left,
                  width: w,
                  height: h,
                  marginLeft: -w / 2,
                  borderRadius: '50% 50% 46% 46% / 68% 68% 32% 32%',
                  background: FLAME_BG,
                  filter: 'blur(8px)',
                  transformOrigin: '50% 100%',
                  animation: `wb-flame ${dur} ease-in-out ${delay} infinite`,
                }}
              />
            ))}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 5, background: 'linear-gradient(90deg, #B07C1F, #E0A93B, #B07C1F)' }} />
          </div>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: '52ch' }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--wb-serif)', fontSize: 44, fontWeight: 600, color: '#F6EFE2', lineHeight: 1.05 }}>
              {t('Hungry? Tell me what you need.')}
            </h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: '#C8D6CD', textWrap: 'pretty' }}>
              {t('Send two lines about your business and what the site has to do. You get a quote and a start date, not a five-email sales sequence. Two of my three opening slots are still free.')}
            </p>
          </div>
          <Hov
            as="a"
            href={pageHref('book')}
            hv={{ background: '#F6EFE2', transform: 'translateY(-3px)', boxShadow: '0 18px 34px -18px rgba(224,169,59,0.9)' }}
            style={{
              position: 'relative',
              cursor: 'pointer',
              fontSize: 12,
              letterSpacing: 2,
              textTransform: 'uppercase',
              background: '#E0A93B',
              color: '#10322F',
              padding: '19px 32px',
              transition: 'background .2s, transform .2s, box-shadow .2s',
            }}
          >
            {t('Book a table')}
          </Hov>
        </div>
      </section>
    </main>
  );
}
