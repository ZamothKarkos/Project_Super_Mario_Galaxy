Spec: Seção de Estreia e Contador
Arquivo de Referência: frames-countdown-figma.png, frames-countdown-figma-2.png, mobile-print-contador.png
1. Objetivo
Implementar a seção de fechamento da landing page, apresentando uma citação inspiradora e um contador regressivo dinâmico para o lançamento do filme, mantendo a identidade visual "Galaxy".
2. Inventário de Elementos
Background: Nebula (nebulosa-quad.webp) com gradiente de sobreposição.
Elementos Decorativos: Estrelas flutuantes amarelas (estrela-min.webp) em posições variadas.
Texto de Citação (Quote): Título principal com destaque cromático.
Identificador: Nome do filme em caixa alta (Subtítulo).
Divisor: Linha horizontal amarela com glow.
Label de Chamada: "ESTREIA NOS CINEMAS EM".
Container do Contador: Box com efeito Overlay+Blur+Shadow.
Unidades de Tempo: Blocos para Dias, Horas, Minutos e Segundos.
Rodapé do Bloco: Data fixa de estreia.
3. Estrutura HTML
<section class="section-countdown" data-target-date="2026-12-25T00:00:00">
    <div class="nebula-background"></div>
    
    <div class="content-wrapper">
        <h2 class="quote">
            Cada <span class="text-highlight">estrela</span> guarda uma historia. 
            A sua começa <span class="text-highlight">agora.</span>
        </h2>
        
        <p class="movie-title">SUPER MARIO GALAXY: O FILME</p>
        
        <hr class="horizontal-divider">
        
        <p class="countdown-label">ESTREIA NOS CINEMAS EM</p>
        
        <div class="countdown-container overlay-blur">
            <div class="countdown-item">
                <span data-countdown="days">00</span>
                <label>DIAS</label>
            </div>
            <div class="countdown-item">
                <span data-countdown="hours">00</span>
                <label>HORAS</label>
            </div>
            <div class="countdown-item">
                <span data-countdown="minutes">00</span>
                <label>MIN</label>
            </div>
            <div class="countdown-item">
                <span data-countdown="seconds">00</span>
                <label>SEG</label>
            </div>
        </div>
        
        <p class="release-date">Dia 25 de Dezembro, 2026</p>
    </div>
</section>


4. Camadas e Estilo (CSS/Tokens)
Elemento
Propriedade
Valor Base
Section
Background
nebulosa-quad.webp (Center/Cover)
Overlay Box
Backdrop-filter
blur(10px) - conforme OverlayBlur no Figma
Text Highlight
Color
Gradiente Amarelo/Rosa (conforme DESIGN.md)
Divider
Border-top
1px solid (Acentuação amarela)

5. Responsividade
Desktop: Contador alinhado horizontalmente com espaçamento flexível.
Mobile: Redução de escala do contador (conforme mobile-print-contador.png) para garantir que os 4 blocos caibam na largura da viewport.
Imagens: Estrelas flutuantes devem ser posicionadas via absolute com z-index inferior ao texto.
6. Contrato JavaScript
O script deve ler o atributo data-target-date da seção principal.
Deve atualizar os span que possuem o atributo data-countdown correspondente (days, hours, minutes, seconds).
Cálculo de tempo deve ser atualizado a cada 1000ms.
Caso a data expire, o contador deve travar em "00" ou disparar evento de "Lançado".
7. Checklist e Critérios de Aceite
O efeito de blur no container do contador deve permitir ver levemente o background da nebulosa.
O texto "estrela" e "agora" deve seguir exatamente o gradiente do Figma.
A data de estreia no rodapé deve ser estática conforme o design: "Dia 25 de Dezembro, 2026".
As estrelas decorativas não devem causar scroll horizontal em telas menores.
