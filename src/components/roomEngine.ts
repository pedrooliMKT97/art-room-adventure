import type { DrawRoomParams, DrawCharParams } from './gameTypes';

// ─── Interactive objects definition ────────────────────────────────────────
export const OBJECTS = [
  // Computador na mesa — movido para tx:2 devido ao 16:9
  { id: 'computer', modal: 'computer', tx: 2, ty: 1, tw: 4, th: 2, solid: true, label: 'COMPUTADOR' },
  // Poster — parede central
  { id: 'poster', modal: 'poster', tx: 7, ty: 1, tw: 3, th: 2, solid: false, label: 'POSTER' },
  // Quadro de Experiências — parede esquerda
  { id: 'certificate', modal: 'certificate', tx: 0, ty: 3, tw: 2, th: 2, solid: false, label: 'EXPERIÊNCIAS' },
  // Prateleira — parede direita
  { id: 'bookshelf', modal: 'bookshelf', tx: 13, ty: 1, tw: 2, th: 4, solid: true, label: 'PRATELEIRA' },
  // Celular na mesinha — canto inferior direito
  { id: 'phone', modal: 'phone', tx: 12, ty: 5, tw: 2, th: 2, solid: true, label: 'CELULAR' },
] as const;

// Nova proporção 16:9
export const ROOM_CONFIG = { cols: 16, rows: 9 };

// ─── Color palette Gamer Clean ──────────────────────────────────────────────
const C = {
  nightDeep:   '#090a0f',
  nightMid:    '#11131a',
  wallTop:     '#161925',
  wallSide:    '#0f111a',
  floorA:      '#13151f',
  floorB:      '#161925',
  deskSurface: '#1e2130',
  monitorDark: '#0a0f14',
  neonMagenta: '#ff007f', 
  neonCyan:    '#00e5ff', 
  chairBase:   '#2a2d3d',
  chairAccent: '#ff007f', 
  bookRed:     '#ff007f',
  bookBlue:    '#00e5ff',
  bookGreen:   '#00ff41',
  bookYellow:  '#ffb347',
  posterPurp:  '#6c3483',
  certGold:    '#00e5ff',
  plantGreen:  '#2ecc71',
  rugA:        '#0d0f17',
  rugB:        '#10121a',
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
    for (let col = 4; col < 12; col++) {
      ctx.fillStyle = (row + col) % 2 === 0 ? C.rugA : C.rugB;
      ctx.fillRect(col * T * S, row * T * S, T * S, T * S);
    }
  }
  // Rug border
  ctx.strokeStyle = C.neonCyan;
  ctx.globalAlpha = 0.2;
  ctx.lineWidth = S;
  ctx.strokeRect(4 * T * S + S/2, 4 * T * S + S/2, 8 * T * S - S, 4 * T * S - S);
  ctx.globalAlpha = 1.0;

  // ── Back wall (top) ──
  ctx.fillStyle = C.wallTop;
  ctx.fillRect(0, 0, W, 2 * T * S);

  // ── Side walls ──
  ctx.fillStyle = C.wallSide;
  ctx.fillRect(0, 0, T * S, H);               
  ctx.fillRect(W - T * S, 0, T * S, H);       

  // ── Floor wall strip ──
  ctx.fillStyle = '#0a0c12';
  ctx.fillRect(0, H - T * S, W, T * S);

  // ── Baseboard ──
  ctx.fillStyle = '#1c2030';
  ctx.fillRect(T * S, 2 * T * S, W - 2 * T * S, Math.floor(S * 1.5));
  ctx.fillRect(T * S, H - T * S, W - 2 * T * S, Math.floor(S * 1.5));

  // ── NEON SIGN ──
  drawNeonSign(ctx, T, S, ts);

  // ── Desk (Gamer Setup) ──
  drawDesk(ctx, T, S, ts, state.cpuBlink);

  // ── Poster ──
  drawPoster(ctx, T, S);

  // ── Certificate frame (Experiências) ──
  drawCertificate(ctx, T, S);

  // ── Bookshelf ──
  drawBookshelf(ctx, T, S);

  // ── Plant ──
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
  const x = 6 * T * S;
  const y = Math.floor(0.3 * T * S);
  const w = 5 * T * S;
  const h = Math.floor(1.2 * T * S);
  const glow = 0.7 + 0.3 * Math.sin(ts / 600);

  // Background panel
  ctx.fillStyle = '#050608';
  ctx.fillRect(x, y, w, h);

  // Outer neon border glow
  ctx.shadowColor = `rgba(0,229,255,${glow})`;
  ctx.shadowBlur = 12 * S / 4;
  ctx.strokeStyle = `rgba(0,229,255,${glow})`;
  ctx.lineWidth = Math.floor(S / 2);
  ctx.strokeRect(x + Math.floor(S/2), y + Math.floor(S/2), w - S, h - S);
  ctx.shadowBlur = 0;

  // Text
  const fontSize = Math.floor(T * S * 0.28);
  ctx.font = `${fontSize}px "Press Start 2P", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  ctx.shadowColor = `rgba(255,0,127,${glow * 0.9})`;
  ctx.shadowBlur = 10 * S / 4;
  ctx.fillStyle = `rgba(255,100,180,${glow})`;
  ctx.fillText('Crio Experiências', x + w / 2, y + h * 0.38);
  
  ctx.shadowColor = `rgba(0,229,255,${glow})`;
  ctx.fillStyle = `rgba(0,229,255,${glow})`;
  ctx.fillText('AUTÊNTICAS', x + w / 2, y + h * 0.72);
  
  ctx.shadowBlur = 0;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}

// ─── Desk + Computer Gamer ──────────────────────────────────────────────────
function drawDesk(ctx: CanvasRenderingContext2D, T: number, S: number, ts: number, cpuBlink: boolean) {
  const dx = 2 * T * S; 
  const dy = 1 * T * S;
  const dw = 4 * T * S;
  const dh = T * S;

  // Mesa Clean (Preta/Cinza escuro)
  ctx.fillStyle = C.deskSurface;
  ctx.fillRect(dx, dy + Math.floor(T * S * 0.5), dw, dh);
  
  // Fita LED na borda da mesa (animação de RGB suave)
  const hue = (ts / 20) % 360;
  ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.fillRect(dx, dy + Math.floor(T * S * 0.5) + dh, dw, Math.floor(S * 1.5));

  // Pés da mesa
  ctx.fillStyle = '#111';
  ctx.fillRect(dx + S, dy + T * S + dh - S, S * 3, S * 3);
  ctx.fillRect(dx + dw - S * 4, dy + T * S + dh - S, S * 3, S * 3);

  // Monitor Ultrawide
  const mx = dx + Math.floor(T * S * 0.5);
  const my = dy - Math.floor(T * S * 0.4);
  const mw = 3 * T * S;
  const mh = Math.floor(T * S * 1.1);
  
  // Base do monitor
  ctx.fillStyle = '#111';
  ctx.fillRect(mx + mw / 2 - S * 2, my + mh, S * 4, S * 2);
  ctx.fillRect(mx + mw / 2 - S * 4, my + mh + S * 2, S * 8, S);

  // Moldura
  ctx.fillStyle = '#0a0a0c';
  ctx.fillRect(mx, my, mw, mh);
  
  // Tela ligada (Cyan Glow)
  ctx.fillStyle = '#05121f';
  ctx.fillRect(mx + S, my + S, mw - S * 2, mh - S * 2);
  const screenGlow = 0.8 + 0.2 * Math.sin(ts / 800);
  ctx.fillStyle = `rgba(0, 229, 255, ${screenGlow * 0.15})`;
  ctx.fillRect(mx + S, my + S, mw - S * 2, mh - S * 2);
  
  // Interface Clean na tela
  ctx.fillStyle = C.neonCyan;
  ctx.fillRect(mx + S * 3, my + S * 3, mw * 0.3, S);
  ctx.fillRect(mx + S * 3, my + S * 5, mw * 0.5, S);
  ctx.fillStyle = C.neonMagenta;
  ctx.fillRect(mx + S * 3, my + S * 8, mw * 0.2, S);

  // CPU Gamer (Vidro e RGB)
  const cx = dx + dw - Math.floor(T * S * 1.1);
  const cy = dy + Math.floor(T * S * 0.5) - S * 3;
  const cw = Math.floor(T * S * 1.1);
  const ch = Math.floor(T * S * 1.4);
  
  ctx.fillStyle = '#151515';
  ctx.fillRect(cx, cy, cw, ch);
  // Vidro temperado mostrando a RAM/GPU RGB
  ctx.fillStyle = 'rgba(0,229,255,0.1)';
  ctx.fillRect(cx + S, cy + S, cw - S * 2, ch - S * 2);
  
  // Peças internas piscando
  ctx.fillStyle = `hsl(${(hue + 180) % 360}, 100%, 50%)`;
  ctx.fillRect(cx + S * 3, cy + S * 3, S * 2, S * 5); // Placa de vídeo
  ctx.fillStyle = cpuBlink ? C.neonMagenta : '#33001a';
  ctx.fillRect(cx + S * 7, cy + S * 2, S, S * 3); // RAM

  // Teclado mecânico
  ctx.fillStyle = '#111';
  ctx.fillRect(dx + Math.floor(S * 4), dy + Math.floor(T * S * 0.7), Math.floor(T * S * 1.6), Math.floor(S * 1.5));
  ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.fillRect(dx + Math.floor(S * 4), dy + Math.floor(T * S * 0.7) + S, Math.floor(T * S * 1.6), Math.floor(S * 0.5));

  // Cadeira Gamer (Desenhada por trás da mesa)
  const chX = dx + T * S * 1.5;
  const chY = dy + T * S * 1.1;
  
  ctx.fillStyle = C.chairBase;
  ctx.fillRect(chX, chY, T * S, T * S * 1.5);
  // Detalhes da cadeira (Acentos Magenta)
  ctx.fillStyle = C.chairAccent;
  ctx.fillRect(chX + S * 2, chY + S * 2, T * S - S * 4, S * 2); // Almofada pescoço
  ctx.fillRect(chX + S, chY + T * S * 0.7, S * 2, S * 6); // Abas laterais esq
  ctx.fillRect(chX + T * S - S * 3, chY + T * S * 0.7, S * 2, S * 6); // Abas laterais dir
}

// ─── Poster ─────────────────────────────────────────────────────────────────
function drawPoster(ctx: CanvasRenderingContext2D, T: number, S: number) {
  const px = 7 * T * S + Math.floor(S * 2);
  const py = Math.floor(T * S * 0.15);
  const pw = 2 * T * S + Math.floor(S * 4);
  const ph = Math.floor(T * S * 1.6);

  ctx.fillStyle = '#222';
  ctx.fillRect(px - S, py - S, pw + S * 2, ph + S * 2);
  
  ctx.fillStyle = '#0a0a0c';
  ctx.fillRect(px, py, pw, ph);
  
  ctx.fillStyle = C.neonMagenta;
  ctx.fillRect(px + S * 2, py + S * 2, pw - S * 4, Math.floor(ph * 0.4));
  ctx.fillStyle = C.neonCyan;
  
  const circR = Math.floor(pw * 0.2);
  ctx.beginPath();
  ctx.arc(px + pw / 2, py + ph * 0.65, circR, 0, Math.PI * 2);
  ctx.fill();
}

// ─── Certificate (Experiências) ──────────────────────────────────────────────
function drawCertificate(ctx: CanvasRenderingContext2D, T: number, S: number) {
  const cx = Math.floor(S * 6);
  const cy = 3 * T * S;
  const cw = 2 * T * S - Math.floor(S * 4);
  const ch = 2 * T * S - Math.floor(S * 2);

  ctx.fillStyle = C.certGold;
  ctx.fillRect(cx - S, cy - S, cw + S * 2, ch + S * 2);
  ctx.fillStyle = '#0a0a0c';
  ctx.fillRect(cx, cy, cw, ch);
  
  ctx.fillStyle = C.certGold;
  ctx.fillRect(cx + S * 2, cy + S * 3, cw - S * 4, Math.floor(S * 1));
  ctx.fillStyle = C.neonMagenta;
  ctx.fillRect(cx + S * 3, cy + S * 6, cw - S * 6, Math.floor(S * 0.8));
  ctx.fillRect(cx + S * 3, cy + S * 8, cw - S * 6, Math.floor(S * 0.8));
  
  ctx.fillStyle = C.neonCyan;
  ctx.beginPath();
  ctx.arc(cx + cw / 2, cy + ch - S * 3, S * 2, 0, Math.PI * 2);
  ctx.fill();
}

// ─── Bookshelf ───────────────────────────────────────────────────────────────
function drawBookshelf(ctx: CanvasRenderingContext2D, T: number, S: number) {
  const bx = 13 * T * S + Math.floor(S * 2);
  const by = T * S + Math.floor(S * 1);
  const bw = 2 * T * S - Math.floor(S * 4);
  const bh = 4 * T * S - Math.floor(S * 2);

  ctx.fillStyle = '#11131a';
  ctx.fillRect(bx, by, bw, bh);
  ctx.fillStyle = '#1c2030';
  ctx.fillRect(bx, by, bw, Math.floor(S * 1.5));

  const shelfColors = [C.bookRed, C.bookBlue, C.bookGreen, C.bookYellow];
  const shelfCount = 3;
  const shelfH = Math.floor((bh - S * 3) / shelfCount);
  
  for (let s = 0; s < shelfCount; s++) {
    const sy = by + S + s * shelfH;
    ctx.fillStyle = '#1c2030';
    ctx.fillRect(bx, sy + shelfH - Math.floor(S * 1), bw, Math.floor(S * 1.5));
    
    let bookX = bx + Math.floor(S * 1);
    for (let b = 0; b < 4; b++) {
      const bkW = Math.floor(S * (1.8 + (b % 2) * 0.8));
      const bkH = Math.floor(shelfH * (0.5 + (b % 3) * 0.15));
      ctx.fillStyle = shelfColors[(s * 4 + b) % shelfColors.length];
      ctx.fillRect(bookX, sy + shelfH - Math.floor(S * 1) - bkH, bkW, bkH);
      bookX += bkW + Math.floor(S * 0.5);
    }
  }
}

// ─── Plant ───────────────────────────────────────────────────────────────────
function drawPlant(ctx: CanvasRenderingContext2D, T: number, S: number) {
  const px = 11 * T * S + Math.floor(S * 4);
  const py = 5 * T * S;

  ctx.fillStyle = '#111';
  ctx.fillRect(px, py + S * 4, S * 8, S * 6);
  ctx.fillStyle = '#222';
  ctx.fillRect(px - S, py + S * 3, S * 10, S * 2);

  ctx.fillStyle = C.plantGreen;
  ctx.fillRect(px + S * 2, py - S * 2, S * 5, S * 4);
  ctx.fillRect(px, py, S * 4, S * 3);
  ctx.fillRect(px + S * 4, py, S * 4, S * 3);
  ctx.fillStyle = '#27ae60';
  ctx.fillRect(px + S * 3, py - S * 4, S * 3, S * 3);
}

// ─── Phone on side table ─────────────────────────────────────────────────────
function drawPhone(ctx: CanvasRenderingContext2D, T: number, S: number) {
  const tx = 13 * T * S + S * 2;
  const ty = 6 * T * S + S * 2;
  const tw = 2 * T * S - S * 4;
  const th = T * S;
  
  ctx.fillStyle = '#1c2030';
  ctx.fillRect(tx, ty + Math.floor(th * 0.6), tw, Math.floor(th * 0.4));
  ctx.fillStyle = '#2a2d3d';
  ctx.fillRect(tx, ty + Math.floor(th * 0.6), tw, S * 2);
  
  ctx.fillStyle = '#111';
  ctx.fillRect(tx + S, ty + th, S * 2, S * 4);
  ctx.fillRect(tx + tw - S * 3, ty + th, S * 2, S * 4);

  const px = tx + Math.floor((tw - S * 6) / 2);
  const py = ty + S * 2;
  ctx.fillStyle = '#0a0a0c';
  ctx.fillRect(px, py, S * 6, Math.floor(th * 0.55));
  
  ctx.fillStyle = C.neonMagenta;
  ctx.fillRect(px + S, py + Math.floor(S * 0.5), S * 4, Math.floor(th * 0.55) - S * 2);
}

// ─── Window with curtain ─────────────────────────────────────────────────────
function drawWindow(ctx: CanvasRenderingContext2D, T: number, S: number, curtainOffset: number) {
  const wx = 10 * T * S;
  const wy = Math.floor(T * S * 0.1);
  const ww = 2 * T * S;
  const wh = Math.floor(T * S * 1.6);

  ctx.fillStyle = '#111';
  ctx.fillRect(wx - S * 2, wy, ww + S * 4, wh);
  ctx.fillStyle = '#020408';
  ctx.fillRect(wx, wy + S, ww, wh - S * 2);

  const stars = [[5,8],[12,15],[20,6],[28,18],[8,22]];
  ctx.fillStyle = 'rgba(0,229,255,0.8)';
  for (const [sx, sy] of stars) {
    ctx.fillRect(wx + sx * S / 4, wy + sy * S / 4, Math.floor(S * 0.6), Math.floor(S * 0.6));
  }
  
  ctx.fillStyle = C.neonMagenta;
  ctx.beginPath();
  ctx.arc(wx + ww * 0.7, wy + wh * 0.3, S * 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0f0f15';
  const co = Math.floor(curtainOffset);
  ctx.fillRect(wx - S * 2, wy, S * 5 + co, wh);
  ctx.fillRect(wx + ww - S * 3 - co, wy, S * 5 + co, wh);
  
  ctx.fillStyle = '#222';
  ctx.fillRect(wx - S * 3, wy - S, ww + S * 6, S);
}

// ─── Lamp ────────────────────────────────────────────────────────────────────
function drawLamp(ctx: CanvasRenderingContext2D, T: number, S: number, ts: number) {
  const lx = 9 * T * S;
  const ly = 7 * T * S;

  ctx.fillStyle = '#111';
  ctx.fillRect(lx + S * 3, ly - S * 6, S * 2, S * 6);
  ctx.fillRect(lx + S, ly, S * 6, S);

  ctx.fillStyle = '#222';
  ctx.fillRect(lx, ly - S * 9, S * 8, S * 3);
  
  const glow = 0.3 + 0.1 * Math.sin(ts / 1000);
  const grad = ctx.createRadialGradient(lx + S * 4, ly - S * 4, 0, lx + S * 4, ly - S * 4, S * 12);
  grad.addColorStop(0, `rgba(255,0,127,${glow})`);
  grad.addColorStop(1, 'rgba(255,0,127,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(lx - S * 8, ly - S * 12, S * 24, S * 16);
}

// ─── Draw Character ──────────────────────────────────────────────────────────
export function drawCharacter(ctx: CanvasRenderingContext2D, p: DrawCharParams & { sitting?: boolean }) {
  const { x, y, scale: S, tile: T, dir, frame, blinking, sitting } = p;
  const W = 2 * T * S;
  const H = 2 * T * S;

  // Se estiver sentado, o personagem fica um pouco mais baixo na cadeira
  const drawY = sitting ? y + Math.floor(S * 3) : y;

  // Sombra (escondida ou menor se estiver sentado)
  if (!sitting) {
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(x + Math.floor(W * 0.2), drawY + H - Math.floor(S * 2), Math.floor(W * 0.6), Math.floor(S * 2));
  }

  // Animação das pernas (Não desenha se estiver sentado na mesa)
  if (!sitting) {
    const legOff = frame % 2 === 0 ? 0 : S;
    const legColors = ['#0a1128', '#070b1a'];

    if (dir === 'down' || dir === 'up') {
      ctx.fillStyle = legColors[0];
      ctx.fillRect(x + Math.floor(W * 0.28), drawY + Math.floor(H * 0.65) + legOff, Math.floor(W * 0.2), Math.floor(H * 0.3));
      ctx.fillStyle = legColors[1];
      ctx.fillRect(x + Math.floor(W * 0.52), drawY + Math.floor(H * 0.65) - legOff, Math.floor(W * 0.2), Math.floor(H * 0.3));
    } else {
      ctx.fillStyle = legColors[0];
      ctx.fillRect(x + Math.floor(W * 0.3), drawY + Math.floor(H * 0.65) + legOff, Math.floor(W * 0.4), Math.floor(H * 0.3));
    }

    // Sapatos
    ctx.fillStyle = '#050505';
    if (dir === 'down' || dir === 'up') {
      ctx.fillRect(x + Math.floor(W * 0.22), drawY + H - Math.floor(S * 3), Math.floor(W * 0.26), Math.floor(S * 2));
      ctx.fillRect(x + Math.floor(W * 0.52), drawY + H - Math.floor(S * 3), Math.floor(W * 0.26), Math.floor(S * 2));
    } else {
      ctx.fillRect(x + Math.floor(W * 0.28), drawY + H - Math.floor(S * 3), Math.floor(W * 0.44), Math.floor(S * 2));
    }
  }

  // Corpo (Camiseta escura com acento cyan)
  ctx.fillStyle = '#1a1a24';
  ctx.fillRect(x + Math.floor(W * 0.2), drawY + Math.floor(H * 0.38), Math.floor(W * 0.6), Math.floor(H * 0.32));
  ctx.fillStyle = C.neonCyan;
  ctx.fillRect(x + Math.floor(W * 0.4), drawY + Math.floor(H * 0.4), Math.floor(W * 0.2), Math.floor(S * 1.5));

  // Braços
  const armSwing = (frame % 2 === 0 && !sitting) ? 0 : Math.floor(S);
  ctx.fillStyle = '#c8a07a';
  if (dir !== 'up') {
    ctx.fillRect(x + Math.floor(W * 0.08), drawY + Math.floor(H * 0.38) + armSwing, Math.floor(W * 0.14), Math.floor(H * 0.28));
    ctx.fillRect(x + Math.floor(W * 0.78), drawY + Math.floor(H * 0.38) - armSwing, Math.floor(W * 0.14), Math.floor(H * 0.28));
  }

  // Pescoço
  ctx.fillStyle = '#c8a07a';
  ctx.fillRect(x + Math.floor(W * 0.41), drawY + Math.floor(H * 0.26), Math.floor(W * 0.18), Math.floor(H * 0.14));

  // Cabeça
  ctx.fillStyle = '#c8a07a';
  ctx.fillRect(x + Math.floor(W * 0.28), drawY + Math.floor(H * 0.05), Math.floor(W * 0.44), Math.floor(H * 0.26));

  // Cabelo
  ctx.fillStyle = '#0a0500';
  ctx.fillRect(x + Math.floor(W * 0.28), drawY + Math.floor(H * 0.05), Math.floor(W * 0.44), Math.floor(H * 0.1));
  ctx.fillRect(x + Math.floor(W * 0.28), drawY + Math.floor(H * 0.05), Math.floor(W * 0.06), Math.floor(H * 0.14));
  ctx.fillRect(x + Math.floor(W * 0.66), drawY + Math.floor(H * 0.05), Math.floor(W * 0.06), Math.floor(H * 0.12));

  // Rosto
  if (dir === 'down' || dir === 'left' || dir === 'right') {
    if (blinking) {
      ctx.fillStyle = '#0a0500';
      ctx.fillRect(x + Math.floor(W * 0.36), drawY + Math.floor(H * 0.16), Math.floor(W * 0.1), Math.floor(S * 0.8));
      ctx.fillRect(x + Math.floor(W * 0.54), drawY + Math.floor(H * 0.16), Math.floor(W * 0.1), Math.floor(S * 0.8));
    } else {
      ctx.fillStyle = '#0a0500';
      ctx.fillRect(x + Math.floor(W * 0.36), drawY + Math.floor(H * 0.14), Math.floor(W * 0.1), Math.floor(S * 1.5));
      ctx.fillRect(x + Math.floor(W * 0.54), drawY + Math.floor(H * 0.14), Math.floor(W * 0.1), Math.floor(S * 1.5));
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + Math.floor(W * 0.38), drawY + Math.floor(H * 0.14), Math.floor(S), Math.floor(S));
      ctx.fillRect(x + Math.floor(W * 0.56), drawY + Math.floor(H * 0.14), Math.floor(S), Math.floor(S));
    }
    ctx.fillStyle = '#8B4020';
    ctx.fillRect(x + Math.floor(W * 0.40), drawY + Math.floor(H * 0.24), Math.floor(W * 0.2), Math.floor(S * 0.8));
  }
}
