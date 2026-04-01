document.addEventListener('DOMContentLoaded', () => {
  // ── Cursor (desktop seulement) ─────────────
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('follower');
  if (cursor && follower && window.matchMedia('(pointer:fine)').matches) {
    let mx=0,my=0,fx=0,fy=0;
    document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cursor.style.left=mx+'px'; cursor.style.top=my+'px'; });
    const anim = () => { fx+=(mx-fx)*.12; fy+=(my-fy)*.12; follower.style.left=fx+'px'; follower.style.top=fy+'px'; requestAnimationFrame(anim); };
    anim();
    document.querySelectorAll('a,button,input,select,textarea').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.style.transform='translate(-50%,-50%) scale(2)'; follower.style.opacity='.15'; });
      el.addEventListener('mouseleave', () => { cursor.style.transform='translate(-50%,-50%) scale(1)'; follower.style.opacity='.5'; });
    });
  } else if (cursor && follower) {
    // Cacher le curseur custom sur tactile
    cursor.style.display = 'none';
    follower.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  // ── Nav scroll ─────────────────────────────
  const nav = document.getElementById('main-nav');
  if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), { passive: true });

  // ── Menu hamburger ─────────────────────────
  const hamburger = document.getElementById('nav-hamburger');
  const overlay = document.getElementById('nav-mobile-overlay');
  if (hamburger && overlay) {
    const toggleMenu = (open) => {
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      if (open) {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // bloquer le scroll sous le menu
      } else {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    };

    hamburger.addEventListener('click', () => {
      const isOpen = overlay.classList.contains('open');
      toggleMenu(!isOpen);
    });

    // Fermer le menu au clic sur un lien
    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Fermer avec la touche Echap
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) toggleMenu(false);
    });
  }

  // ── Scroll reveal ──────────────────────────
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = +(e.target.dataset.delay || i * 70);
        setTimeout(() => e.target.classList.add('visible'), delay);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => obs.observe(el));
});
