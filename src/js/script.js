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

document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initFloatingNav();
});
