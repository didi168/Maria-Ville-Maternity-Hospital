/* ==========================================================================
   MARIA VILLE SPECIALIST CLINIC & MATERNITY — MAIN INTERACTIONS
   Blocks:
     1. Utilities & Environment Detection
     2. Smooth Scroll (Lenis desktop-only) + GSAP ScrollTrigger Motion
     3. Sticky Header Scroll State & Active Nav Highlighting
     4. Accessible Mobile Drawer (Focus Trap, Esc, Outside Tap, Lenis Lock)
     5. Accessible FAQ Accordion
     6. Static Appointment Request Form Validation (No Network Submission)
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Utilities & Environment Detection
     ------------------------------------------------------------------------ */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice =
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;

  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  let lenis = null;

  /* ------------------------------------------------------------------------
     2. Smooth Scroll (Lenis) + GSAP ScrollTrigger Reveals
     ------------------------------------------------------------------------ */
  const revealAllImmediately = () => {
    document.querySelectorAll('.reveal, .hero-stagger').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  };

  const initMotion = () => {
    const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
    const hasLenis = typeof window.Lenis !== 'undefined';

    if (prefersReducedMotion || !hasGSAP) {
      revealAllImmediately();
      return;
    }

    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Arm initial hidden states only once GSAP is confirmed ready
    document.documentElement.classList.add('gsap-ready');

    // Connect Lenis on non-touch devices only (keep native touch scrolling on phones/tablets)
    if (hasLenis && !isTouchDevice) {
      lenis = new window.Lenis();
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    // Hero entrance stagger
    const heroItems = document.querySelectorAll('.hero-stagger');
    if (heroItems.length) {
      gsap.to(heroItems, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform'
      });
    }

    // Helper: reveal element cleanly once without ever getting trapped hidden
    const revealEl = (el, duration = 0.62) => {
      if (el.dataset.revealed === '1') return;
      el.dataset.revealed = '1';
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        ease: 'power3.out',
        overwrite: 'auto',
        clearProps: 'transform'
      });
    };

    // Responsive scroll reveals via gsap.matchMedia()
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => revealEl(el, 0.65),
          onEnterBack: () => revealEl(el, 0.45)
        });
      });
    });

    mm.add('(max-width: 767px)', () => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 94%',
          once: true,
          onEnter: () => revealEl(el, 0.45),
          onEnterBack: () => revealEl(el, 0.35)
        });
      });
    });

    // IntersectionObserver & fast-scroll safety net so jumped-past or in-view sections never remain hidden
    const sweepVisibleOrPassed = () => {
      const vh = window.innerHeight || 800;
      document.querySelectorAll('.reveal').forEach((el) => {
        if (el.dataset.revealed === '1') return;
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.96) {
          revealEl(el, isTouchDevice ? 0.4 : 0.55);
        }
      });
    };

    window.addEventListener('scroll', sweepVisibleOrPassed, { passive: true });
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
      sweepVisibleOrPassed();
    });

    // Refresh ScrollTrigger cleanly on orientation change
    window.addEventListener('orientationchange', () => {
      window.setTimeout(() => {
        ScrollTrigger.refresh();
        sweepVisibleOrPassed();
      }, 250);
    });

    // Short failsafe reveal for anything above or near the fold
    window.setTimeout(() => {
      document.querySelectorAll('.hero-stagger').forEach((el) => {
        if (window.getComputedStyle(el).opacity === '0') {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
      sweepVisibleOrPassed();
    }, 1200);
  };

  initMotion();

  /* ------------------------------------------------------------------------
     3. Sticky Header State, Smooth Anchor Scrolling & Active Nav Links
     ------------------------------------------------------------------------ */
  const siteHeader = document.getElementById('site-header');
  const updateHeaderState = () => {
    if (!siteHeader) return;
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();

  // Smooth anchor scroll via Lenis on desktop, native smooth scroll on touch
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      if (lenis && !prefersReducedMotion) {
        lenis.scrollTo(target, { offset: -76, duration: 0.9 });
      } else {
        const y = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({
          top: Math.max(0, y),
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  // Update active nav item based on visible section
  const navLinks = Array.from(document.querySelectorAll('.main-nav__link'));
  const trackedSections = navLinks
    .map((link) => {
      const id = link.getAttribute('href');
      return id ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && trackedSections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const activeId = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === activeId);
          });
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    trackedSections.forEach((section) => observer.observe(section));
  }

  /* ------------------------------------------------------------------------
     4. Accessible Mobile Drawer (Focus Trap, Esc, Outside Tap, Lenis Lock)
     ------------------------------------------------------------------------ */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerPanel = mobileDrawer ? mobileDrawer.querySelector('.mobile-drawer__panel') : null;

  const focusableSelector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  let lastFocusedEl = null;

  const closeDrawer = (restoreFocus = true) => {
    if (!mobileDrawer || mobileDrawer.hidden) return;
    mobileDrawer.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    if (lenis) lenis.start();

    window.setTimeout(() => {
      if (!mobileDrawer.classList.contains('is-open')) {
        mobileDrawer.hidden = true;
      }
    }, prefersReducedMotion ? 0 : 280);

    if (restoreFocus) {
      const returnTarget =
        lastFocusedEl && lastFocusedEl !== document.body && typeof lastFocusedEl.focus === 'function'
          ? lastFocusedEl
          : menuToggle;
      if (returnTarget && typeof returnTarget.focus === 'function') {
        returnTarget.focus();
      }
    }
  };

  const openDrawer = () => {
    if (!mobileDrawer || !drawerPanel) return;
    lastFocusedEl = document.activeElement;
    mobileDrawer.hidden = false;
    document.body.classList.add('nav-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    if (lenis) lenis.stop();

    window.requestAnimationFrame(() => {
      mobileDrawer.classList.add('is-open');
      if (drawerClose) drawerClose.focus();
    });
  };

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeDrawer(true);
      } else {
        openDrawer();
      }
    });

    if (drawerClose) {
      drawerClose.addEventListener('click', () => closeDrawer(true));
    }

    mobileDrawer.querySelectorAll('[data-drawer-close]').forEach((el) => {
      el.addEventListener('click', () => closeDrawer(true));
    });

    mobileDrawer.querySelectorAll('[data-drawer-link]').forEach((link) => {
      link.addEventListener('click', () => closeDrawer(false));
    });

    document.addEventListener('keydown', (event) => {
      if (mobileDrawer.hidden) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeDrawer(true);
        return;
      }

      if (event.key === 'Tab' && drawerPanel) {
        const focusables = Array.from(drawerPanel.querySelectorAll(focusableSelector));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    // Close drawer automatically if resized up to desktop
    const desktopMq = window.matchMedia('(min-width: 1024px)');
    desktopMq.addEventListener('change', (e) => {
      if (e.matches) closeDrawer(false);
    });
  }

  /* ------------------------------------------------------------------------
     5. Accessible FAQ Accordion
     ------------------------------------------------------------------------ */
  const faqTriggers = Array.from(document.querySelectorAll('.faq-trigger'));
  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;

      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isExpanded));
      panel.classList.toggle('is-open', !isExpanded);
    });
  });

  /* ------------------------------------------------------------------------
     6. Static Appointment Request Form (Client-Side UI Validation Only)
     ------------------------------------------------------------------------ */
  const form = document.getElementById('appointment-form');
  const formStatus = document.getElementById('form-status');

  if (form && formStatus) {
    const nameInput = document.getElementById('patient-name');
    const phoneInput = document.getElementById('patient-phone');
    const serviceInput = document.getElementById('service-type');

    const setFieldError = (input, errorId, message) => {
      const errorEl = document.getElementById(errorId);
      if (!input || !errorEl) return;
      if (message) {
        input.setAttribute('aria-invalid', 'true');
        errorEl.textContent = message;
      } else {
        input.removeAttribute('aria-invalid');
        errorEl.textContent = '';
      }
    };

    const validateForm = () => {
      let firstInvalid = null;

      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        setFieldError(nameInput, 'patient-name-error', 'Please enter your full name.');
        firstInvalid = firstInvalid || nameInput;
      } else {
        setFieldError(nameInput, 'patient-name-error', '');
      }

      const digits = phoneInput.value.replace(/\D/g, '');
      if (digits.length < 10) {
        setFieldError(phoneInput, 'patient-phone-error', 'Please enter a valid Nigerian phone number.');
        firstInvalid = firstInvalid || phoneInput;
      } else {
        setFieldError(phoneInput, 'patient-phone-error', '');
      }

      if (!serviceInput.value) {
        setFieldError(serviceInput, 'service-type-error', 'Please select the service you need.');
        firstInvalid = firstInvalid || serviceInput;
      } else {
        setFieldError(serviceInput, 'service-type-error', '');
      }

      return firstInvalid;
    };

    [
      [nameInput, 'patient-name-error'],
      [phoneInput, 'patient-phone-error'],
      [serviceInput, 'service-type-error']
    ].forEach(([input, errorId]) => {
      if (!input) return;
      input.addEventListener('input', () => setFieldError(input, errorId, ''));
      input.addEventListener('change', () => setFieldError(input, errorId, ''));
    });

    form.addEventListener('submit', (event) => {
      // Static UI only: never send a network request
      event.preventDefault();

      const firstInvalid = validateForm();
      if (firstInvalid) {
        formStatus.hidden = true;
        firstInvalid.focus();
        return;
      }

      const patientName = nameInput.value.trim();
      const service = serviceInput.value;
      const waText = encodeURIComponent(
        `Hello Maria Ville Specialist Clinic & Maternity, my name is ${patientName}. I would like to book ${service}.`
      );

      formStatus.innerHTML =
        `<strong>Thank you, ${patientName.replace(/[<>&"']/g, '')}.</strong> ` +
        `This form preview is currently static. To confirm your <strong>${service.replace(/[<>&"']/g, '')}</strong> visit right away, please ` +
        `<a href="tel:+2348060296224">call +234 806 029 6224</a> or ` +
        `<a href="https://wa.me/2348060296224?text=${waText}" target="_blank" rel="noopener noreferrer">send your details on WhatsApp</a>.`;
      formStatus.hidden = false;
      form.reset();
    });
  }
})();
