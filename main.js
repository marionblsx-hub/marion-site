document.addEventListener('DOMContentLoaded', () => {
  // Cursor
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('follower');
  if (cursor && follower) {
    let mx=0,my=0,fx=0,fy=0;
    document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cursor.style.left=mx+'px'; cursor.style.top=my+'px'; });
    const anim = () => { fx+=(mx-fx)*.12; fy+=(my-fy)*.12; follower.style.left=fx+'px'; follower.style.top=fy+'px'; requestAnimationFrame(anim); };
    anim();
    document.querySelectorAll('a,button,input,select,textarea').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.style.transform='translate(-50%,-50%) scale(2)'; follower.style.opacity='.15'; });
      el.addEventListener('mouseleave', () => { cursor.style.transform='translate(-50%,-50%) scale(1)'; follower.style.opacity='.5'; });
    });
  }

  // Nav scroll
  const nav = document.getElementById('main-nav');
  if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), { passive: true });

  // Scroll reveal
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
