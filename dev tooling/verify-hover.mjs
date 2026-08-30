/*
 * CDP hover verification: checks the nav "page buttons" hover underline
 * switches on and OFF exactly like the design canvas (CSS :hover).
 * Run: npm run check:hover    (or: node "dev tooling/verify-hover.mjs"; dev server must be on :5173)
 */
import { spawn } from 'node:child_process';
import http from 'node:http';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9333;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getJson(path) {
  return new Promise((resolve, reject) => {
    http.get({ host: '127.0.0.1', port: PORT, path }, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });
}

const chrome = spawn(CHROME, [
  '--headless=new', '--remote-debugging-port=' + PORT, '--no-first-run', '--no-default-browser-check', '--user-data-dir=' + process.env.TEMP + '\\wb-cdp', 'about:blank',
], { stdio: 'ignore' });
await sleep(2500);

const targets = await getJson('/json/list');
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
};
const send = (method, params = {}) =>
  new Promise((resolve) => { const i = ++id; pending.set(i, resolve); ws.send(JSON.stringify({ id: i, method, params })); });

const evalJs = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  return r.result?.result?.value ?? r.result?.result?.description ?? JSON.stringify(r.result);
};

await send('Page.enable');
await send('Runtime.enable');
await send('Page.navigate', { url: 'http://localhost:5173/' });
await sleep(2500);

async function probe(label, finderJs) {
  // finderJs returns a selector-ish locator description + coords via eval
  const rectStr = await evalJs(`(() => {
    const el = ${finderJs};
    if (!el) return JSON.stringify(null);
    el.scrollIntoView({ block: 'center' });
    const r = el.getBoundingClientRect();
    return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2 });
  })()`);
  const rect = JSON.parse(rectStr);
  if (!rect) { console.log(`FAIL  ${label}: element not found`); return false; }

  const read = () => evalJs(`(() => {
    const el = ${finderJs};
    const cs = getComputedStyle(el);
    return JSON.stringify({ bbc: cs.borderBottomColor, bbw: cs.borderBottomWidth, color: cs.color });
  })()`);
  // read border-bottom-color only makes sense for header nav; footer links use color
  const before = await read();

  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: rect.x, y: rect.y });
  await sleep(400);
  const during = await read();

  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: rect.x + 250, y: rect.y + 250 });
  await sleep(400);
  const after = await read();

  console.log(`${label}`);
  console.log(`  before hover: ${JSON.stringify(before)}`);
  console.log(`  during hover: ${JSON.stringify(during)}`);
  console.log(`  after  hover: ${JSON.stringify(after)}`);
  return { before, during, after };
}

const results = [];

// 1. Header nav link "The menu" (underline should be gold while hovered, transparent after)
results.push(['header nav: The menu', await probe('header nav: The menu',
  `document.querySelectorAll('header nav > a')[1]`)]);

// 2. Footer "Pages" links (color should turn gold on hover, back after)
results.push(['footer Pages: The menu', await probe('footer Pages: The menu',
  `Array.from(document.querySelectorAll('footer a')).find(a => a.textContent.trim() === 'The menu')`)]);

// 2b. Header lang toggle (border should revert to rgba(246,239,226,0.4) after hover)
results.push(['header lang toggle', await probe('header lang toggle',
  `document.querySelector('header nav > button')`)]);

// 3. Sticky-hover scenario: click header nav link (page swap + scrollTo), then move away
{
  const rectStr = await evalJs(`(() => {
    const el = document.querySelectorAll('header nav > a')[1];
    const r = el.getBoundingClientRect();
    return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2 });
  })()`);
  const rect = JSON.parse(rectStr);
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: rect.x, y: rect.y });
  await sleep(150);
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: rect.x, y: rect.y, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: rect.x, y: rect.y, button: 'left', clickCount: 1 });
  await sleep(600);
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: rect.x + 260, y: rect.y + 260 });
  await sleep(500);
  const after = JSON.parse(await evalJs(`(() => {
    const el = document.querySelectorAll('header nav > a')[1];
    const cs = getComputedStyle(el);
    return JSON.stringify({ bbc: cs.borderBottomColor, color: cs.color });
  })()`));
  console.log('sticky-hover check (after click + mouse moved away)');
  console.log(`  borderBottomColor: ${after.bbc}  color: ${after.color}`);
  results.push(['sticky-hover after click', { after }]);
}

console.log('\nExpected: during hover border-bottom-color = rgb(224, 169, 59) (gold #E0A93B),');
console.log('after hover = rgba(0, 0, 0, 0) (transparent), footer color back to rgb(200, 214, 205).');

ws.close();
chrome.kill();
process.exit(0);
