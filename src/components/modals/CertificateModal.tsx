import React from 'react';

const timeline = [
  {
    year: '2024',
    title: 'Designer Freelancer',
    place: 'Autônomo',
    desc: 'Identidade visual, branding e edição de vídeo para clientes nacionais.',
    color: '#d4ac0d',
    icon: '⭐',
  },
  {
    year: '2023',
    title: 'Editor de Conteúdo',
    place: 'Agência Digital',
    desc: 'Produção de Reels, TikToks e motion graphics para marcas de médio porte.',
    color: '#ffb347',
    icon: '▷',
  },
  {
    year: '2022',
    title: 'Design Gráfico',
    place: 'Faculdade',
    desc: 'Graduação em Design Gráfico com ênfase em branding e comunicação visual.',
    color: '#ff6b1a',
    icon: '◈',
  },
  {
    year: '2021',
    title: 'Primeiros Projetos',
    place: 'Freelance',
    desc: 'Início da jornada criativa com projetos de logos e identidades visuais.',
    color: '#c8a07a',
    icon: '◌',
  },
];

const certs = [
  { name: 'Google UX Design', issuer: 'Google',   color: '#00e5ff' },
  { name: 'Motion Graphics',  issuer: 'Adobe',    color: '#ff6b1a' },
  { name: 'Branding Avançado', issuer: 'Alura',   color: '#d4ac0d' },
];

const px: React.CSSProperties = {
  fontFamily: '"Press Start 2P", monospace',
};

export default function CertificateModal() {
  return (
    <div style={{ ...px, color: '#e8eaf0' }}>
      {/* Timeline */}
      <div style={{ fontSize: 8, color: '#d4ac0d', textShadow: '0 0 8px #d4ac0d88', marginBottom: 18 }}>
        TRAJETÓRIA
      </div>

      <div style={{ position: 'relative', paddingLeft: 24 }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute', left: 8, top: 0, bottom: 0,
          width: 2, background: 'linear-gradient(to bottom, #d4ac0d, #223344)',
        }} />

        {timeline.map((item, i) => (
          <div key={i} style={{ position: 'relative', marginBottom: 20 }}>
            {/* Dot */}
            <div style={{
              position: 'absolute', left: -20, top: 4,
              width: 10, height: 10,
              background: item.color,
              boxShadow: `0 0 8px ${item.color}`,
              border: '2px solid #0a1520',
            }} />

            <div style={{
              background: '#0d1b2a',
              border: `2px solid ${item.color}33`,
              padding: '10px 12px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 7, color: item.color }}>{item.title}</span>
                <span style={{ fontSize: 7, color: item.color, textShadow: `0 0 6px ${item.color}` }}>
                  {item.year}
                </span>
              </div>
              <div style={{ fontSize: 6, color: '#aabbcc88', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>
                {item.place}
              </div>
              <p style={{ fontSize: 6, color: '#aabbcc', lineHeight: 2.2, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Certs */}
      <div style={{ fontSize: 8, color: '#d4ac0d', textShadow: '0 0 8px #d4ac0d88', margin: '20px 0 14px' }}>
        CERTIFICAÇÕES
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {certs.map(c => (
          <div key={c.name} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 12px',
            background: '#0d1b2a',
            border: `2px solid ${c.color}33`,
          }}>
            <span style={{ fontSize: 14, color: c.color }}>🏆</span>
            <div>
              <div style={{ fontSize: 6, color: c.color, marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 5, color: '#445566', fontFamily: 'Inter, sans-serif' }}>{c.issuer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
