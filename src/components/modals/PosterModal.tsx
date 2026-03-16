import React, { useState } from 'react';

const projects = [
  {
    id: 1, title: 'MARCA ORGÂNICA',
    tags: ['Logotipo', 'Paleta', 'Tipografia'],
    color: '#ff6b1a',
    desc: 'Identidade visual completa para marca de produtos naturais. Conceito baseado em formas orgânicas e tipografia manuscrita.',
  },
  {
    id: 2, title: 'TECH STARTUP',
    tags: ['Branding', 'UI Kit', 'Ícones'],
    color: '#00e5ff',
    desc: 'Sistema de identidade para startup de tecnologia. Paleta monocromática com acento neon para reforçar modernidade.',
  },
  {
    id: 3, title: 'FOOD & CO.',
    tags: ['Embalagem', 'Logo', 'Estacionário'],
    color: '#ffb347',
    desc: 'Identidade gastronômica com foco em texturas artesanais e cores terrosas, aplicada em embalagens e papelaria.',
  },
  {
    id: 4, title: 'SPORT CLUB',
    tags: ['Escudo', 'Motion', 'Uniforme'],
    color: '#d4ac0d',
    desc: 'Redesign de identidade esportiva. Escudo modernizado, tipografia bold e sistema de cores aplicado a uniformes.',
  },
];

const px: React.CSSProperties = {
  fontFamily: '"Press Start 2P", monospace',
};

// Placeholder pixel art thumbnails as SVG data URIs
function ProjectThumb({ color, title }: { color: string; title: string }) {
  return (
    <div style={{
      background: '#0a1520',
      border: `2px solid ${color}44`,
      aspectRatio: '4/3',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 6,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Pixel art decorative blocks */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,8px)', gap: 2 }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 8, height: 8,
              background: i % 3 === 0 ? color : i % 3 === 1 ? `${color}44` : '#0f1f30',
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: 6, color, textAlign: 'center', lineHeight: 2, padding: '0 4px' }}>
        {title}
      </div>
      {/* coming soon badge */}
      <div style={{
        position: 'absolute', bottom: 4, right: 4,
        fontSize: 5, color: '#445566', fontFamily: 'inherit',
        background: '#060e1a', padding: '2px 4px',
        border: '1px solid #223344',
      }}>
        EM BREVE
      </div>
    </div>
  );
}

export default function PosterModal() {
  const [active, setActive] = useState<typeof projects[0] | null>(null);

  return (
    <div style={{ ...px, color: '#e8eaf0' }}>
      <p style={{ fontSize: 7, color: '#668899', marginBottom: 20, lineHeight: 2 }}>
        Projetos de identidade visual:
      </p>

      {active ? (
        <div>
          <ProjectThumb color={active.color} title={active.title} />
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 9, color: active.color, marginBottom: 10, textShadow: `0 0 8px ${active.color}` }}>
              {active.title}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {active.tags.map(t => (
                <span key={t} style={{
                  fontSize: 6, padding: '4px 8px',
                  border: `1px solid ${active.color}88`,
                  color: active.color, background: `${active.color}11`,
                }}>
                  {t}
                </span>
              ))}
            </div>
            <p style={{ fontSize: 7, color: '#aabbcc', lineHeight: 2.2, fontFamily: 'Inter, sans-serif' }}>
              {active.desc}
            </p>
          </div>
          <button
            onClick={() => setActive(null)}
            style={{
              marginTop: 16, fontSize: 8, padding: '8px 14px',
              background: 'transparent', border: `2px solid ${active.color}`,
              color: active.color, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            ← VOLTAR
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {projects.map(p => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              style={{
                background: 'transparent', border: 'none',
                cursor: 'pointer', padding: 0, textAlign: 'left',
              }}
            >
              <div
                style={{ border: `2px solid ${p.color}44`, transition: 'border-color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = p.color)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = `${p.color}44`)}
              >
                <ProjectThumb color={p.color} title={p.title} />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
