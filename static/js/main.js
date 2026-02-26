// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
  document.querySelectorAll('.pupil').forEach(pupil => {
    const eye = pupil.parentElement;
    const rect = eye.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mouseX - cx, dy = mouseY - cy;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(12, Math.hypot(dx, dy) / 8);
    pupil.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`;
  });
});

(function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top = curY + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .project-card, .skill-card, .exp-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width = '60px'; cursor.style.height = '60px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width = '36px'; cursor.style.height = '36px'; });
});

// ── FACE INTRO via scroll container ──
const faceIntro = document.getElementById('face-intro');
const scrollTrack = document.getElementById('scrollTrack');
const mouthTop = document.getElementById('mouthTop');
const mouthBottom = document.getElementById('mouthBottom');
const mouthInside = document.getElementById('mouthInside');
const faceName = document.getElementById('faceName');
const faceScrollHint = document.getElementById('faceScrollHint');

let faceComplete = false;

scrollTrack.addEventListener('scroll', () => {
  if (faceComplete) return;
  const max = scrollTrack.scrollHeight - scrollTrack.clientHeight;
  const progress = scrollTrack.scrollTop / max;

  if (progress > 0.05) faceScrollHint.style.opacity = '0';

  const openAmount = progress * 130;
  mouthTop.style.transform = `translateY(${-openAmount}px)`;
  mouthBottom.style.transform = `translateY(${openAmount}px)`;
  mouthInside.style.height = (progress * 180) + 'px';
  faceName.style.opacity = progress > 0.5 ? ((progress - 0.5) * 2) : 0;
  document.querySelector('.face-eyes').style.transform = `scale(${1 + progress * 0.25})`;

  if (progress >= 0.98 && !faceComplete) {
    faceComplete = true;
    setTimeout(() => {
      faceIntro.style.transition = 'opacity 0.8s ease';
      faceIntro.style.opacity = '0';
      setTimeout(() => {
        faceIntro.style.display = 'none';
        setTimeout(() => {
          document.querySelectorAll('#hero .reveal-up').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 150);
          });
        }, 100);
      }, 800);
    }, 300);
  }
});

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── TYPED TEXT ── (ML removed, Frontend added)
const phrases = [
  'LLMs & RAG pipelines.',
  'LangChain & OpenAI.',
  'FastAPI & ChromaDB.',
  'Python & Generative AI.',
  'Agentic AI systems.',
  'React & Frontend Dev.',
  'HTML, CSS & JavaScript.'
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');
function type() {
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 42 : 72);
}
type();

// ── SCROLL REVEAL ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-up').forEach(el => revealObs.observe(el));

// ── SKILL BARS ──
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-card').forEach(el => skillObs.observe(el));

// ── ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 220) current = s.id; });
  navLinks.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === '#' + current); });
});






