import React, { useState } from 'react';

const videos = [
  { id: 'dQw4w9WgXcQ', title: 'PROJETO REEL 01', client: 'Cliente A', thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
  { id: 'dQw4w9WgXcQ', title: 'PROJETO TIKTOK 02', client: 'Cliente B', thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
  { id: 'dQw4w9WgXcQ', title: 'MOTION GRAPHIC 03', client: 'Cliente C', thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
  { id: 'dQw4w9WgXcQ', title: 'BRAND FILM 04',    client: 'Cliente D', thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
];

const px: React.CSSProperties = {
  fontFamily: '"Press Start 2P", monospace',
  imageRendering: 'pixelated',
};

export default function ComputerModal() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div style={{ ...px, color: '#e8eaf0' }}>
      <p style={{ fontSize: 7, color: '#668899', marginBottom: 20, lineHeight: 2 }}>
        Selecione um projeto para assistir:
      </p>

      {active ? (
        <div>
          <div style={{
            border: '3px solid #00e5ff',
            boxShadow: '0 0 16px #00e5ff44',
            background: '#000',
            aspectRatio: '16/9',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <iframe
              width="100%"
              height="100%"
              style={{ display: 'block', border: 'none', aspectRatio: '16/9' }}
              src={`https://www.youtube.com/embed/${active}?autoplay=1`}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              allowFullScreen
            />
            {/* Scanline on video */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.1) 2px,rgba(0,0,0,0.1) 4px)',
            }} />
          </div>
          <button
            onClick={() => setActive(null)}
            style={{
              marginTop: 14, fontSize: 8, padding: '8px 14px',
              background: 'transparent', border: '2px solid #00e5ff',
              color: '#00e5ff', cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            ← VOLTAR
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {videos.map((v, i) => (
            <button
              key={i}
              onClick={() => setActive(v.id)}
              style={{
                background: '#0d1b2a', border: '2px solid #00e5ff44',
                cursor: 'pointer', padding: 0, textAlign: 'left',
                transition: 'border-color 0.15s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#00e5ff')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#00e5ff44')}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={v.thumb}
                  alt={v.title}
                  style={{ width: '100%', display: 'block', imageRendering: 'pixelated' }}
                />
                {/* Play overlay */}
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(0,20,40,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: 0, height: 0,
                    borderStyle: 'solid',
                    borderWidth: '10px 0 10px 18px',
                    borderColor: 'transparent transparent transparent #00e5ff',
                    filter: 'drop-shadow(0 0 6px #00e5ff)',
                  }} />
                </div>
                {/* CRT overlay on thumbnail */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.12) 3px,rgba(0,0,0,0.12) 4px)',
                }} />
              </div>
              <div style={{ padding: '8px 10px' }}>
                <div style={{ fontSize: 6, color: '#00e5ff', marginBottom: 4 }}>{v.title}</div>
                <div style={{ fontSize: 6, color: '#44667788', fontFamily: 'Inter, sans-serif' }}>{v.client}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
