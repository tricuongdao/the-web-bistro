'use client';

/*
 * The order ticket: hangs from a rail, lines type themselves onto the
 * paper, and the ticket kicks with each finished line.
 */

import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/components/providers/LangProvider';
import { TICKET, TICKET_VI } from '@/lib/i18n';
import styles from './ui.module.css';

export default function TicketType() {
  const { t, c, lang } = useLang();
  const [li, setLi] = useState(0);
  const [ci, setCi] = useState(0);
  const kickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = lang === 'vi' ? TICKET_VI : TICKET;
    let alive = true;
    let tm: ReturnType<typeof setTimeout>;

    const step = (l: number, ch: number) => {
      if (!alive) return;
      if (l >= lines.length) {
        tm = setTimeout(() => {
          if (!alive) return;
          setLi(0);
          setCi(0);
          step(0, 0);
        }, 3400);
      } else if (ch >= lines[l].length) {
        tm = setTimeout(() => {
          if (!alive) return;
          setLi(l + 1);
          setCi(0);
          step(l + 1, 0);
        }, 420);
      } else {
        tm = setTimeout(() => {
          if (!alive) return;
          setCi(ch + 1);
          step(l, ch + 1);
        }, 30);
      }
    };
    tm = setTimeout(() => step(0, 0), 500);
    return () => {
      alive = false;
      clearTimeout(tm);
    };
  }, [lang]);

  // Kick the ticket whenever a line finishes.
  useEffect(() => {
    const el = kickRef.current;
    if (!el) return;
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = 'wb-kick .55s cubic-bezier(.3,1.4,.4,1)';
  }, [li]);

  const lines = lang === 'vi' ? TICKET_VI : TICKET;
  const typed = lines.slice(0, li).concat(li < lines.length ? [lines[li].slice(0, ci)] : []);
  const status = li >= lines.length ? c.done : c.firing;

  return (
    <div className={styles.ticketStage}>
      <div className={styles.ticketRail} />
      <span className={styles.ticketHookL} />
      <span className={styles.ticketHookR} />
      <div ref={kickRef} className={styles.ticketKick}>
        <div className={styles.ticket}>
          <div className={styles.ticketHead}>
            <span>The Web Bistro</span>
            <span>{t('Order #0142')}</span>
          </div>
          <div className={styles.ticketDash} />
          <div className={styles.ticketBody}>
            {typed.map((line, i) => (
              <div key={i} className={styles.ticketLine}>
                {line}
              </div>
            ))}
            <span className={styles.ticketCaret} />
          </div>
          <div className={styles.ticketDash} />
          <div className={styles.ticketHead}>
            <span>{t('Served hot')}</span>
            <span>{status}</span>
          </div>
          <div className={styles.ticketTorn} />
        </div>
      </div>
    </div>
  );
}
