Aqui está o documento de especificação técnica para a seção de Trailers, estruturado conforme solicitado e baseado estritamente no mapeamento visual e na hierarquia de camadas do Figma.

---

# docs/trailers-section-spec.md

## 1. Objetivo

Implementar uma seção de carrossel de vídeos (trailers) com interface imersiva, destacando conteúdos multimídia através de um player customizado com bordas reagentes e navegação simplificada.

## 2. Inventário de Elementos

### 2.1 Conteúdo de Texto

* **Overline:** `ASSISTA AGORA` (Texto de apoio superior).
* **Título Principal:** `Trailers oficiais` (Heading 2).
* **Subtítulo:** `CLIPES DA AVENTURA NO ESPAÇO` (Texto descritivo inferior).
* **Watermark (Fundo):** `TRAILERS` (Texto decorativo em baixa opacidade).
* **Player UI:**
* Título do Vídeo: `[Título dinâmico vindo da fonte]` (Ex: "The Super Mario Bros. Movie | Official Trailer").
* Botão CTA: `Assista no YouTube`.



### 2.2 Elementos Visuais

* **Fundo:** Gradiente radial/linear em tons de azul escuro e roxo.
* **Moldura do Player:** Container com cantos arredondados, sombra externa e borda fina em gradiente multicolorido.
* **Controles de Navegação:**
* Ícone de seta (Anterior).
* Ícone de seta (Próximo).
* Paginação: 4 indicadores circulares (dots).



---

## 3. Estrutura de Camadas (Figma Hierarchy)

A estrutura deve seguir a ordem de empilhamento definida no arquivo original:

1. **Section - Trailers (Root)**
* `Gradient` (Fundo base).
* `Container` (Centralizador de conteúdo).
* `Heading 2` (Agrupador: Overline + H2 + Subtitle).
* `Container Player`:
* `Overlay+Border+Shadow` (Camada de efeitos estéticos).
* `Background` (Iframe / Thumbnail).


* `Container Controles`:
* `Button - Trailer anterior`.
* `Tablist - Selecionar trailer`.
* `Button - Proximo trailer`.







---

## 4. Arquitetura HTML Recomendada

A marcação deve ser semântica e focar em acessibilidade:

* `<section>`: Container principal da seção.
* `<header>`: Agrupa as três linhas de texto superiores.
* `<div>` (Player Wrapper):
* `<iframe>`: Com os atributos `loading="lazy"`, `title="[Título do Trailer]"`, `src="[TRAILER_URL_n]"`.
* `<div>` (UI Overlays): Para ícones de play, link e logo do canal.


* `<nav>` ou `<div>` (Carousel Controls):
* `<button aria-label="Trailer anterior">`.
* `<div role="tablist">` (Paginação).
* `<button aria-label="Próximo trailer">`.



---

## 5. Design Tokens (Referenciais)

* **Cores:**
* Primary Text: White (#FFFFFF).
* Accent: Cyan/Blue (usado no Dot ativo).
* Background: Deep Blue/Purple Gradient.


* **Bordas:**
* Radius: Aplicado ao container do vídeo e botões circulares.
* Border-width: Fina (aprox. 1px ou 2px) com gradiente linear.


* **Opacidade:**
* Watermark "TRAILERS": ~5% a 10% de opacidade.
* Seta inativa/default: ~30% de opacidade.



---

## 6. Estados dos Componentes

* **Dots (Paginação):**
* *Default:* Círculo pequeno, opacidade reduzida.
* *Ativo:* Círculo destacado, cor sólida (Cyan).


* **Botões de Navegação:**
* *Hover:* Aumento leve na opacidade ou brilho.
* *Disabled:* Opacidade mínima (conforme visto na seta da esquerda).


* **Player:**
* *Hover:* O overlay de borda colorida e sombra pode intensificar o brilho.



---

## 7. Responsividade e Comportamento

* **Alinhamento:** Todo o conteúdo deve permanecer centralizado horizontalmente no viewport.
* **Escalonamento:** O player deve manter a proporção de 16:9. Em telas menores, o texto de fundo (Watermark) pode ser ocultado para priorizar a legibilidade.
* **Carregamento:** Todos os iframes de trailers subsequentes devem utilizar `loading="lazy"` para otimizar a performance da página.

---

## 8. Checklist de Critérios de Aceite

* [ ] O texto "Trailers oficiais" deve ser a tag `<h2>`.
* [ ] O segundo dot de paginação deve iniciar como ativo (conforme o print).
* [ ] A borda do player deve ser um gradiente contínuo, não uma cor sólida.
* [ ] O botão "Assista no YouTube" deve abrir o vídeo em nova aba (`_blank`).
* [ ] O título do vídeo dentro do player deve corresponder ao trailer selecionado.

---

## 9. Suposições Técnicas

* O texto de fundo "TRAILERS" é um elemento estático de design, não interagível.
* A navegação entre os vídeos altera o `src` do iframe principal ou translada um container de slides.
* A baixa opacidade da seta esquerda no print indica que o usuário está no primeiro item (ou o estado padrão é suavizado).