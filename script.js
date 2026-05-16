/* ============================================================
   script.js — SciTech Connect: Society in the Age of Innovation
   STS Course Project
   ============================================================ */

/* ========== CUSTOM CURSOR (desktop only) ========== */
const isTouchDevice = () =>
  window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;

const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

if (!isTouchDevice()) {
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .member-card, .infographic-tab').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width      = '20px';
      cursor.style.height     = '20px';
      cursor.style.background = 'var(--neon-purple)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width      = '12px';
      cursor.style.height     = '12px';
      cursor.style.background = 'var(--neon-cyan)';
    });
  });

} else {
  cursor.style.display     = 'none';
  cursorRing.style.display = 'none';
  document.body.style.cursor = 'auto';
}

/* ========== HAMBURGER MENU ========== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ========== STARS CANVAS ========== */
const canvas = document.getElementById('stars-canvas');
const ctx    = canvas.getContext('2d');
let stars    = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.5 + 0.2,
      a:     Math.random(),
      speed: Math.random() * 0.003 + 0.001
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.a += s.speed;
    if (s.a > 1) s.a = 0;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,230,255,${s.a * 0.8})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

resizeCanvas();
initStars();
drawStars();
window.addEventListener('resize', () => { resizeCanvas(); initStars(); });

/* ========== FLOATING PARTICLES ========== */
function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.setProperty('--drift', (Math.random() * 100 - 50) + 'px');

  const colors = [
    'var(--neon-cyan)',
    'var(--neon-purple)',
    'var(--neon-pink)',
    'var(--neon-green)'
  ];
  p.style.background       = colors[Math.floor(Math.random() * colors.length)];
  p.style.animationDuration = (Math.random() * 12 + 8) + 's';
  p.style.animationDelay   = Math.random() * 5 + 's';

  document.body.appendChild(p);
  setTimeout(() => p.remove(), 20000);
}
setInterval(createParticle, 800);

/* ========== SCROLL REVEAL ========== */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(
        () => entry.target.classList.add('visible'),
        entry.target.dataset.delay || 0
      );
    }
  });
}, { threshold: 0.1 });

reveals.forEach((el, i) => {
  el.dataset.delay = (i % 9) * 80;
  revealObserver.observe(el);
});

/* ========== 3D TILT ON MEMBER CARDS ========== */
document.querySelectorAll('.tilt-3d').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform =
      `translateY(-8px) rotateX(${y * -15}deg) rotateY(${x * 15}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ========== INFOGRAPHIC TABS ========== */
const tabs   = document.querySelectorAll('.infographic-tab');
const panels = document.querySelectorAll('.infographic-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const idx = tab.dataset.tab;
    tabs.forEach(t   => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + idx).classList.add('active');
  });
});

/* ========== NAV ACTIVE STATE ON SCROLL ========== */
const sections   = document.querySelectorAll('section');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navAnchors.forEach(a => {
    const isActive = a.getAttribute('href') === '#' + current;
    a.style.color       = isActive ? 'var(--neon-cyan)'  : '';
    a.style.borderColor = isActive ? 'var(--neon-cyan)'  : 'transparent';
  });
});
