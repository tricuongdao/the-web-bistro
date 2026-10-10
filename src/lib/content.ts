/*
 * THE WEB BISTRO — structured content.
 *
 * Every string in here is written in English and rendered through `t()`
 * (the LangProvider), which looks the Vietnamese up in src/lib/i18n.ts.
 * Edit copy here, translations there.
 *
 * This module is deliberately dependency-free: the i18n check script
 * imports it directly with Node's type stripping.
 */

/* ═══════════════════════════════════════════════════════════════════════
   CONTACT & WIRING
   ═══════════════════════════════════════════════════════════════════════ */

export const CONTACT = {
  email: 'tricuongdao75@gmail.com',
  instagram: 'https://instagram.com/thewebbistro',
};

/* Booking-form delivery. '' -> mail-client fallback; URL -> POST JSON there. */
export const FORM_ENDPOINT = 'https://formspree.io/f/xdeokvek';

/* The demo URL typed into the little browser card in the hero scene. */
export const BUILD_URL = 'thewebbistro.com/your-new-site';

/* ═══════════════════════════════════════════════════════════════════════
   PRICING — starting prices, cheap on purpose.

   ⚠ The entry point of the whole ladder is $50 (Landing Page, the cheapest
   row on the menu). Every amount is shown on the menu and the home page
   and NOTHING else on the site hard-codes a price: move a number here and
   the copy follows.
   ═══════════════════════════════════════════════════════════════════════ */

export const PRICES = {
  landing: '$50',
  marketing: '$200',
  store: '$200',
  care: '$19',
} as const;

/* ═══════════════════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════════════════ */

export const NAV: [label: string, href: string][] = [
  ['Front of house', '/'],
  ['The menu', '/menu'],
  ['Opening offer', '/work'],
  ['Reservations', '/book'],
];

/* ═══════════════════════════════════════════════════════════════════════
   THE MENU
   ═══════════════════════════════════════════════════════════════════════ */

export type MenuRow = {
  title: string;
  meta: string;
  body: string;
  /** starting price; when absent the price slot shows "Quote in a day" */
  from?: string;
};

export type MenuSection = { head: string; note: string; rows: MenuRow[] };

export const MENU: MenuSection[] = [
  {
    head: 'Starters',
    note: 'Small, fast, done in a week',
    rows: [
      {
        title: 'Landing Page',
        meta: '1 page · 1 week',
        body: 'One page built around a single action: call, book or buy. Copy, form and tracking come with it.',
        from: PRICES.landing,
      },
    ],
  },
  {
    head: 'Mains',
    note: 'The full build',
    rows: [
      {
        title: 'Marketing Website',
        meta: '5-8 pages · 3-4 weeks',
        body: 'The site your customers judge you by. Structure, words and design built around what you sell, plus an editor you can use without me.',
        from: PRICES.marketing,
      },
      {
        title: 'Online Store',
        meta: 'Payments · stock · shipping',
        body: "A shop that takes money without drama and holds up at Christmas. Handover walks you through every screen you'll touch.",
        from: PRICES.store,
      },
      {
        title: 'Web App',
        meta: 'Scoped per project',
        body: 'Booking systems, client portals, dashboards. Custom software with a front door your customers understand.',
      },
    ],
  },
];

export const SIDES = [
  {
    title: 'SEO Groundwork',
    body: 'Speed, structure and the words your customers type. I build it in from day one instead of bolting it on.',
  },
  {
    title: 'Analytics Setup',
    body: 'Privacy-friendly tracking that shows you which page brought the money in.',
  },
];

export const CARE = {
  kicker: 'Standing order',
  title: 'Hosting & Care',
  body: 'Monthly hosting, backups, updates and a slice of my time for small changes. Cancel when you like. Your site and domain stay yours.',
  from: PRICES.care,
};

/* ═══════════════════════════════════════════════════════════════════════
   HOME — today's specials (three most-cooked dishes)
   ═══════════════════════════════════════════════════════════════════════ */

export type Special = {
  kicker: string;
  title: string;
  body: string;
  meta: string;
  from?: string;
  per?: boolean;
  dark?: boolean;
};

export const SPECIALS: Special[] = [
  {
    kicker: 'Starter',
    title: 'Landing Page',
    body: 'One page, one job: turn a visitor into an enquiry. You get the copy, the form, and the tracking that proves it pays.',
    meta: 'Copy · build · launch',
    from: PRICES.landing,
  },
  {
    kicker: 'Main',
    title: 'Online Store',
    body: 'Products, payments, stock and shipping, set up so you can run the shop without calling me.',
    meta: 'Payments · stock · training',
    from: PRICES.store,
  },
  {
    kicker: 'Standing order',
    title: 'Hosting & Care',
    body: 'Hosting, backups, updates and small changes each month. You email a person, not a ticket queue.',
    meta: 'Monthly · cancel any time',
    from: PRICES.care,
    per: true,
    dark: true,
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   HOME — how service runs (the four stations)
   ═══════════════════════════════════════════════════════════════════════ */

export type Station = { title: string; stamp: string; body: string };

export const PROCESS: Station[] = [
  {
    title: 'Brief in',
    stamp: 'Day one',
    body: 'You send two lines about the business and what the site has to do. One call or a few messages later, the plan comes back in writing, in your language.',
  },
  {
    title: 'Ticket up',
    stamp: 'Inside a day',
    body: 'You get a fixed quote and a start date before I write a line of code. Approve both and the ticket goes on the rail. If the job grows mid-build, you hear the cost before I touch it.',
  },
  {
    title: 'Built',
    stamp: 'Week one',
    body: 'Real pages in your browser inside the first week. You watch it cook and course-correct early, instead of judging a slide deck.',
  },
  {
    title: 'Served',
    stamp: 'After launch',
    body: 'Launch day comes with the keys: code, domain, logins, content, and a written walkthrough. Hosting & Care keeps the lights on after service.',
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   HOME — house rules & guarantee
   ═══════════════════════════════════════════════════════════════════════ */

export const RULES: [title: string, body: string][] = [
  [
    'Fixed quote first',
    'You approve a number and a start date before I write a line of code. If the job grows, I tell you what it costs before I touch it.',
  ],
  [
    'You own the lot',
    'Code, domain, hosting login, content. Walk away whenever you like and take all of it with you.',
  ],
  [
    'Real pages in week one',
    'You click through your site in a browser within the first week. No slide decks and no mockups you cannot use.',
  ],
  [
    'Words you can follow',
    'I write emails in plain English. When a technical choice matters, I tell you what it costs and let you pick.',
  ],
];

/* ═══════════════════════════════════════════════════════════════════════
   HOME — FAQ
   ═══════════════════════════════════════════════════════════════════════ */

export const FAQ: [question: string, answer: string][] = [
  [
    'How long will my site take?',
    'A landing page leaves the kitchen in about a week. A full site takes 3-4 weeks once the brief is agreed. The dates go in the quote, and I hold them.',
  ],
  [
    'Who owns what when we finish?',
    'You. Code, domain, hosting login, content. It is written into the quote on day one, and you can walk away with all of it whenever you like.',
  ],
  [
    'What do you need from me to start?',
    'Your logo if you have one, a line on what you sell, your services or prices, and any photos you like. Two lines about what the site must do is enough to begin; I send the full checklist with the quote.',
  ],
  [
    "What if I don't like the first draft?",
    'You tell me, and your deposit comes back with no argument. That promise is in every quote I send.',
  ],
  [
    'Are these templates?',
    'No templates, no page builders, no plugin sprawl. Every site is written and built for the business it serves. That is also why the quote is per job, not per template.',
  ],
  [
    'Will I rank on Google?',
    'No honest cook promises page one. What you get is the groundwork: speed, clean structure, and the words your customers actually type.',
  ],
  [
    'What happens after launch?',
    'Hosting & Care keeps it running: backups, updates and a slice of my time for small changes each month. Cancel any time, and the site stays yours.',
  ],
];

/* ═══════════════════════════════════════════════════════════════════════
   HOME — by the numbers (dial gauges)
   ═══════════════════════════════════════════════════════════════════════ */

export const NUMBERS: { value: string; unit: string; label: string; dial: number }[] = [
  { value: '3', unit: '×', label: 'Opening tables', dial: 122 },
  { value: '24', unit: 'h', label: 'Reply, at the latest', dial: 48 },
  { value: '100', unit: '', label: 'Performance target', dial: 135 },
  { value: '7', unit: 'd', label: 'Kitchen open weekly', dial: 135 },
];

/* ═══════════════════════════════════════════════════════════════════════
   WORK — opening offer
   ═══════════════════════════════════════════════════════════════════════ */

export const TABLES: { label: string; title: string; items: string[] }[] = [
  {
    label: 'Table one',
    title: 'Shops, cafés and trades',
    items: [
      'A site that answers the three questions people phone you to ask',
      'Menu, price list or service pages you can edit yourself',
      'Bookings or enquiries landing in your inbox, not a portal',
      'Google Business and maps set up properly',
    ],
  },
  {
    label: 'Table two',
    title: 'Startups and founders',
    items: [
      'A launch page written to explain what you actually do',
      'Waitlist or sign-up wired to your email tool',
      'Room to add pages as the story changes',
      'Analytics that show which message lands',
    ],
  },
  {
    label: 'Table three',
    title: 'Agencies and studios',
    items: [
      'Your designs built to the pixel, on the date I gave you',
      'Clean handover: readable code and a written walkthrough',
      'I stay invisible to your client if that is how you want it',
      'Cover for overflow weeks without a full-time hire',
    ],
  },
];

export const RISK: string[] = [
  'See the first draft in week one. If you hate it, your deposit comes back with no argument.',
  'The quote holds. I absorb my own mistakes and estimate errors.',
  'I keep working past launch until your site does the job we agreed on.',
  'Every login, file and line of code lands in your hands on day one.',
];

/* ═══════════════════════════════════════════════════════════════════════
   BOOK — dish chips in the booking form
   ═══════════════════════════════════════════════════════════════════════ */

export const DISHES: string[] = [
  'Landing page',
  'Marketing website',
  'Online store',
  'Web app',
  'Hosting & care',
  'Not sure yet',
];

export const DISHES_VI: Record<string, string> = {
  'Landing page': 'Trang đích',
  'Marketing website': 'Website giới thiệu',
  'Online store': 'Cửa hàng trực tuyến',
  'Web app': 'Ứng dụng web',
  'Hosting & care': 'Hosting & bảo trì',
  'Not sure yet': 'Chưa rõ',
};

/* ═══════════════════════════════════════════════════════════════════════
   HOME — closing hearth (flame positions, from the original design)
   ═══════════════════════════════════════════════════════════════════════ */

export const FLAMES: [left: string, w: number, h: number, dur: string, delay: string][] = [
  ['5%', 30, 58, '1.05s', '-0.4s'],
  ['14%', 38, 72, '1.32s', '-1.1s'],
  ['23%', 28, 52, '0.92s', '-0.2s'],
  ['32%', 42, 80, '1.44s', '-0.8s'],
  ['41%', 32, 62, '1.14s', '-1.5s'],
  ['50%', 46, 88, '1.5s', '-0.35s'],
  ['59%', 30, 58, '0.98s', '-1.2s'],
  ['68%', 40, 76, '1.36s', '-0.6s'],
  ['77%', 28, 54, '1.08s', '-1.4s'],
  ['86%', 36, 68, '1.24s', '-0.15s'],
  ['95%', 30, 56, '0.95s', '-0.9s'],
];

export const FLAME_BG =
  'radial-gradient(ellipse at 50% 82%, #FFFBF3 0%, #E0A93B 30%, #B07C1F 58%, rgba(176,124,31,0) 80%)';
