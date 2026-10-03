/*
 * Crest geometry: turns the extracted DM Serif Display outlines
 * (glyphs.json, see dev tooling/gen-glyphs.mjs) into extruded three.js
 * geometry — the letters of the 3D wordmark.
 */

import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import glyphs from './glyphs.json';

export type GlyphChar = keyof typeof glyphs.glyphs;

const cache = new Map<string, THREE.BufferGeometry>();

/**
 * Extruded geometry for one glyph, in font units (upem 1000, cap height
 * 660). Coordinates arrive SVG-style (y down); we flip to three's y-up,
 * which inverts the winding — every crest material must render DoubleSide.
 */
export function glyphGeometry(ch: GlyphChar, depth = 160): THREE.BufferGeometry {
  const key = `${String(ch)}:${depth}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const { d } = glyphs.glyphs[ch];
  const parsed = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`);
  const shapes = parsed.paths.flatMap((p) => SVGLoader.createShapes(p));

  const geo = new THREE.ExtrudeGeometry(shapes, {
    depth,
    bevelEnabled: true,
    bevelThickness: 16,
    bevelSize: 10,
    bevelSegments: 3,
    curveSegments: 12,
  });
  geo.scale(1, -1, 1); // SVG y-down -> three y-up
  cache.set(key, geo);
  return geo;
}

/** Font-unit layout of the crest: "WB;" left to right. */
export const CREST = {
  upem: glyphs.upem,
  /** total advance width of W(908) + gap(80) + B(554) + gap(58) + ;(236) */
  width: 1832,
  /** letter box, baseline at y=0, caps up to +660 */
  top: 660,
  bottom: -135,
} as const;
