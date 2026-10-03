'use client';

/*
 * The hero: a full-bleed night-kitchen stage. The 3D crest is the art;
 * copy and floating glass chips sit over it. Everything enters with a
 * blur-to-sharp rise.
 */

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Component, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useLang } from '@/components/providers/LangProvider';
import { CONTACT, PRICES } from '@/lib/content';
import styles from './home.module.css';

const CrestScene = dynamic(() => import('@/components/scene/CrestScene'), {
  ssr: false,
  loading: () => null,
});

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return <div className={styles.stageFallback} aria-hidden="true" />;
    return this.props.children;
  }
}

const EASE = [0.22, 0.9, 0.24, 1] as [number, number, number, number];
const blurIn = (delay: number) => ({
  initial: { opacity: 0, y: 34, filter: 'blur(12px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, delay, ease: EASE },
});

export default function Hero() {
  const { t, c } = useLang();
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} aria-hidden="true" />
      <div className={styles.heroCanvas} aria-hidden="true">
        <SceneBoundary>
          <CrestScene />
        </SceneBoundary>
      </div>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <motion.div className={`glass-pill ${styles.heroPill}`} {...blurIn(0.15)}>
            <span className={styles.heroDot} />
            {t('Two of three opening tables free')}
          </motion.div>
          <motion.h1 className={styles.heroTitle} {...blurIn(0.28)}>
            {t('Websites that bring customers in.')}
          </motion.h1>
          <motion.p className={styles.heroLead} {...blurIn(0.42)}>
            {t(
              'You tell me what your business needs to do. I build the site that does it, then hand you the keys. No page builders, no plugin sprawl, and no invoice you cannot read.',
            )}
          </motion.p>
          <motion.div className={styles.heroCtas} {...blurIn(0.56)}>
            <a className="btn btn-ember" href={`mailto:${CONTACT.email}`}>
              {t('Email me')}
            </a>
            <Link className="btn btn-glass" href="/menu">
              {t('Read the menu')}
            </Link>
          </motion.div>
          <motion.div className={styles.replyNote} {...blurIn(0.7)}>
            {t('You will get a reply within a day')}
            <span className={styles.replyCaret}>_</span>
          </motion.div>
        </div>
      </div>
      <div className={styles.chips} aria-hidden="true">
        <motion.div className={`${styles.chip} ${styles.chipA}`} {...blurIn(0.9)}>
          <span className={styles.chipLabel}>{t('Order #0142')}</span>
          <span className={styles.chipValue}>
            <span className={styles.chipDot} />
            {c.firing}
          </span>
        </motion.div>
        <motion.div className={`${styles.chip} ${styles.chipC}`} {...blurIn(1.2)}>
          <span className={styles.chipLabel}>{t('Landing Page')}</span>
          <span className={styles.chipValue}>
            {t('From')} {PRICES.landing}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
