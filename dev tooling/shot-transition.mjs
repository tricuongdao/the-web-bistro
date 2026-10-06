/*
 * Transition filmstrip: loads a route, clicks a link (or goes back), and
 * records the screencast while the transition plays, so the motion can be
 * inspected frame by frame instead of guessed at from one screenshot.
 *
 * Writes every Nth frame to "dev tooling/shots/" as `<prefix>-<n>-<ms>ms.png`.
 *
 * Usage:  node "dev tooling/shot-transition.mjs" [from] [to]
 *         node "dev tooling/shot-transition.mjs" / /book 1440 900
 * Needs `npm run dev` on :3000.
 */

import { spawn } from 'node:child_process';
import http from 'node:http';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9448;
const BASE = 'http://localhost:3000';
const OUT = join(dirname(fileURLToPath(import.meta.url)), 'shots');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const from = process.argv[2] || '/';
const to = process.argv[3] || '/menu';
const WIDTH = parseInt(process.argv[4] || '1440', 10);
const HEIGHT = parseInt(process.argv[5] || '900', 10);
const VI = process.argv.includes('--vi');
const EVERY = 2; // keep every Nth screencast frame on disk

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
    '--user-data-dir=' + join(process.env.TEMP || '.', 'wb-cdp-tx-' + process.pid),
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
const frames = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
    return;
  }
  if (m.method === 'Page.screencastFrame') {
    frames.push({ at: m.params.metadata.timestamp, data: m.params.data });
    ws.send(JSON.stringify({ id: ++id, method: 'Page.screencastFrameAck', params: { sessionId: m.params.sessionId } }));
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

/** record ~1.4s of frames while `fire` runs, then save a filmstrip */
const filmstrip = async (prefix, fire) => {
  frames.length = 0;
  await send('Page.startScreencast', { format: 'png', everyNthFrame: 1, maxWidth: WIDTH, maxHeight: HEIGHT });
  await sleep(120); // let the stream settle before the zero mark
  const t0 = Date.now();
  await fire();
  await sleep(1500);
  await send('Page.stopScreencast');

  const keep = frames.filter((_, i) => i % EVERY === 0);
  const base = keep[0]?.at ?? 0;
  keep.forEach((f, i) => {
    const ms = Math.round((f.at - base) * 1000);
    writeFileSync(join(OUT, `${prefix}-${String(i).padStart(2, '0')}-${ms}ms.png`), Buffer.from(f.data, 'base64'));
  });
  console.log(`${prefix}: ${frames.length} frames in ${Date.now() - t0}ms, kept ${keep.length}`);
};

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false });

await send('Page.navigate', { url: BASE + from });
await sleep(4200);

const tag = VI ? '-vi' : '';
if (VI) {
  await evalJs("localStorage.setItem('wb-lang','vi')");
  await send('Page.navigate', { url: BASE + from });
  await sleep(3800);
}

/* 1 — a nav link click: the intercepted path */
await filmstrip(`transition-click${tag}`, () => evalJs(`document.querySelector('header a[href="${to}"]').click()`));

/* 2 — the browser's own back: a route change we did not start */
await sleep(1200);
await filmstrip(`transition-back${tag}`, () => evalJs('history.back()'));

console.log(`\nfilmstrips written to ${OUT} (${from} -> ${to})`);
ws.close();
edge.kill();
process.exit(0);
