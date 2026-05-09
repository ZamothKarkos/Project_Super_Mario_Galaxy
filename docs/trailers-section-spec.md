Aqui está o documento técnico de especificação para a seção de trailers, estruturado estritamente com base nos elementos mapeados nos arquivos **desktop-print-trailers.jpg** e **mobile-print-trailers.png**.

---

# docs/trailers-section-spec.md

## 1. Objetivo

Implementar uma seção de exibição de vídeos promocionais (trailers oficiais) com navegação em carrossel, garantindo fidelidade ao layout de alta fidelidade e acessibilidade na reprodução de mídia via YouTube.

## 2. Inventário de Elementos

Conforme mapeamento visual, a seção é composta por:

* **Label Superior:** Texto de apoio "ASSISTA AGORA".
* **Título Principal:** Cabeçalho "Trailers oficiais".
* **Subtítulo:** Texto descritivo "CLIPES DA AVENTURA NO ESPAÇO".
* **Marca d'água:** Texto "TRAILERS" em background (Desktop).
* **Card de Vídeo:** Container com borda iluminada (glow), miniatura e overlays.
* **Navegação:** Setas direcionais (esquerda/direita) e indicadores de posição (dots).

## 3. Estrutura de Camadas (Z-Index)

1. **Nível 0 (Background):** Gradiente de fundo e texto de marca d'água "TRAILERS".
2. **Nível 1 (Base):** Textos de cabeçalho (Label, Título, Subtítulo).
3. **Nível 2 (Componente):** Card do trailer e controles de navegação.
4. **Nível 3 (Overlays):** Botão Play, Ícone de Link e Botão "Assista no YouTube".

## 4. Estrutura HTML Sugerida

* Seção encapsulada em `<section>`.
* Títulos hierarquizados: `<span>` (label), `<h1>` (título), `<h2>` ou `<p>` (subtítulo).
* Container do trailer utilizando `<iframe>` para o embed.
* Atributos obrigatórios: `loading="lazy"`, `title="The Super Mario Bros. Movie | Official Trailer"`.
* URLs de referência: `[TRAILER_URL_1]`, `[TRAILER_URL_2]`, etc.

## 5. Design Tokens (Referenciais)

* **Cores:**
* Primária: Branco (Texto principal).
* Destaque: Dourado/Amarelo (Label "ASSISTA AGORA").
* Ação: Vermelho (Botão Play YouTube).
* Acento: Azul Piscina/Teal (Dot ativo).
* Borda: Gradiente linear (efeito neon).


* **Tipografia:**
* Títulos: Sans-serif, peso Bold/Heavy.
* Labels: Sans-serif, caixa alta (Uppercase), espaçamento entre letras (Letter-spacing).



## 6. Comportamento e Estados

* **Botão Play:** Estado estático centralizado; aciona o carregamento/reprodução do vídeo.
* **Paginação (Dots):**
* `Ativo`: Cor Azul/Teal.
* `Inativo`: Cor Cinza escuro/baixa opacidade.


* **Setas de Navegação:**
* `Desabilitado`: Opacidade reduzida (ex: quando no primeiro item do carrossel).
* `Hover`: Feedback visual de interatividade.


* **Overlay YouTube:** Botão tipo pílula translúcido que redireciona para a plataforma externa.

## 7. Responsividade

* **Desktop:**
* Card centralizado ocupando ~50% da largura horizontal.
* Marca d'água "TRAILERS" visível à direita.


* **Mobile:**
* Card expandido para ~90% da largura da tela.
* Texto do título do vídeo no card com truncamento (Ex: "The Super Mario Bros. Movie | O...").
* Marca d'água removida ou oculta para priorizar legibilidade.



## 8. Suposições Técnicas

* O carrossel é infinito ou possui limite baseado no número de dots (4 itens visíveis no mapeamento).
* O efeito de borda iluminada (glow) é contínuo e acompanha o arredondamento dos cantos do card.
* O fundo é um gradiente fixo que não rola com o conteúdo interno do carrossel.

## 9. Checklist de Implementação

* [ ] Implementar `loading="lazy"` em todos os iframes de vídeo.
* [ ] Garantir que o título literal do vídeo apareça no overlay superior.
* [ ] Validar o contraste do texto dourado contra o fundo escuro.
* [ ] Certificar que o ícone de link inferior esquerdo seja clicável.
* [ ] Aplicar o arredondamento de cantos (border-radius) idêntico ao design.

## 10. Critérios de Aceite

* A seção deve ser visualmente idêntica aos prints fornecidos em ambas as resoluções.
* A navegação entre os trailers deve atualizar o estado visual dos "dots" inferiores.
* O título e subtítulo devem manter o alinhamento centralizado absoluto.