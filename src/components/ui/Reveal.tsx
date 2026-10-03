'use client';

/*
 * Reveal: staggered entry for content as it scrolls into view.
 * Collapses to instant under prefers-reduced-motion.
 */

import { motion, useReducedMotion } from 'motion/react';

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export default function Reveal({ children, delay = 0, y = 26, className }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.9, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}
