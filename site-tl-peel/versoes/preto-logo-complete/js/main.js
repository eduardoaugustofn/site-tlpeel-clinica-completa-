/* =========================================================
   COMPLETE PEEL — comportamento
   1. Links e avisos     2. Cor do menu        3. Menu do celular
   4. Vídeos e player    5. Trilho de vídeos   6. Troca de idioma
   7. Abertura: a logo se escreve com a rolagem
   O conteúdo da página aparece inteiro mesmo sem este arquivo; a única
   animação automática é a da logo.
   ========================================================= */
(() => {
  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const site = window.SITE || { links: {}, videos: {} };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Texto no idioma escolhido (as traduções ficam em js/i18n.js)
  const t = (key) => (window.I18N ? window.I18N.t(key) : key);

  /* ---------- 1. Links e avisos ---------- */
  const toastEl = $('.toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2600);
  }

  $$('[data-link]').forEach((a) => {
    const url = (site.links || {})[a.dataset.link];
    if (url) {
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
    } else {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        toast(t('toast.nolink'));
      });
    }
  });

  /* ---------- 2. Cor do menu ----------
     Preto enquanto a abertura (preta) está atrás dele; branco depois. */
  const nav = $('.nav');
  const firstLight = $('#apresentacao');
  function updateNav() {
    const overHero = firstLight.getBoundingClientRect().top > nav.offsetHeight;
    nav.classList.toggle('dark', overHero && !root.classList.contains('menu-open'));
  }
  let navTick = false;
  window.addEventListener('scroll', () => {
    if (navTick) return;
    navTick = true;
    requestAnimationFrame(() => { navTick = false; updateNav(); });
  }, { passive: true });
  window.addEventListener('resize', updateNav);
  updateNav();

  /* ---------- 3. Menu do celular ---------- */
  const toggle = $('.nav__toggle');
  const menu = $('#menu');
  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', t(open ? 'menu.close' : 'menu.open'));
    menu.setAttribute('aria-hidden', String(!open));
    updateNav();
  }
  toggle.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- 4. Vídeos e player ---------- */
  const player = $('#player');
  const frame = $('.player__frame', player);
  const videoData = (key) => (site.videos || {})[key] || {};

  function embedUrl(src) {
    const yt = src.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
    if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`;
    const vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1`;
    return null;
  }

  function openVideo(card) {
    const data = videoData(card.dataset.video);
    const title = card.dataset.title || t('video.generic');
    frame.replaceChildren();
    player.classList.toggle('player--vertical', card.dataset.format === 'vertical');
    player.setAttribute('aria-label', title);

    if (!data.src) {
      const box = document.createElement('div');
      box.className = 'player__empty';
      const strong = document.createElement('strong');
      strong.textContent = title;
      const span = document.createElement('span');
      span.textContent = t('player.empty');
      box.append(strong, span);
      frame.append(box);
    } else if (embedUrl(data.src)) {
      const iframe = document.createElement('iframe');
      iframe.src = embedUrl(data.src);
      iframe.title = title;
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      frame.append(iframe);
    } else {
      const video = document.createElement('video');
      video.src = data.src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      if (data.poster) video.poster = data.poster;
      frame.append(video);
    }
    player.showModal();
  }

  // O cartão diz a verdade sobre o estado: sem vídeo configurado, mostra "em breve".
  // É refeito a cada troca de idioma.
  function labelVideos() {
    $$('[data-video]').forEach((card) => {
      const data = videoData(card.dataset.video);
      const state = $('.video__state', card);
      if (state) state.textContent = data.src ? '' : t('video.soon');
      card.setAttribute('aria-label', `${t('video.watch')}: ${card.dataset.title || t('video.generic')}${data.src ? '' : ` (${t('video.soon')})`}`);
    });
  }

  $$('[data-video]').forEach((card) => {
    const data = videoData(card.dataset.video);
    const media = $('.video__media', card);
    if (data.poster && media) media.style.backgroundImage = `url("${data.poster}")`;
    card.addEventListener('click', () => openVideo(card));
  });
  labelVideos();

  $('.player__close', player).addEventListener('click', () => player.close());
  player.addEventListener('click', (e) => { if (e.target === player) player.close(); });
  player.addEventListener('close', () => frame.replaceChildren());

  /* ---------- 5. Trilho de vídeos (setas no computador) ---------- */
  const rail = $('.rail');
  const railButtons = $$('[data-rail]');
  function updateRail() {
    const max = rail.scrollWidth - rail.clientWidth;
    // sem nada para rolar, as setas somem
    railButtons[0].parentElement.hidden = max <= 2;
    railButtons.forEach((b) => {
      b.disabled = Number(b.dataset.rail) < 0 ? rail.scrollLeft <= 2 : rail.scrollLeft >= max - 2;
    });
  }
  railButtons.forEach((b) => {
    b.addEventListener('click', () => {
      rail.scrollBy({ left: Number(b.dataset.rail) * rail.clientWidth * 0.8, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });
  rail.addEventListener('scroll', updateRail, { passive: true });
  window.addEventListener('resize', updateRail);
  updateRail();

  /* ---------- 6. Troca de idioma ----------
     Refaz os rótulos criados aqui e recalcula as medidas, porque os textos mudam de tamanho. */
  if (window.I18N) {
    window.I18N.onChange(() => {
      labelVideos();
      setMenu(root.classList.contains('menu-open'));
      updateRail();
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    });
  }
  setMenu(false);

  /* ---------- 7. Abertura: a logo se escreve com a rolagem ----------
     1) cada letra de COMPLETE sobe de trás de uma linha invisível;
     2) "peel" é revelado da esquerda para a direita, como uma caneta;
     3) a logo sobe um pouco e o título, o texto e os botões aparecem. */
  const animated = root.classList.contains('motion') && window.gsap && window.ScrollTrigger;
  if (!animated) {
    root.classList.remove('motion');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const mark = $('.mark');
  const group = $('.hero__group');
  const headline = $('.hero__headline');

  // Enquanto o título ainda não apareceu, a logo fica no centro da tela:
  // desce metade da altura do bloco do título.
  const centerShift = () => {
    const gap = parseFloat(getComputedStyle(group).rowGap) || 0;
    return (headline.offsetHeight + gap) / 2;
  };

  gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * (window.innerWidth < 760 ? 1.6 : 2.2))}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true
    }
  })
    .to('.hero__first', { autoAlpha: 0, duration: 0.6, ease: 'none' }, 0)
    .fromTo(mark, { y: centerShift }, { y: centerShift, duration: 0.01 }, 0)
    // y: 0 zera o deslocamento inicial que vem do CSS (antes de o JavaScript carregar)
    .fromTo('.mark .ch', { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 1, stagger: 0.16 }, 0.2)
    .fromTo('.mark__peel', { '--p': '-20%' }, { '--p': '120%', duration: 1.8, ease: 'none' }, 2.2)
    .to(mark, { y: 0, duration: 1.2, ease: 'power2.inOut' }, 4.2)
    .fromTo('.hero__headline > *', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.14 }, 4.6)
    .to({}, { duration: 0.5 });

  /* Recalcula as posições quando as fontes terminam de carregar */
  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  window.addEventListener('load', refresh);
})();
