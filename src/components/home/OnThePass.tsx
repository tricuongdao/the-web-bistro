'use client';

/*
 * On the pass: the four-station story. Intro + the typing order ticket,
 * then the stations pan sideways as you scroll (pinned on desktop, a
 * plain list on mobile / reduced motion).
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useLang } from '@/components/providers/LangProvider';
import TicketType from '@/components/ui/TicketType';
import Reveal from '@/components/ui/Reveal';
import { PROCESS } from '@/lib/content';
import styles from './home.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function OnThePass() {
  const { t } = useLang();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!wrap || !track) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const pan = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const progress = bar
        ? gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              transformOrigin: 'left center',
              scrollTrigger: {
                trigger: wrap,
                start: 'top top',
                end: () => `+=${distance()}`,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            },
          )
        : null;

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }

      return () => {
        pan.scrollTrigger?.kill();
        pan.kill();
        progress?.scrollTrigger?.kill();
        progress?.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.pass} id="process">
      <div className={styles.passGlow} aria-hidden="true" />
      <div className={`container ${styles.passInner}`}>
        <div className={styles.passGrid}>
          <Reveal className={styles.passCopy}>
            <div className={styles.tag}>
              <span className={styles.tagDot} />
              {t('On the pass')}
            </div>
            <h2 className={styles.passTitle}>{t('Every job leaves the kitchen the same way.')}</h2>
            <p className={styles.passLead}>
              {t(
                'Brief in, ticket up, built, served. Ask me on a Tuesday what happened on Monday and you get a straight answer, not a status page.',
              )}
            </p>
            <Link href="/book" className="btn btn-glass">
              {t('Put a ticket in')}
            </Link>
          </Reveal>
          <Reveal delay={0.12} className={styles.passTicket}>
            <TicketType />
          </Reveal>
        </div>
      </div>

      <div ref={wrapRef} className={styles.stationPan}>
        <div className={styles.stationHeadWrap}>
          <span className={styles.stationHead}>{t('How service runs')}</span>
        </div>
        <div ref={trackRef} className={styles.stationTrack}>
          {PROCESS.map((s) => (
            <article key={s.title} className={styles.stationPanel}>
              <span className={styles.stationStamp}>{t(s.stamp)}</span>
              <h3 className={styles.stationTitle}>{t(s.title)}</h3>
              <p className={styles.stationBody}>{t(s.body)}</p>
            </article>
          ))}
        </div>
        <div className={styles.panProgress}>
          <div ref={barRef} className={styles.panBar} />
        </div>
      </div>
    </section>
  );
}
