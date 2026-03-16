import React, { useState } from 'react';
import type { ModalType } from './gameTypes';
import ComputerModal from './modals/ComputerModal';
import PosterModal from './modals/PosterModal';
import BookshelfModal from './modals/BookshelfModal';
import PhoneModal from './modals/PhoneModal';
import CertificateModal from './modals/CertificateModal';

interface Props {
  type: ModalType;
  onClose: () => void;
}

const modalConfig: Record<NonNullable<ModalType>, { title: string; emoji: string; borderColor: string }> = {
  computer:    { title: 'EDIÇÃO DE VÍDEO',     emoji: '🖥️', borderColor: '#00e5ff' },
  poster:      { title: 'IDENTIDADE VISUAL',   emoji: '🎨', borderColor: '#ff6b1a' },
  bookshelf:   { title: 'SOBRE MIM',           emoji: '📚', borderColor: '#ffb347' },
  phone:       { title: 'CONTATO',             emoji: '📱', borderColor: '#00ff41' },
  certificate: { title: 'FORMAÇÃO',            emoji: '🏆', borderColor: '#d4ac0d' },
};

export default function PixelModal({ type, onClose }: Props) {
  const [closing, setClosing] = useState(false);
  if (!type) return null;

  const config = modalConfig[type];

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 150);
  };

  const ContentMap: Record<NonNullable<ModalType>, React.ComponentType> = {
    computer:    ComputerModal,
    poster:      PosterModal,
    bookshelf:   BookshelfModal,
    phone:       PhoneModal,
    certificate: CertificateModal,
  };
  const Content = ContentMap[type];

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(4,10,20,0.88)' }}
      onClick={handleClose}
    >
      <div
        className={closing ? 'animate-modal-out' : 'animate-modal-in'}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0a1520',
          border: `4px solid ${config.borderColor}`,
          boxShadow: `0 0 32px ${config.borderColor}55, 0 0 64px ${config.borderColor}22`,
          minWidth: 520,
          maxWidth: 680,
          maxHeight: '80vh',
          overflowY: 'auto',
          fontFamily: '"Press Start 2P", monospace',
          imageRendering: 'pixelated',
          scrollbarWidth: 'thin',
          scrollbarColor: `${config.borderColor} #0a1520`,
        }}
      >
        {/* Header */}
        <div
          style={{
            borderBottom: `3px solid ${config.borderColor}`,
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#060e1a',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20 }}>{config.emoji}</span>
            <span
              style={{
                fontSize: 10,
                color: config.borderColor,
                textShadow: `0 0 8px ${config.borderColor}`,
                letterSpacing: 2,
              }}
            >
              {config.title}
            </span>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: 'transparent',
              border: `2px solid ${config.borderColor}`,
              color: config.borderColor,
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 10,
              padding: '4px 8px',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          <Content />
        </div>

        {/* Footer hint */}
        <div
          style={{
            borderTop: `2px solid ${config.borderColor}33`,
            padding: '8px 20px',
            fontSize: 7,
            color: '#445566',
            textAlign: 'center',
          }}
        >
          [ESC] ou clique fora para fechar
        </div>
      </div>
    </div>
  );
}
