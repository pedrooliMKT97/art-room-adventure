import React, { useEffect, useRef, useState, useCallback } from 'react';
import PixelModal from './PixelModal';
import { OBJECTS, drawRoom, drawCharacter } from './roomEngine';
import type { GameState, ModalType } from './gameTypes';

const SCALE = 4;
const TILE = 16;
const COLS = 16; // Atualizado para 16:9
const ROWS = 9;  // Atualizado para 16:9
const W = COLS * TILE * SCALE;
const H = ROWS * TILE * SCALE;

export default function PixelRoom() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Adicionamos o "sitting" no tipo para o TypeScript não reclamar
  const stateRef = useRef<GameState & { sitting: boolean }>({
    x: 6 * TILE * SCALE,
    y: 5 * TILE * SCALE,
    dir: 'down',
    moving: false,
    frame: 0,
    blinkTimer: 0,
    blinking: false,
    animTimer: 0,
    keys: { w: false, a: false, s: false, d: false },
    curtainOffset: 0,
    cpuBlink: true,
    cpuBlinkTimer: 0,
    sitting: false, // Inicia em pé
  });
  
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [hoverObject, setHoverObject] = useState<string | null>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const openModal = useCallback((type: ModalType) => setActiveModal(type), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  // Key handlers
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (activeModal) { if (e.key === 'Escape') closeModal(); return; }
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') stateRef.current.keys.w = true;
      if (k === 'a' || k === 'arrowleft') stateRef.current.keys.a = true;
      if (k === 's' || k === 'arrowdown') stateRef.current.keys.s = true;
      if (k === 'd' || k === 'arrowright') stateRef.current.keys.d = true;
    };
    const up = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') stateRef.current.keys.w = false;
      if (k === 'a' || k === 'arrowleft') stateRef.current.keys.a = false;
      if (k === 's' || k === 'arrowdown') stateRef.current.keys.s = false;
      if (k === 'd' || k === 'arrowright') stateRef.current.keys.d = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, [activeModal, closeModal]);

  // Canvas click → check object hit
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeModal) return;
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    for (const obj of OBJECTS) {
      const ox = obj.tx * TILE * SCALE;
      const oy = obj.ty * TILE * SCALE;
      const ow = obj.tw * TILE * SCALE;
      const oh = obj.th * TILE * SCALE;
      if (mx >= ox && mx <= ox + ow && my >= oy && my <= oy + oh) {
        
        // Se for o computador, faz o personagem sentar na cadeira
        if (obj.id === 'computer') {
          stateRef.current.x = (obj.tx + 1) * TILE * SCALE;
          stateRef.current.y = (obj.ty + 0.5) * TILE * SCALE;
          stateRef.current.dir = 'up';
          stateRef.current.sitting = true;
        }
        
        openModal(obj.modal as ModalType);
        return;
      }
    }
  }, [activeModal, openModal]);

  // Mouse move → hover detection
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeModal) return;
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let found: string | null = null;
    for (const obj of OBJECTS) {
      const ox = obj.tx * TILE * SCALE;
      const oy = obj.ty * TILE * SCALE;
      const ow = obj.tw * TILE * SCALE;
      const oh = obj.th * TILE * SCALE;
      if (mx >= ox && mx <= ox + ow && my >= oy && my <= oy + oh) {
        found = obj.id;
        break;
      }
    }
    setHoverObject(found);
  }, [activeModal]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const SPEED = 2;
    const CHAR_W = 2 * TILE * SCALE;
    const CHAR_H = 2 * TILE * SCALE;
    const WALL = TILE * SCALE;

    const loop = (ts: number) => {
      const dt = Math.min(ts - (lastTimeRef.current || ts), 50);
      lastTimeRef.current = ts;
      const s = stateRef.current;

      // Movement
      let dx = 0, dy = 0;
      if (s.keys.w) { dy = -SPEED; s.dir = 'up'; }
      if (s.keys.s) { dy = SPEED; s.dir = 'down'; }
      if (s.keys.a) { dx = -SPEED; s.dir = 'left'; }
      if (s.keys.d) { dx = SPEED; s.dir = 'right'; }
      s.moving = dx !== 0 || dy !== 0;

      // Se começar a andar, levanta da cadeira
      if (s.moving && s.sitting) {
        s.sitting = false;
        // Joga o boneco um pouquinho pra trás pra não travar na mesa quando levantar
        s.y += TILE * SCALE; 
      }

      // Collision with walls
      let nx = s.x + dx;
      let ny = s.y + dy;
      const minX = WALL;
      const maxX = W - WALL - CHAR_W;
      const minY = WALL * 2;
      const maxY = H - WALL - CHAR_H;
      nx = Math.max(minX, Math.min(maxX, nx));
      ny = Math.max(minY, Math.min(maxY, ny));

      // Collision with solid objects (Ignora se estiver sentado)
      if (!s.sitting) {
        for (const obj of OBJECTS) {
          if (!obj.solid) continue;
          const ox = obj.tx * TILE * SCALE;
          const oy = obj.ty * TILE * SCALE;
          const ow = obj.tw * TILE * SCALE;
          const oh = obj.th * TILE * SCALE;
          
          if (nx < ox + ow && nx + CHAR_W > ox && ny < oy + oh && ny + CHAR_H > oy) {
            nx = s.x;
          }
          if (s.x < ox + ow && s.x + CHAR_W > ox && ny < oy + oh && ny + CHAR_H > oy) {
            ny = s.y;
          }
        }
      }

      s.x = nx;
      s.y = ny;

      // Walk frame
      s.animTimer += dt;
      if (s.moving && s.animTimer > 150) {
        s.frame = (s.frame + 1) % 4;
        s.animTimer = 0;
      }
      if (!s.moving) s.frame = 0;

      // Blink
      s.blinkTimer += dt;
      if (!s.blinking && s.blinkTimer > 3000 + Math.random() * 1500) {
        s.blinking = true;
        s.blinkTimer = 0;
      }
      if (s.blinking && s.blinkTimer > 150) {
        s.blinking = false;
        s.blinkTimer = 0;
      }

      // CPU blink
      s.cpuBlinkTimer += dt;
      if (s.cpuBlinkTimer > 800) {
        s.cpuBlink = !s.cpuBlink;
        s.cpuBlinkTimer = 0;
      }

      // Curtain wave
      s.curtainOffset = Math.sin(ts / 1200) * 2;

      // Draw
      ctx.clearRect(0, 0, W, H);
      drawRoom(ctx, { scale: SCALE, tile: TILE, cols: COLS, rows: ROWS, ts, state: s });
      
      // Passa a flag sitting para o drawCharacter
      drawCharacter(ctx, { x: s.x, y: s.y, scale: SCALE, tile: TILE, dir: s.dir, frame: s.frame, blinking: s.blinking, sitting: s.sitting });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative" style={{ width: W, height: H }}>
      {/* CRT scanline overlay */}
      <div className="crt-overlay absolute inset-0 pointer-events-none z-10" />

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        style={{
          cursor: hoverObject ? 'pointer' : 'default',
          display: 'block',
        }}
        className="relative z-0"
      />

      {/* Object hover tooltips */}
      {hoverObject && !activeModal && (
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 font-pixel text-[8px] z-20 pointer-events-none animate-float"
          style={{
            color: 'hsl(var(--neon-cyan, #00e5ff))',
            textShadow: '0 0 8px #00e5ff',
            backgroundColor: 'rgba(9,10,15,0.85)',
            border: '2px solid #00e5ff',
            padding: '6px 12px',
            letterSpacing: '1px',
          }}
        >
          [CLIQUE PARA INTERAGIR]
        </div>
      )}

      {/* Modal overlay */}
      {activeModal && (
        <PixelModal type={activeModal} onClose={closeModal} />
      )}
    </div>
  );
}
