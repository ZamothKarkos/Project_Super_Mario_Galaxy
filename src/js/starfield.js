/**
 * Starfield canvas — decorativo, full-viewport. Ver docs/starfield-section-spec.md
 * @returns {() => void} cleanup — remove listeners e cancela o rAF
 */
function initStarfield() {
  function addMediaQueryListener(mq, handler) {
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handler);
    } else {
      mq.addListener(handler);
    }
  }

  function removeMediaQueryListener(mq, handler) {
    if (typeof mq.removeEventListener === 'function') {
      mq.removeEventListener('change', handler);
    } else {
      mq.removeListener(handler);
    }
  }

  const canvas = document.getElementById('starfield');
  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    return function noop() {};
  }

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) {
    return function noop() {};
  }

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  let rafId = 0;
  let stars = [];
  let glows = [];
  let dpr = 1;
  let clearColor = '#000000';
  let accentRgb = { r: 255, g: 210, b: 63 };
  let textRgb = { r: 245, g: 240, b: 232 };

  function trimHex(hex) {
    let h = hex.replace('#', '').trim();
    if (h.length === 3) {
      h = h
        .split('')
        .map((c) => c + c)
        .join('');
    }
    if (h.length !== 6) return null;
    const n = parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function readCssRgb(prop) {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
    if (raw.startsWith('#')) {
      const rgb = trimHex(raw);
      if (rgb) return rgb;
    }
    const probe = document.createElement('span');
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.color = `var(${prop})`;
    document.body.appendChild(probe);
    const computed = getComputedStyle(probe).color;
    probe.remove();
    const m = computed.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (m) return { r: +m[1], g: +m[2], b: +m[3] };
    return null;
  }

  function refreshPalette() {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--bg-deep').trim();
    if (raw.startsWith('#')) {
      clearColor = raw;
    } else {
      const bgRgb = readCssRgb('--bg-deep');
      clearColor = bgRgb ? `rgb(${bgRgb.r},${bgRgb.g},${bgRgb.b})` : '#000000';
    }
    accentRgb = readCssRgb('--accent-star') || accentRgb;
    textRgb = readCssRgb('--text-primary') || textRgb;
  }

  function buildGlows(w, h) {
    const long = Math.max(w, h);
    return [
      {
        nx: 0.22,
        ny: 0.18,
        r: 0.55,
        rgb: readCssRgb('--cosmic-purple') || { r: 106, g: 60, b: 188 },
        phase: 0.7,
        innerA: 0.07,
      },
      {
        nx: 0.78,
        ny: 0.72,
        r: 0.5,
        rgb: readCssRgb('--cosmic-cyan') || { r: 92, g: 224, b: 216 },
        phase: 2.1,
        innerA: 0.06,
      },
      {
        nx: 0.55,
        ny: 0.45,
        r: 0.42,
        rgb: readCssRgb('--cosmic-rose') || { r: 200, g: 80, b: 140 },
        phase: 4.2,
        innerA: 0.055,
      },
    ].map((g) => ({
      ...g,
      rPx: g.r * long,
    }));
  }

  /**
   * Cria os objetos que representam as estrelas baseando-se no tamanho da tela.
   * Divide as estrelas em 3 'layers' para dar a sensação de profundidade (Parallax 2D).
   */
  function buildStars(w, h) {
    const area = w * h;
    const count = Math.max(80, Math.floor(area / 5500));
    const list = [];
    for (let i = 0; i < count; i++) {
      const layer = Math.floor(Math.random() * 3);
      const rCssPx = (0.5 + Math.random() * 1.0) * 3;
      list.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rCssPx * dpr,
        layer,
        mix: Math.random(),
        baseAlpha: 0.45 + Math.random() * 0.5,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.00065 + Math.random() * 0.00055,
      });
    }
    return list;
  }

  function resize() {
    refreshPalette();
    const rect = canvas.getBoundingClientRect();
    dpr = Math.max(1, window.devicePixelRatio || 1);
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
    canvas.width = w;
    canvas.height = h;
    stars = buildStars(w, h);
    glows = buildGlows(w, h);
  }

  function lerpRgb(a, b, t) {
    return {
      r: Math.round(a.r + (b.r - a.r) * t),
      g: Math.round(a.g + (b.g - a.g) * t),
      b: Math.round(a.b + (b.b - a.b) * t),
    };
  }

  /**
   * Loop principal de renderização do canvas. Limpa a tela, desenha os 'glows' (brilhos)
   * e então desenha e move cada estrela baseando-se no tempo percorrido.
   */
  function drawFrame(timeMs) {
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = clearColor;
    ctx.fillRect(0, 0, w, h);

    const allowMotion = !document.hidden && !motionQuery.matches;
    const t = timeMs * 0.000015;

    for (let g = 0; g < glows.length; g++) {
      const G = glows[g];
      const drift = allowMotion ? Math.sin(t * 0.35 + G.phase) * 0.02 * w : 0;
      const driftY = allowMotion ? Math.cos(t * 0.28 + G.phase * 0.9) * 0.015 * h : 0;
      const cx = G.nx * w + drift;
      const cy = G.ny * h + driftY;
      const rad = G.rPx;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      grd.addColorStop(0, `rgba(${G.rgb.r},${G.rgb.g},${G.rgb.b},${G.innerA})`);
      grd.addColorStop(0.45, `rgba(${G.rgb.r},${G.rgb.g},${G.rgb.b},${G.innerA * 0.35})`);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);
    }

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      let x = s.x;
      let y = s.y;
      if (allowMotion) {
        const speed = (s.layer + 1) * 0.12;
        x += t * speed * 1.25 * (s.layer % 2 === 0 ? 1 : -1);
        y += t * speed * 0.35;
      }
      x = ((x % w) + w) % w;
      y = ((y % h) + h) % h;

      const col = lerpRgb(accentRgb, textRgb, s.mix * 0.35);
      ctx.fillStyle = `rgb(${col.r},${col.g},${col.b})`;
      let alpha = s.baseAlpha;
      if (allowMotion) {
        const pulse = 0.82 + 0.18 * Math.sin(timeMs * s.twinkleSpeed + s.twinklePhase);
        alpha *= pulse;
      }
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, s.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function shouldAnimate() {
    return !document.hidden && !motionQuery.matches;
  }

  function tick(timeMs) {
    rafId = 0;
    drawFrame(timeMs);
    if (shouldAnimate()) {
      rafId = window.requestAnimationFrame(tick);
    }
  }

  function startOrStopLoop() {
    window.cancelAnimationFrame(rafId);
    rafId = 0;
    if (shouldAnimate()) {
      rafId = window.requestAnimationFrame(tick);
    } else {
      drawFrame(performance.now());
    }
  }

  function onResize() {
    resize();
    startOrStopLoop();
  }

  function onVisibility() {
    startOrStopLoop();
  }

  function onMotionChange() {
    resize();
    startOrStopLoop();
  }

  resize();
  startOrStopLoop();

  window.addEventListener('resize', onResize, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  addMediaQueryListener(motionQuery, onMotionChange);

  return function cleanup() {
    window.cancelAnimationFrame(rafId);
    rafId = 0;
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibility);
    removeMediaQueryListener(motionQuery, onMotionChange);
  };
}

