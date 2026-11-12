/* =========================================================
   COMPLETE PEEL — comportamento
   1. Links e avisos     2. Cor do menu        3. Menu do celular
   4. Vídeos e player    5. Trilho de vídeos   6. Troca de idioma
   7. Abertura: a logo se escreve com a rolagem
   8. A linha da caneta: método, publicações, contadores e sublinhado final
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
      card.classList.toggle('is-empty', !data.src);
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

  /* ---------- 5. Trilho de vídeos e barra de deslize ----------
     O trilho rola com o dedo, arrastando com o mouse ou pela barra:
     setas, bolinha e contador ficam sempre em sincronia. */
  const rail = $('.rail');
  const items = $$('.rail__track > li', rail);
  const slider = $('[data-slider]');
  const range = $('.slider__range', slider);
  const track = $('.slider__track', slider);
  const nowEl = $('.slider__now', slider);
  const [prevBtn, nextBtn] = $$('[data-slide]', slider);
  $('.slider__total', slider).textContent = String(items.length);
  const railMax = () => Math.max(0, rail.scrollWidth - rail.clientWidth);
  const railStep = () => (items[1] ? items[1].offsetLeft - items[0].offsetLeft : rail.clientWidth);
  const scrollBehavior = reduceMotion ? 'auto' : 'smooth';

  function updateRail() {
    const max = railMax();
    const ratio = max ? Math.min(1, rail.scrollLeft / max) : 0;
    track.style.setProperty('--k', ratio.toFixed(4));
    if (document.activeElement !== range) range.value = String(Math.round(ratio * 1000));
    const idx = Math.min(items.length - 1, Math.round(rail.scrollLeft / railStep()));
    nowEl.textContent = String(max && rail.scrollLeft >= max - 2 ? items.length : idx + 1);
    prevBtn.disabled = rail.scrollLeft <= 2;
    nextBtn.disabled = rail.scrollLeft >= max - 2;
    // Se todos os vídeos já cabem na tela, a barra some (não há o que deslizar)
    slider.hidden = max <= 2;
  }

  function goTo(i) {
    const idx = Math.max(0, Math.min(items.length - 1, i));
    const left = items[idx].offsetLeft - items[0].offsetLeft;
    rail.scrollTo({ left: Math.min(left, railMax()), behavior: scrollBehavior });
  }
  const railIndex = () => Math.round(rail.scrollLeft / railStep());
  prevBtn.addEventListener('click', () => goTo(railIndex() - 1));
  nextBtn.addEventListener('click', () => goTo(railIndex() + 1));

  // A bolinha acompanha o dedo/mouse na hora; o trilho de vídeos segue junto
  range.addEventListener('input', () => {
    const ratio = Number(range.value) / 1000;
    track.style.setProperty('--k', ratio.toFixed(4));
    rail.scrollLeft = ratio * railMax();
  });
  range.addEventListener('pointerdown', () => track.classList.add('is-grabbing'));
  window.addEventListener('pointerup', () => track.classList.remove('is-grabbing'));
  range.addEventListener('change', updateRail);

  // Arrastar o trilho de vídeos com o mouse (no celular o dedo já rola sozinho)
  let drag = null;
  rail.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag = { x: e.clientX, left: rail.scrollLeft, moved: false };
  });
  window.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 5) { drag.moved = true; rail.classList.add('is-dragging'); }
    if (drag.moved) rail.scrollLeft = drag.left - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!drag) return;
    const moved = drag.moved;
    drag = null;
    if (!moved) return;
    rail.classList.remove('is-dragging');
    goTo(railIndex());
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

  /* Caneta: prepara um traço SVG para ser desenhado. O GSAP anima o próprio
     stroke-dashoffset (de "len", escondido, até 0, completo); a ponta (nib)
     acompanha lendo o deslocamento atual. */
  function pen(path, nib) {
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len} ${len + 2}`;
    path.style.strokeDashoffset = String(len);
    path.style.visibility = 'visible';
    const follow = () => {
      if (!nib) return;
      const done = 1 - (parseFloat(path.style.strokeDashoffset) || 0) / len;
      const pt = path.getPointAtLength(len * Math.min(1, Math.max(0, done)));
      nib.setAttribute('cx', pt.x);
      nib.setAttribute('cy', pt.y);
      nib.style.opacity = done > 0.002 && done < 0.998 ? 1 : 0;
    };
    return {
      tween: (vars) => ({ strokeDashoffset: 0, onUpdate: follow, ...vars }),
      from: { strokeDashoffset: len },
      path
    };
  }

  const mark = $('.mark');
  const peel = pen($('.mark__peel .pen'), $('.mark__peel .pen__nib'));
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
    // "peel" escrito do primeiro ponto ao último, num ritmo de mão (lento no começo e no fim)
    .fromTo(peel.path, peel.from, peel.tween({ duration: 2.4, ease: 'power1.inOut' }), 2.1)
    .to(mark, { y: 0, duration: 1.2, ease: 'power2.inOut' }, 4.6)
    .fromTo('.hero__headline > *', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.14 }, 5)
    .to({}, { duration: 0.5 });

  /* ---------- 8. A linha da caneta ----------
     O mesmo gesto da escrita de "peel" continua pela página:
     - nas listas com [data-trail], uma linha desce com a rolagem e acende cada ponto;
     - os números contam uma vez quando aparecem;
     - no fim, a linha sublinha "Próxima turma".
     Tudo segue a rolagem nos dois sentidos (subindo, a linha se apaga). */
  const LINE = 'top 65%'; // altura da tela onde a ponta da linha fica
  $$('[data-trail]').forEach((trail) => {
    gsap.fromTo(trail, { '--p': '0%' }, {
      '--p': '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: trail,
        start: LINE,
        end: 'bottom 65%',
        scrub: true,
        onToggle: (self) => trail.classList.toggle('is-drawing', self.isActive)
      }
    });
    $$('.trail__node', trail).forEach((node) => {
      ScrollTrigger.create({
        trigger: node,
        start: LINE,
        onEnter: () => node.classList.add('is-on'),
        onLeaveBack: () => node.classList.remove('is-on')
      });
    });
  });

  $$('.num[data-count]').forEach((el) => {
    const total = Number(el.dataset.count);
    const counter = { n: 0 };
    el.textContent = '0';
    gsap.to(counter, {
      n: total,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => { el.textContent = String(Math.round(counter.n)); },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // Sublinhado: escrito aos poucos ao longo de boa parte da tela; o scrub com atraso
  // suaviza os saltos da rodinha do mouse.
  const swash = pen($('.close__swash .pen'));
  gsap.fromTo(swash.path, swash.from, swash.tween({
    ease: 'power1.inOut',
    scrollTrigger: { trigger: '.close__title', start: 'top 92%', end: 'clamp(top 30%)', scrub: 1.2 }
  }));

  /* Recalcula as posições quando as fontes terminam de carregar */
  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  window.addEventListener('load', refresh);
})();
