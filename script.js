// ============================================================
// PORTFOLIO SCRIPT  v2
// Atharv Srivastava
//
// Sections:
//  1.  Utility helpers
//  2.  Loader
//  3.  Custom cursor
//  4.  Navbar (scroll + active link)
//  5.  Hamburger / mobile menu
//  6.  Hero typing effect  ← edit ROLES array here
//  7.  Scroll progress bar
//  8.  Scroll reveal (IntersectionObserver)
//  9.  Stat counters  ← supports data-decimal
//  10. Project filter
//  11. Theme toggle (dark / light)
//  12. Back-to-top button
//  13. Modal (projects + certifications)
//  14. Three.js particle background
//  15. Smooth anchor scroll
// ============================================================

'use strict';

/* ── 1. Utility helpers ────────────────────────────────────── */
const $  = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

/* ── DOM ready ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initNavbar();
  initHamburger();
  initHeroTyping();   // ← Edit roles inside this function
  initScrollProgress();
  initScrollReveal();
  initStatCounters();
  initProjectFilter();
  initThemeToggle();
  initBackToTop();
  initThreeJS();
  initSmoothScroll();
});

/* ── 2. Loader ────────────────────────────────────────────── */
function initLoader() {
  const loader = $('#loader');
  if (!loader) return;
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    loader.classList.add('hide');
    document.body.style.overflow = '';
  }, 2000);
}

/* ── 3. Custom cursor (desktop only) ─────────────────────── */
function initCursor() {
  const dot  = $('#cursor-dot');
  const ring = $('#cursor-ring');
  if (!dot || !ring) return;
  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display = ring.style.display = 'none';
    return;
  }

  let mx = 0, my = 0, rx = 0, ry = 0;
  const lerp = (a, b, t) => a + (b - a) * t;

  on(document, 'mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function tick() {
    rx = lerp(rx, mx, 0.11);
    ry = lerp(ry, my, 0.11);
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  })();

  $$('a, button, .project-card, .cert-card, .filter-btn, .glass-card').forEach(el => {
    on(el, 'mouseenter', () => document.body.classList.add('cursor-hover'));
    on(el, 'mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ── 4. Navbar — scroll state + active link ───────────────── */
function initNavbar() {
  const navbar = $('#navbar');
  if (!navbar) return;

  const update = () => {
    // Scrolled state
    navbar.classList.toggle('scrolled', window.scrollY > 24);

    // Active link highlighting
    const sections = $$('section[id]');
    let active = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) active = sec.id;
    });
    $$('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.section === active));
  };

  on(window, 'scroll', update, { passive: true });
  update();
}

/* ── 5. Hamburger menu ─────────────────────────────────────── */
function initHamburger() {
  const btn  = $('#hamburger');
  const menu = $('#mobile-menu');
  if (!btn || !menu) return;

  const toggle = () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
  };

  on(btn, 'click', toggle);
  $$('.mobile-link').forEach(link => on(link, 'click', () => {
    btn.classList.remove('open');
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  }));
}

/* ── 6. Hero typing effect ─────────────────────────────────── */
// ── EDIT THIS ARRAY to change the rotating roles ──────────
const ROLES = [
  'AI / ML Engineer',
  'Data Scientist',
  'CS Researcher',
  'Flask Developer',
  'Problem Solver',
];

function initHeroTyping() {
  const el = $('#hero-role');
  if (!el) return;

  let rIdx = 0, cIdx = 0, deleting = false;
  const CURSOR = '|';
  const PAUSE  = 1800; // ms to pause at end of word

  const type = () => {
    const word = ROLES[rIdx];
    el.textContent = (deleting ? word.slice(0, cIdx - 1) : word.slice(0, cIdx + 1)) + CURSOR;

    if (!deleting) {
      cIdx++;
      if (cIdx > word.length) { deleting = true; setTimeout(type, PAUSE); return; }
    } else {
      cIdx--;
      if (cIdx < 0)  { deleting = false; cIdx = 0; rIdx = (rIdx + 1) % ROLES.length; }
    }
    setTimeout(type, deleting ? 48 : 85);
  };

  setTimeout(type, 2200); // start after loader hides
}

/* ── 7. Scroll progress bar ────────────────────────────────── */
function initScrollProgress() {
  const bar = $('#scroll-progress');
  if (!bar) return;
  on(window, 'scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ── 8. Scroll reveal ──────────────────────────────────────── */
function initScrollReveal() {
  const els = $$('.reveal-up, .reveal-left, .reveal-right');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ── 9. Stat counters ─────────────────────────────────────── */
// Supports:
//   data-count   — integer to count up to
//   data-decimal — decimal string to append when done (e.g. ".78")
function initStatCounters() {
  const stats = $$('.stat-num[data-count]');
  if (!stats.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el      = e.target;
      const target  = parseInt(el.dataset.count, 10);
      const decimal = el.dataset.decimal || '';
      const dur     = 1400; // animation duration ms
      const step    = Math.max(1, Math.ceil(target / (dur / 16)));
      let   current = 0;

      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (current === target ? decimal : '');
        if (current >= target) clearInterval(timer);
      }, 16);

      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => obs.observe(el));
}

/* ── 10. Project filter ────────────────────────────────────── */
function initProjectFilter() {
  const btns  = $$('.filter-btn');
  const cards = $$('.project-card');
  if (!btns.length || !cards.length) return;

  btns.forEach(btn => on(btn, 'click', () => {
    btns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    btn.classList.add('active'); btn.setAttribute('aria-selected','true');

    const f = btn.dataset.filter;
    cards.forEach(c => {
      const show = f === 'all' || c.dataset.category === f;
      c.classList.toggle('hidden', !show);
    });
  }));
}

/* ── 11. Theme toggle ──────────────────────────────────────── */
function initThemeToggle() {
  const btn = $('#theme-toggle');
  if (!btn) return;
  if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-mode');

  on(btn, 'click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  });
}

/* ── 12. Back-to-top ───────────────────────────────────────── */
function initBackToTop() {
  const btn = $('#back-top');
  if (!btn) return;
  on(window, 'scroll', () => btn.classList.toggle('visible', window.scrollY > 480), { passive: true });
  on(btn, 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── 13. Modal (projects + certs) ─────────────────────────── */
function openProjectModal(card) {
  const overlay = $('#modal-overlay');
  if (!overlay) return;
  const d = card.dataset;

  $('#modal-img').src           = d.img   || '';
  $('#modal-img').alt           = d.title || '';
  $('#modal-title-el').textContent = d.title || '';
  $('#modal-desc').textContent  = d.desc  || '';

  const tagsEl = $('#modal-tags');
  tagsEl.innerHTML = '';
  if (d.tags) {
    d.tags.split(',').forEach(t => {
      const s = document.createElement('span');
      s.className = 'tag'; s.textContent = t.trim();
      tagsEl.appendChild(s);
    });
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openCertModal(card) {
  const overlay = $('#modal-overlay');
  if (!overlay) return;
  const d = card.dataset;

  $('#modal-img').src           = d.img    || '';
  $('#modal-img').alt           = d.title  || '';
  $('#modal-title-el').textContent = d.title  || '';
  $('#modal-desc').textContent  = d.issuer ? `Issued by ${d.issuer}` : '';
  $('#modal-tags').innerHTML    = '';

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = $('#modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close on overlay click or Escape
on($('#modal-overlay'), 'click', closeModal);
on(document, 'keydown', e => { if (e.key === 'Escape') closeModal(); });

// Expose to HTML inline onclick
window.openProjectModal = openProjectModal;
window.openCertModal    = openCertModal;
window.closeModal       = closeModal;

/* ── 14. Three.js particle background ──────────────────────── */
// Adjust PARTICLE_COUNT and CONNECT_DIST for performance vs density
function initThreeJS() {
  const canvas = $('#bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const isMobile = window.innerWidth < 768;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 800);
  camera.position.z = 6;

  /* --- Particle field --- */
  const COUNT = isMobile ? 600 : 1400;
  const pos   = new Float32Array(COUNT * 3);
  const col   = new Float32Array(COUNT * 3);

  const c1 = new THREE.Color(0x5b52e8); // accent
  const c2 = new THREE.Color(0x06b6d4); // cyan
  const c3 = new THREE.Color(0x8b5cf6); // violet

  for (let i = 0; i < COUNT; i++) {
    pos[i*3]   = (Math.random() - .5) * 20;
    pos[i*3+1] = (Math.random() - .5) * 16;
    pos[i*3+2] = (Math.random() - .5) * 10;
    const t = Math.random();
    const c = t < .5 ? c1 : t < .8 ? c2 : c3;
    col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.04, vertexColors: true,
    transparent: true, opacity: 0.65, depthWrite: false,
  });
  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  /* --- Connection lines (static, small subset for perf) --- */
  const SUBSET = isMobile ? 100 : 180;
  const DIST   = 2.4;
  const lineMat = new THREE.LineBasicMaterial({ color: 0x5b52e8, transparent: true, opacity: 0.07 });

  for (let i = 0; i < SUBSET; i++) {
    for (let j = i + 1; j < SUBSET; j++) {
      const xi = pos[i*3], yi = pos[i*3+1], zi = pos[i*3+2];
      const xj = pos[j*3], yj = pos[j*3+1], zj = pos[j*3+2];
      if (Math.hypot(xi-xj, yi-yj, zi-zj) < DIST) {
        const lg = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(xi,yi,zi), new THREE.Vector3(xj,yj,zj),
        ]);
        scene.add(new THREE.Line(lg, lineMat));
      }
    }
  }

  /* --- Mouse parallax --- */
  let mx = 0, my = 0;
  on(document, 'mousemove', e => {
    mx = (e.clientX / window.innerWidth  - .5) * 1.2;
    my = (e.clientY / window.innerHeight - .5) * 1.2;
  });

  /* --- Resize --- */
  on(window, 'resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* --- Animation loop --- */
  let t = 0;
  (function animate() {
    requestAnimationFrame(animate);
    t += 0.0025;
    particles.rotation.y = t * 0.05  + mx * 0.06;
    particles.rotation.x = t * 0.025 + my * 0.04;
    mat.opacity = 0.45 + Math.sin(t * 1.2) * 0.12;
    camera.position.x += (mx * 0.4 - camera.position.x) * 0.02;
    camera.position.y += (-my * 0.4 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  })();
}

/* ── 15. Smooth anchor scroll ──────────────────────────────── */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(a => {
    on(a, 'click', e => {
      const target = $(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 74,
        behavior: 'smooth',
      });
    });
  });
}