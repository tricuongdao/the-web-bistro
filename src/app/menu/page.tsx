import type { Metadata } from 'next';
import MenuBody from '@/components/menu/MenuBody';

export const metadata: Metadata = {
  title: 'The Menu',
  description:
    'Every dish on the menu: landing pages, site rescues, marketing websites, online stores and web apps. Starting prices, timelines, and no template tricks.',
};

export default function MenuPage() {
  return <MenuBody />;
}
