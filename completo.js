// Header fixo aparece depois de rolar além da capa
const header = document.querySelector('.site-header');
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  header.classList.toggle('visible', window.scrollY > hero.offsetHeight * 0.6);
}, { passive: true });

// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');

function closeMenu() {
  menu.classList.remove('open');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
  document.body.classList.remove('no-scroll');
}

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('no-scroll', open);
});

menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// Menu aberto: header precisa estar visível para fechar; Esc também fecha
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
});

// Animações de entrada
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
