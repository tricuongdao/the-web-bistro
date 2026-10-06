/*
 * Tableware for the crest: a fork, a knife and the plate it is served on.
 *
 * The flatware is drawn as a 2D silhouette (the same trick as the glyphs)
 * and extruded, so it reads as real cutlery at any scale instead of two
 * crossed rods. Everything is authored in crest units — the monogram is
 * ~2.5 wide, a piece of flatware 2.64 — and cached, because the scene
 * would otherwise rebuild it on every remount.
 *
 * ExtrudeGeometry puts the caps on material 0 and the walls on material 1
 * (normalising the winding itself), so a mesh can take [face, side].
 */

import * as THREE from 'three';

/** plate: outer radius and the height of its rim, in crest units */
export const PLATE = { radius: 1.28, rim: 0.072 } as const;

/* Each piece of flatware is drawn 2.64 long (butt to tip) and 0.36 across
   at its widest, so a scene that wants a slightly bigger fork only has to
   scale the mesh. */

const cache = new Map<string, THREE.BufferGeometry>();

function extrude(shape: THREE.Shape, depth: number, bevel: number): THREE.BufferGeometry {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel * 1.4,
    bevelSize: bevel,
    bevelSegments: 2,
    curveSegments: 6,
  });
  geo.translate(0, 0, -depth / 2); // sit centred on the mesh origin
  return geo;
}

function cached(key: string, build: () => THREE.BufferGeometry): THREE.BufferGeometry {
  const hit = cache.get(key);
  if (hit) return hit;
  const geo = build();
  cache.set(key, geo);
  return geo;
}

/**
 * Four-tined fork: butt at the bottom, tines at the top. The head flares
 * out of a narrow neck, the way a table fork does.
 */
function forkShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-0.17, 0.5);
  // the comb, left to right
  s.lineTo(-0.17, 1.22);
  s.quadraticCurveTo(-0.17, 1.29, -0.112, 1.29);
  s.lineTo(-0.112, 0.68);
  s.lineTo(-0.074, 0.68);
  s.lineTo(-0.074, 1.25);
  s.quadraticCurveTo(-0.074, 1.32, -0.016, 1.32);
  s.lineTo(-0.016, 0.72);
  s.lineTo(0.016, 0.72);
  s.lineTo(0.016, 1.25);
  s.quadraticCurveTo(0.016, 1.32, 0.074, 1.32);
  s.lineTo(0.074, 0.68);
  s.lineTo(0.112, 0.68);
  s.lineTo(0.112, 1.22);
  s.quadraticCurveTo(0.112, 1.29, 0.17, 1.29);
  // down the right shoulder into the neck
  s.lineTo(0.17, 0.5);
  s.lineTo(0.152, 0.42);
  s.quadraticCurveTo(0.082, 0.36, 0.056, 0.29);
  s.quadraticCurveTo(0.06, 0.22, 0.092, 0.16);
  s.lineTo(0.086, 0.02);
  s.lineTo(0.074, -0.34);
  s.lineTo(0.06, -1.06);
  s.lineTo(0.055, -1.18);
  s.quadraticCurveTo(0.056, -1.32, 0, -1.32);
  s.quadraticCurveTo(-0.056, -1.32, -0.055, -1.18);
  // up the left side, back to the shoulder
  s.lineTo(-0.06, -1.06);
  s.lineTo(-0.074, -0.34);
  s.lineTo(-0.086, 0.02);
  s.lineTo(-0.092, 0.16);
  s.quadraticCurveTo(-0.06, 0.22, -0.056, 0.29);
  s.quadraticCurveTo(-0.082, 0.36, -0.152, 0.42);
  s.closePath();
  return s;
}

/** Table knife: handle at the bottom, a tapered blade with a belly. */
function knifeShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0.055, -1.18);
  // up the cutting edge — slightly convex
  s.lineTo(0.07, -1.06);
  s.lineTo(0.086, -0.34);
  s.lineTo(0.096, 0.02);
  s.lineTo(0.106, 0.16); // bolster
  s.lineTo(0.1, 0.3);
  s.quadraticCurveTo(0.136, 0.74, 0.078, 1.08);
  s.quadraticCurveTo(0.05, 1.24, 0.02, 1.31); // the point
  // back down the spine
  s.quadraticCurveTo(-0.016, 1.24, -0.05, 1.06);
  s.lineTo(-0.082, 0.62);
  s.lineTo(-0.1, 0.3);
  s.lineTo(-0.106, 0.16);
  s.lineTo(-0.106, 0.02);
  s.lineTo(-0.09, -0.34);
  s.lineTo(-0.072, -1.06);
  s.lineTo(-0.055, -1.18);
  s.quadraticCurveTo(-0.062, -1.32, 0, -1.32);
  s.quadraticCurveTo(0.062, -1.32, 0.055, -1.18);
  s.closePath();
  return s;
}

export function forkGeometry(depth = 0.052): THREE.BufferGeometry {
  return cached(`fork:${depth}`, () => extrude(forkShape(), depth, 0.007));
}

export function knifeGeometry(depth = 0.048): THREE.BufferGeometry {
  return cached(`knife:${depth}`, () => extrude(knifeShape(), depth, 0.006));
}

/**
 * The plate, as a lathe profile: a shallow well, a lipped rim, a foot
 * underneath. Revolved around Y by the caller.
 */
export function plateProfile(): THREE.Vector2[] {
  const r = PLATE.radius;
  return [
    [0, -0.085],
    [r * 0.72, -0.085],
    [r * 0.9, -0.055],
    [r * 0.985, 0.012],
    [r, 0.052],
    [r * 0.92, PLATE.rim], // the rim, tipping down into the well
    [r * 0.76, 0.022],
    [r * 0.73, 0],
    [0, 0],
  ].map(([x, y]) => new THREE.Vector2(x, y));
}
