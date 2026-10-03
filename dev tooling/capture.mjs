/*
 * Scroll-through screenshot utility: loads a route, then captures the page
 * at ten scroll positions (top to bottom) into "dev tooling/shots/".
 *
 * Usage:  node "dev tooling/capture.mjs" [path] [name]
 *         node "dev tooling/capture.mjs" /work work
 * Needs `npm run dev` on :3000.
 */

import { spawn } from 'node:child_process';
import http from 'node:http';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9446;
const BASE = 'http://localhost:3000';
const OUT = join(dirname(fileURLToPath(import.meta.url)), 'shots');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const route = process.argv[2] || '/';
const name = process.argv[3] || 'page';
const WIDTH = parseInt(process.argv[4] || '1440', 10);
const HEIGHT = parseInt(process.argv[5] || '900', 10);
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
    '--user-data-dir=' + join(process.env.TEMP || '.', 'wb-cdp-cap'),
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
await send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: WIDTH < 700 });
await send('Page.navigate', { url: BASE + route });
await sleep(4200);

const H = await evalJs('document.documentElement.scrollHeight - window.innerHeight');
const fractions = [0, 0.09, 0.18, 0.28, 0.38, 0.48, 0.58, 0.68, 0.78, 0.88, 0.97];
for (let i = 0; i < fractions.length; i++) {
  await evalJs(`window.scrollTo(0, ${Math.round(H * fractions[i])})`);
  await sleep(1400);
  const r = await send('Page.captureScreenshot', { format: 'png' });
  if (r.result?.data) {
    writeFileSync(join(OUT, `${name}-s${String(i).padStart(2, '0')}.png`), Buffer.from(r.result.data, 'base64'));
  }
}
console.log(`captured ${fractions.length} shots for ${route} -> ${OUT} (scrollHeight-900 = ${H})`);

ws.close();
edge.kill();
process.exit(0);
