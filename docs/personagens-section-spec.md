# Spec: seção Personagens (`#personagens`)

**Fontes consultadas:** `src/DESIGN.md`, `docs/personagens-section.md` (prompt / levantamento do print).

**Contrato visual:** o inventário abaixo reproduz **somente** o que consta no levantamento de `docs/personagens-section.md`, alinhado ao print de referência. Qualquer elemento não listado no item 2 **não** entra no HTML. Divergência entre implementação e print deve ser resolvida **a favor do print**.

**Nota sobre paths de imagem:** o briefing fixa `assets/images/<arquivo>.webp`. No repositório atual os mesmos nomes aparecem em `src/assets/images/`. Manter os **nomes de arquivo** exatos; o path relativo ao `index.html` é **suposição a confirmar** (item 6).

---

## 1) Objetivo

Apresentar o elenco principal em composição **livre** (anti-grid), com hierarquia textual central e seis personagens com imagem e legenda, sobre fundo cósmico, respeitando tokens globais de `DESIGN.md` e servindo de **trilho de scroll** com altura mínima adequada ao parallax estendido do hero (item 8).

---

## 2) Inventário visual (item a item)

Elementos **visíveis no print** segundo `docs/personagens-section.md`:

| # | Tipo | Descrição |
|---|------|-----------|
| 1 | **Fundo** | Gradiente radial escuro: transição de roxo profundo nas extremidades para azul marinho no centro; sensação galáctica/espacial. |
| 2 | **Texto — antetítulo (eyebrow)** | Copy literal: `CONHEÇA O ELENCO`. Maiúsculas; cor descrita como amarela/dourada; pequeno; **centralizado** horizontalmente. |
| 3 | **Texto — título principal** | Copy literal: `Personagens`. Cor branca (no print); sem serifa; negrito; grande; **centralizado**. |
| 4 | **Texto — subtítulo** | Copy literal: `OS HERÓIS E VILÕES DESTA AVENTURA GALÁCTICA`. Maiúsculas; cor branca; menor; kerning aumentado; **centralizado** abaixo do título. |
| 5 | **Bloco de títulos** | Os itens 2–4 formam um bloco **centralizado no eixo horizontal** (alinhamento global do grupo). |
| 6 | **Personagem 1 — mídia** | Render de **Mario** em pose de voo/salto, braços abertos. |
| 7 | **Personagem 1 — legenda** | Copy literal: `Mario`. Branco, sem serifa, negrito, **centralizada** abaixo da imagem do personagem. |
| 8 | **Personagem 2 — mídia** | Render de **Peach** segurando guarda-chuva rosa aberto. |
| 9 | **Personagem 2 — legenda** | Copy literal: `Peach`. Mesmo estilo da legenda (item 7). |
| 10 | **Personagem 3 — mídia** | Render de **Luigi** em queda/mergulho, cabeça para baixo. |
| 11 | **Personagem 3 — legenda** | Copy literal: `Luigi`. Mesmo estilo. |
| 12 | **Personagem 4 — mídia** | Render de **Yoshi** em corrida; no print aparece **carregando Bowser** nas costas (detalho visual da arte). |
| 13 | **Personagem 4 — legenda** | Copy literal: `Yoshi`. Mesmo estilo. |
| 14 | **Personagem 5 — mídia** | Render de **Bowser Jr.** dentro do *Clown Car*, com pincel mágico. |
| 15 | **Personagem 5 — legenda** | Copy literal: `Bowser Jr.` (ponto após “Jr” conforme levantamento). Mesmo estilo. |
| 16 | **Personagem 6 — mídia** | Render de **Rosalina** em pé, com varinha; leve brilho ao redor no print. |
| 17 | **Personagem 6 — legenda** | Copy literal: `Rosalina`. Mesmo estilo. |
| 18 | **Layout dos personagens** | **Seis** figuras em arranjo **orgânico/assimétrico** (não grade rígida); sensação de profundidade e movimento. |
| 19 | **Iluminação nos renders** | Leve realce de borda / *outer glow* nos personagens para destacá-los do fundo escuro (conforme print). |

**Contagens fixas:** 1 fundo; 1 grupo de três linhas de texto (eyebrow + título + subtítulo); **6** pares imagem+legenda. **Nenhum** botão, CTA, link, badge, estatística ou ícone decorativo adicional aparece no levantamento.

**Mídia por personagem (obrigatório, `<img>` apenas):**

| Personagem | Arquivo |
|------------|---------|
| Mario | `assets/images/mario-original.webp` |
| Luigi | `assets/images/luigi.webp` |
| Peach | `assets/images/peach.webp` |
| Yoshi | `assets/images/yoshi-perso.webp` |
| Rosalina | `assets/images/rosalina.webp` |
| Bowser Jr | `assets/images/bowser-jr.webp` |

Cada `<img>`: `alt` descritivo (nome do personagem em português ou conforme convenção do site), `loading="lazy"`. **Proibido** usar `mario-clip-alpha.webm`, `yoshi-video-alpha.webm` ou outros vídeos do hero nesta seção.

---

## 3) Estrutura HTML (árvore + classes)

Árvore lógica espelhando o inventário; nomes de classe seguem padrão BEM já usado no projeto (`bloco__elemento`).

```text
section#personagens.personagens[aria-labelledby]
├── div.personagens__background[aria-hidden="true"]
├── header.personagens__header
│   ├── p.personagens__eyebrow
│   ├── h2#personagens-heading.personagens__title
│   └── p.personagens__subtitle
└── div.personagens__stage
    ├── article.personagens__figure.personagens__figure--mario
    │   ├── img.personagens__img
    │   └── p.personagens__caption
    ├── article.personagens__figure.personagens__figure--peach
    │   ├── img.personagens__img
    │   └── p.personagens__caption
    ├── article.personagens__figure.personagens__figure--luigi
    │   ├── img.personagens__img
    │   └── p.personagens__caption
    ├── article.personagens__figure.personagens__figure--yoshi
    │   ├── img.personagens__img
    │   └── p.personagens__caption
    ├── article.personagens__figure.personagens__figure--bowser-jr
    │   ├── img.personagens__img
    │   └── p.personagens__caption
    └── article.personagens__figure.personagens__figure--rosalina
        ├── img.personagens__img
        └── p.personagens__caption
```

**Regras de marcação:**

- Um único `section` com `id="personagens"` (trilho de scroll / alvo de parallax estendido do hero).
- `header` agrupa apenas os três textos do inventário (itens 2–4).
- Cada personagem: `article` com **uma** `img` + **uma** legenda; modificador `--*` identifica o personagem para CSS de posição/escala **sem** usar grid para o palco.
- **Proibido** `display: grid` no contêiner que posiciona os personagens (`.personagens__stage`). Posicionamento: `position` + `top` / `left` / `right` / `bottom` ou `inset` com valores **independentes** por `.personagens__figure--*`.

**Semântica / heading:** o site já usa `<h1>` no hero; este título de seção deve ser **`h2`** com estilos de display grandes equivalentes ao print (**suposição a confirmar** se o print exigir hierarquia visual diferente sem quebrar acessibilidade).

**Integração com navegação existente:** o `index.html` atual aponta para `#characters`. Ao adotar `id="personagens"`, atualizar `href` do nav e qualquer lista de seções em JS (ex.: `SECTION_IDS`) para manter âncoras coerentes.

---

## 4) Camadas visuais (ordem de pintura)

1. **Fundo:** `.personagens__background` — gradiente radial (paleta alinhada a `DESIGN.md`; ver tokens).
2. **Palco:** `.personagens__stage` — contêiner posicionado; recorte/overflow conforme necessidade responsiva.
3. **Figuras:** cada `.personagens__figure` — `img` + realce suave se necessário para aproximar borda/brilho do print **sem** glow agressivo genérico fora do que reproduz a referência.
4. **Textos do cabeçalho:** `.personagens__header` acima ou na ordem z-index acordada com o print (se no print os títulos ficam sempre sobre o fundo sem cobrir personagens de forma crítica, replicar; caso contrário ajustar `z-index` documentado na implementação).
5. **Legendas:** abaixo de cada imagem, mesma camada que a figura ou ligeiramente acima conforme overlap do print.

**Ornamentos:** nenhum além do que está no inventário (incluindo brilho **nos personagens** onde o print mostra).

---

## 5) Tokens (`:root` — `src/DESIGN.md`)

Usar variáveis canônicas; quando o print pedir “branco” ou “amarelo/dourado”, preferir mapeamento explícito:

| Uso no print (descrição) | Token sugerido |
|--------------------------|----------------|
| Fundo profundo / escuro | `--bg-deep`, `--bg-mid` |
| Superfícies / áreas intermediárias | `--bg-surface` (se necessário para camadas) |
| Título e subtítulo “brancos” | `--text-primary` (evitar `#fff` cru, conforme `DESIGN.md`) |
| Eyebrow dourado/amarelado | `--accent-star` (**suposição a confirmar** tom exato contra o print) |
| Texto secundário se algum bloco precisar suavizar | `--text-muted` |
| Realces / cyan rosa roxo | `--cosmic-cyan`, `--cosmic-rose`, `--cosmic-purple` apenas se o gradiente de fundo for calibrado com a paleta cósmica (sem gradientes fora do conjunto cósmico + Power Star) |
| Tipografia | `--font-body` (`Outfit`, sans-serif) |
| Pesos | 700–900 títulos; corpo/legendas 400–500 ou 700 conforme “negrito” do print |
| Curvas de animação (se houver motion) | `--ease-out-expo`, `--ease-spring` |
| Espaçamento vertical | `clamp(...)` fluido, alinhado às regras de layout de `DESIGN.md` |

**Easing linear para marquee:** não se aplica a esta seção (não há marquee no inventário).

---

## 6) Suposições a confirmar

1. **Path dos `.webp`:** briefing `assets/images/` vs arquivos atuais em `src/assets/images/` — confirmar path final no HTML.
2. **Ordem no DOM** dos seis `article` vs ordem visual exata no print (profundidade / sobreposição).
3. **Coordenadas e escalas** por personagem (valores `%` / `px` / `clamp`) — derivar **medindo o print**; até lá, apenas a exigência qualitativa: freeform, **sem** grid, **≥3 escalas** perceptivelmente diferentes, variação vertical forte.
4. **Eyebrow:** confirmar se `--accent-star` cobre a cor dourada do print sem ajuste fino.
5. **Legenda “Bowser Jr.”:** confirmar pontuação exata no print (`Bowser Jr.` vs `Bowser Jr`); o levantamento usa ponto após “Jr”.
6. **Conteúdo da imagem Yoshi:** o print mostra Bowser montado no Yoshi, mas a legenda é só “Yoshi”; não adicionar segunda legenda nem personagem extra — apenas o asset `yoshi-perso.webp` mandado.
7. **Brilho em Rosalina (e demais):** intensidade e técnica (filtro vs arte já integrada no `.webp`) — calibrar contra o print.
8. **`h1` vs `h2`** para “Personagens” face ao hero — preferir `h2` por acessibilidade; confirmar com stakeholders.
9. **`extendedEndSelector` do parallax do hero:** não há ocorrência no código atual; confirmar seletor final (esperado: `#personagens`) quando a feature for ligada.

---

## 7) Responsividade

- **Mobile (< 768px):** sem overflow horizontal; colapsar composição mantendo **anti-grid**: reposicionar cada `--*` com coordenadas novas (não alinhar em coluna uniforme tipo lista de cards se isso destruir a assimetria do print. Se o print mobile for diferente, seguir o print mobile).
- **Escalas:** reduzir proporções mantendo **pelo menos três tamanhos claramente distintos** em viewports principais.
- **Sobreposição:** permitir overlap parcial se o print tiver; se comprometer legibilidade das legendas, ajustar só o mínimo necessário e registrar desvio em “Suposições”.
- **Legendas:** permanecem legíveis (contraste mínimo com `--text-primary` / fundo).

---

## 8) Trilho de scroll (`#personagens`)

- A seção **`#personagens`** deve ter **altura suficiente** para ser o alvo de **`extendedEndSelector`** do parallax estendido do hero.
- **Mínimo recomendado:** `min-height: 100vh` (ou equivalente em tokens/`clamp`), desde que o conteúdo real + padding já garantam área de scroll estável.
- **Ideal:** a altura natural do conteúdo (palco + cabeçalho + respiros) **já** supera `100vh`, evitando “padding morto” apenas para técnica.

---

## 9) Checklist de implementação

- [ ] `section id="personagens"` presente; `aria-labelledby` aponta para o `h2` do título.
- [ ] Apenas textos do inventário (eyebrow, título, subtítulo, seis legendas) — copy **literal**.
- [ ] Seis `<img>` com paths mandatórios (nomes exatos), `alt` + `loading="lazy"`; **nenhum** `<video>` da hero.
- [ ] `.personagens__stage` **sem** `display: grid` para posicionar figuras; posições por figura com coordenadas independentes.
- [ ] Variação clara de **escala** e **altura** entre personagens; possível sobreposição como no print.
- [ ] Fundo radial alinhado à paleta cósmica de `DESIGN.md`.
- [ ] Nav / JS de seções atualizados de `#characters` para `#personagens` se necessário.
- [ ] `min-height` / altura de trilho compatível com parallax estendido do hero (item 8).
- [ ] Nenhum CTA, link, badge ou estatística extra.
- [ ] `prefers-reduced-motion`: se houver animações nesta seção, respeitar redução (alinhado a `DESIGN.md` / práticas do projeto).

---

## 10) Critérios de aceitação visuais

- Comparação lado a lado com o print: mesma hierarquia textual, mesmas seis legendas, mesma contagem de figuras, ausência de elementos extra.
- Fundo: leitura de gradiente radial roxo → centro mais azulado/marinho, sem poluição.
- Personagens: leitura de profundidade (“flutuando”), não alinhamento em tabela.
- Contraste de textos legível em fundo escuro.

### Anti-regressão de layout

- [ ] Não está em grid/cards como padrão de listagem (proibido grid no palco dos personagens).
- [ ] Personagens distribuídos em **quadrantes diferentes** da seção (não agrupados numa única faixa central simétrica).
- [ ] Há variação de escala (**pelo menos 3** tamanhos perceptivelmente distintos).
- [ ] Há variação vertical (**diferença clara** de altura entre elementos no topo, meio e base da área útil).
- [ ] A composição geral bate com o print (**mesma sensação** de espalhamento orgânico).

---

*Documento apenas de especificação; sem código de implementação.*
