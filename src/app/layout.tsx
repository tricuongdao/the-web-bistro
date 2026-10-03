import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, IBM_Plex_Mono, Noto_Serif_Display } from 'next/font/google';
import './globals.css';
import { LangProvider } from '@/components/providers/LangProvider';
import SmoothScroll from '@/components/providers/SmoothScroll';
import RouteSweep from '@/components/providers/RouteSweep';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

/* Display serif (EN). Vietnamese swaps to Noto Serif Display via .lang-vi. */
const bodoni = Bodoni_Moda({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-bodoni',
});

const notoSerif = Noto_Serif_Display({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-noto-serif',
});

/* Everything else. */
const plexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex-mono',
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
  icons: { icon: '/favicon.png' },
};

export const viewport: Viewport = {
  themeColor: '#10322F',
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
    <html lang="en" suppressHydrationWarning className={`${bodoni.variable} ${notoSerif.variable} ${plexMono.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: LANGUAGE_BOOT }} />
        <LangProvider>
          <SmoothScroll>
            <Header />
            <RouteSweep />
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
