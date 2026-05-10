const SECTION_IDS = ['hero', 'characters', 'trailers', 'release'];

function initFloatingNav() {
  const nav = document.getElementById('floating-nav');
  if (!nav) return;

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.getElementById('hero');
  const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
  const links = nav.querySelectorAll('[data-nav-anchor]');

  let scrollRaf = 0;

  function getThreshold() {
    if (!hero) return 400;
    return hero.offsetHeight * 0.6;
  }

  function updateVisibility() {
    const show = window.scrollY >= getThreshold();
    nav.classList.toggle('visible', show);
    nav.setAttribute('aria-hidden', show ? 'false' : 'true');
    links.forEach((link) => {
      if (show) link.removeAttribute('tabindex');
      else link.setAttribute('tabindex', '-1');
    });
  }

  function resolveActiveSectionId() {
    if (!sections.length) return 'hero';

    const midY = window.innerHeight * 0.5;

    for (const section of sections) {
      const r = section.getBoundingClientRect();
      if (r.top <= midY && r.bottom >= midY) return section.id;
    }

    for (let i = sections.length - 1; i >= 0; i--) {
      const r = sections[i].getBoundingClientRect();
      if (r.top <= midY) return sections[i].id;
    }

    return sections[0].id;
  }

  function updateActiveLink() {
    const activeId = resolveActiveSectionId();
    links.forEach((link) => {
      const href = link.getAttribute('href');
      const id = href && href.startsWith('#') ? href.slice(1) : '';
      link.classList.toggle('is-active', id === activeId);
    });
  }

  function syncNavState() {
    updateVisibility();
    updateActiveLink();
  }

  function onScrollOrResize() {
    if (scrollRaf) return;
    scrollRaf = window.requestAnimationFrame(() => {
      scrollRaf = 0;
      syncNavState();
    });
  }

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: motionQuery.matches ? 'auto' : 'smooth',
      });
      if (history.replaceState) {
        history.replaceState(null, '', href);
      }
    });
  });

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize);

  syncNavState();
}


function initScrollAnim() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  const els = {
    mario: hero.querySelector('.hero__asset--mario'),
    yoshi: hero.querySelector('.hero__asset--yoshi'),
    planet: hero.querySelector('.hero__asset--planet'),
    content: hero.querySelector('.hero__content'),
    starLeft: hero.querySelector('.hero__luma--left'),
    starRight: hero.querySelector('.hero__luma--right'),
    starCenter: hero.querySelector('.hero__luma--scroll')
  };

  function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  function mapRange(val, inMin, inMax, outMin, outMax) {
    return outMin + (outMax - outMin) * ((val - inMin) / (inMax - inMin));
  }

  let rafId = null;

  function onScroll() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      if (motionQuery.matches) return;

      const rect = hero.getBoundingClientRect();
      const heroHeight = rect.height;
      
      let rawProgress = window.scrollY / heroHeight;
      if (rawProgress < 0) rawProgress = 0;
      if (rawProgress > 1) rawProgress = 1;

      if (els.mario) {
        let p = rawProgress;
        let eased = easeOutExpo(p);
        let y = mapRange(eased, 0, 1, 0, -200);
        let rot = mapRange(eased, 0, 1, 0, 8);
        let op = mapRange(eased, 0, 1, 1, 0.3);
        els.mario.style.transform = `translateY(${y}px) rotate(${rot}deg)`;
        els.mario.style.opacity = op;
      }

      if (els.yoshi) {
        let p = rawProgress;
        let eased = easeOutExpo(p);
        let y = mapRange(eased, 0, 1, 0, -180);
        let rot = mapRange(eased, 0, 1, 0, -6);
        let op = mapRange(eased, 0, 1, 1, 0.3);
        els.yoshi.style.transform = `scaleX(-1) translateY(${y}px) rotate(${rot}deg)`;
        els.yoshi.style.opacity = op;
      }

      if (els.planet) {
        let p = (rawProgress - 0.1) / (0.9 - 0.1);
        p = Math.max(0, Math.min(1, p));
        let eased = easeOutExpo(p);
        let y = mapRange(eased, 0, 1, 0, 120);
        let scale = mapRange(eased, 0, 1, 1, 1.3);
        let op = mapRange(eased, 0, 1, 1, 0);
        els.planet.style.transform = `translateX(-50%) translateY(${y}px) scale(${scale})`;
        els.planet.style.opacity = op;
      }

      if (els.content) {
        let p = rawProgress / 0.5;
        p = Math.max(0, Math.min(1, p));
        let eased = easeOutExpo(p);
        let y = mapRange(eased, 0, 1, 0, -100);
        let op = mapRange(eased, 0, 1, 1, 0);
        els.content.style.transform = `translateY(${y}px)`;
        els.content.style.opacity = op;
      }

      if (els.starLeft) {
        let p = rawProgress;
        let eased = easeOutExpo(p);
        let y = mapRange(eased, 0, 1, 0, -350);
        let rot = mapRange(eased, 0, 1, 0, 45);
        els.starLeft.style.transform = `translateY(${y}px) rotate(${rot}deg)`;
      }

      if (els.starRight) {
        let p = rawProgress;
        let eased = easeOutExpo(p);
        let y = mapRange(eased, 0, 1, 0, -300);
        let rot = mapRange(eased, 0, 1, 0, -30);
        els.starRight.style.transform = `translateY(${y}px) rotate(${rot}deg)`;
      }

      if (els.starCenter) {
        let p = (rawProgress - 0.2) / (0.8 - 0.2);
        p = Math.max(0, Math.min(1, p));
        let eased = easeOutExpo(p);
        let scale = mapRange(eased, 0, 1, 1, 4.0);
        let op = mapRange(eased, 0, 1, 1, 0);
        els.starCenter.style.transform = `scale(${scale})`;
        els.starCenter.style.opacity = op;
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initFloatingNav();
  initScrollAnim();
});

// A inicialização das partículas (anteriormente initPersonagensBg)
// agora é feita automaticamente via src/js/particles.js