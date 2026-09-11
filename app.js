/**
 * LÓGICA COMPARTIDA DE LAS TRES PÁGINAS
 * ---------------------------------------------------------------------
 * index.html, videos.html y profesionales.html cargan este mismo archivo.
 * Cada bloque comprueba si el elemento existe antes de pintar nada, así
 * que el mismo script vale para las tres páginas sin duplicar código.
 *
 * NO contiene ningún dato del cliente: todo sale de config.js.
 */
(function () {
  'use strict';

  var CFG = window.SITE_CONFIG || {};
  if (!window.SITE_CONFIG) {
    console.error('No se ha encontrado config.js (window.SITE_CONFIG). Comprueba que config.js está en la misma carpeta que el HTML y que se carga antes que app.js.');
  }

  /* ================================================== Helpers */
  function $(id) { return document.getElementById(id); }
  function setText(id, value) { var el = $(id); if (el && value != null) el.textContent = value; }
  function setHTML(id, value) { var el = $(id); if (el && value != null) el.innerHTML = value; }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function get(obj, path, fallback) {
    var parts = path.split('.'), cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return fallback;
      cur = cur[parts[i]];
    }
    return (cur == null) ? fallback : cur;
  }
  function icons() { if (window.lucide) window.lucide.createIcons(); }

  /* ================================================== Colores de marca */
  (function applyColors() {
    var root = document.documentElement.style;
    var p = get(CFG, 'colors.primary'), pd = get(CFG, 'colors.primaryDark'), s = get(CFG, 'colors.secondary');
    if (p) root.setProperty('--color-primary', p);
    if (pd) root.setProperty('--color-primary-dark', pd);
    if (s) root.setProperty('--color-secondary', s);
  })();

  /* ================================================== SEO */
  /* El título y la descripción de CADA página salen de config.js.
     Ningún .html lleva escrito el nombre del negocio: así la misma
     plantilla vale para cualquier cliente sin tocar el HTML.
       · index.html          → meta.title / meta.description
       · videos.html         → se componen solos con el nombre comercial
       · profesionales.html  → íd.
     Se pueden forzar desde config.js con meta.titleVideos, meta.titleTeam,
     meta.descriptionVideos y meta.descriptionTeam si se quiere otra cosa. */
  (function applyMeta() {
    var lang = get(CFG, 'meta.lang');
    if (lang) document.documentElement.setAttribute('lang', lang);

    var name = get(CFG, 'legal.tradeName', '') || get(CFG, 'brand.namePart1', '') + get(CFG, 'brand.namePart2', '');
    var tagline = get(CFG, 'brand.tagline', '');
    var suffix = name + (tagline ? ' ' + tagline : '');
    var page = document.body.getAttribute('data-page') || 'home';
    var title, desc;

    if (page === 'videos') {
      title = get(CFG, 'meta.titleVideos') || ('Vídeos | ' + suffix);
      desc = get(CFG, 'meta.descriptionVideos') || get(CFG, 'videosSection.description');
    } else if (page === 'team') {
      title = get(CFG, 'meta.titleTeam') || (get(CFG, 'teamSection.eyebrow', 'Nuestros profesionales') + ' | ' + suffix);
      desc = get(CFG, 'meta.descriptionTeam') || get(CFG, 'teamSection.description');
    } else {
      title = get(CFG, 'meta.title');
      desc = get(CFG, 'meta.description');
    }

    if (title) document.title = title;
    var md = $('meta-description');
    if (md && desc) md.setAttribute('content', desc);

    // Color de la barra del navegador en el móvil
    var tc = document.querySelector('meta[name="theme-color"]');
    var primary = get(CFG, 'colors.primary');
    if (tc && primary) tc.setAttribute('content', primary);
  })();

  /* ================================================== Enlaces comunes */
  var waNumber = get(CFG, 'contact.whatsappNumber', '');
  var waMessage = encodeURIComponent(get(CFG, 'contact.whatsappMessage', ''));
  var waHref = 'https://wa.me/' + waNumber + '?text=' + waMessage;
  var telHref = 'tel:' + get(CFG, 'contact.phoneHref', '');
  var mailHref = 'mailto:' + get(CFG, 'contact.email', '');
  var calLink = get(CFG, 'booking.calLink', '');
  var doctoraliaUrl = get(CFG, 'booking.doctoraliaUrl', '');
  var calEmbedReady = false;

  /* Destino del botón "Reservar" cuando NO hay Cal.com configurado */
  var fallbackBookingHref = doctoraliaUrl || waHref;

  /* ================================================== Imágenes con placeholder */
  /* Si la ruta no está configurada o el archivo no existe, se mantiene el
     placeholder y se avisa por consola. La web nunca se rompe. */
  function setImage(imgId, placeholderId, src, altText) {
    var img = $(imgId), ph = $(placeholderId);
    if (!img || !src) return;
    img.addEventListener('load', function () {
      img.classList.remove('hidden');
      if (ph) ph.classList.add('hidden');
    });
    img.addEventListener('error', function () {
      console.warn('No se pudo cargar la imagen "' + src + '". Sube el archivo con ese nombre exacto o cambia la ruta en config.js.');
      img.classList.add('hidden');
      if (ph) ph.classList.remove('hidden');
    });
    img.setAttribute('alt', altText || '');
    img.setAttribute('src', src);
  }

  /* ================================================== Reservas (Cal.com) */
  function ensureCalEmbed() {
    if (!calLink || calEmbedReady) return;
    calEmbedReady = true;
    (function (C, A, L) {
      var p = function (a, ar) { a.q.push(ar); };
      var d = C.document;
      C.Cal = C.Cal || function () {
        var cal = C.Cal, ar = arguments;
        if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true; }
        if (ar[0] === L) {
          var api = function () { p(api, arguments); };
          var namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); }
          else { p(cal, ar); }
          return;
        }
        p(cal, ar);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    window.Cal('init', { origin: 'https://cal.com' });
    window.Cal('inline', {
      elementOrSelector: '#cal-booking-container',
      calLink: calLink,
      layout: 'month_view'
    });
    window.Cal('ui', {
      styles: { branding: { brandColor: getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() } },
      hideEventTypeDetails: false
    });
  }

  function openBookingModal(e) {
    if (!calLink) return;            // sin Cal.com: el enlace normal hace su trabajo
    e.preventDefault();
    openModal('modal-reservar');
    ensureCalEmbed();
  }

  /* Aplica el destino y el comportamiento a TODOS los botones de reserva */
  function wireBookingButtons() {
    var nodes = document.querySelectorAll('[data-booking]');
    Array.prototype.forEach.call(nodes, function (el) {
      el.setAttribute('href', calLink ? '#' : fallbackBookingHref);
      if (!calLink && fallbackBookingHref === doctoraliaUrl) {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      }
      el.addEventListener('click', openBookingModal);
    });
  }

  /* ================================================== Marca */
  (function applyBrand() {
    var p1 = get(CFG, 'brand.namePart1', ''), p2 = get(CFG, 'brand.namePart2', '');
    var tagline = get(CFG, 'brand.tagline', '');
    var icon = get(CFG, 'brand.icon');

    setHTML('brand-name-header', esc(p1) + '<span class="text-primary">' + esc(p2) + '</span>');
    setHTML('brand-name-footer', esc(p1) + '<span class="text-primary">' + esc(p2) + '</span>');
    var tg = $('brand-tagline-header');
    if (tg) { if (tagline) tg.textContent = tagline; else tg.classList.add('hidden'); }

    var iconHeader = $('brand-icon-header'), iconFooter = $('brand-icon-footer');
    if (iconHeader && icon) iconHeader.setAttribute('data-lucide', icon);
    if (iconFooter && icon) iconFooter.setAttribute('data-lucide', icon);

    var logoSrc = get(CFG, 'images.logo', '');
    function setupLogo(imgId, iconEl) {
      var img = $(imgId);
      if (!img || !logoSrc) return;
      img.addEventListener('load', function () {
        img.classList.remove('hidden');
        if (iconEl) iconEl.classList.add('hidden');
      });
      img.addEventListener('error', function () {
        img.classList.add('hidden');
        if (iconEl) iconEl.classList.remove('hidden');
      });
      img.setAttribute('alt', get(CFG, 'legal.tradeName', '') + ' logo');
      img.setAttribute('src', logoSrc);
    }
    setupLogo('brand-logo-header', iconHeader);
    setupLogo('brand-logo-footer', iconFooter);
  })();

  /* ================================================== Header */
  (function applyHeader() {
    var ph = $('phone-link-header');
    if (ph) ph.setAttribute('href', telHref);
    setText('phone-text-header', get(CFG, 'contact.phoneDisplay'));
  })();

  /* ================================================== Hero (solo home) */
  (function applyHero() {
    if (!$('hero-title')) return;
    setText('hero-badge-text', get(CFG, 'hero.locationBadge'));
    setHTML('hero-title', esc(get(CFG, 'hero.titleLine1', '')) + '<span class="text-primary">' + esc(get(CFG, 'hero.titleHighlight', '')) + '</span>');
    setText('hero-description', get(CFG, 'hero.description'));
    setText('hero-rating', get(CFG, 'hero.googleRating'));
    setText('hero-collegiated', get(CFG, 'hero.collegiatedText'));
    setText('hero-image-caption', get(CFG, 'hero.imageCaption'));
    setText('hero-stat-number', get(CFG, 'hero.statNumber'));
    setText('hero-stat-label', get(CFG, 'hero.statLabel'));
    var phHero = $('phone-link-hero');
    if (phHero) phHero.setAttribute('href', telHref);
    setImage('hero-image', 'hero-image-placeholder', get(CFG, 'images.hero'),
      get(CFG, 'legal.tradeName', '') + ' — ' + get(CFG, 'hero.locationBadge', ''));
  })();

  /* ================================================== Servicios */
  (function applyServices() {
    var grid = $('services-grid');
    if (!grid) return;
    setText('services-eyebrow', get(CFG, 'servicesSection.eyebrow'));
    setText('services-heading', get(CFG, 'servicesSection.heading'));
    setText('services-description', get(CFG, 'servicesSection.description'));
    var items = CFG.services;
    if (!Array.isArray(items)) return;
    grid.innerHTML = items.map(function (s) {
      return '' +
        '<div class="reveal group p-7 rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-xl hover:shadow-slate-100 transition-all">' +
          '<span class="flex items-center justify-center w-13 h-13 rounded-2xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors">' +
            '<i data-lucide="' + esc(s.icon || 'circle') + '" class="w-6 h-6"></i>' +
          '</span>' +
          '<h3 class="font-heading font-semibold text-lg text-secondary mb-2">' + esc(s.title) + '</h3>' +
          '<p class="text-sm text-slate-500 leading-relaxed">' + esc(s.description) + '</p>' +
        '</div>';
    }).join('');
  })();

  /* ================================================== Por qué elegirnos */
  (function applyAbout() {
    var list = $('whyus-list');
    if (!list) return;
    setText('about-eyebrow', get(CFG, 'aboutSection.eyebrow'));
    setText('about-heading', get(CFG, 'aboutSection.heading'));
    setText('about-description', get(CFG, 'aboutSection.description'));
    setText('about-image-caption', get(CFG, 'aboutSection.imageCaption'));
    setImage('about-image', 'about-image-placeholder', get(CFG, 'images.about'), get(CFG, 'aboutSection.imageCaption', ''));
    var items = CFG.whyUs;
    if (!Array.isArray(items)) return;
    list.innerHTML = items.map(function (item) {
      return '' +
        '<div class="flex gap-4">' +
          '<span class="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-primary text-white">' +
            '<i data-lucide="' + esc(item.icon || 'circle') + '" class="w-5 h-5"></i>' +
          '</span>' +
          '<div>' +
            '<h4 class="font-heading font-semibold text-secondary mb-1">' + esc(item.title) + '</h4>' +
            '<p class="text-sm text-slate-500">' + esc(item.description) + '</p>' +
          '</div>' +
        '</div>';
    }).join('');
  })();

  /* ================================================== Banner de equipo (home) */
  (function applyTeamCta() {
    if (!$('teamcta-heading')) return;
    setText('teamcta-eyebrow', get(CFG, 'teamCta.eyebrow'));
    setText('teamcta-heading', get(CFG, 'teamCta.heading'));
    setText('teamcta-description', get(CFG, 'teamCta.description'));
    setText('teamcta-button-text', get(CFG, 'teamCta.buttonText'));

    /* Mini-retratos de los 4 primeros del equipo, como anticipo */
    var strip = $('teamcta-avatars');
    var team = CFG.team;
    if (strip && Array.isArray(team)) {
      strip.innerHTML = team.slice(0, 5).map(function (m, i) {
        return '' +
          '<span class="relative flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary font-heading font-semibold ring-4 ring-white overflow-hidden" style="margin-left:' + (i === 0 ? '0' : '-14px') + ';">' +
            '<span>' + esc(m.initials || '') + '</span>' +
            '<img src="' + esc(m.photo || '') + '" alt="" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity" onload="this.style.opacity=1" onerror="this.remove()">' +
          '</span>';
      }).join('');
    }
  })();

  /* ================================================== Planes / tarifas */
  (function applyPricing() {
    var grid = $('pricing-grid');
    if (!grid) return;
    setText('pricing-eyebrow', get(CFG, 'pricingSection.eyebrow'));
    setText('pricing-heading', get(CFG, 'pricingSection.heading'));
    setText('pricing-description', get(CFG, 'pricingSection.description'));
    var items = CFG.services;
    if (Array.isArray(items)) {
      grid.innerHTML = items.map(function (s) {
        return '' +
          '<div class="reveal flex flex-col p-7 rounded-2xl border border-slate-100 bg-white hover:border-primary/30 hover:shadow-xl hover:shadow-slate-100 transition-all">' +
            '<span class="flex items-center justify-center w-13 h-13 rounded-2xl bg-primary/10 text-primary mb-5">' +
              '<i data-lucide="' + esc(s.icon || 'circle') + '" class="w-6 h-6"></i>' +
            '</span>' +
            '<h3 class="font-heading font-semibold text-lg text-secondary mb-1">' + esc(s.title) + '</h3>' +
            '<p class="text-sm text-slate-500 leading-relaxed mb-5 flex-1">' + esc(s.description) + '</p>' +
            '<div class="flex items-baseline gap-1.5 pt-4 border-t border-slate-100">' +
              '<span class="font-heading text-2xl font-bold text-primary">' + esc(s.price) + '</span>' +
              '<span class="text-xs text-slate-400">' + esc(s.priceUnit) + '</span>' +
            '</div>' +
          '</div>';
      }).join('');
    }
    var notesEl = $('pricing-notes');
    var notes = CFG.pricingNotes;
    if (notesEl) {
      if (Array.isArray(notes) && notes.length) {
        notesEl.innerHTML = notes.map(function (n) {
          return '<li class="flex items-start gap-2.5">' +
                   '<i data-lucide="check" class="w-4 h-4 text-primary flex-shrink-0 mt-0.5"></i>' +
                   '<span>' + esc(n) + '</span>' +
                 '</li>';
        }).join('');
      } else {
        notesEl.classList.add('hidden');
      }
    }
  })();

  /* ================================================== CTA vídeos (home) */
  (function applyVideosCta() {
    if (!$('videos-cta-heading')) return;
    setText('videos-cta-eyebrow', get(CFG, 'ctaVideosSection.eyebrow'));
    setText('videos-cta-heading', get(CFG, 'ctaVideosSection.heading'));
    setText('videos-cta-description', get(CFG, 'ctaVideosSection.description'));
    setText('videos-cta-button-text', get(CFG, 'ctaVideosSection.buttonText'));
  })();

  /* ================================================== Testimonios */
  (function applyTestimonials() {
    var grid = $('testimonials-grid');
    if (!grid) return;
    setText('testimonials-eyebrow', get(CFG, 'testimonialsSection.eyebrow'));
    setText('testimonials-heading', get(CFG, 'testimonialsSection.heading'));
    setText('testimonials-description', get(CFG, 'testimonialsSection.description'));
    var items = CFG.testimonials;
    if (!Array.isArray(items)) return;
    grid.innerHTML = items.map(function (t) {
      var stars = '';
      for (var i = 0; i < (t.rating || 5); i++) stars += '<i data-lucide="star" class="w-4 h-4 fill-current"></i>';
      return '' +
        '<div class="reveal p-7 rounded-2xl bg-slate-50 border border-slate-100">' +
          '<div class="flex text-amber-400 mb-4">' + stars + '</div>' +
          '<p class="text-slate-600 text-sm leading-relaxed mb-5">&ldquo;' + esc(t.text) + '&rdquo;</p>' +
          '<div class="flex items-center gap-3">' +
            '<span class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-heading font-semibold">' + esc(t.initial) + '</span>' +
            '<div>' +
              '<p class="font-semibold text-secondary text-sm">' + esc(t.name) + '</p>' +
              '<p class="text-xs text-slate-400">' + esc(t.role) + '</p>' +
            '</div>' +
          '</div>' +
        '</div>';
    }).join('');
  })();

  /* ================================================== Contacto */
  (function applyContact() {
    if (!$('contact-heading')) return;
    setText('contact-eyebrow', get(CFG, 'contactSection.eyebrow'));
    setText('contact-heading', get(CFG, 'contactSection.heading'));
    setText('contact-description', get(CFG, 'contactSection.description'));
    setText('contact-address', get(CFG, 'contact.address'));
    setHTML('contact-hours', (get(CFG, 'contact.hoursLines', []) || []).map(esc).join('<br>'));

    var cp = $('contact-phone-link');
    if (cp) { cp.setAttribute('href', telHref); cp.textContent = get(CFG, 'contact.phoneDisplay', ''); }
    var ce = $('contact-email-link');
    if (ce) { ce.setAttribute('href', mailHref); ce.textContent = get(CFG, 'contact.email', ''); }
    var wc = $('whatsapp-contact');
    if (wc) wc.setAttribute('href', waHref);

    /* El mapa se inserta solo cuando la sección está a punto de verse:
       así no cuesta ni un byte en la carga inicial de la página. */
    var mapBox = $('contact-map');
    if (mapBox) {
      var q = encodeURIComponent(get(CFG, 'contact.mapEmbedQuery', get(CFG, 'contact.address', '')));
      var inject = function () {
        if (mapBox.dataset.loaded) return;
        mapBox.dataset.loaded = '1';
        mapBox.innerHTML = '<iframe src="https://www.google.com/maps?q=' + q + '&output=embed" ' +
          'width="100%" height="100%" style="border:0;min-height:320px;" allowfullscreen loading="lazy" ' +
          'referrerpolicy="no-referrer-when-downgrade" title="Mapa de ubicación de ' + esc(get(CFG, 'legal.tradeName', '')) + '"></iframe>';
      };
      if ('IntersectionObserver' in window) {
        var mo = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) { inject(); mo.disconnect(); }
        }, { rootMargin: '300px' });
        mo.observe(mapBox);
      } else { inject(); }
    }
  })();

  /* ================================================== Página de vídeos */
  (function applyVideosPage() {
    var list = $('videos-list');
    if (!list) return;
    setText('videos-eyebrow', get(CFG, 'videosSection.eyebrow'));
    setText('videos-heading', get(CFG, 'videosSection.heading'));
    setText('videos-description', get(CFG, 'videosSection.description'));

    var items = CFG.videos;
    if (!Array.isArray(items)) return;
    list.innerHTML = items.map(function (v, i) {
      var reversed = (i % 2 === 1);
      var videoBlock =
        '<div class="' + (reversed ? 'lg:order-2' : '') + '">' +
          '<div class="aspect-video w-full rounded-3xl overflow-hidden border border-slate-100 shadow-lg bg-slate-900">' +
            '<video class="w-full h-full object-cover" controls preload="none" playsinline poster="' + esc(v.poster) + '">' +
              '<source src="' + esc(v.video) + '" type="video/mp4">' +
              'Tu navegador no soporta la reproducción de vídeo HTML5.' +
            '</video>' +
          '</div>' +
        '</div>';
      var textBlock =
        '<div class="' + (reversed ? 'lg:order-1' : '') + '">' +
          '<span class="text-primary font-semibold text-sm uppercase tracking-wider">Vídeo ' + (i + 1) + '</span>' +
          '<h2 class="font-heading text-2xl sm:text-3xl font-bold text-secondary mt-2 mb-4">' + esc(v.title) + '</h2>' +
          '<p class="text-slate-500 leading-relaxed">' + esc(v.description) + '</p>' +
        '</div>';
      return '<div class="reveal grid lg:grid-cols-2 gap-10 items-center">' + videoBlock + textBlock + '</div>';
    }).join('');
  })();

  /* ================================================== Página de profesionales */
  (function applyTeamPage() {
    var grid = $('team-grid');
    if (!grid) return;
    setText('team-eyebrow', get(CFG, 'teamSection.eyebrow'));
    setText('team-heading', get(CFG, 'teamSection.heading'));
    setText('team-description', get(CFG, 'teamSection.description'));

    var items = CFG.team;
    if (!Array.isArray(items)) return;

    grid.innerHTML = items.map(function (m) {
      var tags = Array.isArray(m.tags) && m.tags.length
        ? '<div class="flex flex-wrap gap-2 mt-5">' + m.tags.map(function (t) {
            return '<span class="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">' + esc(t) + '</span>';
          }).join('') + '</div>'
        : '';

      /* La foto se superpone al placeholder de iniciales: si el archivo no
         existe, el <img> se elimina solo y quedan las iniciales. */
      var photo = m.photo
        ? '<img src="' + esc(m.photo) + '" alt="' + esc(m.name) + ' — ' + esc(m.role) + '" loading="lazy" decoding="async" ' +
          'class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500" ' +
          'onload="this.style.opacity=1" onerror="this.remove()">'
        : '';

      return '' +
        '<article class="reveal group flex flex-col bg-white rounded-3xl border border-slate-100 overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-slate-100 transition-all">' +
          '<div class="relative aspect-[4/5] w-full bg-gradient-to-br from-primary/15 to-slate-200 overflow-hidden">' +
            '<div class="absolute inset-0 flex flex-col items-center justify-center gap-2">' +
              '<span class="font-heading text-4xl font-bold text-primary/60">' + esc(m.initials || '') + '</span>' +
              '<span class="text-xs text-slate-400 font-medium">Foto pendiente</span>' +
            '</div>' +
            photo +
          '</div>' +
          '<div class="p-7 flex flex-col flex-1">' +
            '<h3 class="font-heading font-bold text-xl text-secondary">' + esc(m.name) + '</h3>' +
            '<p class="text-sm font-semibold text-primary mt-1 mb-3">' + esc(m.role) + '</p>' +
            '<p class="text-sm text-slate-500 leading-relaxed flex-1">' + esc(m.description) + '</p>' +
            tags +
          '</div>' +
        '</article>';
    }).join('');

    setImage('team-hero-image', 'team-hero-placeholder', get(CFG, 'images.team'), 'Equipo de ' + get(CFG, 'legal.tradeName', ''));
  })();

  /* ================================================== Footer */
  (function applyFooter() {
    setText('footer-description', get(CFG, 'footer.description'));

    function social(id, url) {
      var el = $(id);
      if (!el) return;
      if (url) { el.setAttribute('href', url); el.classList.remove('hidden'); el.style.display = 'inline-flex'; }
      else { el.classList.add('hidden'); }
    }
    social('instagram-footer', get(CFG, 'contact.instagramUrl', ''));
    social('facebook-footer', get(CFG, 'contact.facebookUrl', ''));

    setText('footer-copyright-name', get(CFG, 'legal.tradeName', '') + ' — ' + get(CFG, 'legal.legalName', ''));
    setText('footer-nif', 'NIF/CIF: ' + get(CFG, 'legal.nif', ''));

    var fp = $('footer-phone');
    if (fp) { fp.setAttribute('href', telHref); fp.textContent = get(CFG, 'contact.phoneDisplay', ''); }
    var fe = $('footer-email');
    if (fe) { fe.setAttribute('href', mailHref); fe.textContent = get(CFG, 'contact.email', ''); }
    setText('footer-address', get(CFG, 'contact.address'));

    var y = $('year');
    if (y) y.textContent = new Date().getFullYear();
  })();

  /* ================================================== Modales legales */
  (function applyLegalModals() {
    if (!$('modal-aviso-legal-body')) return;
    var L = CFG.legal || {}, C = CFG.contact || {};
    var colegiado = L.collegiateNumber
      ? '<li><strong>Nº de colegiado:</strong> ' + esc(L.collegiateNumber) + '</li>' : '';
    var autorizacion = L.healthAuthorization
      ? '<li><strong>Autorización sanitaria:</strong> ' + esc(L.healthAuthorization) + '</li>' : '';

    setHTML('modal-aviso-legal-body',
      '<p>En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan a continuación los siguientes datos:</p>' +
      '<ul class="list-disc pl-5 space-y-1">' +
        '<li><strong>Titular:</strong> ' + esc(L.legalName) + ' (nombre comercial &laquo;' + esc(L.tradeName) + '&raquo;)</li>' +
        '<li><strong>NIF:</strong> ' + esc(L.nif) + '</li>' +
        '<li><strong>Domicilio:</strong> ' + esc(C.address) + '</li>' +
        '<li><strong>Email de contacto:</strong> ' + esc(C.email) + '</li>' +
        '<li><strong>Teléfono:</strong> ' + esc(C.phoneDisplay) + '</li>' +
        colegiado + autorizacion +
      '</ul>' +
      '<p><strong>Objeto.</strong> El presente sitio web tiene como finalidad informar sobre los servicios ofrecidos por ' + esc(L.tradeName) + ' y facilitar el contacto y la solicitud de citas por parte de los usuarios.</p>' +
      '<p><strong>Condiciones de uso.</strong> El acceso y uso de este sitio web atribuye la condición de usuario y supone la aceptación plena de todas las cláusulas incluidas en este Aviso Legal. El usuario se compromete a hacer un uso adecuado y lícito del sitio web, de conformidad con la legislación aplicable, la buena fe y el orden público.</p>' +
      '<p><strong>Propiedad intelectual e industrial.</strong> Todos los contenidos del sitio web (textos, imágenes, marcas, logotipos, código fuente y demás elementos) son propiedad de ' + esc(L.tradeName) + ' o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o transformación sin autorización expresa del titular.</p>' +
      '<p><strong>Exclusión de responsabilidad.</strong> ' + esc(L.tradeName) + ' no se hace responsable de los daños y perjuicios que pudieran derivarse de interferencias, interrupciones, virus informáticos o cualquier otra causa ajena a su voluntad. El contenido del sitio web tiene carácter meramente informativo y no sustituye la valoración de un profesional sanitario.</p>' +
      '<p><strong>Legislación aplicable.</strong> Las presentes condiciones se rigen por la legislación española. Para cualquier controversia derivada del uso de este sitio web, las partes se someten a los Juzgados y Tribunales que correspondan conforme a derecho.</p>'
    );

    setHTML('modal-privacidad-body',
      '<p>De conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), se informa de lo siguiente:</p>' +
      '<p><strong>Responsable del tratamiento.</strong> ' + esc(L.legalName) + ' (&laquo;' + esc(L.tradeName) + '&raquo;), con NIF ' + esc(L.nif) + ' y domicilio en ' + esc(C.address) + '. Email de contacto: ' + esc(C.email) + '.</p>' +
      '<p><strong>Finalidad del tratamiento.</strong> Los datos personales facilitados a través de la plataforma de citas, WhatsApp, correo electrónico o llamada telefónica se tratan con la finalidad de gestionar solicitudes de información, reservas de cita y la relación con el paciente. Los datos de salud, en su caso, se tratan exclusivamente con fines de valoración y tratamiento por parte de los profesionales sanitarios del centro.</p>' +
      '<p><strong>Legitimación.</strong> El tratamiento se basa en el consentimiento del interesado (art. 6.1.a RGPD) y, en el caso de datos de salud, en el consentimiento explícito (art. 9.2.a RGPD), así como en la ejecución de la relación asistencial (art. 6.1.b RGPD).</p>' +
      '<p><strong>Conservación.</strong> Los datos se conservarán mientras se mantenga la relación con el paciente y, posteriormente, durante los plazos legalmente exigidos por la normativa sanitaria, fiscal y contable.</p>' +
      '<p><strong>Destinatarios.</strong> No se cederán datos a terceros salvo obligación legal. Los proveedores que puedan tener acceso a datos (alojamiento web, plataforma de reserva de citas y recordatorios) actúan como encargados del tratamiento conforme al art. 28 RGPD y pueden realizar transferencias internacionales amparadas en las garantías previstas en el RGPD.</p>' +
      '<p><strong>Derechos.</strong> El interesado puede ejercer sus derechos de acceso, rectificación, supresión, limitación, oposición y portabilidad dirigiéndose por escrito a ' + esc(C.email) + ', adjuntando copia de un documento identificativo. Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.</p>' +
      '<p><strong>Medidas de seguridad.</strong> ' + esc(L.tradeName) + ' aplica las medidas técnicas y organizativas necesarias para garantizar la seguridad e integridad de los datos personales tratados, así como para evitar su alteración, pérdida o acceso no autorizado.</p>'
    );

    setHTML('modal-cookies-body',
      '<p>Este sitio web, titularidad de ' + esc(L.legalName) + ' (&laquo;' + esc(L.tradeName) + '&raquo;, NIF ' + esc(L.nif) + '), utiliza cookies propias y, en su caso, de terceros para mejorar la experiencia de navegación, en cumplimiento del artículo 22.2 de la LSSI-CE y del RGPD.</p>' +
      '<p><strong>¿Qué es una cookie?</strong> Una cookie es un pequeño archivo de texto que se almacena en el navegador del usuario al visitar una página web, y que permite recordar información sobre su visita.</p>' +
      '<p><strong>Tipos de cookies utilizadas:</strong></p>' +
      '<ul class="list-disc pl-5 space-y-1">' +
        '<li><strong>Cookies técnicas (necesarias):</strong> imprescindibles para el funcionamiento básico de la web, como recordar tu elección sobre esta misma política de cookies.</li>' +
        '<li><strong>Cookies de terceros:</strong> el mapa de Google Maps y la plataforma de reserva de citas pueden instalar sus propias cookies cuando se cargan. Ambos elementos se cargan únicamente al llegar a esa parte de la página o al abrir el calendario.</li>' +
      '</ul>' +
      '<p><strong>Gestión de cookies.</strong> Al acceder a esta web se muestra un banner que permite aceptar o rechazar el uso de cookies no esenciales. Puedes cambiar tu decisión en cualquier momento eliminando las cookies almacenadas por este sitio desde la configuración de tu navegador.</p>' +
      '<p><strong>Desactivación desde el navegador.</strong> Adicionalmente, puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones de tu navegador (Chrome, Firefox, Safari, Edge, etc.).</p>' +
      '<p>Esta Política de Cookies puede actualizarse en función de exigencias legales o para adaptarla a las instrucciones de la Agencia Española de Protección de Datos.</p>'
    );
  })();

  /* ================================================== Modales (genérico) */
  function openModal(id) {
    var modal = $(id);
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  }
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-modal]'), function (btn) {
    btn.addEventListener('click', function () { openModal(btn.getAttribute('data-modal')); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-close-modal]'), function (btn) {
    btn.addEventListener('click', function () { closeModal(btn.closest('.legal-modal')); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      Array.prototype.forEach.call(document.querySelectorAll('.legal-modal:not(.hidden)'), closeModal);
    }
  });

  /* ================================================== Botones de reserva */
  wireBookingButtons();

  /* ================================================== Menú móvil */
  (function initMenu() {
    var menuBtn = $('menu-btn'), mobileMenu = $('mobile-menu');
    if (!menuBtn || !mobileMenu) return;
    var open = false;
    function setMenu(value) {
      open = value;
      mobileMenu.style.maxHeight = open ? mobileMenu.scrollHeight + 'px' : '0px';
      mobileMenu.style.opacity = open ? '1' : '0';
      menuBtn.innerHTML = '<i data-lucide="' + (open ? 'x' : 'menu') + '" class="w-6 h-6"></i>';
      menuBtn.setAttribute('aria-expanded', String(open));
      icons();
    }
    menuBtn.addEventListener('click', function () { setMenu(!open); });
    Array.prototype.forEach.call(mobileMenu.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
  })();

  /* ================================================== Sombra del navbar */
  (function initNavbarShadow() {
    var navbar = $('navbar');
    if (!navbar) return;
    var onScroll = function () {
      navbar.classList.toggle('shadow-sm', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  /* ================================================== Banner de cookies */
  (function initCookies() {
    var banner = $('cookie-banner');
    if (!banner) return;
    var KEY = 'site_cookie_consent';
    var accept = $('cookie-accept'), reject = $('cookie-reject');
    function setConsent(v) {
      try { localStorage.setItem(KEY, v); } catch (e) { /* modo privado */ }
      banner.classList.add('hidden');
    }
    if (accept) accept.addEventListener('click', function () { setConsent('accepted'); });
    if (reject) reject.addEventListener('click', function () { setConsent('rejected'); });
    var consent = null;
    try { consent = localStorage.getItem(KEY); } catch (e) { /* modo privado */ }
    if (!consent) banner.classList.remove('hidden');
  })();

  /* ================================================== Aparición al hacer scroll */
  (function initReveal() {
    var targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    Array.prototype.forEach.call(targets, function (el) { observer.observe(el); });
  })();

  /* ================================================== Iconos */
  /* Lucide se carga con defer; si aún no está listo, se reintenta al load. */
  icons();
  window.addEventListener('load', icons);
})();
