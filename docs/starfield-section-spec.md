# Especificação Técnica: Starfield Background (Canvas)

**Caminho do arquivo:** `docs/starfield-section-spec.md`

## 1. Objetivo

Prover uma camada de fundo imersiva e cinematográfica que simule a profundidade do espaço. O componente deve ser puramente decorativo, operando em baixa prioridade de processamento para não interferir na performance da interface principal.

- **Comportamento:** Full-screen, não interativo.
- **Acessibilidade:** Deve conter `aria-hidden="true"` para ser ignorado por tecnologias assistivas.

## 2. HTML — Posicionamento

O elemento `<canvas>` deve ser injetado como o **primeiro filho** do `<body>` no `index.html`, garantindo que sirva de base para todas as seções da página.

```html
<canvas id="starfield" aria-hidden="true"></canvas>
```

## 3. CSS — Estilização e Camadas

O estilo deve garantir que o canvas ocupe todo o viewport sem criar barras de rolagem ou interceptar cliques que pertencem aos botões e links da UI.

| Propriedade | Valor |
|-------------|--------|
| **ID** | `#starfield` |
| **Position** | `fixed` |
| **Inset** | `0` (top, left, right, bottom) |
| **Z-index** | `-1` (posicionado atrás do conteúdo, mas acima do `--bg-deep` declarado no `body`) |
| **Pointer-events** | `none` (garante transparência a cliques) |
| **Background** | Deve utilizar o token `--bg-deep` como cor de limpeza (clear color) no JS |

## 4. JS — Contrato de `initStarfield()`

A implementação do script deve seguir um ciclo de vida controlado para evitar vazamento de memória e inconsistências visuais em telas de alta densidade.

- **Resize Management:** Listener para redimensionar o buffer do canvas sempre que a janela mudar de tamanho.
- **High DPI Support:** Cálculo obrigatório de `window.devicePixelRatio` para evitar blur em telas Retina/4K.
- **Loop de Animação:** Uso exclusivo de `requestAnimationFrame`. O loop deve ser pausado se a aba não estiver visível (comportamento nativo do navegador) ou se o usuário preferir movimento reduzido.
- **Cleanup:** Função de retorno que remove listeners e cancela o frame de animação atual ao destruir o componente.

## 5. Parâmetros Visuais (Alinhamento DESIGN.md)

A estética deve respeitar a atmosfera "Cosmic" sem poluir a visão do usuário.

### Estrelas (Stars)

- **Cores:** Predominância de `--accent-star` com variações sutis em `--text-primary`.
- **Densidade:** 5/10 (conforme DESIGN.md). Evitar preenchimento excessivo.
- **Tamanho:** Variar entre 1px e 3px, simulando paralaxe.

### Nebulosas e Atmosfera (Glows)

- Utilizar pincéis radiais (`radial gradients`) suaves com baixa opacidade.
- **Cores permitidas:** `--cosmic-cyan`, `--cosmic-purple` e `--cosmic-rose`.

### Movimento

- Velocidade mínima (drift quase imperceptível).
- Respeitar `prefers-reduced-motion`: se ativo, as estrelas devem permanecer estáticas.

## 6. Checklist e Critérios de Aceitação

- [ ] O canvas não gera scroll horizontal ou vertical.
- [ ] O contraste entre as estrelas (`--accent-star`) e o fundo (`--bg-deep`) mantém a legibilidade do conteúdo sobreposto.
- [ ] O uso de CPU/GPU não ultrapassa 5% em repouso (idle).
- [ ] As cores das nebulosas não utilizam gradientes ou tons fora da paleta oficial.
- [ ] O redimensionamento da janela não distorce as proporções das estrelas.
- [ ] O canvas é ignorado por leitores de tela via `aria-hidden`.
