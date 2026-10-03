/*
 * The WB wordmark — DM Serif Display letters with a copper semicolon,
 * optionally set in a brass "plate" disc. The semicolon is the house
 * punctuation; it never ends a sentence here.
 */

import styles from './wordmark.module.css';

type Props = {
  disc?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export default function Wordmark({ disc = false, size = 'md', className }: Props) {
  const cls = [styles.mark, styles[size], disc ? styles.disc : '', className].filter(Boolean).join(' ');
  return (
    <span className={cls} role="img" aria-label="The Web Bistro">
      <span aria-hidden="true">
        WB<span className={styles.semi}>;</span>
      </span>
    </span>
  );
}
