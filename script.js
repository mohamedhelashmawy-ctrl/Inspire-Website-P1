// ── Custom cursor ──────────────────────────────────────────────────────────
const cur = document.getElementById('cur');
const cr  = document.getElementById('cr');
if (cur && cr) {
  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
    cr.style.left  = e.clientX + 'px';
    cr.style.top   = e.clientY + 'px';
  });
  document.querySelectorAll('a,button,[onclick]').forEach(el => {
    el.addEventListener('mouseenter', () => cr.classList.add('h'));
    el.addEventListener('mouseleave', () => cr.classList.remove('h'));
  });
}

// ── Nav scroll effect ──────────────────────────────────────────────────────
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('sc', window.scrollY > 60);
  });
}

// ── Hamburger (mobile) ─────────────────────────────────────────────────────
const hbgBtn = document.getElementById('hbg-btn');
const nlinks = document.getElementById('nlinks');
if (hbgBtn && nlinks) {
  hbgBtn.addEventListener('click', () => {
    nlinks.classList.toggle('open');
    hbgBtn.classList.toggle('open');
  });
  nlinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nlinks.classList.remove('open');
      hbgBtn.classList.remove('open');
    });
  });
}

// ── Hero Ken Burns ─────────────────────────────────────────────────────────
const heroBg = document.getElementById('hbg');
if (heroBg) {
  setTimeout(() => heroBg.classList.add('go'), 100);
}

// ── Project filter tabs ────────────────────────────────────────────────────
document.querySelectorAll('.ftab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ftab').forEach(t => t.classList.remove('on'));
    tab.classList.add('on');
    const cat = tab.dataset.cat;
    document.querySelectorAll('.pcard').forEach(card => {
      if (cat === 'all' || card.dataset.c === cat) {
        card.classList.add('v');
      } else {
        card.classList.remove('v');
      }
    });
  });
});

// ── Scroll reveal ──────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Featured Projects Carousel ─────────────────────────────────────────────
(function () {
  const outer = document.getElementById('fcOuter');
  const track = document.getElementById('fcTrack');
  if (!outer || !track) return;
  const dotsWrap = document.getElementById('fcDots');
  const dots     = dotsWrap ? Array.from(dotsWrap.children) : [];
  const total    = track.children.length;
  let cur = 0, timer;

  function slideW() { return outer.clientWidth; }

  function goTo(n) {
    cur = (n + total) % total;
    track.style.transform = `translateX(-${cur * slideW()}px)`;
    dots.forEach((d, i) => d.classList.toggle('on', i === cur));
  }

  function startTimer() { timer = setInterval(() => goTo(cur + 1), 6000); }
  function stopTimer()  { clearInterval(timer); }

  document.getElementById('fcPrev')?.addEventListener('click', () => goTo(cur - 1));
  document.getElementById('fcNext')?.addEventListener('click', () => goTo(cur + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  // Recalculate position on resize
  window.addEventListener('resize', () => goTo(cur));

  // Touch swipe
  let tx = 0;
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? cur + 1 : cur - 1);
  }, { passive: true });

  // Pause on hover
  outer.addEventListener('mouseenter', stopTimer);
  outer.addEventListener('mouseleave', startTimer);

  startTimer();
})();

// ── Smooth scroll for anchor links ────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
