/**
 * Este script configura e inicializa a biblioteca ParticlesJS usada no fundo da seção "Personagens".
 * Ele lê as variáveis de cor (tokens) diretamente do CSS (:root) para garantir
 * que as partículas sigam o tema visual de forma dinâmica.
 */

// Obtendo os tokens definidos no :root
const style = getComputedStyle(document.documentElement);
const particleColor = style.getPropertyValue('--particle-color').trim() || '#5ce0d8';
const particleLineColor = style.getPropertyValue('--particle-line-color').trim() || '#6a3cbc';
const particleAccentColor = style.getPropertyValue('--particle-accent-color').trim() || '#c8508c';

// Inicializa a animação com os parâmetros do contrato
particlesJS('particles-js', {
  particles: {
    number: {
      value: 140, // 2) Quantidade: 140
      density: { enable: true, value_area: 800 } // 9) Densidade Área: 800
    },
    color: {
      value: particleColor // 4) Cores mapeadas
    },
    shape: {
      type: "circle", // 1) Tipo de partículas: Círculo
      stroke: {
        width: 0.5,
        color: particleAccentColor // 4) Cor de destaque (accent)
      }
    },
    opacity: {
      value: 0.7, // 3) Opacidade: 0.7
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.3,
        sync: false
      }
    },
    size: {
      value: 3, // 3) Tamanho Máximo: 3
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 1, // 3) Min Size Animado: 1
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 160, // 6) Conexões - Distância: 160
      color: particleLineColor, // 4) Cor das linhas
      opacity: 0.4, // 6) Conexões - Opacidade: 0.4
      width: 1.2 // 6) Conexões - Largura: 1.2
    },
    move: {
      enable: true,
      speed: 2, // 5) Movimento - Velocidade: 2
      direction: "none",
      random: true,
      straight: false,
      out_mode: "bounce", // 5) Modo de colisão: bounce
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab" // 7) Reação: Hover com Grab
      },
      onclick: {
        enable: true,
        mode: "push" // 7) Reação: Click com Push
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 220, // 7) Grab distance: 220
        line_linked: {
          opacity: 0.8
        }
      },
      push: {
        particles_nb: 4 // 7) Push mode: 4
      }
    }
  },
  retina_detect: true // 9) Densidade x Performance: Retina detect
});
