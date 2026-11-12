/* ════════════════════════════════════════════════════════════
   CREW · un equipo de cursores "construyendo" la página en vivo
   - Los textos con [data-type] se escriben letra a letra por un cursor
   - Las fotos con [data-photo] se "revelan" cuando un cursor las coloca
   - Las tarjetas reciben un clic de un cursor al montarse
   - Varios cursores merodean por la pantalla como en una sesión colaborativa
   Sin JS o con "reducir movimiento" la página se ve completa y estática.
   ════════════════════════════════════════════════════════════ */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const AGENTS = [
    { n: 'claude-code',          c: '#5eead4' },
    { n: 'ui-designer',          c: '#f472b6' },
    { n: 'frontend-developer',   c: '#38bdf8' },
    { n: 'react-specialist',     c: '#a78bfa' },
    { n: 'code-reviewer',        c: '#fbbf24' },
    { n: 'accessibility-tester', c: '#fb923c' },
    { n: 'seo-specialist',       c: '#2dd4bf' },
    { n: 'technical-writer',     c: '#f87171' },
  ];
  const touch   = matchMedia('(pointer: coarse)').matches;
  const MAX     = touch ? 6 : 14;
  const WANDER  = 0; // sin cursores de adorno: solo uno por tarea
  const sleep   = (ms) => new Promise(r => setTimeout(r, ms));
  const rnd     = (a, b) => a + Math.random() * (b - a);

  document.documentElement.classList.add('crew-on');

  /* ── CURSORES ─────────────────────────────── */
  const cursors = [];
  let agentIdx = 0;

  class Cursor {
    constructor() {
      const a = AGENTS[agentIdx++ % AGENTS.length];
      this.el = document.createElement('div');
      this.el.className = 'crew-cursor';
      this.el.style.setProperty('--c', a.c);
      this.el.setAttribute('aria-hidden', 'true');
      this.el.innerHTML =
        '<svg viewBox="0 0 24 24"><path d="M3 2l7.5 19 2.7-7.8L21 10.5z" fill="var(--c)" stroke="#0a0f14" stroke-width="1.4" stroke-linejoin="round"/></svg>';
      document.body.append(this.el);
      // entra desde un borde de la pantalla
      const side = Math.random() < 0.5;
      this.x = side ? -40 : innerWidth + 40;
      this.y = rnd(80, innerHeight - 80);
      this.tx = this.x; this.ty = this.y;
      this.speed = rnd(0.07, 0.13);
      this.getTarget = null;
      this.busy = false;
      this.nextWander = 0;
      // zona de reposo: margen izquierdo o derecho, repartidos en vertical
      const i = cursors.length;
      this.side = i % 2;
      this.homeY = 110 + ((i * 83) % Math.max(200, innerHeight - 240));
      cursors.push(this);
    }
    go(fn) { this.getTarget = fn; this.el.classList.remove('parked'); }
    dist() { return Math.hypot(this.tx - this.x, this.ty - this.y); }
    click() {
      this.el.classList.remove('click');
      void this.el.offsetWidth;
      this.el.classList.add('click');
    }
    tick(now) {
      if (this.getTarget) {
        const t = this.getTarget();
        if (t) { this.tx = t.x; this.ty = t.y; }
      } else if (now > this.nextWander) {
        // en reposo: pegado a un lateral, con un desplazamiento vertical muy pequeño
        this.tx = this.side ? innerWidth - rnd(40, 58) : rnd(14, 30);
        this.homeY = Math.max(90, Math.min(innerHeight - 80, this.homeY + rnd(-28, 28)));
        this.ty = this.homeY;
        this.nextWander = now + rnd(6000, 11000);
        if (Math.random() < 0.15) setTimeout(() => this.click(), 700);
      }
      // trayectoria suave con un pequeño temblor humano
      this.x += (this.tx - this.x) * this.speed + Math.sin(now / 230 + this.speed * 90) * 0.35;
      this.y += (this.ty - this.y) * this.speed + Math.cos(now / 270 + this.speed * 70) * 0.35;
      this.el.style.transform = `translate3d(${this.x.toFixed(1)}px,${this.y.toFixed(1)}px,0)`;
    }
    release() { this.getTarget = null; this.busy = false; this.nextWander = 0; this.speed = rnd(0.035, 0.06); this.el.classList.add('parked'); }
  }

  function acquire() {
    let c = cursors.find(k => !k.busy);
    if (!c && cursors.length < MAX) c = new Cursor();
    if (c) { c.busy = true; c.speed = rnd(0.09, 0.15); c.el.classList.remove('parked'); }
    return c || null;
  }

  for (let i = 0; i < WANDER; i++) setTimeout(() => new Cursor(), 600 + i * 450);

  /* ── MARCOS DE SELECCIÓN (estilo editor visual) ── */
  const boxes = new Set();
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  function attachBox(rectFn, tagFn) {
    const b = document.createElement('div');
    b.className = 'wp-box';
    b.setAttribute('aria-hidden', 'true');
    b.innerHTML = '<i class="h tl"></i><i class="h tr"></i><i class="h bl"></i><i class="h br"></i>' +
                  '<i class="h tm"></i><i class="h bm"></i><i class="h ml"></i><i class="h mr"></i><span class="tag"></span>';
    document.body.append(b);
    const rec = { b, rectFn, tagFn, tag: b.querySelector('.tag') };
    boxes.add(rec);
    return () => { boxes.delete(rec); b.classList.add('out'); setTimeout(() => b.remove(), 350); };
  }
  function drawBoxes() {
    boxes.forEach((r) => {
      const q = r.rectFn();
      if (!q) return;
      const s = r.b.style;
      s.left = q.left + 'px'; s.top = q.top + 'px';
      s.width = q.width + 'px'; s.height = q.height + 'px';
      r.tag.textContent = r.tagFn();
    });
  }
  /** Anima un valor 0→1 con easing durante `ms` llamando a `fn(p)`. */
  const tween = (ms, fn) => new Promise(res => {
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / ms);
      fn(ease(p));
      if (p < 1) requestAnimationFrame(step); else res();
    };
    requestAnimationFrame(step);
  });

  let raf = 0;
  const loop = (now) => {
    raf = requestAnimationFrame(loop);
    try { cursors.forEach(c => c.tick(now)); drawBoxes(); } catch (e) { /* un fallo no debe congelar la escena */ }
  };
  raf = requestAnimationFrame(loop);
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(raf);
    if (!document.hidden) raf = requestAnimationFrame(loop);
  });

  async function arrive(c, timeout = 1100) {
    const t0 = performance.now();
    while (c && c.dist() > 36 && performance.now() - t0 < timeout) await sleep(50);
  }

  /* ── ESCRITURA LETRA A LETRA ──────────────── */
  const typed = [];
  function prepType(el) {
    const plan = [];
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode());) if (n.nodeValue.trim()) plan.push({ n, full: n.nodeValue });
    if (!plan.length) return;
    el._plan = plan;
    el._total = plan.reduce((s, p) => s + p.full.length, 0);
    el._k = 0;
    // copia accesible: lectores de pantalla, buscador y rastreadores ven el texto completo
    el._sr = document.createElement('span');
    el._sr.className = 'sr-only';
    el._sr.textContent = plan.map(p => p.full).join('').trim();
    const h = el.offsetHeight;
    if (h > 0) el.style.minHeight = h + 'px'; // evita saltos de layout mientras se escribe
    plan.forEach(p => { p.n.nodeValue = ''; });
    el.prepend(el._sr);
    typed.push(el);
  }
  function render(el, k) {
    let left = k;
    for (const p of el._plan) {
      const take = Math.max(0, Math.min(p.full.length, left));
      p.n.nodeValue = p.full.slice(0, take);
      left -= take;
    }
    el._k = k;
  }
  function finishText(el) {
    render(el, el._total);
    el.style.minHeight = '';
    el.style.fontSize = '';
    el._sr?.remove();
    el._done = true;
  }
  function caretPos(el) {
    const r = document.createRange();
    for (let i = el._plan.length - 1; i >= 0; i--) {
      const p = el._plan[i], len = p.n.nodeValue.length;
      if (len > 0) {
        r.setStart(p.n, len - 1); r.setEnd(p.n, len);
        const b = r.getBoundingClientRect();
        if (b.width || b.height) return { x: b.right, y: b.bottom - 2 };
      }
    }
    const b = el.getBoundingClientRect();
    return { x: b.left, y: b.top + 18 };
  }
  /** Rectángulo ajustado al texto ya escrito (marco de selección). */
  function textRect(el, fallbackSize) {
    const plan = el._plan, last = plan[plan.length - 1];
    const e = el.getBoundingClientRect();
    const r = document.createRange();
    r.setStart(plan[0].n, 0);
    r.setEnd(last.n, last.n.nodeValue.length);
    const b = r.getBoundingClientRect();
    const has = b.width > 0 && b.height > 0;
    return {
      left:   (has ? b.left : e.left) - 4,
      top:    (has ? b.top : e.top) - 3,
      width:  (has ? b.width : 28) + 8,
      height: (has ? b.height : fallbackSize * 1.25) + 6,
    };
  }

  async function runType(el, delay) {
    await sleep(delay);
    const c = acquire();
    let stop = () => {};
    try {
      const finalSize = parseFloat(getComputedStyle(el).fontSize) || 16;
      const START = 0.62;
      el.style.fontSize = (finalSize * START).toFixed(1) + 'px'; // se escribe pequeño…
      if (c) { c.go(() => caretPos(el)); await arrive(c); }
      stop = attachBox(() => textRect(el, finalSize),
        () => `${el.tagName.toLowerCase()} · ${Math.round(parseFloat(el.style.fontSize) || finalSize)}px`);

      const total = el._total;
      const dur = Math.max(450, Math.min(total * 26, 1700));
      const t0 = performance.now();
      await new Promise(res => {
        const step = (now) => {
          const k = Math.min(total, Math.floor(((now - t0) / dur) * total));
          if (k !== el._k) render(el, k);
          if (k < total) requestAnimationFrame(step); else res();
        };
        requestAnimationFrame(step);
      });

      // …y el cursor arrastra la esquina del marco para agrandar el texto
      if (c) {
        c.go(() => { const q = textRect(el, finalSize); return { x: q.left + q.width, y: q.top + q.height }; });
        await arrive(c, 700);
        c.click();
      }
      await tween(800, (p) => { el.style.fontSize = (finalSize * (START + (1 - START) * p)).toFixed(2) + 'px'; });
      await sleep(250);
    } finally {
      stop();
      finishText(el);
      if (c) { await sleep(300); c.release(); }
    }
  }

  /* ── FOTOS: el cursor las coloca y redimensiona ── */
  async function runPhoto(el, delay) {
    await sleep(delay);
    const img = el.querySelector('img');
    if (!img) { el.classList.add('developed'); return; }
    const avatar = el.classList.contains('avatar-ring');
    const S0 = avatar ? 0.55 : 0.5;
    img.style.transformOrigin = avatar ? '50% 50%' : '0 0';
    img.style.transform = `scale(${S0})`;
    const c = acquire();
    let stop = () => {};
    try {
      const rect = () => img.getBoundingClientRect();
      stop = attachBox(rect, () => { const r = rect(); return `${Math.round(r.width)} × ${Math.round(r.height)}`; });
      if (c) {
        c.go(() => { const r = rect(); return { x: r.right, y: r.bottom }; }); // agarra el tirador inferior derecho
        await arrive(c, 1400);
        c.click();
      }
      el.classList.add('developed');
      await tween(1000, (p) => { img.style.transform = `scale(${(S0 + (1 - S0) * p).toFixed(3)})`; });
      await sleep(350);
    } finally {
      stop();
      img.style.transform = '';
      img.style.transformOrigin = '';
      el.classList.add('developed');
      if (c) c.release();
    }
  }

  /* ── ARRANQUE ─────────────────────────────── */
  try {
    document.querySelectorAll('[data-type]').forEach(prepType);
  } catch (e) {
    typed.forEach(finishText); // si algo falla, el texto siempre queda visible
  }

  // al cargar las fuentes cambian las alturas: recalcula el espacio reservado
  document.fonts?.ready.then(() => {
    typed.forEach((el) => {
      if (el._done || el._k > 0) return;
      render(el, el._total);
      const h = el.offsetHeight;
      render(el, 0);
      el.style.minHeight = h > 0 ? h + 'px' : '';
    });
  });

  const watch = (selector, handler, opts = {}) => {
    const els = document.querySelectorAll(selector);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        handler(e.target, i * 140 + (opts.base || 0)).catch(() => {});
      });
    }, { threshold: opts.threshold ?? 0.35 });
    els.forEach(el => io.observe(el));
  };

  watch('[data-type]', (el, d) => runType(el, d), { threshold: 0.4 });
  watch('[data-photo]', (el, d) => runPhoto(el, d + 200), { threshold: 0.3 });

  // impresión: mostrar todo completo
  addEventListener('beforeprint', () => {
    typed.forEach(finishText);
    document.querySelectorAll('[data-photo]').forEach(el => el.classList.add('developed'));
  });
})();
