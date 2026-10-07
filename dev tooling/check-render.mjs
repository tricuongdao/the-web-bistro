/*
 * Render check: drives headless Edge (Chromium) over raw CDP against the
 * dev server, asserts the content of every route in EN (and home in VI via
 * localStorage), watches for console errors, and drops screenshots into
 * "dev tooling/shots/".
 *
 * Comparisons are case- and whitespace-insensitive: `innerText` reflects
 * CSS text-transform (uppercase labels) and block boundaries (newlines).
 *
 * Run:  npm run dev        (in one terminal, on :3000)
 *       npm run check:render
 */

import { spawn } from 'node:child_process';
import http from 'node:http';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9444;
const BASE = 'http://localhost:3000';
const OUT = join(dirname(fileURLToPath(import.meta.url)), 'shots');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

mkdirSync(OUT, { recursive: true });

const getJson = (path) =>
  new Promise((resolve, reject) => {
    http
      .get({ host: '127.0.0.1', port: PORT, path }, (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve(JSON.parse(d)));
      })
      .on('error', reject);
  });

const edge = spawn(
  EDGE,
  [
    '--headless=new',
    '--remote-debugging-port=' + PORT,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu-sandbox',
    '--user-data-dir=' + join(process.env.TEMP || '.', 'wb-cdp-next'),
    'about:blank',
  ],
  { stdio: 'ignore' },
);

await sleep(2500);
const targets = await getJson('/json/list');
const page = targets.find((t) => t.type === 'page');
if (!page) {
  console.log('FAIL: no Edge page target. Is Edge installed at ' + EDGE + '?');
  edge.kill();
  process.exit(1);
}

const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
const consoleErrors = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
  if (m.method === 'Runtime.exceptionThrown') {
    consoleErrors.push(m.params?.exceptionDetails?.exception?.description || 'exception');
  }
  if (m.method === 'Runtime.consoleAPICalled' && m.params?.type === 'error') {
    consoleErrors.push((m.params.args || []).map((a) => a.value ?? a.description ?? '').join(' '));
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const i = ++id;
    pending.set(i, resolve);
    ws.send(JSON.stringify({ id: i, method, params }));
  });

const evalJs = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  return r.result?.result?.value;
};

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

const norm = (s) => String(s).toLowerCase().replace(/\s+/g, ' ');
let current = '';
const has = (s) => norm(current).includes(norm(s));
const hasIn = async (selector, s) =>
  norm(await evalJs(`(document.querySelector('${selector}')?.innerText) || ''`)).includes(norm(s));

const results = [];
const check = (name, ok) => {
  results.push([name, ok]);
  console.log(`${ok ? 'ok  ' : 'FAIL'}  ${name}`);
};

async function load(path, waitMs = 3400) {
  await send('Page.navigate', { url: BASE + path });
  await sleep(waitMs);
  current = await evalJs('document.body.innerText');
  return current;
}

async function shot(name) {
  const r = await send('Page.captureScreenshot', { format: 'png' });
  if (r.result?.data) writeFileSync(join(OUT, name + '.png'), Buffer.from(r.result.data, 'base64'));
}

/* ── home (EN) ─────────────────────────────────────────────────────────── */
await load('/');
check('home: headline', has('Websites that bring customers in.'));
check('home: eyebrow', has('Two of three opening tables free'));
check('home: order ticket typing', has('The Web Bistro') && has('Order #0142'));
check('home: process headline', has('Every job leaves the kitchen the same way.'));
check('home: stations', has('Brief in') && has('Ticket up') && has('Served'));
check(
  'home: specials with prices',
  has('Three things I cook most') && has('From $100') && has('From $1,500') && has('$19'),
);
check('home: pass board', has('Tonight the kitchen is cooking') && has('Next up'));
check('home: numbers', has('By the numbers') && has('Performance target'));
check('home: house rules', has('What you get, in writing') && has('Fixed quote first'));
check('home: FAQ', has('Fair questions, straight answers.') && has('Will I rank on Google?'));
check('home: closing CTA', has('Hungry? Tell me what you need.') && has('Book a table'));
check('home: canvas mounted', (await evalJs("!!document.querySelector('canvas')")) === true);
check('home: no em dashes', !(await evalJs(`document.body.innerText.includes('\\u2014')`)));

/* custom smooth cursor: mounts on fine pointers and follows the pointer */
check(
  'cursor: custom cursor mounts',
  (await evalJs(
    "!!document.querySelector('[data-wb-cursor=\"dot\"]') && !!document.querySelector('[data-wb-cursor=\"ring\"]')",
  )) === true,
);
await evalJs("window.dispatchEvent(new PointerEvent('pointermove', { clientX: 520, clientY: 340, bubbles: true }))");
await sleep(350);
check(
  'cursor: dot follows pointer',
  (await evalJs(
    "(() => { const el = document.querySelector('[data-wb-cursor=\"dot\"]'); if (!el) return false; const r = el.getBoundingClientRect(); return Math.abs(r.x + r.width / 2 - 520) < 8 && Math.abs(r.y + r.height / 2 - 340) < 8; })()",
  )) === true,
);
/* leaving the window (taskbar, other app) hides it; coming back must re-show */
await evalJs("document.documentElement.dispatchEvent(new PointerEvent('pointerleave'))");
await sleep(600);
check(
  'cursor: hides when pointer leaves',
  (await evalJs(
    "(() => { const el = document.querySelector('[data-wb-cursor=\"dot\"]'); return !!el && getComputedStyle(el).opacity === '0'; })()",
  )) === true,
);
await evalJs("window.dispatchEvent(new PointerEvent('pointermove', { clientX: 700, clientY: 420, bubbles: true }))");
await sleep(350);
check(
  'cursor: returns after re-entering',
  (await evalJs(
    "(() => { const el = document.querySelector('[data-wb-cursor=\"dot\"]'); if (!el) return false; const r = el.getBoundingClientRect(); return getComputedStyle(el).opacity === '1' && Math.abs(r.x + r.width / 2 - 700) < 8 && Math.abs(r.y + r.height / 2 - 420) < 8; })()",
  )) === true,
);
await shot('home-desktop');

/* home (VI) — set the saved language, reload */
await evalJs("localStorage.setItem('wb-lang','vi')");
await load('/', 2800);
check('home VI: headline', has('Website mang khách hàng đến cho bạn.'));
check('home VI: header nav', await hasIn('header nav', 'Trang chính'));
check('home VI: html lang', (await evalJs('document.documentElement.lang')) === 'vi');
await evalJs("localStorage.setItem('wb-lang','en')");

/* ── menu ──────────────────────────────────────────────────────────────── */
await load('/menu');
check('menu: title', has('Everything I serve'));
check('menu: starters', has('Landing Page') && has('Site Rescue'));
check(
  'menu: prices',
  has('From $50') && has('From $100') && has('From $750') && has('From $1,500'),
);
/* the whole ladder is anchored here: $50 is the cheapest thing on the menu */
check('menu: entry price is $50', has('From $50'));
check('menu: quote-in-a-day row', has('Quote in a day'));
check('menu: care banner', has('Hosting & Care') && has('$19'));
check('menu: cta', has('Nothing here quite fits?') && has('Ask the kitchen'));
await shot('menu-desktop');

/* ── work ──────────────────────────────────────────────────────────────── */
await load('/work');
check('work: headline', has('The first three tables eat at the opening rate.'));
check('work: tables', has('Table one') && has('Table two') && has('Table three'));
check('work: risk', has('Nothing to lose by ordering') && has('deposit comes back'));
check('work: cta', has('Want one of the three?') && has('Claim a table'));
await shot('work-desktop');

/* ── book ──────────────────────────────────────────────────────────────── */
await load('/book');
check('book: headline', has('Book a table'));
check('book: contact', has('tricuongdao75@gmail.com') && has('@thewebbistro'));
check('book: form', has('Your name') && has('What are you after?') && has('Send the order'));
check('book: chips', has('Landing page') && has('Not sure yet'));
check('book: privacy line', has('nowhere else'));
await shot('book-desktop');

/* ── privacy + 404 ─────────────────────────────────────────────────────── */
await load('/privacy');
check('privacy: content', has('Privacy, in plain words') && has('Formspree'));
await load('/nope');
check('404: content', has("This table's not set."));

/* ── mobile pass ───────────────────────────────────────────────────────── */
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await load('/', 3600);
check('mobile: home renders', has('Websites that bring customers in.'));
await shot('home-mobile');
await load('/book', 3000);
await shot('book-mobile');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

/* ── console errors ────────────────────────────────────────────────────── */
const realErrors = consoleErrors.filter((e) => !/favicon|DevTools|Download the React/i.test(e));
check('console: no errors', realErrors.length === 0);
if (realErrors.length) realErrors.slice(0, 5).forEach((e) => console.log('   err>', e.slice(0, 300)));

const failed = results.filter(([, ok]) => !ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed. Screenshots in "dev tooling/shots/".`);

ws.close();
edge.kill();
process.exit(failed === 0 ? 0 : 1);
