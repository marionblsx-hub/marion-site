// ═══════════════════════════════════════
//   MARION BALSAUX — main.js
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ─── CURSOR ──────────────────────────
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('follower');
  if (cursor && follower) {
    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });
    const animF = () => {
      fx += (mx - fx) * .12;
      fy += (my - fy) * .12;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(animF);
    };
    animF();
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2)'; follower.style.opacity = '.2'; });
      el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; follower.style.opacity = '.5'; });
    });
  }

  // ─── NAV SCROLL ──────────────────────
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), { passive: true });
  }

  // ─── ACTIVE NAV LINK ─────────────────
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path || (path.endsWith('/') && a.getAttribute('href') === path.slice(0,-1))) {
      a.classList.add('active');
    }
  });

  // ─── SCROLL REVEAL ───────────────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          const delay = e.target.dataset.delay || i * 80;
          setTimeout(() => e.target.classList.add('visible'), +delay);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));
  }

  // ─── MOBILE MENU ─────────────────────
  const mobileBtn = document.querySelector('.nav-mobile-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

});
