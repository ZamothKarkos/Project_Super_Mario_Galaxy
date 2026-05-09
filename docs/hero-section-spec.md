Vou criar o documento de especificação técnica para a seção Hero, seguindo rigorosamente os prints fornecidos, o `DESIGN.md` e as restrições de assets.

Sua especificação está pronta e detalhada abaixo.

---

# Documento de Especificação: Hero Section (docs/hero-section-spec.md)

## 1. Objetivo

Definir a implementação técnica da seção de abertura (Hero) do site "Super Mario Galaxy: O Filme", garantindo fidelidade absoluta aos layouts fornecidos e integração com o sistema de design estabelecido.

## 2. Inventário Visual (Fidelidade ao Print)

Conforme análise dos arquivos `desktop-print-hero-section.jpg`, os elementos presentes são:

* **1 Badge Superior:** Texto "NOS CINEMAS AGORA" em caixa alta, fundo escuro arredondado.
* **1 Título Principal:** "Super Mario Galaxy: O Filme" (em duas linhas, com destaque para "O Filme").
* **1 Subtítulo/Tagline:** "UMA AVENTURA ÉPICA PELO COSMOS" em caixa alta.
* **1 Botão (CTA):** Roxo/Violeta com texto "Assistir Trailer" e um ícone de "play" à direita.
* **1 Vídeo do Mario:** Posicionado à esquerda, flutuando.
* **1 Vídeo do Yoshi:** Posicionado à direita, flutuando (espelhado).
* **1 Vídeo do Planeta:** Grande, centralizado na parte inferior, servindo de base para a composição.
* **3 Lumas (Estrelas):** Posicionadas de forma triangular (duas nas laterais inferiores, uma centralizada abaixo do planeta com indicação de scroll).
* **Texto de Apoio ao Scroll:** "ROLE PARA EXPLORAR" próximo à estrela inferior central.

## 3. Estrutura HTML (DOM Tree)

```html
<section class="hero" id="hero">
  <div class="hero__background"></div>

  <div class="hero__media">
    <video class="hero__asset hero__asset--mario" autoplay loop muted playsinline>
      <source src="public/images/mario-clip-alpha.webm" type="video/webm">
      <source src="public/images/mario-clip-min.mp4" type="video/mp4">
    </video>

    <video class="hero__asset hero__asset--yoshi" autoplay loop muted playsinline>
      <source src="public/images/yoshi-video-alpha.webm" type="video/webm">
      <source src="public/images/yoshi-video-min.mp4" type="video/mp4">
    </video>

    <video class="hero__asset hero__asset--planet" autoplay loop muted playsinline>
      <source src="public/images/planet-3d-alpha.webm" type="video/webm">
      <source src="public/images/planet-3d-min.mp4" type="video/mp4">
    </video>
  </div>

  <div class="hero__content">
    <span class="hero__badge">Nos cinemas agora</span>
    <h1 class="hero__title">Super Mario Galaxy:<br><span>O Filme</span></h1>
    <p class="hero__tagline">Uma aventura épica pelo cosmos</p>
    
    <button class="hero__cta">
      <span>Assistir Trailer</span>
      <svg class="hero__cta-icon"></svg>
    </button>
  </div>

  <div class="hero__ornaments">
    <img src="public/images/estrela-min.webp" alt="Luma" class="hero__luma hero__luma--left">
    <img src="public/images/estrela-min.webp" alt="Luma" class="hero__luma hero__luma--right">
    
    <div class="hero__scroll-indicator">
      <img src="public/images/estrela-min.webp" alt="Luma" class="hero__luma hero__luma--scroll">
      <span class="hero__scroll-text">Role para explorar</span>
    </div>
  </div>
</section>

```

## 4. Camadas Visuais e Z-Index

1. **Z-0 (Fundo):** `#starfield` (canvas global) + `.hero__background` (gradiente `--gradient-aurora`).
2. **Z-10 (Planeta):** `.hero__asset--planet` centralizado, cortado pela base da viewport.
3. **Z-20 (Conteúdo):** `.hero__content` (Textos e Botão).
4. **Z-30 (Personagens):** Mario e Yoshi flutuando lateralmente.
5. **Z-40 (Ornamentos):** Lumas e indicadores de scroll.

## 5. Tokens Aplicados (Referência DESIGN.md)

* **Tipografia:** `Outfit` (`--font-body`).
* Título: `--text-6xl`, `--font-black`, `--leading-tight`.
* Badge/Tagline/Scroll: `--text-xs`, `--tracking-caps`, `--font-bold`.


* **Cores:**
* Badge: Fundo `--bg-mid`, texto `--accent-star`.
* Título/Tagline: `--text-primary`.
* Botão: Fundo `--cosmic-purple`, texto `--text-primary`.


* **Motion:**
* Entrada dos elementos: `--ease-out-expo`.
* Flutuação (Mario/Yoshi): Animação `y-axis` suave com `--ease-in-out-soft`.



## 6. Mapeamento de Assets

| Elemento | Caminho do Arquivo | Comportamento CSS |
| --- | --- | --- |
| **Mario** | `public/images/mario-clip-alpha.webm` | `position: absolute; left: 10%; top: 25%;` |
| **Yoshi** | `public/images/yoshi-video-alpha.webm` | `position: absolute; right: 10%; top: 20%; transform: scaleX(-1);` |
| **Planeta** | `public/images/planet-3d-alpha.webm` | `position: absolute; bottom: -10%; left: 50%; transform: translateX(-50%);` |
| **Lumas** | `public/images/estrela-min.webp` | `width: clamp(30px, 4vw, 50px);` |

## 7. Suposições a Confirmar

* **Ícone do Botão:** No print, o ícone dentro do botão "Assistir Trailer" parece ser um círculo com um triângulo (play). A ser confirmado se é um SVG específico ou caractere Unicode.
* **Interatividade do Planeta:** O print sugere que o planeta está fixo na base. Documentado como estático para rotação interna, mas pronto para receber efeito de *parallax* ou *scroll-driven animation*.

## 8. Responsividade

* **Desktop (1440px+):** Layout idêntico ao print, Mario e Yoshi bem afastados do centro.
* **Tablet (768px - 1024px):** Redução proporcional dos vídeos (Mário/Yoshi) para não sobrepor o texto central.
* **Mobile (< 768px):** * Mario e Yoshi movem-se para cima do título ou são ocultados para priorizar legibilidade.
* Título reduz para `--text-4xl`.
* O planeta mantém-se centralizado mas com escala reduzida.



## 9. Critérios de Aceitação

1. Os vídeos `.webm` devem carregar com transparência funcional (sem fundo preto).
2. O Yoshi deve estar obrigatoriamente espelhado horizontalmente via CSS.
3. O botão roxo não deve possuir *glow* externo, apenas o brilho nativo da cor conforme `DESIGN.md`.
4. O texto "O Filme" deve estar exatamente abaixo de "Super Mario Galaxy", alinhado ao centro.
5. A hierarquia de camadas deve permitir que o Mario e o Yoshi pareçam estar "na frente" do fundo, mas não obstruam o texto principal.

## 10. Checklist de Implementação

* [ ] Verificar se os arquivos em `public/images/` seguem exatamente a nomenclatura da lista.
* [ ] Validar o suporte a WebM Alpha no navegador de teste (Safari requer fallback MP4).
* [ ] Aplicar `user-select: none` nas lumas e vídeos decorativos.
* [ ] Configurar `pointer-events: none` nos vídeos para não interceptar cliques no CTA.