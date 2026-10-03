'use client';

/*
 * House rules: the four promises that go in every quote, plus the one-chef
 * signature.
 */

import { useLang } from '@/components/providers/LangProvider';
import Reveal from '@/components/ui/Reveal';
import { RULES } from '@/lib/content';
import styles from './home.module.css';

export default function HouseRules() {
  const { t } = useLang();
  return (
    <section className={styles.rules}>
      <div className={`container ${styles.rulesInner}`}>
        <Reveal className={styles.rulesHead}>
          <div className={styles.tag}>
            <span className={styles.tagDot} />
            {t('House rules')}
          </div>
          <h2 className={styles.rulesTitle}>{t('What you get, in writing')}</h2>
          <p className={styles.rulesLead}>
            {t("The kitchen is new, so I'll skip the wall of client logos. These four rules go in every quote I send. Hold me to them.")}
          </p>
        </Reveal>
        <div className={styles.rulesGrid}>
          {RULES.map(([title, body], i) => (
            <Reveal key={title} delay={(i % 2) * 0.08} className={styles.ruleCard}>
              <h3 className={styles.ruleCardTitle}>{t(title)}</h3>
              <p className={styles.ruleCardBody}>{t(body)}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <p className={styles.ruleSig}>
            {t('One chef in this kitchen. No account managers, no handoffs, no telephone game.')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
