import PixelRoom from '@/components/PixelRoom';

const SCALE = 4;
const TILE = 16;
const COLS = 14;
const ROWS = 10;
const W = COLS * TILE * SCALE;
const H = ROWS * TILE * SCALE;

export default function Index() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: '#04090e', fontFamily: '"Press Start 2P", monospace' }}
    >
      {/* Header */}
      <div className="mb-4 text-center select-none">
        <div
          style={{
            fontSize: 11,
            color: '#ffb347',
            textShadow: '0 0 10px #ffb347, 0 0 24px #ffb34766',
            letterSpacing: 4,
            marginBottom: 6,
          }}
        >
          PEDRO OLIVEIRA
        </div>
        <div
          style={{
            fontSize: 7,
            color: '#ff6b1a88',
            letterSpacing: 3,
          }}
        >
          DESIGNER · EDITOR DE VÍDEO
        </div>
      </div>

      {/* Game canvas wrapper */}
      <div
        style={{
          position: 'relative',
          boxShadow: '0 0 60px rgba(255,107,26,0.15), 0 0 120px rgba(0,0,0,0.8)',
        }}
      >
        <PixelRoom />
      </div>

      {/* Controls HUD */}
      <div
        className="mt-4 flex items-center gap-6 select-none"
        style={{ fontSize: 7, color: '#334455', letterSpacing: 2 }}
      >
        <span><span style={{ color: '#ff6b1a' }}>WASD</span> · ANDAR</span>
        <span style={{ color: '#334455' }}>|</span>
        <span><span style={{ color: '#ff6b1a' }}>CLIQUE</span> · INTERAGIR</span>
        <span style={{ color: '#334455' }}>|</span>
        <span><span style={{ color: '#ff6b1a' }}>ESC</span> · FECHAR</span>
      </div>

      {/* Object hint strip */}
      <div
        className="mt-3 flex items-center gap-4 select-none"
        style={{ fontSize: 6, color: '#223344', letterSpacing: 1 }}
      >
        {['🖥️ COMPUTADOR', '🎨 POSTER', '📚 PRATELEIRA', '📱 CELULAR', '🏆 QUADRO'].map(o => (
          <span key={o}>{o}</span>
        ))}
      </div>
    </div>
  );
}
