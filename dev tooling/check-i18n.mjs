/*
 * i18n coverage check: every English string the site can render must have a
 * Vietnamese translation in src/lib/i18n.ts.
 *
 * Collects: every t('...') literal in src/** + every string inside the data
 * structures of src/lib/content.ts (which are all rendered through t()).
 * Also checks DISHES/DISHES_VI, TICKET/TICKET_VI and FLAP parity.
 *
 * Run: npm run check:i18n   (node "dev tooling/check-i18n.mjs")
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { I18N, TICKET, TICKET_VI, FLAP } from '../src/lib/i18n.ts';
import * as content from '../src/lib/content.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

const strings = new Set();

/* 1 — t('...') and t("...") literals in every source file */
const files = walk(SRC).filter((f) => /\.(ts|tsx)$/.test(f));
for (const f of files) {
  if (f.endsWith('i18n.ts')) continue;
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(/\bt\(\s*'((?:\\.|[^'\\])*)'/g)) strings.add(m[1].replace(/\\'/g, "'"));
  for (const m of src.matchAll(/\bt\(\s*"((?:\\.|[^"\\])*)"/g)) strings.add(m[1].replace(/\\"/g, '"'));
}

/* 2 — every string inside the content data (rendered via t()) */
const collect = (value) => {
  if (typeof value === 'string') strings.add(value);
  else if (Array.isArray(value)) value.forEach(collect);
  else if (value && typeof value === 'object') Object.values(value).forEach(collect);
};
[
  content.MENU,
  content.SIDES,
  content.CARE,
  content.SPECIALS,
  content.PROCESS,
  content.RULES,
  content.FAQ,
  content.TABLES,
  content.RISK,
  content.NAV,
].forEach(collect);

/* things that are deliberately not translated (prices, numbers, wiring) */
const skip = new Set([
  content.CONTACT.email,
  content.CONTACT.instagram,
  content.FORM_ENDPOINT,
  content.BUILD_URL,
  ...Object.values(content.PRICES),
  '/',
  '/menu',
  '/work',
  '/book',
  '3',
  '24',
  '100',
  '7',
  '×',
  'h',
  'd',
  '',
]);

let missing = 0;
for (const s of [...strings].sort()) {
  if (skip.has(s)) continue;
  if (!(s in I18N)) {
    missing += 1;
    console.log(`MISSING VI translation: "${s}"`);
  }
}

/* 3 — parity checks */
for (const d of content.DISHES) {
  if (!(d in content.DISHES_VI)) {
    missing += 1;
    console.log(`MISSING dish translation: "${d}"`);
  }
}
if (TICKET.length !== TICKET_VI.length) {
  missing += 1;
  console.log('TICKET / TICKET_VI length mismatch');
}
if (FLAP.en.length !== FLAP.vi.length) {
  missing += 1;
  console.log('FLAP en/vi length mismatch');
}

const checked = strings.size - skip.size;
console.log(
  missing === 0
    ? `\nAll ${checked} rendered strings have VI translations.`
    : `\n${missing} string(s) would fall back to English in VI mode.`,
);
process.exit(missing === 0 ? 0 : 1);
