(function () {
  'use strict';

  // ─── Theme ───────────────────────────────────────────────────────────────────
  const html      = document.documentElement;
  const themeBtn  = document.getElementById('toggle-tema');
  const themeIcon = document.getElementById('tema-icon');

  let theme = localStorage.getItem('tema') || 'dark';
  applyTheme(theme);

  function applyTheme(t) {
    html.setAttribute('data-theme', t);
    themeIcon.textContent = t === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('tema', t);
    theme = t;
  }

  themeBtn.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));

  // ─── Mobile nav toggle (hambúrguer) ────────────────────────────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const navPanel  = document.getElementById('nav-links');

  function setNavOpen(open) {
    navPanel.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  navToggle.addEventListener('click', () => setNavOpen(!navPanel.classList.contains('open')));
  navPanel.addEventListener('click', e => { if (e.target.closest('.nav-link')) setNavOpen(false); });

  document.addEventListener('click', e => {
    if (navPanel.classList.contains('open') && !navPanel.contains(e.target) && !navToggle.contains(e.target)) {
      setNavOpen(false);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navPanel.classList.contains('open')) setNavOpen(false);
  });

  // ─── Active nav link on scroll ────────────────────────────────────────────────
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

  // ─── Scroll reveal ────────────────────────────────────────────────────────────
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ─── Project expand toggle ────────────────────────────────────────────────────
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    const panel   = document.getElementById(btn.dataset.target);
    const chevron = btn.querySelector('.toggle-chevron');
    const label   = btn.querySelector('.toggle-label');
    if (!panel) return;

    btn.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      chevron.classList.toggle('open', open);
      label.textContent = open ? 'Ocultar detalhes' : 'Ver detalhes';
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // ─── Toast ───────────────────────────────────────────────────────────────────
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4200);
  }

  function initToast() {
    const hoje   = new Date().toLocaleDateString('pt-BR');
    const ultima = localStorage.getItem('ultimaVisita');
    localStorage.setItem('ultimaVisita', hoje);

    if (!ultima)           showToast('👋 Bem-vindo ao meu portfólio!');
    else if (ultima !== hoje) showToast('🙌 Bem-vindo de volta!');
  }

  setTimeout(initToast, 900);

  // ─── Smooth anchor scroll ─────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

})();
