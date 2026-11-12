/* =========================================================
   TL PEEL — comportamento
   1. Links e avisos     2. Menu do celular     3. Vídeos e player
   4. Trilho de casos    5. Ajuste da logo      6. Animação da abertura
   O conteúdo da página aparece inteiro mesmo sem este arquivo; a única
   animação automática é a montagem da logo.
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

  /* ---------- 2. Menu do celular ---------- */
  const toggle = $('.nav__toggle');
  const menu = $('#menu');
  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', t(open ? 'menu.close' : 'menu.open'));
    menu.setAttribute('aria-hidden', String(!open));
  }
  toggle.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- 3. Vídeos e player ---------- */
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

  /* ---------- 4. Trilho de casos (setas no computador) ---------- */
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

  /* Troca de idioma: refaz os rótulos criados aqui e recalcula as medidas,
     porque os textos mudam de tamanho. */
  if (window.I18N) {
    window.I18N.onChange(() => {
      labelVideos();
      setMenu(root.classList.contains('menu-open'));
      updateRail();
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    });
  }
  setMenu(false);

  /* ---------- 5. Ajuste da logo ----------
     Posiciona "clínica" logo depois de "PLETA", qualquer que seja a fonte carregada. */
  const svg = $('.hero__logo');
  const VB = { x: 76, y: 36, w: 500, h: 260 };
  function layoutLogo() {
    const pleta = $('.logo-pleta', svg).getBBox();
    const cli = $('.logo-cli', svg);
    const l2 = $('.logo-l2', svg);
    cli.setAttribute('x', Math.round(pleta.x + pleta.width + 10));
    const end = Math.max(cli.getBBox().x + cli.getBBox().width, l2.getBBox().x + l2.getBBox().width);
    VB.w = Math.round(end - VB.x + 14);
    svg.setAttribute('viewBox', `${VB.x} ${VB.y} ${VB.w} ${VB.h}`);
  }
  layoutLogo();

  /* ---------- 6. Animação da abertura ----------
     A bola cresce, o texto desliza e, no fim, a bola cobre a tela. */
  const animated = root.classList.contains('motion') && window.gsap && window.ScrollTrigger;
  if (!animated) {
    root.classList.remove('motion');
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutLogo);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const stage = $('.hero__stage');
  const flood = $('.hero__flood');
  const ball = $('.logo-ball');
  const geo = { dx: 0, dy: 0, r0: 0, rMax: 0 };

  function measureHero() {
    const s = stage.getBoundingClientRect();
    const g = svg.getBoundingClientRect();
    const shiftX = Number(gsap.getProperty(svg, 'x')) || 0;
    const scale = g.width / VB.w;
    const cx = g.left - shiftX - s.left + (200 - VB.x) * scale;
    const cy = g.top - s.top + (160 - VB.y) * scale;
    geo.dx = s.width / 2 - cx;
    geo.r0 = 112 * scale + 1;
    geo.rMax = Math.hypot(Math.max(cx, s.width - cx), Math.max(cy, s.height - cy)) + 2;
    flood.style.setProperty('--x', `${cx}px`);
    flood.style.setProperty('--y', `${cy}px`);
  }
  measureHero();
  ScrollTrigger.addEventListener('refreshInit', measureHero);

  const floodState = { p: 0 };
  const paintFlood = () => {
    const r = floodState.p <= 0 ? 0 : geo.r0 + floodState.p * (geo.rMax - geo.r0);
    flood.style.setProperty('--r', `${r.toFixed(1)}px`);
  };

  gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * (window.innerWidth < 760 ? 1.9 : 2.4))}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true
    }
  })
    .to('.hero__first', { autoAlpha: 0, duration: 0.8, ease: 'none' }, 0)
    .fromTo(ball, { scale: 0.07, svgOrigin: '200 160' }, { scale: 1, duration: 2.6, ease: 'power2.out' }, 0)
    .fromTo(svg, { x: () => geo.dx }, { x: 0, duration: 2.4, ease: 'power2.inOut' }, 1.5)
    .fromTo('.logo-com', { opacity: 0, x: -26 }, { opacity: 1, x: 0, duration: 1.2 }, 2.3)
    .fromTo('.logo-pleta', { x: -210 }, { x: 0, duration: 2 }, 2.9)
    .fromTo('.logo-cli', { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.9 }, 4.5)
    .fromTo('.logo-l1', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, 4.9)
    .fromTo('.logo-l2', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, 5.3)
    .to('.logo-txt', { opacity: 0, duration: 0.7, ease: 'none' }, 6.9)
    .to(floodState, { p: 1, duration: 2.2, ease: 'power1.in', onUpdate: paintFlood }, 6.8)
    // a bola da logo sai de cena assim que a "inundação" laranja assume o lugar dela
    .set(ball, { autoAlpha: 0 }, 6.95)
    .fromTo('.hero__headline > *', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 8.3)
    .to({}, { duration: 0.5 });

  gsap.set(svg, { visibility: 'visible' });

  /* Recalcula as posições quando as fontes terminam de carregar */
  const refresh = () => { layoutLogo(); ScrollTrigger.refresh(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  window.addEventListener('load', refresh);
})();
