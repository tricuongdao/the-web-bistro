/*
 * Canvas-painted textures for the hero scene: order tickets, the little
 * site served under the cloche, and the steam sprite. Client-only.
 */

import * as THREE from 'three';
import { COPY, TICKET, TICKET_VI, type Lang } from '@/lib/i18n';

const PAPER = '#F6EFE2';
const INK = '#10322F';
const GOLD = '#E0A93B';
const BRASS = '#B07C1F';
const MUTE = '#7C8A7F';
const MONO = '"IBM Plex Mono", ui-monospace, monospace';

function makeCanvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function toTexture(c: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** An order ticket, two dishes per docket. */
export function makeTicketTexture(lang: Lang, idx: number): THREE.CanvasTexture {
  const lines = (lang === 'vi' ? TICKET_VI : TICKET).slice(idx % 3, (idx % 3) + 2);
  const c = makeCanvas(512, 672);
  const g = c.getContext('2d')!;
  g.textBaseline = 'top';

  g.fillStyle = PAPER;
  g.fillRect(0, 0, 512, 672);

  // soft edge shading so the paper reads as paper
  const edge = g.createLinearGradient(0, 0, 512, 0);
  edge.addColorStop(0, 'rgba(0,0,0,0.08)');
  edge.addColorStop(0.14, 'rgba(0,0,0,0)');
  edge.addColorStop(0.86, 'rgba(0,0,0,0)');
  edge.addColorStop(1, 'rgba(0,0,0,0.08)');
  g.fillStyle = edge;
  g.fillRect(0, 0, 512, 672);

  g.fillStyle = MUTE;
  g.font = `600 24px ${MONO}`;
  g.fillText('THE WEB BISTRO', 40, 46);
  g.textAlign = 'right';
  g.fillText(`ORDER #014${2 + (idx % 8)}`, 472, 46);
  g.textAlign = 'left';

  g.strokeStyle = '#C3B79F';
  g.setLineDash([10, 8]);
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(40, 106);
  g.lineTo(472, 106);
  g.stroke();

  g.fillStyle = INK;
  g.font = `500 33px ${MONO}`;
  lines.forEach((ln, i) => g.fillText(ln, 40, 158 + i * 58));

  g.beginPath();
  g.moveTo(40, 540);
  g.lineTo(472, 540);
  g.stroke();

  g.setLineDash([]);
  g.fillStyle = MUTE;
  g.font = `600 22px ${MONO}`;
  g.fillText((lang === 'vi' ? 'PHỤC VỤ NÓNG' : 'SERVED HOT'), 40, 566);
  g.textAlign = 'right';
  g.fillStyle = BRASS;
  g.fillText(COPY[lang].firing.toUpperCase(), 472, 566);
  g.textAlign = 'left';

  return toTexture(c);
}

/** The little site card that sits under the cloche. */
export function makeSiteCardTexture(url: string): THREE.CanvasTexture {
  const c = makeCanvas(640, 400);
  const g = c.getContext('2d')!;
  g.textBaseline = 'top';

  g.fillStyle = PAPER;
  g.fillRect(0, 0, 640, 400);

  // browser chrome
  g.fillStyle = INK;
  g.fillRect(0, 0, 640, 62);
  const dot = (x: number, color: string) => {
    g.beginPath();
    g.arc(x, 31, 7, 0, Math.PI * 2);
    g.fillStyle = color;
    g.fill();
  };
  dot(30, GOLD);
  dot(56, 'rgba(246,239,226,0.35)');
  dot(82, 'rgba(246,239,226,0.35)');
  g.fillStyle = 'rgba(246,239,226,0.14)';
  g.fillRect(116, 15, 494, 32);
  g.fillStyle = '#C8D6CD';
  g.font = `500 18px ${MONO}`;
  g.fillText(`https://${url}`, 130, 21);

  // page content
  g.fillStyle = INK;
  g.fillRect(48, 104, 372, 34);
  g.fillRect(48, 152, 248, 34);
  g.fillStyle = '#D9CDB8';
  g.fillRect(48, 218, 522, 13);
  g.fillRect(48, 245, 468, 13);
  g.fillRect(48, 272, 502, 13);
  g.fillStyle = GOLD;
  g.fillRect(48, 316, 152, 46);

  return toTexture(c);
}

/** One soft steam puff. */
export function makeSteamTexture(): THREE.CanvasTexture {
  const c = makeCanvas(128, 128);
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 4, 64, 64, 62);
  grad.addColorStop(0, 'rgba(246,239,226,0.85)');
  grad.addColorStop(0.45, 'rgba(246,239,226,0.38)');
  grad.addColorStop(1, 'rgba(246,239,226,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return toTexture(c);
}
