'use client';

/*
 * Floating glass header: a pill that hovers over the page (nav, language
 * toggle, the "Email me" doorbell), with a copper scroll-progress line
 * pinned to the top of the viewport.
 */

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Wordmark from '@/components/ui/Wordmark';
import { useLang } from '@/components/providers/LangProvider';
import { CONTACT, NAV } from '@/lib/content';
import styles from './layout.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const { t, c, toggle } = useLang();
  const pathname = usePathname();
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progRef.current;
    if (!bar) return;
    bar.style.transform = 'scaleX(0)';
    const st = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => {
        bar.style.transform = `scaleX(${self.progress.toFixed(4)})`;
      },
    });
    return () => st.kill();
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a href="#content" className="skip-link">
        {t('Skip to content')}
      </a>
      <div ref={progRef} className={styles.progress} aria-hidden="true" />
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <div className={styles.pill}>
            <Link href="/" className={styles.brand}>
              <Wordmark disc size="sm" />
              <span className={styles.brandCol}>
                <span className={styles.brandName}>The Web Bistro</span>
                <span className={styles.brandTag}>{t('Web development')}</span>
              </span>
            </Link>
            <nav className={styles.nav} aria-label="Main">
              {NAV.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className={`${styles.navLink}${isActive(href) ? ` ${styles.navLinkActive}` : ''}`}
                  aria-current={isActive(href) ? 'page' : undefined}
                >
                  {t(label)}
                </Link>
              ))}
              <button type="button" className={styles.langBtn} onClick={toggle}>
                {c.lang}
              </button>
              <a className={styles.emailBtn} href={`mailto:${CONTACT.email}`}>
                {t('Email me')}
              </a>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
