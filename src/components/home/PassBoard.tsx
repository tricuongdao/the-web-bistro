'use client';

/*
 * The pass board: split-flap board on the left, the kitchen rail scene on
 * the right (heat lamps, a plate, and the site warming under them).
 */

import { useLang } from '@/components/providers/LangProvider';
import SplitFlap from '@/components/ui/SplitFlap';
import Reveal from '@/components/ui/Reveal';
import styles from './home.module.css';

const LAMPS = [74, 150, 226];
const BILLOWS: [number, number, string][] = [
  [112, 26, '0.1s'],
  [150, 34, '0.5s'],
  [188, 24, '0.9s'],
];

export default function PassBoard() {
  const { t } = useLang();
  return (
    <section className={styles.board}>
      <div className={styles.boardGlow} aria-hidden="true" />
      <div className={`container ${styles.boardInner}`}>
        <div className={styles.boardGrid}>
          <Reveal className={styles.boardCopy}>
            <div className={styles.eyebrowDot}>
              <span className={styles.emberDot} />
              {t('The pass board')}
            </div>
            <h2 className={styles.boardTitle}>{t('Tonight the kitchen is cooking')}</h2>
            <SplitFlap />
            <p className={styles.boardCap}>
              {t('Every site leaves the kitchen like this. One order, built end to end, served on its own domain.')}
            </p>
          </Reveal>
          <Reveal delay={0.1} className={styles.boardSceneWrap}>
            <div className={styles.boardScene} aria-hidden="true">
              <div className={styles.rail} />
              {LAMPS.map((left) => (
                <span key={left} className={styles.lamp} style={{ left }} />
              ))}
              <div className={styles.saucer} />
              <div className={styles.plateCard}>
                <div className={styles.plateHead}>
                  <span className={styles.dotGold} />
                  <span className={styles.dotDim} />
                  <span className={styles.plateBar} />
                </div>
                <div className={styles.plateBody}>
                  <span className={styles.lineInk} />
                  <span className={styles.lineInk2} />
                  <span className={styles.lineSoft} />
                  <span className={styles.lineSoft2} />
                  <span className={styles.plateBtn} />
                </div>
              </div>
              {BILLOWS.map(([left, size, delay]) => (
                <span
                  key={left}
                  className={styles.billow}
                  style={{ left, width: size, height: size, marginLeft: -size / 2, animationDelay: delay }}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
