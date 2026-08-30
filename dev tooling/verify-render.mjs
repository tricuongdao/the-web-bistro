/*
 * Verification script: SSR-renders every page of the app and asserts the
 * markup contains the design's content.
 * Run: npm run check:render   (or: node "dev tooling/verify-render.mjs")
 */
import { createServer } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Vite's root is anchored to the project directory (one above this script),
// so the script works no matter which cwd it is launched from.
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const vite = await createServer({
  root: ROOT,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

// React + renderToString must come from the SAME module graph as the app, or
// React ends up duplicated and every hook call throws "Invalid hook call".
const { React, renderToString } = await vite.ssrLoadModule('/dev tooling/__rxcheck.jsx');

const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
const { default: MenuPage } = await vite.ssrLoadModule('/src/components/MenuPage.jsx');
const { default: WorkPage } = await vite.ssrLoadModule('/src/components/WorkPage.jsx');
const { default: BookPage } = await vite.ssrLoadModule('/src/components/BookPage.jsx');
const { I18N, DISHES, DISHES_VI, BUILD_URL } = await vite.ssrLoadModule('/src/i18n.js');

const identity = (s) => s;
const toVi = (s) => I18N[s] ?? s;

const home = renderToString(React.createElement(App));
const menu = renderToString(React.createElement(MenuPage, { t: identity }));
const work = renderToString(React.createElement(WorkPage, { t: identity }));
const book = renderToString(
  React.createElement(BookPage, {
    t: toVi,
    lang: 'vi',
  })
);

const checks = [
  // Home (rendered through App, includes header + footer)
  ['home: headline', home.includes('Websites, made to order.')],
  ['home: eyebrow', home.includes('Two of three opening tables free')],
  ['home: hero paragraph', home.includes('No page builders, no plugin sprawl')],
  ['home: browser url bar', home.includes('https://') && BUILD_URL.includes('thewebbistro.com')],
  ['home: perf label', home.includes('Performance') && home.includes('s first paint')],
  ['home: order ticket', home.includes('Order #0142') && home.includes('The Web Bistro</span>')],
  ['home: ticket lines typing', home.includes('1× brief, no jargon'.slice(0, 1))],
  ['home: on the pass', home.includes('Every job leaves the kitchen the same way.')],
  ['home: specials', home.includes('Three things I cook most') && home.includes('Hosting &amp; Care')],
  ['home: house rules', home.includes('What you get, in writing') && home.includes('Fixed quote first')],
  ['home: CTA', home.includes('Hungry? Tell me what you need.') && home.includes('Book a table')],
  ['home: header nav', home.includes('Front of house') && home.includes('Opening offer') && home.includes('Reservations')],
  ['home: lang toggle label', home.includes('Tiếng Việt')],
  ['home: footer', home.includes('© 2026 The Web Bistro.') && home.includes('@thewebbistro on Instagram')],
  ['home: reveal targets present', (home.match(/data-reveal/g) || []).length >= 12],
  // Menu
  ['menu: title', menu.includes('Everything I serve')],
  ['menu: starters rows', menu.includes('Landing Page') && menu.includes('1 page · 1 week') && menu.includes('Site Rescue')],
  ['menu: mains rows', menu.includes('Marketing Website') && menu.includes('5–8 pages · 3–4 weeks') && menu.includes('Web App')],
  ['menu: sides', menu.includes('SEO Groundwork') && menu.includes('Analytics Setup')],
  ['menu: hosting banner', menu.includes('Monthly hosting, backups, updates')],
  ['menu: CTA', menu.includes('Nothing here quite fits?') && menu.includes('Ask the kitchen')],
  // Work
  ['work: headline', work.includes('The first three tables eat at the opening rate.')],
  ['work: blink banner', work.includes('wb-blink 1.6s ease-in-out infinite')],
  ['work: three tables', work.includes('Table one') && work.includes('Table two') && work.includes('Table three')],
  ['work: risk', work.includes('Nothing to lose by ordering') && work.includes('>01</span>') && work.includes('>04</span>')],
  ['work: closing', work.includes('Want one of the three?') && work.includes('Claim a table')],
  // Book (rendered with Vietnamese translator to also verify i18n)
  ['book: headline', book.includes('Đặt bàn') && book.includes('Hai dòng là đủ')],
  ['book: contact', book.includes('tricuongdao75@gmail.com') && book.includes('@thewebbistro')],
  ['book: form fields', book.includes('Tên bạn') && book.includes('Bạn đang cần gì?') && book.includes('Nội dung đơn')],
  ['book: dish chips (VI)', DISHES.every((d) => book.includes(DISHES_VI[d].replace('&', '&amp;')))],
  ['book: submit', book.includes('Gửi đơn')],
  ['book: form wiring', book.includes('noValidate') && book.includes('aria-pressed') && book.includes('bk-name')],
  ['book: vi placeholders', book.includes('Kelvin Nguyễn') && book.includes('ban@doanhnghiep.com')],
];

let failed = 0;
for (const [name, ok] of checks) {
  if (!ok) {
    failed += 1;
    console.log(`FAIL  ${name}`);
  } else {
    console.log(`ok    ${name}`);
  }
}
console.log(failed === 0 ? `\nALL ${checks.length} CHECKS PASSED` : `\n${failed} CHECK(S) FAILED`);
await vite.close();
process.exit(failed === 0 ? 0 : 1);
