/* =========================================================
   IDIOMAS
   O português é o texto que já está no index.html.
   Aqui ficam as traduções: cada chave corresponde a um data-i18n="chave"
   (texto) ou data-i18n-attr="atributo:chave" (atributo) do HTML.
   Para corrigir uma tradução, edite a frase na língua certa abaixo.
   A escolha do visitante fica guardada no navegador dele.
   ========================================================= */
(() => {
  const STORE_KEY = 'tlpeel-idioma';
  const NB = ' '; // espaço que não quebra linha (mantém "TL Peel" e "Dr. Nome" juntos)

  const LANGS = {
    pt: { html: 'pt-BR', name: 'Português', code: 'PT', flag: 'br' },
    en: { html: 'en', name: 'English', code: 'EN', flag: 'us' },
    es: { html: 'es', name: 'Español', code: 'ES', flag: 'es' },
    fr: { html: 'fr', name: 'Français', code: 'FR', flag: 'fr' }
  };

  const T = {
    /* Em português só ficam aqui os textos criados pelo JavaScript;
       o resto é lido direto do index.html. */
    pt: {
      'lang.label': 'Idioma',
      'menu.open': 'Abrir menu',
      'menu.close': 'Fechar menu',
      'toast.nolink': 'Link ainda não configurado (js/config.js)',
      'player.empty': 'Este vídeo ainda não foi publicado.',
      'video.soon': 'em breve',
      'video.watch': 'Assistir',
      'video.generic': 'Vídeo'
    },

    en: {
      'meta.title': 'Complete Peel: chemical peel immersion course for physicians',
      'meta.description': 'In-person chemical peel immersion course, for physicians only: two hands-on days and six months of mentoring, with Dr. Gustavo Nogueira and Dr. Raquel Iracema.',
      'lang.label': 'Language',
      'skip': 'Skip to content',
      'nav.home': 'Back to top',
      'nav.sections': 'Sections',
      'nav.present': 'Overview',
      'nav.results': 'Results',
      'nav.teachers': 'Faculty',
      'nav.papers': 'Publications',
      'nav.course': 'The course',
      'nav.signup': 'Enrollment',
      'menu.open': 'Open menu',
      'menu.close': 'Close menu',
      'cta.whatsapp': 'Chat on WhatsApp',
      'hero.first.title': 'Chemical peel immersion course for physicians',
      'hero.first.hint': 'Scroll to continue',
      'hero.h1': 'The most complete chemical peel training in Brazil.',
      'hero.lead': 'Two days of in-person, hands-on training and six months of mentoring for your first patients.',
      'hero.watch': 'Watch the overview',
      'present.h2': 'Course overview',
      'present.lead': `What the TL${NB}Peel technique is, explained by the people who teach it.`,
      'video.intro': `Meet the TL${NB}Peel technique`,
      'present.p1': 'Learn from physicians with more than 25 years of experience in chemical peels and thousands of patients rejuvenated.',
      'present.p2': `In this video (in Portuguese), Dr.${NB}Gustavo Nogueira introduces the TL${NB}Peel technique.`,
      'present.link': 'See how the course works',
      'results.h2': 'Results and testimonials',
      'results.lead': 'Safe, natural, long-lasting results. Physicians who took the course tell you what it was like.',
      'rail.prev': 'Previous videos',
      'rail.next': 'Next videos',
      'rail.slider': 'Slide through the videos',
      'video.before': `Before and after: TL${NB}Peel results`,
      'video.testimonial': `Testimonial from Dr.${NB}Camille Pompeu`,
      'video.result2': 'Result 2',
      'video.result3': 'Result 3',
      'prog.break': 'After the course',
      'results.note': 'Technical content intended for physicians. Results vary with the patient and the indication.',
      'teachers.h2': 'Faculty',
      'teachers.photo': 'The two course instructors',
      'prof.g.role': 'Dermatologist, full member of the Brazilian Society of Dermatology',
      'prof.g.bio': 'Medical degree from the Federal University of Minas Gerais (UFMG), with residencies in Internal Medicine at IPSEMG and in Dermatology at Santa Casa de Belo Horizonte.',
      'prof.g.reg': 'CRM and RQE to be added',
      'prof.g.link': `Dr.${NB}Gustavo on Instagram`,
      'prof.r.role': 'Dermatologist, full member of the Brazilian Society of Dermatology',
      'prof.r.bio': 'Medical degree from the Federal University of Minas Gerais (UFMG), with residencies in Internal Medicine at the UFMG Hospital das Clínicas and in Dermatology at Santa Casa de Belo Horizonte.',
      'prof.r.link': `Dr.${NB}Raquel on Instagram`,
      'papers.h2': 'Scientific publications',
      'papers.p1': 'Studies published in leading international dermatology journals.',
      'papers.p2': 'It is not only clinical experience: it is published science. From the clinic to the medical literature, and from the literature to your practice.',
      'num.years': 'years of experience',
      'num.cases': 'cases performed',
      'num.papers': 'scientific articles',
      'paper.1': 'Treatment of static glabellar lines: deep wrinkles and photodamage.',
      'paper.2': 'Treatment of the allergic nasal crease, a common condition with few options described in the literature.',
      'paper.3': 'Treatment of nasal lines with 1% croton oil (Hetter’s formula).',
      'paper.4': 'Long-term outcomes and patient satisfaction with phenol-croton peels.',
      'paper.5': 'TCA and croton oil peel for the periocular region.',
      'course.h2': 'The course',
      'course.lead': 'How the course works, from the classroom to your first patients.',
      'course.photo': 'Instructors and students gathered in a room at the clinic during the course',
      'course.caption': 'A class during one edition of the course.',
      'prog.1.h': 'Two days in person',
      'prog.1.p': 'Chemical peel immersion at Clínica Completa.',
      'prog.2.p': 'Practice during the course, supervised by the instructors.',
      'prog.3.h': 'Six months of mentoring',
      'prog.3.p': 'Support for your first patients after the course.',
      'fact.audience.t': 'Audience',
      'fact.audience.d': 'Physicians only',
      'fact.place.t': 'Location',
      'fact.place.d': 'Clínica Completa, Itaúna (Minas Gerais), Brazil',
      'fact.next.t': 'Next class',
      'fact.next.d': 'Waiting list open',
      'close.title': 'Next class',
      'close.lead': 'Join the waiting list to be notified when new places open, or talk directly to the course team.',
      'close.waitlist': 'Join the waiting list',
      'close.where': 'How to get to Clínica Completa',
      'footer.brand': 'A course by Clínica Completa',
      'footer.nav': 'Social media and contact',
      'footer.ig': 'Course Instagram',
      'footer.legal': '© 2026 Clínica Completa. Content intended exclusively for physicians. Technical director and CRM to be added.',
      'player.close': 'Close video',
      'toast.nolink': 'Link not set up yet (js/config.js)',
      'player.empty': 'This video has not been published yet.',
      'video.soon': 'coming soon',
      'video.watch': 'Watch',
      'video.generic': 'Video'
    },

    es: {
      'meta.title': 'Complete Peel: inmersión en peelings químicos para médicos',
      'meta.description': 'Inmersión presencial en peelings químicos, exclusiva para médicos: dos días con práctica hands-on y seis meses de mentoría, con el Dr. Gustavo Nogueira y la Dra. Raquel Iracema.',
      'lang.label': 'Idioma',
      'skip': 'Saltar al contenido',
      'nav.home': 'Volver al inicio',
      'nav.sections': 'Secciones',
      'nav.present': 'Presentación',
      'nav.results': 'Resultados',
      'nav.teachers': 'Profesores',
      'nav.papers': 'Publicaciones',
      'nav.course': 'La inmersión',
      'nav.signup': 'Inscripción',
      'menu.open': 'Abrir menú',
      'menu.close': 'Cerrar menú',
      'cta.whatsapp': 'Hablar por WhatsApp',
      'hero.first.title': 'Inmersión en peelings químicos para médicos',
      'hero.first.hint': 'Desplácese para continuar',
      'hero.h1': 'La formación más completa en peelings químicos de Brasil.',
      'hero.lead': 'Dos días de inmersión presencial con práctica hands-on y seis meses de mentoría para sus primeros pacientes.',
      'hero.watch': 'Ver la presentación',
      'present.h2': 'Presentación del curso',
      'present.lead': `Qué es la técnica TL${NB}Peel, explicada por quienes la enseñan.`,
      'video.intro': `Conozca la técnica TL${NB}Peel`,
      'present.p1': 'Aprenda con quienes tienen más de 25 años de experiencia en peelings químicos y miles de pacientes rejuvenecidos.',
      'present.p2': `En este vídeo (en portugués), el Dr.${NB}Gustavo Nogueira presenta la técnica TL${NB}Peel.`,
      'present.link': 'Ver cómo funciona la inmersión',
      'results.h2': 'Resultados y testimonios',
      'results.lead': 'Resultados seguros, naturales y duraderos. Quienes ya vivieron la inmersión cuentan cómo fue.',
      'rail.prev': 'Vídeos anteriores',
      'rail.next': 'Vídeos siguientes',
      'rail.slider': 'Deslizar los vídeos',
      'video.before': `Antes y después: resultados del TL${NB}Peel`,
      'video.testimonial': `Testimonio de la Dra.${NB}Camille Pompeu`,
      'video.result2': 'Resultado 2',
      'video.result3': 'Resultado 3',
      'prog.break': 'Después del curso',
      'results.note': 'Contenido técnico destinado a médicos. Los resultados varían según el paciente y la indicación.',
      'teachers.h2': 'Profesores',
      'teachers.photo': 'Los dos profesores del curso',
      'prof.g.role': 'Dermatólogo, miembro titular de la Sociedad Brasileña de Dermatología',
      'prof.g.bio': 'Médico graduado por la Universidad Federal de Minas Gerais (UFMG), con residencia en Medicina Interna en el IPSEMG y en Dermatología en la Santa Casa de Belo Horizonte.',
      'prof.g.reg': 'CRM y RQE por completar',
      'prof.g.link': `Instagram del Dr.${NB}Gustavo`,
      'prof.r.role': 'Dermatóloga, miembro titular de la Sociedad Brasileña de Dermatología',
      'prof.r.bio': 'Médica graduada por la Universidad Federal de Minas Gerais (UFMG), con residencia en Medicina Interna en el Hospital das Clínicas de la UFMG y en Dermatología en la Santa Casa de Belo Horizonte.',
      'prof.r.link': `Instagram de la Dra.${NB}Raquel`,
      'papers.h2': 'Publicaciones científicas',
      'papers.p1': 'Estudios publicados en revistas científicas internacionales de referencia en dermatología.',
      'papers.p2': 'No es solo experiencia clínica: es ciencia publicada. Del consultorio a la literatura médica, y de la literatura médica a su práctica.',
      'num.years': 'años de experiencia',
      'num.cases': 'casos realizados',
      'num.papers': 'artículos científicos',
      'paper.1': 'Tratamiento de las líneas glabelares estáticas: arrugas profundas y fotodaño.',
      'paper.2': 'Tratamiento del pliegue nasal alérgico, una afección frecuente y con pocas opciones descritas en la literatura.',
      'paper.3': `Tratamiento de las líneas nasales con aceite de crotón al 1${NB}% (fórmula de Hetter).`,
      'paper.4': 'Resultados a largo plazo y satisfacción de los pacientes con peelings de fenol-crotón.',
      'paper.5': 'Peeling de TCA y aceite de crotón en la región periocular.',
      'course.h2': 'La inmersión',
      'course.lead': 'Cómo funciona el curso, del aula a sus primeros pacientes.',
      'course.photo': 'Profesores y alumnos reunidos en una sala de la clínica durante la inmersión',
      'course.caption': 'Grupo durante una edición de la inmersión.',
      'prog.1.h': 'Dos días presenciales',
      'prog.1.p': 'Inmersión en peelings químicos en la Clínica Completa.',
      'prog.2.p': 'Práctica durante la inmersión, acompañada por los profesores.',
      'prog.3.h': 'Seis meses de mentoría',
      'prog.3.p': 'Acompañamiento para sus primeros pacientes después del curso.',
      'fact.audience.t': 'Público',
      'fact.audience.d': 'Exclusivo para médicos',
      'fact.place.t': 'Lugar',
      'fact.place.d': 'Clínica Completa, en Itaúna (Minas Gerais), Brasil',
      'fact.next.t': 'Próxima edición',
      'fact.next.d': 'Lista de espera abierta',
      'close.title': 'Próxima edición',
      'close.lead': 'Únase a la lista de espera para recibir un aviso cuando se abran nuevas plazas, o hable directamente con el equipo del curso.',
      'close.waitlist': 'Unirse a la lista de espera',
      'close.where': 'Cómo llegar a la Clínica Completa',
      'footer.brand': 'Un curso de la Clínica Completa',
      'footer.nav': 'Redes y contacto',
      'footer.ig': 'Instagram del curso',
      'footer.legal': '© 2026 Clínica Completa. Contenido destinado exclusivamente a médicos. Responsable técnico y CRM por completar.',
      'player.close': 'Cerrar vídeo',
      'toast.nolink': 'Enlace aún no configurado (js/config.js)',
      'player.empty': 'Este vídeo aún no se ha publicado.',
      'video.soon': 'próximamente',
      'video.watch': 'Ver',
      'video.generic': 'Vídeo'
    },

    fr: {
      'meta.title': `Complete Peel${NB}: immersion en peelings chimiques pour médecins`,
      'meta.description': `Immersion en présentiel en peelings chimiques, réservée aux médecins${NB}: deux jours de pratique hands-on et six mois de mentorat, avec le Dr Gustavo Nogueira et la Dre Raquel Iracema.`,
      'lang.label': 'Langue',
      'skip': 'Aller au contenu',
      'nav.home': 'Retour en haut',
      'nav.sections': 'Sections',
      'nav.present': 'Présentation',
      'nav.results': 'Résultats',
      'nav.teachers': 'Formateurs',
      'nav.papers': 'Publications',
      'nav.course': 'L’immersion',
      'nav.signup': 'Inscription',
      'menu.open': 'Ouvrir le menu',
      'menu.close': 'Fermer le menu',
      'cta.whatsapp': 'Écrire sur WhatsApp',
      'hero.first.title': 'Immersion en peelings chimiques pour médecins',
      'hero.first.hint': 'Faites défiler pour continuer',
      'hero.h1': 'La formation la plus complète en peelings chimiques du Brésil.',
      'hero.lead': 'Deux jours d’immersion en présentiel avec pratique hands-on et six mois de mentorat pour vos premiers patients.',
      'hero.watch': 'Voir la présentation',
      'present.h2': 'Présentation du cours',
      'present.lead': `La technique TL${NB}Peel, expliquée par ceux qui l’enseignent.`,
      'video.intro': `Découvrez la technique TL${NB}Peel`,
      'present.p1': 'Apprenez auprès de médecins qui ont plus de 25 ans d’expérience en peelings chimiques et des milliers de patients rajeunis.',
      'present.p2': `Dans cette vidéo (en portugais), le Dr${NB}Gustavo Nogueira présente la technique TL${NB}Peel.`,
      'present.link': 'Voir comment se déroule l’immersion',
      'results.h2': 'Résultats et témoignages',
      'results.lead': 'Des résultats sûrs, naturels et durables. Ceux qui ont suivi l’immersion racontent leur expérience.',
      'rail.prev': 'Vidéos précédentes',
      'rail.next': 'Vidéos suivantes',
      'rail.slider': 'Faire défiler les vidéos',
      'video.before': `Avant et après${NB}: résultats du TL${NB}Peel`,
      'video.testimonial': `Témoignage de la Dre${NB}Camille Pompeu`,
      'video.result2': 'Résultat 2',
      'video.result3': 'Résultat 3',
      'prog.break': 'Après le cours',
      'results.note': 'Contenu technique destiné aux médecins. Les résultats varient selon le patient et l’indication.',
      'teachers.h2': 'Formateurs',
      'teachers.photo': 'Les deux formateurs du cours',
      'prof.g.role': 'Dermatologue, membre titulaire de la Société brésilienne de dermatologie',
      'prof.g.bio': 'Médecin diplômé de l’Université fédérale du Minas Gerais (UFMG), avec une résidence en médecine interne à l’IPSEMG et en dermatologie à la Santa Casa de Belo Horizonte.',
      'prof.g.reg': 'CRM et RQE à compléter',
      'prof.g.link': `Instagram du Dr${NB}Gustavo`,
      'prof.r.role': 'Dermatologue, membre titulaire de la Société brésilienne de dermatologie',
      'prof.r.bio': 'Médecin diplômée de l’Université fédérale du Minas Gerais (UFMG), avec une résidence en médecine interne à l’Hospital das Clínicas de l’UFMG et en dermatologie à la Santa Casa de Belo Horizonte.',
      'prof.r.link': `Instagram de la Dre${NB}Raquel`,
      'papers.h2': 'Publications scientifiques',
      'papers.p1': 'Des études publiées dans des revues scientifiques internationales de référence en dermatologie.',
      'papers.p2': `Ce n’est pas seulement de l’expérience clinique${NB}: c’est de la science publiée. Du cabinet à la littérature médicale, et de la littérature médicale à votre pratique.`,
      'num.years': 'ans d’expérience',
      'num.cases': 'cas réalisés',
      'num.papers': 'articles scientifiques',
      'paper.1': `Traitement des rides glabellaires statiques${NB}: rides profondes et photovieillissement.`,
      'paper.2': 'Traitement du pli nasal allergique, une affection fréquente pour laquelle la littérature décrit peu d’options.',
      'paper.3': `Traitement des rides nasales à l’huile de croton à 1${NB}% (formule de Hetter).`,
      'paper.4': 'Résultats à long terme et satisfaction des patients après des peelings au phénol-croton.',
      'paper.5': 'Peeling au TCA et à l’huile de croton dans la région périoculaire.',
      'course.h2': 'L’immersion',
      'course.lead': 'Le déroulement du cours, de la salle de formation à vos premiers patients.',
      'course.photo': 'Formateurs et participants réunis dans une salle de la clinique pendant l’immersion',
      'course.caption': 'Un groupe lors d’une édition de l’immersion.',
      'prog.1.h': 'Deux jours en présentiel',
      'prog.1.p': 'Immersion en peelings chimiques à la Clínica Completa.',
      'prog.2.p': 'Pratique pendant l’immersion, encadrée par les formateurs.',
      'prog.3.h': 'Six mois de mentorat',
      'prog.3.p': 'Un accompagnement pour vos premiers patients après le cours.',
      'fact.audience.t': 'Public',
      'fact.audience.d': 'Réservé aux médecins',
      'fact.place.t': 'Lieu',
      'fact.place.d': 'Clínica Completa, à Itaúna (Minas Gerais), Brésil',
      'fact.next.t': 'Prochaine session',
      'fact.next.d': 'Liste d’attente ouverte',
      'close.title': 'Prochaine session',
      'close.lead': 'Inscrivez-vous sur la liste d’attente pour être prévenu de l’ouverture de nouvelles places, ou contactez directement l’équipe du cours.',
      'close.waitlist': 'Rejoindre la liste d’attente',
      'close.where': 'Comment se rendre à la Clínica Completa',
      'footer.brand': 'Un cours de la Clínica Completa',
      'footer.nav': 'Réseaux et contact',
      'footer.ig': 'Instagram du cours',
      'footer.legal': '© 2026 Clínica Completa. Contenu destiné exclusivement aux médecins. Responsable technique et CRM à compléter.',
      'player.close': 'Fermer la vidéo',
      'toast.nolink': 'Lien pas encore configuré (js/config.js)',
      'player.empty': 'Cette vidéo n’a pas encore été publiée.',
      'video.soon': 'bientôt',
      'video.watch': 'Regarder',
      'video.generic': 'Vidéo'
    }
  };

  /* ---------- Guarda o português original que está no HTML ---------- */
  const textNodes = [...document.querySelectorAll('[data-i18n]')].map((el) => ({ el, key: el.dataset.i18n, pt: el.innerHTML }));
  const attrNodes = [];
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':').map((p) => p.trim());
      if (attr && key) attrNodes.push({ el, attr, key, pt: el.getAttribute(attr) });
    });
  });
  const metaDesc = document.querySelector('meta[name="description"]');
  const original = { title: document.title, description: metaDesc ? metaDesc.content : '' };

  let lang = 'pt';
  const listeners = [];

  /* Texto de uma chave no idioma atual (cai para o português se faltar tradução) */
  function t(key) {
    const dict = T[lang] || {};
    if (key in dict) return dict[key];
    return key in T.pt ? T.pt[key] : key;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------- Botão de idiomas ---------- */
  const box = document.querySelector('.lang');
  const btn = box && box.querySelector('.lang__btn');
  const menu = box && box.querySelector('.lang__menu');

  function openMenu(open) {
    if (!menu) return;
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  }

  function paintSwitcher() {
    if (!btn) return;
    const info = LANGS[lang];
    btn.querySelector('use').setAttribute('href', `#flag-${info.flag}`);
    btn.querySelector('.lang__code').textContent = info.code;
    btn.setAttribute('aria-label', `${t('lang.label')}: ${info.name}`);
    menu.querySelectorAll('[data-lang]').forEach((b) => {
      if (b.dataset.lang === lang) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
  }

  /* ---------- Aplica o idioma na página ---------- */
  function apply() {
    const dict = lang === 'pt' ? null : T[lang];
    textNodes.forEach(({ el, key, pt }) => {
      el.innerHTML = dict && key in dict ? escapeHtml(dict[key]) : pt;
    });
    attrNodes.forEach(({ el, attr, key, pt }) => {
      el.setAttribute(attr, dict && key in dict ? dict[key] : pt);
    });
    document.documentElement.lang = LANGS[lang].html;
    document.title = dict && dict['meta.title'] ? dict['meta.title'] : original.title;
    if (metaDesc) metaDesc.content = dict && dict['meta.description'] ? dict['meta.description'] : original.description;
    paintSwitcher();
  }

  function set(next) {
    if (!LANGS[next] || next === lang) return;
    lang = next;
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* navegação privada: segue sem guardar */ }
    apply();
    listeners.forEach((fn) => fn(lang));
  }

  if (btn) {
    btn.addEventListener('click', () => openMenu(menu.hidden));
    menu.addEventListener('click', (e) => {
      const choice = e.target.closest('[data-lang]');
      if (!choice) return;
      set(choice.dataset.lang);
      openMenu(false);
      btn.focus();
    });
    document.addEventListener('click', (e) => { if (!box.contains(e.target)) openMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) { openMenu(false); btn.focus(); }
    });
  }

  /* ---------- Início: usa o idioma guardado, se houver ---------- */
  let saved = null;
  try { saved = localStorage.getItem(STORE_KEY); } catch (e) { /* sem acesso ao armazenamento */ }
  if (saved && LANGS[saved]) lang = saved;
  apply();

  window.I18N = {
    t,
    set,
    get lang() { return lang; },
    onChange(fn) { listeners.push(fn); }
  };
})();
