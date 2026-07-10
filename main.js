/* ============================================================
   DIVA BENIDORM – Main JavaScript
   Interactions, animations, and scroll behavior
   ============================================================ */

(function () {
  'use strict';

  /* ---------- DOM References ---------- */
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  const navLinks = document.querySelectorAll('[data-nav]');
  const mobileNavLinks = document.querySelectorAll('[data-mobile-nav]');
  const parallaxImage = document.getElementById('parallax-image');
  const reservationForm = document.getElementById('reservation-form');
  const formSuccess = document.getElementById('form-success');

  /* ---------- Lenis Smooth Scroll ---------- */
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    if (typeof gsap !== 'undefined' && gsap.ticker) {
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    document.addEventListener("click", function(e) {
      const target = e.target.closest('a');
      if (target && target.hash && target.origin === window.location.origin) {
        const hashTarget = document.querySelector(target.hash);
        if (hashTarget) {
          e.preventDefault();
          lenis.scrollTo(hashTarget);
        }
      }
    });
  }

  /* ---------- GSAP Splash Curtain ---------- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const curtain = document.getElementById('splash-curtain');
    const trigger = document.getElementById('splash-trigger');

    if (curtain && trigger) {
      gsap.to(curtain, {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "+=100%",
          scrub: 1.2,
          pin: false,
          anticipatePin: 1
        }
      });
    }
  }

  /* ---------- Esencia / Conócenos — Animaciones Premium ---------- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    var esenciaSection = document.querySelector('.esencia');

    if (esenciaSection) {
      // Lenis scroll sync (ya debería estar activo globalmente, pero lo aseguramos)
      if (lenis) {
        lenis.on('scroll', ScrollTrigger.update);
      }

      // 1. Efecto curtain reveal del título "Conócenos"
      ScrollTrigger.create({
        trigger: esenciaSection,
        start: 'top 70%',
        onEnter: function () {
          var revealEl = esenciaSection.querySelector('.reveal-text');
          if (revealEl) revealEl.classList.add('is-visible');
        }
      });

      // 2. Columnas en cascada (stagger)
      gsap.fromTo(
        esenciaSection.querySelectorAll('.esencia__item'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: esenciaSection,
            start: 'top 75%'
          }
        }
      );

      // 3. Iconos con escala tipo "back.out"
      gsap.fromTo(
        esenciaSection.querySelectorAll('.esencia__icon'),
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: esenciaSection,
            start: 'top 75%'
          }
        }
      );

      // 4. Párrafo final con fade-up lento
      var esenciaQuote = esenciaSection.querySelector('.esencia__quote');
      if (esenciaQuote) {
        gsap.fromTo(
          esenciaQuote,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: esenciaSection,
              start: 'top 80%'
            }
          }
        );
      }
    }
  }

  /* ---------- Smooth Scroll Hero Reveal ---------- */
  var heroSection = document.querySelector('.hero[data-scroll-height]');
  var heroSticky = heroSection ? heroSection.querySelector('.hero__sticky') : null;
  var heroBgs = heroSection ? heroSection.querySelectorAll('.hero__bg') : [];

  if (heroSection && heroSticky) {
    var scrollHeight = parseInt(heroSection.getAttribute('data-scroll-height'), 10) || 2000;
    var initialClip = parseInt(heroSection.getAttribute('data-clip-start'), 10) || 30;
    var finalClip = parseInt(heroSection.getAttribute('data-clip-end'), 10) || 70;

    // Set the hero section height dynamically
    heroSection.style.height = 'calc(' + scrollHeight + 'px + 100vh)';

    var heroAnimTicking = false;

    function updateHeroReveal() {
      var scrollY = window.scrollY;
      var heroTop = heroSection.offsetTop;
      var progress = Math.min(Math.max((scrollY - heroTop) / scrollHeight, 0), 1);

      // Interpolate clip-path: starts at initialClip%→finalClip%, ends at 0%→100%
      var clipStart = initialClip * (1 - progress);           // 30 → 0
      var clipEnd = finalClip + (100 - finalClip) * progress; // 70 → 100

      heroSticky.style.clipPath =
        'polygon(' + clipStart + '% ' + clipStart + '%, ' +
                     clipEnd + '% ' + clipStart + '%, ' +
                     clipEnd + '% ' + clipEnd + '%, ' +
                     clipStart + '% ' + clipEnd + '%)';

      // Interpolate background-size: 170% → 100% over (scrollHeight + 500)
      var sizeProgress = Math.min(Math.max((scrollY - heroTop) / (scrollHeight + 500), 0), 1);
      var bgSize = 170 - 70 * sizeProgress; // 170% → 100%

      heroBgs.forEach(function (bg) {
        bg.style.backgroundSize = bgSize + '%';
      });

      heroAnimTicking = false;
    }

    function onHeroScroll() {
      if (!heroAnimTicking) {
        heroAnimTicking = true;
        requestAnimationFrame(updateHeroReveal);
      }
    }

    window.addEventListener('scroll', onHeroScroll, { passive: true });
    updateHeroReveal(); // Initial state
  }

  /* ---------- Sticky Header ---------- */
  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Initial check

  /* ---------- Mobile Menu ---------- */
  function openMobileMenu() {
    mobileNav.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Cerrar menú');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileNav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  }

  function toggleMobileMenu() {
    if (mobileNav.classList.contains('is-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  hamburger.addEventListener('click', toggleMobileMenu);
  mobileBackdrop.addEventListener('click', closeMobileMenu);

  // Close mobile menu on link click
  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  /* ---------- Smooth Scroll with Offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var headerHeight = header.offsetHeight;
      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  /* ---------- Active Navigation Link ---------- */
  var sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    var scrollPos = window.scrollY + header.offsetHeight + 100;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Desktop nav
        navLinks.forEach(function (link) {
          link.classList.remove('is-active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('is-active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav(); // Initial check

  /* ---------- Scroll Animations (Intersection Observer) ---------- */
  var animatedElements = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Animate only once
        }
      });
    }, observerOptions);

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    animatedElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Parallax Effect (Menu Section Image) ---------- */
  function handleParallax() {
    if (!parallaxImage || window.innerWidth < 768) return;

    var rect = parallaxImage.parentElement.getBoundingClientRect();
    var viewportHeight = window.innerHeight;

    // Only apply parallax when the image is in view
    if (rect.top < viewportHeight && rect.bottom > 0) {
      var scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      var translateY = (scrollProgress - 0.5) * 30; // 5% movement, very subtle
      parallaxImage.style.transform = 'translateY(' + translateY + 'px)';
    }
  }

  window.addEventListener('scroll', handleParallax, { passive: true });

  /* ---------- Form Handling ---------- */
  if (reservationForm) {
    reservationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      var isValid = true;
      var requiredFields = reservationForm.querySelectorAll('[required]');

      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderBottomColor = '#8B1E1E';

          // Reset border after 3 seconds
          setTimeout(function () {
            field.style.borderBottomColor = '';
          }, 3000);
        }
      });

      // Email validation
      var emailField = document.getElementById('form-email');
      if (emailField && emailField.value) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
          emailField.style.borderBottomColor = '#8B1E1E';
          setTimeout(function () {
            emailField.style.borderBottomColor = '';
          }, 3000);
        }
      }

      if (isValid) {
        // Show success message
        reservationForm.style.display = 'none';
        formSuccess.classList.add('is-visible');

        // Reset after 5 seconds
        setTimeout(function () {
          reservationForm.reset();
          reservationForm.style.display = 'flex';
          formSuccess.classList.remove('is-visible');
        }, 5000);
      }
    });

    // Gold focus states
    var formInputs = reservationForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(function (input) {
      input.addEventListener('focus', function () {
        this.style.borderBottomColor = '#FAD261';
      });
      input.addEventListener('blur', function () {
        this.style.borderBottomColor = '';
      });
    });
  }

  /* ---------- Set minimum date to today ---------- */
  var dateField = document.getElementById('form-date');
  if (dateField) {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    dateField.setAttribute('min', yyyy + '-' + mm + '-' + dd);
  }

  /* ---------- Tradition Wheel Logic ---------- */
  function initTraditionWheel() {
    var container = document.getElementById('tradition-wheel');
    var rotator = document.getElementById('tradition-rotator');
    var nodesWrapper = document.getElementById('tradition-nodes');
    var svgLayer = document.getElementById('tradition-svg');
    if (!container || !rotator || !nodesWrapper || !svgLayer) return;

    var pillars = [
      {
        id: 1,
        title: "Masa Madre",
        subtitle: "El secreto de nuestra pizza",
        description: "Fermentada lentamente durante 48 horas, nuestra masa es ligera, digestible y llena de sabor. La base perfecta.",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22 22 2"/><path d="M3.47 11.53c.27 1.05-.05 2.14-.85 2.87-1.14 1.04-2.84 1.11-3.6.14.77-.97.77-2.73 0-3.69-.76-.97-2.46-.9-3.6.14-.8.73-1.12 1.82-.85 2.87"/><path d="M11.53 3.47c1.05.27 2.14-.05 2.87-.85 1.04-1.14 1.11-2.84.14-3.6-.97.77-2.73.77-3.69 0-.97-.76-.9-2.46.14-3.6.73-.8 1.82-1.12 2.87-.85"/></svg>',
        relatedIds: [2, 3],
      },
      {
        id: 2,
        title: "Horno de Leña",
        subtitle: "Fuego que acaricia",
        description: "Alcanzamos los 450°C con leña de olivo para un horneado rápido que sella los aromas y crea bordes perfectos.",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
        relatedIds: [1, 4],
      },
      {
        id: 3,
        title: "Ingredientes Selectos",
        subtitle: "Del campo a la mesa",
        description: "Tomates San Marzano DOP, mozzarella fior di latte fresca, albahaca recién cortada. Solo lo mejor.",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589c-.26 0-.51.051-.74.144A5.5 5.5 0 0 0 5.253 9.444 4 4 0 0 0 4 17c0 1.104.896 2 2 2h11Z"/><path d="M12 21v-4"/><path d="M7 21v-4"/></svg>',
        relatedIds: [1, 5],
      },
      {
        id: 4,
        title: "Pastas Artesanales",
        subtitle: "Tradición en cada hebra",
        description: "Elaboramos nuestra pasta fresca cada día con sémola de trigo duro y huevos de corral. Textura y sabor inconfundibles.",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 21.3a2.1 2.1 0 0 1-3-3L6 7"/><path d="m20.7 3.3-3.9 3.9"/><path d="m3.3 20.7 3.9-3.9"/></svg>',
        relatedIds: [2, 5],
      },
      {
        id: 5,
        title: "Carnes Premium",
        subtitle: "Cortes de primera",
        description: "Selección de carnes maduradas a la parrilla, preparadas con hierbas italianas y servidas en su punto justo.",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
        relatedIds: [4, 6],
      },
      {
        id: 6,
        title: "Coctelería de Autor",
        subtitle: "Gin & Tonics únicos",
        description: "Nuestro Diva Bar ofrece combinaciones exclusivas con botánicos premium, maridando con la experiencia italiana.",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M12 15v7"/><path d="M19 3l-7 12-7-12Z"/></svg>',
        relatedIds: [5],
      }
    ];

    var activeId = null;
    var rotationAngle = 0;
    var intervalRef = null;
    var cachedNodeContainers = [];

    function updateTransform() {
      rotator.style.transform = 'rotate(' + rotationAngle + 'deg)';
      cachedNodeContainers.forEach(function(node) {
        node.style.transform = 'translate(-50%, -50%) rotate(' + (-rotationAngle) + 'deg)';
      });
    }

    function toggleInterval() {
      if (activeId === null) {
        if (!intervalRef) {
          intervalRef = setInterval(function() {
            rotationAngle = (rotationAngle + 0.12) % 360;
            updateTransform();
          }, 50);
        }
      } else {
        if (intervalRef) {
          clearInterval(intervalRef);
          intervalRef = null;
        }
      }
    }

    function updateActiveState() {
      var lines = svgLayer.querySelectorAll('.tradition-wheel__line');
      
      cachedNodeContainers.forEach(function(node, index) {
        var id = parseInt(node.getAttribute('data-id'), 10);
        var isActive = (activeId === id);
        
        if (isActive) {
          node.classList.add('is-active');
          node.querySelector('.tradition-node').setAttribute('aria-expanded', 'true');
          lines[index].classList.add('is-active');
        } else {
          node.classList.remove('is-active');
          node.querySelector('.tradition-node').setAttribute('aria-expanded', 'false');
          lines[index].classList.remove('is-active');
        }
      });

      toggleInterval();
    }

    function buildWheel() {
      var radius = window.innerWidth <= 768 ? 120 : 180;
      nodesWrapper.innerHTML = '';
      svgLayer.innerHTML = '';
      cachedNodeContainers = [];

      pillars.forEach(function(pillar, index) {
        var angle = (index / pillars.length) * 2 * Math.PI - Math.PI / 2;
        var x = radius * Math.cos(angle);
        var y = radius * Math.sin(angle);
        var isActive = activeId === pillar.id;

        // Line
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('class', 'tradition-wheel__line' + (isActive ? ' is-active' : ''));
        line.setAttribute('x1', '50%');
        line.setAttribute('y1', '50%');
        line.setAttribute('x2', 'calc(50% + ' + (x - 32 * Math.cos(angle)) + 'px)');
        line.setAttribute('y2', 'calc(50% + ' + (y - 32 * Math.sin(angle)) + 'px)');
        svgLayer.appendChild(line);

        // Node container
        var nodeHtml = `
          <div class="tradition-node-container ${isActive ? 'is-active' : ''}" style="left: calc(50% + ${x}px); top: calc(50% + ${y}px);" data-id="${pillar.id}">
            <button class="tradition-node" aria-label="${pillar.title}" aria-expanded="${isActive}">
              ${pillar.icon}
            </button>
            <span class="tradition-node__label">${pillar.title}</span>
            <div class="tradition-card">
              <div class="tradition-card__header">
                <div class="tradition-card__title-row">
                  ${pillar.icon}
                  <h3 class="tradition-card__title">${pillar.title}</h3>
                </div>
                <p class="tradition-card__subtitle">${pillar.subtitle}</p>
              </div>
              <p class="tradition-card__content">${pillar.description}</p>
              ${pillar.relatedIds.length > 0 ? `
                <div class="tradition-card__related">
                  <p class="tradition-card__related-title">Conecta con:</p>
                  <div class="tradition-card__badges">
                    ${pillar.relatedIds.map(function(rid) {
                      var related = pillars.find(p => p.id === rid);
                      return related ? `<span class="tradition-card__badge">${related.title}</span>` : '';
                    }).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        `;
        nodesWrapper.insertAdjacentHTML('beforeend', nodeHtml);
      });

      cachedNodeContainers = nodesWrapper.querySelectorAll('.tradition-node-container');
      
      // Initial transform apply
      updateTransform();

      // Bind click events
      cachedNodeContainers.forEach(function(node) {
        node.querySelector('.tradition-node').addEventListener('click', function(e) {
          e.stopPropagation();
          var id = parseInt(node.getAttribute('data-id'), 10);
          activeId = activeId === id ? null : id;
          updateActiveState();
        });
      });
    }

    buildWheel();
    toggleInterval();

    // Click outside to close
    container.addEventListener('click', function(e) {
      if (activeId !== null && !e.target.closest('.tradition-node-container')) {
        activeId = null;
        updateActiveState();
      }
    });

    // Handle resize (rebuild layout but keep rotation)
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildWheel, 100);
    });
  }

  initTraditionWheel();

})();
