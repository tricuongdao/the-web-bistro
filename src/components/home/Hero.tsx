'use client';

/*
 * The hero: copy on the left, the night-kitchen pass on the right.
 * The 3D scene loads client-side only; if WebGL is unavailable the panel
 * degrades to a warm glow instead of an error.
 */

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Component, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useLang } from '@/components/providers/LangProvider';
import { CONTACT } from '@/lib/content';
import styles from './home.module.css';

const HeroScene = dynamic(() => import('@/components/scene/HeroScene'), {
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

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

export default function Hero() {
  const { t, c } = useLang();
  return (
    <section className={styles.hero}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <motion.div className={styles.eyebrow} {...rise(0.05)}>
            <span className={styles.eyebrowRule} />
            {t('Two of three opening tables free')}
          </motion.div>
          <motion.h1 className={styles.heroTitle} {...rise(0.14)}>
            {t('Websites that bring customers in.')}
          </motion.h1>
          <motion.p className={styles.heroLead} {...rise(0.24)}>
            {t(
              'You tell me what your business needs to do. I build the site that does it, then hand you the keys. No page builders, no plugin sprawl, and no invoice you cannot read.',
            )}
          </motion.p>
          <motion.div className={styles.heroCtas} {...rise(0.34)}>
            <a className="btn btn-gold" href={`mailto:${CONTACT.email}`}>
              {t('Email me')}
            </a>
            <Link className="btn btn-ghost-dark" href="/menu">
              {t('Read the menu')}
            </Link>
          </motion.div>
          <motion.div className={styles.replyNote} {...rise(0.44)}>
            {t('You will get a reply within a day')}
            <span className={styles.replyCaret}>_</span>
          </motion.div>
        </div>
        <motion.div className={styles.stageWrap} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
          <div className={styles.stage}>
            <SceneBoundary>
              <HeroScene />
            </SceneBoundary>
            <span className={styles.stageHint}>{t('Take the lid off')}</span>
          </div>
          <div className={styles.stageCaption}>
            <span>
              {c.perf} <b>100</b>
            </span>
            <span className={styles.stageCaptionPaint}>
              <b>0.6</b>
              {c.paint}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
