/**
* Sourav Majee Portfolio Main JS
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class on scroll
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');

    if (
      !selectHeader.classList.contains('scroll-up-sticky') &&
      !selectHeader.classList.contains('sticky-top') &&
      !selectHeader.classList.contains('fixed-top')
    ) return;

    window.scrollY > 100
      ? selectBody.classList.add('scrolled')
      : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToggle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');

    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }

  /**
   * Hide mobile nav on nav link click
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {

      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToggle();
      }

    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');

  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {

    if (scrollTop) {

      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active');

    }

  }

  if (scrollTop) {

    scrollTop.addEventListener('click', (e) => {

      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });

  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * AOS Animation
   */
  function aosInit() {

    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

  }

  window.addEventListener('load', aosInit);

  /**
   * Typed.js
   */
  const selectTyped = document.querySelector('.typed');

  if (selectTyped) {

    let typed_strings = selectTyped.getAttribute('data-typed-items');

    typed_strings = typed_strings.split(',');

    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });

  }

  /**
   * Skills animation
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');

  skillsAnimation.forEach((item) => {

    new Waypoint({

      element: item,

      offset: '80%',

      handler: function () {

        let progress = item.querySelectorAll('.progress .progress-bar');

        progress.forEach(el => {

          el.style.width =
            el.getAttribute('aria-valuenow') + '%';

        });

      }

    });

  });

  /**
   * Swiper sliders
   */
  function initSwiper() {

    document.querySelectorAll(".init-swiper")
      .forEach(function (swiperElement) {

        let config = JSON.parse(
          swiperElement
            .querySelector(".swiper-config")
            .innerHTML.trim()
        );

        new Swiper(swiperElement, config);

      });

  }

  window.addEventListener("load", initSwiper);

  /**
   * Isotope portfolio filter
   */
  document.querySelectorAll('.isotope-layout')
    .forEach(function (isotopeItem) {

      let layout =
        isotopeItem.getAttribute('data-layout') ?? 'masonry';

      let filter =
        isotopeItem.getAttribute('data-default-filter') ?? '*';

      let sort =
        isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope;

      imagesLoaded(
        isotopeItem.querySelector('.isotope-container'),

        function () {

          initIsotope = new Isotope(
            isotopeItem.querySelector('.isotope-container'),

            {
              itemSelector: '.isotope-item',
              layoutMode: layout,
              filter: filter,
              sortBy: sort
            }

          );

        }
      );

      isotopeItem
        .querySelectorAll('.isotope-filters li')
        .forEach(function (filters) {

          filters.addEventListener('click', function () {

            isotopeItem
              .querySelector('.isotope-filters .filter-active')
              .classList.remove('filter-active');

            this.classList.add('filter-active');

            initIsotope.arrange({
              filter: this.getAttribute('data-filter')
            });

            if (typeof aosInit === 'function') {
              aosInit();
            }

          }, false);

        });

    });

})();