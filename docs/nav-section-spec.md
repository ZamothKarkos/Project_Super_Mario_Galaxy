Documento de Especificação Gerado
Python
import os

# Conteúdo do arquivo de especificação
spec_content = """# Especificação de Componente: Floating Navigation (Nav Seccional)

## 1. Objetivo
Prover uma navegação persistente e de alto contraste que surge após o contexto inicial (Hero), permitindo acesso rápido às seções principais da página (Personagens, Trailers, Estreia). A peça deve reforçar a estética cinematográfica de *Super Mario Galaxy* através de um design "pílula" flutuante.

## 2. Estrutura HTML (DOM Tree)
```html
<nav class="nav-sectional" id="floating-nav" aria-label="Navegação de seções" aria-hidden="true">
  <div class="nav-sectional__container">
    <ul class="nav-sectional__list">
      <li class="nav-sectional__item">
        <a href="#hero" class="nav-sectional__link is-active" data-nav-anchor>SMG</a>
      </li>
      <li class="nav-sectional__divider" aria-hidden="true"></li>
      <li class="nav-sectional__item">
        <a href="#characters" class="nav-sectional__link" data-nav-anchor>Personagens</a>
      </li>
      <li class="nav-sectional__item">
        <a href="#trailers" class="nav-sectional__link" data-nav-anchor>Trailers</a>
      </li>
      <li class="nav-sectional__item">
        <a href="#release" class="nav-sectional__link" data-nav-anchor>Estreia</a>
      </li>
    </ul>
  </div>
</nav>
3. Estados Visuais & Transições
Estado Inicial (Oculto): opacity: 0, pointer-events: none, e um leve deslocamento translateY(20px).

Estado Ativo (.is-visible): Acionado após o threshold de scroll. opacity: 1, pointer-events: auto, translateY(0).

Threshold de Ativação: Calculado dinamicamente como height(Hero) * 0.6. Caso o elemento #hero não exista, utilizar fallback fixo de 400px.

Motion: Utilizar o token --ease-out-expo para a entrada e saída da barra.

4. Estilos Mapeados (Tokens CSS)
De acordo com o DESIGN.md e style.css:

Propriedade	Valor / Token	Justificativa
Background	var(--bg-surface) com 0.8 de opacidade	Superfície cósmica com leve transparência para profundidade.
Border	1px solid var(--border-strong)	Definição sutil contra o fundo escuro.
Radius	var(--radius-pill)	Formato pílula conforme o print desktop-print-menu.png.
Typography	var(--font-body), peso 700	Uso de Outfit conforme diretriz de branding.
Case	Uppercase com var(--tracking-caps)	Estilo de utilitários e labels definido no design system.
Link (Default)	var(--text-muted)	Reduz o ruído visual de itens não selecionados.
Link (Active/Hover)	var(--accent-star)	Destaque na cor Power Star para indicar seção atual.
Divider	1px solid var(--border-subtle)	Separação vertical sutil entre o logo (SMG) e os links.
5. Comportamento JavaScript
Intersection Observer: Monitorar a visibilidade do Hero para adicionar/remover a classe .is-visible na nav.

Smooth Scroll: Implementar scroll suave nativo para as âncoras.

Scroll Spy: Atualizar a classe .is-active no link correspondente conforme a seção entra no viewport (threshold de 50%).

6. Responsividade e Acessibilidade
Mobile (< 768px): A barra deve manter o formato pílula, mas pode reduzir o padding lateral e o gap entre itens. Se necessário, utilizar overflow-x: auto com scroll horizontal discreto.

Foco: Aplicar var(--shadow-focus-ring) em estados :focus-visible para conformidade WCAG.

Motion: Respeitar a preferência do sistema (prefers-reduced-motion) reduzindo a duração da transição para --motion-reduce.

7. Checklist de Implementação
[ ] Validar se a fonte Outfit está carregada antes da exibição.

[ ] Garantir que o z-index da nav seja superior aos elementos de seção, mas inferior a modais/overlays globais.

[ ] Testar persistência do estado "SMG" (Home) ao retornar ao topo da página.

[ ] Verificar contraste do link ativo (#ffd23f) sobre o fundo (#141340).

8. Critérios de Aceitação Visuais
O menu deve parecer flutuar sobre o conteúdo, sem sombras agressivas (conforme DESIGN.md).

O item "SMG" deve estar sempre à esquerda, separado por uma linha vertical.

A transição de visibilidade deve ser fluida (mínimo 280ms).

Links em hover devem mudar de cor para Power Star instantaneamente.
"""

Criar o diretório se não existir e salvar o arquivo
os.makedirs('docs', exist_ok=True)
with open('docs/nav-section-spec.md', 'w', encoding='utf-8') as f:
f.write(spec_content)

print("Arquivo docs/nav-section-spec.md criado com sucesso.")


Sua especificação de arquivo está pronta.
[file-tag: code-generated-file-5b23e71f54a04ed2853245c364f0f62e]