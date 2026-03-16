import React from 'react';

const contacts = [
  {
    label: 'WHATSAPP',
    value: '+55 (XX) XXXXX-XXXX',
    href: 'https://wa.me/5500000000000',
    color: '#00e676',
    icon: '💬',
    bg: '#00e67611',
  },
  {
    label: 'INSTAGRAM',
    value: '@pdrolidesigner',
    href: 'https://instagram.com/pdrolidesigner',
    color: '#e040fb',
    icon: '📸',
    bg: '#e040fb11',
  },
  {
    label: 'E-MAIL',
    value: 'contato@pdrolidesigner.com.br',
    href: 'mailto:contato@pdrolidesigner.com.br',
    color: '#ff6b1a',
    icon: '✉️',
    bg: '#ff6b1a11',
  },
  {
    label: 'BEHANCE',
    value: 'behance.net/pdrolidesigner',
    href: 'https://behance.net/pdrolidesigner',
    color: '#1769ff',
    icon: '🎨',
    bg: '#1769ff11',
  },
];

const px: React.CSSProperties = {
  fontFamily: '"Press Start 2P", monospace',
};

export default function PhoneModal() {
  return (
    <div style={{ ...px, color: '#e8eaf0' }}>
      <p style={{ fontSize: 7, color: '#668899', marginBottom: 24, lineHeight: 2 }}>
        Bora criar algo incrível juntos?
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {contacts.map(c => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '14px 16px',
              background: c.bg,
              border: `2px solid ${c.color}44`,
              textDecoration: 'none',
              transition: 'border-color 0.15s, transform 0.1s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = c.color;
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = `${c.color}44`;
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span style={{ fontSize: 22 }}>{c.icon}</span>
            <div>
              <div style={{ fontSize: 7, color: c.color, marginBottom: 6, textShadow: `0 0 6px ${c.color}66` }}>
                {c.label}
              </div>
              <div style={{ fontSize: 6, color: '#7a8898', fontFamily: 'Inter, sans-serif' }}>
                {c.value}
              </div>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: 10, color: c.color }}>→</span>
          </a>
        ))}
      </div>

      <div style={{
        marginTop: 24,
        padding: '12px 16px',
        background: '#0a1520',
        border: '2px solid #ff6b1a22',
        fontSize: 6,
        color: '#ff6b1a',
        lineHeight: 2.4,
        textAlign: 'center',
        textShadow: '0 0 6px #ff6b1a66',
      }}>
        "Crio Experiências AUTÊNTICAS"
        <br />
        <span style={{ color: '#445566', fontSize: 5 }}>disponível para novos projetos</span>
      </div>
    </div>
  );
}
