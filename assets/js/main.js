/* Garagem 72 — Main JS */

(function() {
    /* Header scroll */
    var header = document.getElementById('header');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 60) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });

    /* Smooth scroll (desktop nav + mobile nav) */
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var offset = header.offsetHeight + 16;
                var pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });

    /* Mobile nav — highlight active section */
    var mobileItems = document.querySelectorAll('.mobile-nav__item[href^="#"]');
    var sections = [];

    mobileItems.forEach(function(item) {
        var href = item.getAttribute('href');
        if (href === '#') {
            sections.push({ el: document.body, nav: item, top: 0 });
        } else {
            var sec = document.querySelector(href);
            if (sec) sections.push({ el: sec, nav: item, top: 0 });
        }
    });

    function updateMobileNav() {
        var scrollY = window.pageYOffset + 200;
        var active = sections[0];

        sections.forEach(function(s) {
            s.top = s.el.offsetTop;
            if (scrollY >= s.top) active = s;
        });

        mobileItems.forEach(function(item) {
            item.classList.remove('mobile-nav__item--active');
        });
        if (active) active.nav.classList.add('mobile-nav__item--active');
    }

    window.addEventListener('scroll', updateMobileNav);

    /* Fade in on scroll */
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.service-card, .diff-card, .team-card, .testimonial-card, .process__step, .brand-card, .about__stat').forEach(function(el) {
        el.classList.add('fade-in');
        observer.observe(el);
    });
})();
