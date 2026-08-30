/*
 * Review helper: finds every string passed through t(...) in the components
 * and reports which ones are missing from the VI dictionary in i18n.js.
 * Run: npm run check:i18n   (or: node "dev tooling/check-i18n.mjs")
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolved relative to this file, so the script works from any cwd.
const SRC = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]
  );
}

const files = walk(SRC).filter((f) => f.endsWith('.jsx') || f.endsWith('.js'));
const strings = new Set();

for (const f of files) {
  if (f.endsWith('i18n.js')) continue;
  const src = readFileSync(f, 'utf8');
  // t('...') / t("...") — including multi-line template-ish calls
  for (const m of src.matchAll(/\bt\(\s*(['"])((?:\\.|(?!\1).)*)\1/g)) {
    strings.add(m[2].replace(/\\'/g, "'").replace(/\\"/g, '"'));
  }
  // also catch data tables rendered through t(): t(table.title) etc. handled via I18N keys below
}

const i18nSrc = readFileSync(join(SRC, 'i18n.js'), 'utf8');
const keys = new Set();
for (const m of i18nSrc.matchAll(/^\s{2}(['"])(.*?)\1\s*:/gm)) keys.add(m[2]);

// Strings referenced inside data arrays (Header/Footer NAV, WorkPage TABLES, MenuPage rows)
const extra = [
  'Front of house', 'The menu', 'Opening offer', 'Reservations', 'Web development', 'Email me',
  'Table one', 'Table two', 'Table three',
  'Starters', 'Mains', 'Sides', 'Everything I serve',
  'Small, fast, done in a week', 'The full build', 'Good with anything above',
  '1 page · 1 week', 'Audit · fix · hand back', '5–8 pages · 3–4 weeks',
  'Payments · stock · shipping', 'Scoped per project',
  'SEO Groundwork', 'Analytics Setup',
  'Nothing here quite fits?', 'Ask the kitchen', 'Monthly hosting, backups, updates and a slice of my time for small changes. Cancel when you like. Your site and domain stay yours.',
  'Hungry? Tell me what you need.', 'Book a table',
  'Pages', 'Get in touch', '@thewebbistro on Instagram', 'Open 7 days a week, 9 to 6',
];
extra.forEach((s) => strings.add(s));

let missing = 0;
for (const s of [...strings].sort()) {
  if (!keys.has(s)) {
    missing++;
    console.log(`MISSING VI translation: "${s}"`);
  }
}
console.log(missing === 0 ? `\nAll ${strings.size} strings have VI translations.` : `\n${missing} string(s) fall back to English in VI mode.`);
