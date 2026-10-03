import type { Metadata, Viewport } from 'next';
import { DM_Serif_Display, JetBrains_Mono, Manrope, Noto_Serif_Display } from 'next/font/google';
import './globals.css';
import { LangProvider } from '@/components/providers/LangProvider';
import SmoothScroll from '@/components/providers/SmoothScroll';
import RouteSweep from '@/components/providers/RouteSweep';
import SmoothCursor from '@/components/providers/SmoothCursor';
import BootLoader from '@/components/layout/BootLoader';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

/* Display serif (EN) — also the source of the 3D crest glyphs. */
const dmSerif = DM_Serif_Display({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-dm-serif',
});

/* Vietnamese swaps to Noto Serif Display via .lang-vi */
const notoSerif = Noto_Serif_Display({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-noto-serif',
});

/* Body */
const manrope = Manrope({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  variable: '--font-manrope',
});

/* Tickets, labels, numbers */
const jetbrains = JetBrains_Mono({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://the-web-bistro.vercel.app'),
  title: {
    default: 'The Web Bistro | Websites that bring customers in.',
    template: '%s | The Web Bistro',
  },
  description:
    'The Web Bistro builds websites, online stores and web apps for small businesses. Fixed quote first, real pages in week one, and you own the lot.',
  openGraph: {
    title: 'The Web Bistro',
    description: 'Websites that bring customers in. Landing pages, online stores and web apps, built and served by one chef.',
    type: 'website',
  },
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#0A0806',
};

/* Pre-paint the saved language before hydration so VI visitors get the
   right serif and lang attribute from the first frame. */
const LANGUAGE_BOOT = `try{if(localStorage.getItem('wb-lang')==='vi'){document.documentElement.lang='vi';document.documentElement.classList.add('lang-vi')}}catch(e){}`;

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'The Web Bistro',
  description:
    'Websites, online stores and web apps for small businesses. Fixed quote first, real pages in week one, and the client owns everything at handover.',
  email: 'tricuongdao75@gmail.com',
  sameAs: ['https://instagram.com/thewebbistro'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSerif.variable} ${notoSerif.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: LANGUAGE_BOOT }} />
        <BootLoader />
        <LangProvider>
          <SmoothScroll>
            <Header />
            <RouteSweep />
            <SmoothCursor />
            {children}
            <Footer />
          </SmoothScroll>
        </LangProvider>
        <div className="grain" aria-hidden="true" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </body>
    </html>
  );
}
