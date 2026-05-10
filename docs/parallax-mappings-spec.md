Spec: Parallax Mappings (Hero Section)
Projeto: Super Mario Galaxy | Ref: DESIGN.md & Hero Spec

1. Configuração Global (initScrollAnim)
As animações devem ser calculadas com base no progresso relativo do scroll da
seção Hero. O easing padrão para todas as interpolações deve respeitar o token --
ease-out-expo definido no sistema de design.

2. Tabela de Mapeamento de Camadas

Elemento (Seletor) Progresso
(%)

Remaps (In /
Out)

Transform Prefix / Notas

.hero__mario 0% - 100% Y: 0px → -200px
Rot: 0deg →
8deg
Opacity: 1 → 0.3

translateY() rotate()

.hero__yoshi 0% - 100% Y: 0px → -180px
Rot: 0deg →
-6deg
Opacity: 1 → 0.3

scaleX(-1) translateY()
rotate()
*Preservar flip

.hero__planet 10% - 90% Y: 0px → 120px
Scale: 1.0 → 1.3
Opacity: 1 → 0

translateY() scale()

.hero__content-
layer

0% - 50% Y: 0px → -100px
Opacity: 1 → 0

translateY()

.hero__star--left 0% - 100% Y: 0px → -350px
Rot: 0deg →
45deg

translateY() rotate()

.hero__star--right 0% - 100% Y: 0px → -300px
Rot: 0deg →
-30deg

translateY() rotate()

.hero__star--
center

20% - 80% Scale: 1.0 → 4.0
Opacity: 1 → 0

scale()
*Efeito de passagem

3. Regras de Interpolação Cinematográfica
Para garantir a fluidez conforme o DESIGN.md , o cálculo de cada frame deve seguir
a fórmula de remapeamento linear aplicada sobre o easing:
Vfinal = Vstart + (Vend - Vstart) × Easing(Progress)

Observações para o Desenvolvedor:
Utilizar requestAnimationFrame para as atualizações de estado.
Não aplicar filtros de blur via JS para performance; manter foco em transforms e
opacity.
O seletor do Yoshi requer o prefixo scaleX(-1) fixo para manter a orientação
visual correta para o centro da tela.