// Header fixo aparece depois de rolar além da capa
const header = document.querySelector('.site-header');
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  header.classList.toggle('visible', window.scrollY > hero.offsetHeight * 0.6);
}, { passive: true });

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
