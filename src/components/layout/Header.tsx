'use client';

/*
 * Sticky header: awning stripe across the top area, brand block, nav,
 * language toggle, and the "Email me" doorbell. The stripe doubles as the
 * scroll progress bar.
 */

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AwningMark from '@/components/ui/AwningMark';
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
    bar.style.width = '0%';
    const st = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => {
        bar.style.width = `${(self.progress * 100).toFixed(2)}%`;
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
      <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <Link href="/" className={styles.brand}>
          <AwningMark size={42} variant="icon" />
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
      <div className={styles.stripe}>
        <div ref={progRef} className={styles.progress} />
      </div>
      </header>
    </>
  );
}
