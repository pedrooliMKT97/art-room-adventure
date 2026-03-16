
# Portfólio Pixel Art — "Estúdio Noturno" de Pedro Oliveira

## Visão Geral
Uma experiência interativa de jogo top-down onde o visitante controla Pedro pelo seu estúdio criativo noturno. O quarto é o menu; os modais são o portfólio.

---

## 1. Cenário — Estúdio Noturno
- Quarto ~14×10 tiles, renderizado em `<canvas>` com `image-rendering: pixelated`, escala 4×
- **Paleta:** Azul noturno profundo (`#0d1b2a`), roxo escuro (`#1b1b2f`), luzes quentes âmbar (`#ffb347`), acento laranja neon (`#FF4D00`)
- **Detalhes de "vida" animados:**
  - Luzinha verde piscando no CPU
  - Abajur emitindo glow suave
  - Cortina lateral com animação leve (oscilação pixel)
  - Personagem pisca os olhos a cada 3–4 segundos parado

## 2. Objetos Interativos (5 objetos)
| Objeto | Posição | Abre |
|--------|---------|------|
| 🖥️ Computador | Mesa (canto sup. esq.) | Modal: player de vídeo (Reels/TikTok) |
| 🖼️ Poster | Parede superior centro | Modal: grade de Identidade Visual |
| 📚 Prateleira | Parede direita | Modal: Sobre + ferramentas/habilidades |
| 📱 Celular | Mesa lateral | Modal: contatos (WhatsApp, Insta, e-mail) |
| 🏆 Quadro | Parede esquerda | Modal: formação e experiência |

Ícone `[E]` ou cursor piscando aparece ao lado do objeto quando o personagem está próximo.

## 3. Mecânica de Jogo
- **WASD**: Movimentação 4 direções, sem aceleração (feel 16-bit)
- **Click do mouse**: Interage com objetos (sem precisar estar perto — o clique é direto no canvas)
- **AABB Collision**: Paredes + todos os objetos móveis
- HUD inferior com instrução `WASD: ANDAR | CLIQUE: INTERAGIR`
- Letreiro neon `"Crio Experiências AUTÊNTICAS"` na parede — glowing animado

## 4. Modais (Pixel Art UI)
- Fundo `#0d1b2a`, borda `4px solid white`, font `Press Start 2P` nos títulos, `Inter` no conteúdo
- Animação de entrada: `scale(0.9)→scale(1)` com `cubic-bezier`
- **Modal Computador:** Thumbnails de vídeos + embed YouTube com borda pixel ao clicar
- **Modal Poster:** Grade 2×2 de projetos de identidade visual com thumbnails placeholder
- **Modal Prateleira:** Bio curta + ícones de ferramentas (Figma, Premiere, etc.)
- **Modal Celular:** Botões de contato estilizados (WhatsApp verde, Instagram gradiente, e-mail)
- **Modal Quadro:** Timeline de experiência/formação em pixel art

## 5. Stack Técnico
- Componente React único `PixelRoom.tsx` gerenciando o `<canvas>` com `useEffect` + `useRef`
- Game loop com `requestAnimationFrame`
- Estado React para `activeModal` (qual modal está aberto)
- Modais como componentes React sobrepostos ao canvas
- Fontes: `Press Start 2P` (Google Fonts) + `Inter`
- Tudo em TypeScript estrito

## 6. Layout da Página
- Background `#0c0c0c` fullscreen
- Canvas centralizado com sombra escura
- HUD overlay absoluto com nome `PEDRO OLIVEIRA` + tagline
- Hint de controles no canto inferior esquerdo
