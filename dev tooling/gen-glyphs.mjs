/*
 * Build-time glyph pipeline: extracts the display-font outlines for the WB
 * crest and the semicolon, and writes them to src/components/scene/glyphs.json.
 * The 3D crest extrudes these paths with three's ExtrudeGeometry.
 *
 * Re-run (needs the TTF + opentype.js):
 *   mkdir -p gen
 *   curl -sL -o gen/DMSerifDisplay-Regular.ttf \
 *     "https://raw.githubusercontent.com/google/fonts/main/ofl/dmserifdisplay/DMSerifDisplay-Regular.ttf"
 *   node "dev tooling/gen-glyphs.mjs"
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const buf = readFileSync(join(ROOT, 'gen', 'DMSerifDisplay-Regular.ttf'));
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

const chars = ['W', 'B', ';'];
const out = { upem: font.unitsPerEm, font: 'DM Serif Display Regular', glyphs: {} };

for (const ch of chars) {
  const path = font.getPath(ch, 0, 0, font.unitsPerEm);
  const d = path.toPathData(2);
  const bbox = path.getBoundingBox();
  out.glyphs[ch] = { d, bbox: [bbox.x1, bbox.y1, bbox.x2, bbox.y2] };
}

const dest = join(ROOT, 'src', 'components', 'scene', 'glyphs.json');
writeFileSync(dest, JSON.stringify(out));

for (const [ch, g] of Object.entries(out.glyphs)) {
  console.log(
    JSON.stringify(ch),
    'commands:',
    (g.d.match(/[MLCQZ]/g) || []).length,
    'bbox:',
    g.bbox.map((n) => Math.round(n)).join(','),
  );
}
console.log('upem:', out.upem, '->', dest);
