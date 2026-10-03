import type { Metadata } from 'next';
import BookBody from '@/components/book/BookBody';

export const metadata: Metadata = {
  title: 'Book a Table',
  description:
    'Send two lines about your business and what the site has to do. You get a quote and a start date within a day, not a sales sequence.',
};

export default function BookPage() {
  return <BookBody />;
}
