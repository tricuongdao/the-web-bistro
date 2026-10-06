/*
 * Single-viewport screenshot utility, for working on the hero.
 *
 * capture.mjs scrolls a whole route; this one parks the browser at a few
 * viewport sizes and shoots the top of the page, which is the loop you
 * want while tuning the 3D crest.
 *
 * Usage:  node "dev tooling/shot-hero.mjs" [path] [name]
 * Needs `npm run dev` on :3000.
 */

import { spawn } from 'node:child_process';
import http from 'node:http';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9447;
const BASE = 'http://localhost:3000';
const OUT = join(dirname(fileURLToPath(import.meta.url)), 'shots');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const route = process.argv[2] || '/';
const name = process.argv[3] || 'hero';

/* [suffix, width, height, mobile, scroll] */
const VIEWS = [
  ['desktop', 1440, 900, false, 0],
  ['wide', 1920, 1080, false, 0],
  ['mobile', 390, 844, true, 0],
  ['mobile-scrolled', 390, 844, true, 0.75],
];

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
    '--user-data-dir=' + join(process.env.TEMP || '.', 'wb-cdp-hero-' + process.pid),
    'about:blank',
  ],
  { stdio: 'ignore' },
);

await sleep(2500);
const targets = await getJson('/json/list');
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
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

for (const [suffix, width, height, mobile, scroll] of VIEWS) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile });
  await send('Page.navigate', { url: BASE + route });
  await sleep(4200);
  if (scroll) {
    await evalJs('window.scrollTo(0, window.innerHeight * ' + scroll + ')');
    await sleep(1200);
  }
  const r = await send('Page.captureScreenshot', { format: 'png' });
  if (r.result?.data) {
    writeFileSync(join(OUT, `${name}-${suffix}.png`), Buffer.from(r.result.data, 'base64'));
    console.log(`wrote ${name}-${suffix}.png (${width}x${height})`);
  }
}

ws.close();
edge.kill();
process.exit(0);
