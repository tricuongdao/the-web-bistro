import type { Metadata } from 'next';
import PrivacyBody from '@/components/legal/PrivacyBody';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What the booking form collects (very little), where it goes (my inbox), and how to get it deleted.',
};

export default function PrivacyPage() {
  return <PrivacyBody />;
}
