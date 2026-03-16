import React, { useState } from 'react';

const portfolio = {
  designer: [
    { title: 'IDENTIDADE VISUAL A', client: 'Tech Corp', img: '/placeholder.svg' },
    { title: 'UI/UX APP', client: 'Startup Z', img: '/placeholder.svg' },
  ],
  editor: [
    { id: 'dQw4w9WgXcQ', title: 'BRAND FILM', client: 'Cliente A' },
    { id: 'dQw4w9WgXcQ', title: 'REELS DINÂMICO', client: 'Cliente B' },
  ]
};

const px: React.CSSProperties = { fontFamily: '"Press Start 2P", monospace', imageRendering: 'pixelated' };

export default function ComputerModal() {
  const [mode, setMode] = useState<'home' | 'designer' | 'editor'>('home');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  if (activeVideo) {
    return (
      <div style={{ ...px, color: '#e8eaf0' }}>
        <div style={{ border: '3px solid #00e5ff', background: '#000', aspectRatio: '16/9' }}>
          <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} style={{ border: 'none' }} />
        </div>
        <button onClick={() => setActiveVideo(null)} style={{ marginTop: 14, fontSize: 8, padding: '8px', background: 'transparent', border: '2px solid #ff007f', color: '#ff007f', cursor: 'pointer', fontFamily: 'inherit' }}>
          ← VOLTAR
        </button>
      </div>
    );
  }

  return (
    <div style={{ ...px, color: '#e8eaf0', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {mode === 'home' && (
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <button onClick={() => setMode('designer')} style={{ padding: '20px', background: '#1e2130', border: '2px solid #00e5ff', color: '#00e5ff', cursor: 'pointer', fontFamily: 'inherit' }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>🎨</div>
            <span style={{ fontSize: 10 }}>DESIGNER GRÁFICO</span>
          </button>
          
          <button onClick={() => setMode('editor')} style={{ padding: '20px', background: '#1e2130', border: '2px solid #ff007f', color: '#ff007f', cursor: 'pointer', fontFamily: 'inherit' }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>🎬</div>
            <span style={{ fontSize: 10 }}>EDIÇÃO DE VÍDEO</span>
          </button>
        </div>
      )}

      {mode !== 'home' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <span style={{ color: mode === 'designer' ? '#00e5ff' : '#ff007f', fontSize: 12 }}>
              {mode === 'designer' ? 'PASTA: DESIGN' : 'PASTA: EDIÇÃO'}
            </span>
            <button onClick={() => setMode('home')} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontFamily: 'inherit', fontSize: 10 }}>[X] FECHAR</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {mode === 'designer' ? 
              portfolio.designer.map((p, i) => (
                <div key={i} style={{ background: '#111', border: '1px solid #333', padding: 10 }}>
                  <img src={p.img} style={{ width: '100%', height: 80, objectFit: 'cover', opacity: 0.8 }} />
                  <div style={{ fontSize: 6, color: '#00e5ff', marginTop: 8 }}>{p.title}</div>
                </div>
              )) :
              portfolio.editor.map((v, i) => (
                <button key={i} onClick={() => setActiveVideo(v.id)} style={{ background: '#111', border: '1px solid #ff007f', padding: 10, cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ width: '100%', height: 80, background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff007f' }}>▶ PLAY</div>
                  <div style={{ fontSize: 6, color: '#ff007f', marginTop: 8 }}>{v.title}</div>
                </button>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}
