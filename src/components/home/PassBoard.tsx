'use client';

/*
 * The pass board: split-flap word board on the left, the plated 3D scene
 * on the right — the cloche lifts and the site being served shows through.
 */

import dynamic from 'next/dynamic';
import { Component, type ReactNode } from 'react';
import { useLang } from '@/components/providers/LangProvider';
import SplitFlap from '@/components/ui/SplitFlap';
import Reveal from '@/components/ui/Reveal';
import styles from './home.module.css';

const PlateScene = dynamic(() => import('@/components/scene/PlateScene'), {
  ssr: false,
  loading: () => null,
});

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default function PassBoard() {
  const { t } = useLang();
  return (
    <section className={styles.board}>
      <div className={styles.boardGlow} aria-hidden="true" />
      <div className={`container ${styles.boardInner}`}>
        <div className={styles.boardGrid}>
          <Reveal className={styles.boardCopy}>
            <div className={styles.tag}>
              <span className={styles.tagDot} />
              {t('The pass board')}
            </div>
            <h2 className={styles.boardTitle}>{t('Tonight the kitchen is cooking')}</h2>
            <SplitFlap />
            <p className={styles.boardCap}>
              {t('Every site leaves the kitchen like this. One order, built end to end, served on its own domain.')}
            </p>
          </Reveal>
          <Reveal delay={0.1} className={styles.boardSceneWrap}>
            <SceneBoundary>
              <PlateScene />
            </SceneBoundary>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
