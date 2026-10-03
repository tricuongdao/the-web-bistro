import type { Metadata } from 'next';
import WorkBody from '@/components/work/WorkBody';

export const metadata: Metadata = {
  title: 'Opening Offer',
  description:
    'The first three tables eat at the opening rate: a third off the quote, the deposit back if the first draft is not right, and you own everything from day one.',
};

export default function WorkPage() {
  return <WorkBody />;
}
