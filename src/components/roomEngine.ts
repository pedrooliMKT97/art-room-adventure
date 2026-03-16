import type { DrawRoomParams, DrawCharParams } from './gameTypes';

// ─── Interactive objects definition ────────────────────────────────────────
export const OBJECTS = [
  // Computer on desk — top-left area
  { id: 'computer', modal: 'computer', tx: 1, ty: 1, tw: 3, th: 2, solid: true, label: 'COMPUTADOR' },
  // Poster — center top wall
  { id: 'poster', modal: 'poster', tx: 5, ty: 1, tw: 3, th: 2, solid: false, label: 'POSTER' },
  // Certificate frame — left wall
  { id: 'certificate', modal: 'certificate', tx: 1, ty: 4, tw: 2, th: 2, solid: false, label: 'QUADRO' },
  // Bookshelf — right wall
  { id: 'bookshelf', modal: 'bookshelf', tx: 11, ty: 1, tw: 2, th: 4, solid: true, label: 'PRATELEIRA' },
  // Phone — small side table bottom right
  { id: 'phone', modal: 'phone', tx: 10, ty: 6, tw: 2, th: 2, solid: true, label: 'CELULAR' },
] as const;

export const ROOM_CONFIG = { cols: 14, rows: 10 };

// ─── Color palette ──────────────────────────────────────────────────────────
const C = {
  nightDeep:   '#0d1b2a',
  nightMid:    '#1b1b2f',
  nightSurf:   '#1e2a3a',
  nightFloor:  '#162230',
  wallTop:     '#14213d',
  wallSide:    '#0f1923',
  floorA:      '#162230',
  floorB:      '#192840',
  woodDesk:    '#4a2f1a',
  woodDeskLt:  '#5c3a22',
  monitorDark: '#0a0f14',
  monitorGlow: '#00e5ff',
  neonOrange:  '#ff6b1a',
  neonAmber:   '#ffb347',
  neonGreen:   '#00ff41',
  pixel:       '#e8eaf0',
  pixelDim:    '#7a8090',
  bookRed:     '#c0392b',
  bookBlue:    '#2980b9',
  bookGreen:   '#27ae60',
  bookYellow:  '#f39c12',
  posterPurp:  '#6c3483',
  certGold:    '#d4ac0d',
  plantGreen:  '#2ecc71',
  rugA:        '#1a3a4a',
  rugB:        '#143040',
};

// ─── Draw the full room ─────────────────────────────────────────────────────
export function drawRoom(ctx: CanvasRenderingContext2D, p: DrawRoomParams) {
  const { scale: S, tile: T, cols, rows, ts, state } = p;
  const W = cols * T * S;
  const H = rows * T * S;

  // ── Floor ──
  for (let row = 2; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      ctx.fillStyle = (row + col) % 2 === 0 ? C.floorA : C.floorB;
      ctx.fillRect(col * T * S, row * T * S, T * S, T * S);
    }
  }

  // ── Rug (center) ──
  for (let row = 4; row < 8; row++) {
    for (let col = 3; col < 9; col++) {
      ctx.fillStyle = (row + col) % 2 === 0 ? C.rugA : C.rugB;
      ctx.fillRect(col * T * S, row * T * S, T * S, T * S);
    }
  }
  // Rug border
  ctx.strokeStyle = '#2a5060';
  ctx.lineWidth = S;
  ctx.strokeRect(3 * T * S + S/2, 4 * T * S + S/2, 6 * T * S - S, 4 * T * S - S);

  // ── Back wall (top) ──
  ctx.fillStyle = C.wallTop;
  ctx.fillRect(0, 0, W, 2 * T * S);

  // ── Side walls ──
  ctx.fillStyle = C.wallSide;
  ctx.fillRect(0, 0, T * S, H);               // left wall
  ctx.fillRect(W - T * S, 0, T * S, H);       // right wall

  // ── Floor wall strip ──
  ctx.fillStyle = '#0c1520';
  ctx.fillRect(0, H - T * S, W, T * S);

  // ── Baseboard ──
  ctx.fillStyle = '#2a3a4a';
  ctx.fillRect(T * S, 2 * T * S, W - 2 * T * S, Math.floor(S * 1.5));
  ctx.fillRect(T * S, H - T * S, W - 2 * T * S, Math.floor(S * 1.5));

  // ── NEON SIGN ──
  drawNeonSign(ctx, T, S, ts);

  // ── Desk (top-left) ──
  drawDesk(ctx, T, S, ts, state.cpuBlink);

  // ── Poster (center top wall) ──
  drawPoster(ctx, T, S);

  // ── Certificate frame (left wall) ──
  drawCertificate(ctx, T, S);

  // ── Bookshelf (right wall) ──
  drawBookshelf(ctx, T, S);

  // ── Plant (near bookshelf) ──
  drawPlant(ctx, T, S);

  // ── Phone / side table ──
  drawPhone(ctx, T, S);

  // ── Window with curtain ──
  drawWindow(ctx, T, S, state.curtainOffset);

  // ── Lamp ──
  drawLamp(ctx, T, S, ts);
}

// ─── Neon sign ──────────────────────────────────────────────────────────────
function drawNeonSign(ctx: CanvasRenderingContext2D, T: number, S: number, ts: number) {
  const x = 4 * T * S;
  const y = Math.floor(0.3 * T * S);
  const w = 6 * T * S;
  const h = Math.floor(1.2 * T * S);
  const glow = 0.7 + 0.3 * Math.sin(ts / 600);

  // Background panel
  ctx.fillStyle = '#0a1220';
  ctx.fillRect(x, y, w, h);

  // Outer neon border glow
  ctx.shadowColor = `rgba(255,107,26,${glow})`;
  ctx.shadowBlur = 12 * S / 4;
  ctx.strokeStyle = `rgba(255,107,26,${glow})`;
  ctx.lineWidth = Math.floor(S / 2);
  ctx.strokeRect(x + Math.floor(S/2), y + Math.floor(S/2), w - S, h - S);
  ctx.shadowBlur = 0;

  // Text
  const fontSize = Math.floor(T * S * 0.28);
  ctx.font = `${fontSize}px "Press Start 2P", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = `rgba(255,107,26,${glow * 0.9})`;
  ctx.shadowBlur = 10 * S / 4;
  ctx.fillStyle = `rgba(255,180,80,${glow})`;
  ctx.fillText('Crio Experiências', x + w / 2, y + h * 0.38);
  ctx.fillStyle = `rgba(255,107,26,${glow})`;
  ctx.fillText('AUTÊNTICAS', x + w / 2, y + h * 0.72);
  ctx.shadowBlur = 0;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}

// ─── Desk + computer ────────────────────────────────────────────────────────
function drawDesk(ctx: CanvasRenderingContext2D, T: number, S: number, ts: number, cpuBlink: boolean) {
  const dx = T * S;
  const dy = 1 * T * S;
  const dw = 4 * T * S;
  const dh = T * S;

  // Desk surface
  ctx.fillStyle = C.woodDesk;
  ctx.fillRect(dx, dy + Math.floor(T * S * 0.5), dw, dh);
  ctx.fillStyle = C.woodDeskLt;
  ctx.fillRect(dx, dy + Math.floor(T * S * 0.5), dw, Math.floor(S * 2));

  // Desk legs
  ctx.fillStyle = C.woodDesk;
  ctx.fillRect(dx + S, dy + T * S + dh - S, S * 3, S * 3);
  ctx.fillRect(dx + dw - S * 4, dy + T * S + dh - S, S * 3, S * 3);

  // Monitor base
  const mx = dx + T * S * 0.5;
  const my = dy - Math.floor(T * S * 0.6);
  const mw = T * S * 2;
  const mh = Math.floor(T * S * 1.1);
  ctx.fillStyle = '#2a2a3a';
  ctx.fillRect(mx, my, mw, mh);

  // Monitor bezel
  ctx.fillStyle = '#111';
  ctx.fillRect(mx + Math.floor(S * 1), my + Math.floor(S * 1), mw - Math.floor(S * 2), mh - Math.floor(S * 2));

  // Screen glow (blue/cyan)
  const screenGlow = 0.8 + 0.2 * Math.sin(ts / 800);
  ctx.fillStyle = `rgba(0, 180, 220, ${screenGlow * 0.85})`;
  ctx.fillRect(mx + Math.floor(S * 2), my + Math.floor(S * 2), mw - Math.floor(S * 4), mh - Math.floor(S * 4));

  // Tiny "code" lines on screen
  ctx.fillStyle = 'rgba(0,255,200,0.6)';
  for (let i = 0; i < 4; i++) {
    const lw = (mw - S * 5) * (0.3 + 0.4 * ((i * 7 + 3) % 10) / 10);
    ctx.fillRect(mx + Math.floor(S * 2.5), my + Math.floor(S * 3) + i * Math.floor(S * 2), lw, Math.floor(S * 0.8));
  }

  // CPU box
  const cx = dx + T * S * 2.6;
  const cy = dy + Math.floor(T * S * 0.55);
  const cw = Math.floor(T * S * 0.9);
  const ch = Math.floor(T * S * 0.85);
  ctx.fillStyle = '#2a2a3a';
  ctx.fillRect(cx, cy, cw, ch);
  ctx.fillStyle = '#1a1a2a';
  ctx.fillRect(cx + S, cy + S, cw - 2 * S, ch - 2 * S);
  // CD drive slot
  ctx.fillStyle = '#333344';
  ctx.fillRect(cx + Math.floor(S * 2), cy + Math.floor(S * 2), cw - Math.floor(S * 4), Math.floor(S * 0.8));
  // Power LED
  ctx.fillStyle = cpuBlink ? C.neonGreen : '#003300';
  ctx.shadowColor = cpuBlink ? C.neonGreen : 'transparent';
  ctx.shadowBlur = cpuBlink ? 6 : 0;
  ctx.fillRect(cx + Math.floor(S * 2), cy + ch - Math.floor(S * 3), Math.floor(S * 1.5), Math.floor(S * 1.5));
  ctx.shadowBlur = 0;

  // Monitor stand
  ctx.fillStyle = '#2a2a3a';
  ctx.fillRect(mx + mw / 2 - S, my + mh, S * 2, S * 2);
  ctx.fillRect(mx + mw / 2 - S * 2, my + mh + S * 2, S * 4, S);

  // Keyboard
  ctx.fillStyle = '#2a2a3a';
  ctx.fillRect(dx + Math.floor(S * 3), dy + Math.floor(T * S * 0.55), Math.floor(T * S * 1.4), Math.floor(S * 1.5));
  ctx.fillStyle = '#3a3a4a';
  for (let k = 0; k < 6; k++) {
    ctx.fillRect(dx + Math.floor(S * 3.3) + k * Math.floor(S * 3.5), dy + Math.floor(T * S * 0.6), Math.floor(S * 2.8), Math.floor(S * 0.9));
  }
}

// ─── Poster ─────────────────────────────────────────────────────────────────
function drawPoster(ctx: CanvasRenderingContext2D, T: number, S: number) {
  const px = 5 * T * S + Math.floor(S * 4);
  const py = Math.floor(T * S * 0.15);
  const pw = 3 * T * S - Math.floor(S * 8);
  const ph = Math.floor(T * S * 1.6);

  // Frame
  ctx.fillStyle = '#8B6914';
  ctx.fillRect(px - S * 2, py - S * 2, pw + S * 4, ph + S * 4);
  // Mat
  ctx.fillStyle = '#f0e8d0';
  ctx.fillRect(px, py, pw, ph);
  // Abstract design — identity visual concept
  ctx.fillStyle = C.posterPurp;
  ctx.fillRect(px + S * 2, py + S * 2, pw - S * 4, Math.floor(ph * 0.4));
  ctx.fillStyle = C.neonOrange;
  const circR = Math.floor(pw * 0.18);
  ctx.beginPath();
  ctx.arc(px + pw / 2, py + ph * 0.65, circR, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f0e8d0';
  ctx.beginPath();
  ctx.arc(px + pw / 2, py + ph * 0.65, circR * 0.6, 0, Math.PI * 2);
  ctx.fill();
  // tiny text lines
  ctx.fillStyle = C.posterPurp;
  ctx.fillRect(px + S * 4, py + ph - S * 5, pw - S * 8, Math.floor(S * 0.8));
  ctx.fillRect(px + S * 6, py + ph - S * 3.5, pw - S * 12, Math.floor(S * 0.8));

  // Push pins
  ctx.fillStyle = C.neonAmber;
  ctx.fillRect(px - S * 2 + Math.floor(S * 1), py - S * 2 + Math.floor(S * 1), S * 2, S * 2);
  ctx.fillRect(px + pw - Math.floor(S * 1), py - S * 2 + Math.floor(S * 1), S * 2, S * 2);
}

// ─── Certificate ─────────────────────────────────────────────────────────────
function drawCertificate(ctx: CanvasRenderingContext2D, T: number, S: number) {
  const cx = T * S + Math.floor(S * 3);
  const cy = 4 * T * S - Math.floor(S * 4);
  const cw = 2 * T * S - Math.floor(S * 6);
  const ch = 2 * T * S - Math.floor(S * 2);

  // Frame
  ctx.fillStyle = C.certGold;
  ctx.fillRect(cx - S * 2, cy - S * 2, cw + S * 4, ch + S * 4);
  ctx.fillStyle = '#0f1923';
  ctx.fillRect(cx, cy, cw, ch);
  // Lines
  ctx.fillStyle = C.certGold;
  ctx.fillRect(cx + S * 2, cy + S * 3, cw - S * 4, Math.floor(S * 1));
  ctx.fillRect(cx + S * 4, cy + S * 6, cw - S * 8, Math.floor(S * 0.8));
  ctx.fillRect(cx + S * 4, cy + S * 8, cw - S * 8, Math.floor(S * 0.8));
  ctx.fillRect(cx + S * 4, cy + S * 10, cw - S * 8, Math.floor(S * 0.8));
  // seal
  ctx.fillStyle = C.certGold;
  ctx.beginPath();
  ctx.arc(cx + cw / 2, cy + ch - S * 4, S * 3, 0, Math.PI * 2);
  ctx.fill();
}

// ─── Bookshelf ───────────────────────────────────────────────────────────────
function drawBookshelf(ctx: CanvasRenderingContext2D, T: number, S: number) {
  const bx = 11 * T * S + Math.floor(S * 2);
  const by = T * S + Math.floor(S * 1);
  const bw = 2 * T * S - Math.floor(S * 4);
  const bh = 4 * T * S - Math.floor(S * 2);

  // Main shelf body
  ctx.fillStyle = C.woodDesk;
  ctx.fillRect(bx, by, bw, bh);
  ctx.fillStyle = C.woodDeskLt;
  ctx.fillRect(bx, by, bw, Math.floor(S * 1.5));

  // Shelves
  const shelfColors = [C.bookRed, C.bookBlue, C.bookGreen, C.bookYellow, C.bookRed, C.bookBlue];
  const shelfCount = 3;
  const shelfH = Math.floor((bh - S * 3) / shelfCount);
  for (let s = 0; s < shelfCount; s++) {
    const sy = by + S + s * shelfH;
    // shelf board
    ctx.fillStyle = C.woodDeskLt;
    ctx.fillRect(bx, sy + shelfH - Math.floor(S * 1), bw, Math.floor(S * 1.5));
    // books
    let bookX = bx + Math.floor(S * 1);
    for (let b = 0; b < 4; b++) {
      const bkW = Math.floor(S * (1.8 + (b % 2) * 0.8));
      const bkH = Math.floor(shelfH * (0.5 + (b % 3) * 0.15));
      ctx.fillStyle = shelfColors[(s * 4 + b) % shelfColors.length];
      ctx.fillRect(bookX, sy + shelfH - Math.floor(S * 1) - bkH, bkW, bkH);
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(bookX + Math.floor(bkW * 0.3), sy + shelfH - Math.floor(S * 1) - bkH + S, Math.floor(S * 0.5), bkH - S * 2);
      bookX += bkW + Math.floor(S * 0.5);
    }
  }
}

// ─── Plant ───────────────────────────────────────────────────────────────────
function drawPlant(ctx: CanvasRenderingContext2D, T: number, S: number) {
  const px = 9 * T * S + Math.floor(S * 2);
  const py = 5 * T * S;

  // Pot
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(px, py + S * 4, S * 8, S * 6);
  ctx.fillStyle = '#A0522D';
  ctx.fillRect(px - S, py + S * 3, S * 10, S * 2);

  // Plant leaves (simplified pixel)
  ctx.fillStyle = C.plantGreen;
  ctx.fillRect(px + S * 2, py - S * 2, S * 5, S * 4);
  ctx.fillRect(px, py, S * 4, S * 3);
  ctx.fillRect(px + S * 4, py, S * 4, S * 3);
  ctx.fillStyle = '#27ae60';
  ctx.fillRect(px + S * 3, py - S * 4, S * 3, S * 3);
}

// ─── Phone on side table ─────────────────────────────────────────────────────
function drawPhone(ctx: CanvasRenderingContext2D, T: number, S: number) {
  // Side table
  const tx = 10 * T * S + S * 2;
  const ty = 6 * T * S + S * 2;
  const tw = 2 * T * S - S * 4;
  const th = T * S;
  ctx.fillStyle = C.woodDesk;
  ctx.fillRect(tx, ty + Math.floor(th * 0.6), tw, Math.floor(th * 0.4));
  ctx.fillStyle = C.woodDeskLt;
  ctx.fillRect(tx, ty + Math.floor(th * 0.6), tw, S * 2);
  // Table legs
  ctx.fillStyle = C.woodDesk;
  ctx.fillRect(tx + S, ty + th, S * 2, S * 4);
  ctx.fillRect(tx + tw - S * 3, ty + th, S * 2, S * 4);

  // Phone body
  const px = tx + Math.floor((tw - S * 6) / 2);
  const py = ty;
  ctx.fillStyle = '#1a1a2a';
  ctx.fillRect(px, py, S * 6, Math.floor(th * 0.55));
  // Screen
  ctx.fillStyle = '#003366';
  ctx.fillRect(px + S, py + Math.floor(S * 0.5), S * 4, Math.floor(th * 0.55) - S * 2);
  // Screen content glow
  ctx.fillStyle = 'rgba(100,200,255,0.6)';
  ctx.fillRect(px + Math.floor(S * 1.5), py + S, S * 3, Math.floor(S * 0.8));
  ctx.fillRect(px + Math.floor(S * 1.5), py + S * 2.5, S * 2, Math.floor(S * 0.6));
  // Home button
  ctx.fillStyle = '#333344';
  ctx.fillRect(px + S * 2, py + Math.floor(th * 0.55) - S, S * 2, S);
}

// ─── Window with curtain ─────────────────────────────────────────────────────
function drawWindow(ctx: CanvasRenderingContext2D, T: number, S: number, curtainOffset: number) {
  const wx = 8 * T * S;
  const wy = Math.floor(T * S * 0.1);
  const ww = 2 * T * S;
  const wh = Math.floor(T * S * 1.6);

  // Window frame
  ctx.fillStyle = '#2a3a4a';
  ctx.fillRect(wx - S * 2, wy, ww + S * 4, wh);
  // Night sky
  ctx.fillStyle = '#040d18';
  ctx.fillRect(wx, wy + S, ww, wh - S * 2);

  // Stars
  const stars = [[5,8],[12,15],[20,6],[28,18],[8,22]];
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  for (const [sx, sy] of stars) {
    ctx.fillRect(wx + sx * S / 4, wy + sy * S / 4, Math.floor(S * 0.6), Math.floor(S * 0.6));
  }
  // Moon
  ctx.fillStyle = '#e8e0c0';
  ctx.beginPath();
  ctx.arc(wx + ww * 0.7, wy + wh * 0.3, S * 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#040d18';
  ctx.beginPath();
  ctx.arc(wx + ww * 0.75, wy + wh * 0.3, S * 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Curtain left
  ctx.fillStyle = '#4a2060';
  const co = Math.floor(curtainOffset);
  ctx.fillRect(wx - S * 2, wy, S * 5 + co, wh);
  ctx.fillStyle = '#3a1850';
  ctx.fillRect(wx - S * 2, wy, S * 2, wh);

  // Curtain right
  ctx.fillStyle = '#4a2060';
  ctx.fillRect(wx + ww - S * 3 - co, wy, S * 5 + co, wh);
  ctx.fillStyle = '#3a1850';
  ctx.fillRect(wx + ww + S * 2, wy, S * 2, wh);

  // Curtain rod
  ctx.fillStyle = '#8B6914';
  ctx.fillRect(wx - S * 3, wy - S, ww + S * 6, S);
}

// ─── Lamp ────────────────────────────────────────────────────────────────────
function drawLamp(ctx: CanvasRenderingContext2D, T: number, S: number, ts: number) {
  const lx = 6 * T * S;
  const ly = 7 * T * S;

  // Stand
  ctx.fillStyle = '#4a4a5a';
  ctx.fillRect(lx + S * 3, ly - S * 6, S * 2, S * 6);
  ctx.fillRect(lx + S, ly, S * 6, S);

  // Shade
  ctx.fillStyle = C.neonAmber;
  ctx.fillRect(lx, ly - S * 9, S * 8, S * 3);
  ctx.fillStyle = '#cc8800';
  ctx.fillRect(lx, ly - S * 9, S * 8, S);

  // Light glow under lamp
  const glow = 0.3 + 0.1 * Math.sin(ts / 1000);
  const grad = ctx.createRadialGradient(lx + S * 4, ly - S * 4, 0, lx + S * 4, ly - S * 4, S * 12);
  grad.addColorStop(0, `rgba(255,180,50,${glow})`);
  grad.addColorStop(1, 'rgba(255,180,50,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(lx - S * 8, ly - S * 12, S * 24, S * 16);

  // Bulb
  ctx.fillStyle = `rgba(255,255,200,${0.8 + 0.2 * Math.sin(ts / 700)})`;
  ctx.fillRect(lx + S * 3, ly - S * 7, S * 2, S * 2);
}

// ─── Draw Character ──────────────────────────────────────────────────────────
export function drawCharacter(ctx: CanvasRenderingContext2D, p: DrawCharParams) {
  const { x, y, scale: S, tile: T, dir, frame, blinking } = p;
  const W = 2 * T * S;
  const H = 2 * T * S;

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(x + Math.floor(W * 0.2), y + H - Math.floor(S * 2), Math.floor(W * 0.6), Math.floor(S * 2));

  // Legs animation
  const legOff = frame % 2 === 0 ? 0 : S;
  const legColors = ['#1a3050', '#142840'];

  if (dir === 'down' || dir === 'up') {
    ctx.fillStyle = legColors[0];
    ctx.fillRect(x + Math.floor(W * 0.28), y + Math.floor(H * 0.65) + legOff, Math.floor(W * 0.2), Math.floor(H * 0.3));
    ctx.fillStyle = legColors[1];
    ctx.fillRect(x + Math.floor(W * 0.52), y + Math.floor(H * 0.65) - legOff, Math.floor(W * 0.2), Math.floor(H * 0.3));
  } else {
    ctx.fillStyle = legColors[0];
    ctx.fillRect(x + Math.floor(W * 0.3), y + Math.floor(H * 0.65) + legOff, Math.floor(W * 0.4), Math.floor(H * 0.3));
  }

  // Shoes
  ctx.fillStyle = '#0a0a0a';
  if (dir === 'down' || dir === 'up') {
    ctx.fillRect(x + Math.floor(W * 0.22), y + H - Math.floor(S * 3), Math.floor(W * 0.26), Math.floor(S * 2));
    ctx.fillRect(x + Math.floor(W * 0.52), y + H - Math.floor(S * 3), Math.floor(W * 0.26), Math.floor(S * 2));
  } else {
    ctx.fillRect(x + Math.floor(W * 0.28), y + H - Math.floor(S * 3), Math.floor(W * 0.44), Math.floor(S * 2));
  }

  // Body (t-shirt — dark with orange accent)
  ctx.fillStyle = '#1a2a3a';
  ctx.fillRect(x + Math.floor(W * 0.2), y + Math.floor(H * 0.38), Math.floor(W * 0.6), Math.floor(H * 0.32));
  // Shirt detail
  ctx.fillStyle = C.neonOrange;
  ctx.fillRect(x + Math.floor(W * 0.4), y + Math.floor(H * 0.4), Math.floor(W * 0.2), Math.floor(S * 1.5));

  // Arms
  const armSwing = frame % 2 === 0 ? 0 : Math.floor(S);
  ctx.fillStyle = '#c8a07a';
  if (dir !== 'up') {
    ctx.fillRect(x + Math.floor(W * 0.08), y + Math.floor(H * 0.38) + armSwing, Math.floor(W * 0.14), Math.floor(H * 0.28));
    ctx.fillRect(x + Math.floor(W * 0.78), y + Math.floor(H * 0.38) - armSwing, Math.floor(W * 0.14), Math.floor(H * 0.28));
  }

  // Neck
  ctx.fillStyle = '#c8a07a';
  ctx.fillRect(x + Math.floor(W * 0.41), y + Math.floor(H * 0.26), Math.floor(W * 0.18), Math.floor(H * 0.14));

  // Head
  ctx.fillStyle = '#c8a07a';
  ctx.fillRect(x + Math.floor(W * 0.28), y + Math.floor(H * 0.05), Math.floor(W * 0.44), Math.floor(H * 0.26));

  // Hair (dark, slightly messy)
  ctx.fillStyle = '#1a0a00';
  ctx.fillRect(x + Math.floor(W * 0.28), y + Math.floor(H * 0.05), Math.floor(W * 0.44), Math.floor(H * 0.1));
  ctx.fillRect(x + Math.floor(W * 0.28), y + Math.floor(H * 0.05), Math.floor(W * 0.06), Math.floor(H * 0.14));
  ctx.fillRect(x + Math.floor(W * 0.66), y + Math.floor(H * 0.05), Math.floor(W * 0.06), Math.floor(H * 0.12));

  // Face — direction dependent
  if (dir === 'down' || dir === 'left' || dir === 'right') {
    // Eyes
    if (blinking) {
      // Blink — line
      ctx.fillStyle = '#1a0a00';
      ctx.fillRect(x + Math.floor(W * 0.36), y + Math.floor(H * 0.16), Math.floor(W * 0.1), Math.floor(S * 0.8));
      ctx.fillRect(x + Math.floor(W * 0.54), y + Math.floor(H * 0.16), Math.floor(W * 0.1), Math.floor(S * 0.8));
    } else {
      ctx.fillStyle = '#1a0a00';
      ctx.fillRect(x + Math.floor(W * 0.36), y + Math.floor(H * 0.14), Math.floor(W * 0.1), Math.floor(S * 1.5));
      ctx.fillRect(x + Math.floor(W * 0.54), y + Math.floor(H * 0.14), Math.floor(W * 0.1), Math.floor(S * 1.5));
      // Eye shine
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + Math.floor(W * 0.38), y + Math.floor(H * 0.14), Math.floor(S), Math.floor(S));
      ctx.fillRect(x + Math.floor(W * 0.56), y + Math.floor(H * 0.14), Math.floor(S), Math.floor(S));
    }
    // Mouth
    ctx.fillStyle = '#8B4020';
    ctx.fillRect(x + Math.floor(W * 0.40), y + Math.floor(H * 0.24), Math.floor(W * 0.2), Math.floor(S * 0.8));
  }
}
