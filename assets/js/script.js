// ── FADE-IN ON SCROLL ─────────────────────────
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1 }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── MOBILE NAV ────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
const setMenu = (open) => {
  navLinks.classList.toggle('open', open);
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  hamburger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
};
if (hamburger && navLinks) {
  navLinks.id = 'navLinks';
  hamburger.setAttribute('aria-controls', 'navLinks');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', (e) => { if (!e.target.closest('nav')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  matchMedia('(min-width: 861px)').addEventListener('change', () => setMenu(false));
}

// ── DARK / LIGHT TOGGLE ───────────────────────
const themeToggle = document.getElementById('themeToggle');
const html        = document.documentElement;
const saved       = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);
themeToggle.textContent = saved === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', next);
});

// ── TYPING ANIMATION ──────────────────────────
const phrases = [
  'Desarrollador Frontend',
  'Desarrollador Multiplataforma',
  'React · TypeScript · Kotlin',
  'Node.js · Spring Boot · Supabase',
];
let pi = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  if (!typingEl) return;
  const current = phrases[pi];
  typingEl.textContent = deleting ? current.slice(0, ci--) : current.slice(0, ci++);

  if (!deleting && ci > current.length) {
    deleting = true;
    setTimeout(type, 1800);
    return;
  }
  if (deleting && ci < 0) {
    deleting = false;
    pi = (pi + 1) % phrases.length;
    ci = 0;
    setTimeout(type, 400);
    return;
  }
  setTimeout(type, deleting ? 40 : 70);
}
type();

// ── STAT COUNTER ANIMATION ────────────────────
const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el     = e.target;
    const target = +el.dataset.target;
    let current  = 0;
    const step   = Math.ceil(target / 30);
    const tick   = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(tick);
    }, 40);
    statsObserver.unobserve(el);
  });
}, { threshold: 0.5 });
statNums.forEach(n => statsObserver.observe(n));

// ── ACTIVE NAV ON SCROLL ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 80) current = s.id;
  });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--text)' : '';
  });
}, { passive: true });

// ── TILT 3D EN TARJETAS DE PROYECTO ───────────
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.classList.add('tilting');
      card.style.transform = `rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('tilting');
      card.style.transform = '';
    });
  });
}

// ── "LA WEB SE CONSTRUYE" AL HACER SCROLL ─────
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js-build');

  const items = document.querySelectorAll(
    '.section-title, .about-text, .contact-list, .tech-group, .tech-extra, .timeline-item, ' +
    '.learn-card, .project-card, .edu-card, .contact-btn, .section-lead, .lab, .projects-more, .team'
  );
  items.forEach(el => el.classList.add('build-item'));

  // escalonado: cada elemento espera según su posición entre hermanos
  items.forEach(el => {
    const sibs = [...el.parentElement.children].filter(c => c.classList.contains('build-item'));
    el.style.setProperty('--bd', `${Math.min(sibs.indexOf(el), 6) * 110}ms`);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('built');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  items.forEach(el => io.observe(el));

  // barra superior + HUD tipo terminal
  const bar = Object.assign(document.createElement('div'), { className: 'build-progress' });
  const hud = Object.assign(document.createElement('div'), { className: 'build-hud' });
  hud.setAttribute('aria-hidden', 'true');
  document.body.append(bar, hud);

  const secs = [...document.querySelectorAll('section[id]')];
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(scrollY / max, 1) : 1;
    bar.style.transform = `scaleX(${p})`;
    let cur = secs[0];
    secs.forEach(s => { if (scrollY >= s.offsetTop - innerHeight * 0.4) cur = s; });
    const pct = Math.round(p * 100);
    hud.classList.toggle('done', pct >= 99);
    hud.innerHTML = pct >= 99
      ? '✓ build completo <span class="dim">· 100%</span>'
      : `⚙ montando <span class="dim">&lt;</span>${cur.id}<span class="dim"> /&gt; ·</span> ${pct}%`;
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();

  // ── TECNOLOGÍAS: primero el contenedor, luego cada recuadro y por último su icono
  const stepIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      stepIO.unobserve(e.target);
      const items = e.target.querySelectorAll('.tech-icon-item, .skill-tag');
      items.forEach((it, i) => {
        setTimeout(() => it.classList.add('framed'), 750 + i * 170);   // aparece el recuadro vacío
        setTimeout(() => it.classList.add('filled'), 750 + i * 170 + 420); // y después se "carga" el icono
      });
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.tech-group, .tech-extra').forEach(g => stepIO.observe(g));
})();
