import React from 'react';

const tools = [
  { name: 'Figma',         color: '#ff6b1a', icon: '◈' },
  { name: 'Illustrator',   color: '#ff9a00', icon: '◉' },
  { name: 'Photoshop',     color: '#00e5ff', icon: '◑' },
  { name: 'Premiere Pro',  color: '#9b59b6', icon: '▷' },
  { name: 'After Effects', color: '#9b59b6', icon: '◈' },
  { name: 'CapCut',        color: '#00ff41', icon: '▸' },
];

const px: React.CSSProperties = {
  fontFamily: '"Press Start 2P", monospace',
};

export default function BookshelfModal() {
  return (
    <div style={{ ...px, color: '#e8eaf0' }}>
      {/* Avatar area */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 24 }}>
        {/* Pixel avatar */}
        <div style={{
          width: 72, height: 72, flexShrink: 0,
          background: '#0d1b2a',
          border: '3px solid #ffb347',
          boxShadow: '0 0 12px #ffb34766',
          display: 'grid',
          gridTemplateColumns: 'repeat(8,9px)',
          gridTemplateRows: 'repeat(8,9px)',
          imageRendering: 'pixelated',
          overflow: 'hidden',
        }}>
          {/* Simple pixel face grid — 8×8 */}
          {[
            0,0,2,2,2,2,0,0,
            0,2,2,2,2,2,2,0,
            0,1,1,2,2,1,1,0,
            0,1,3,2,2,3,1,0,
            0,2,2,2,2,2,2,0,
            0,2,4,2,2,4,2,0,
            0,2,2,4,4,2,2,0,
            0,0,2,2,2,2,0,0,
          ].map((v, i) => (
            <div key={i} style={{
              background: v === 0 ? 'transparent' : v === 1 ? '#1a0a00' : v === 2 ? '#c8a07a' : v === 3 ? '#2a1a0a' : '#8B4020',
            }} />
          ))}
        </div>

        <div>
          <div style={{ fontSize: 9, color: '#ffb347', textShadow: '0 0 8px #ffb34788', marginBottom: 8 }}>
            PEDRO OLIVEIRA
          </div>
          <div style={{ fontSize: 7, color: '#ff6b1a', marginBottom: 12 }}>
            Designer & Editor de Vídeo
          </div>
          <p style={{ fontSize: 6, color: '#aabbcc', lineHeight: 2.4, fontFamily: 'Inter, sans-serif', margin: 0 }}>
            Criando experiências visuais autênticas há mais de 3 anos. Especialista em identidade visual e edição de conteúdo para redes sociais.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '2px solid #223344', marginBottom: 20 }} />

      {/* Skills */}
      <div style={{ fontSize: 8, color: '#ffb347', marginBottom: 14 }}>FERRAMENTAS</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {tools.map(t => (
          <div key={t.name} style={{
            background: '#0d1b2a',
            border: `2px solid ${t.color}44`,
            padding: '10px 8px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 18, marginBottom: 4, color: t.color }}>{t.icon}</div>
            <div style={{ fontSize: 6, color: t.color, textShadow: `0 0 6px ${t.color}66` }}>{t.name}</div>
          </div>
        ))}
      </div>

      {/* Specialties */}
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 8, color: '#ffb347', marginBottom: 14 }}>ESPECIALIDADES</div>
        {['Identidade Visual', 'Edição para Reels/TikTok', 'Motion Graphics', 'Branding Estratégico'].map(s => (
          <div key={s} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            marginBottom: 8, fontSize: 6, color: '#aabbcc',
            fontFamily: 'Inter, sans-serif',
          }}>
            <span style={{ color: '#ff6b1a' }}>▸</span>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
