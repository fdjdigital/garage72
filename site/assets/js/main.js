/* Garagem 72 — Main JS */

(function() {
    /* Header scroll */
    var header = document.getElementById('header');
    var lastScroll = 0;

    window.addEventListener('scroll', function() {
        var current = window.pageYOffset;
        if (current > 60) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        lastScroll = current;
    });

    /* Mobile menu */
    var menuBtn = document.getElementById('menuBtn');
    var mainNav = document.getElementById('mainNav');

    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    /* Close mobile menu on link click */
    var navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            menuBtn.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    /* Smooth scroll */
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                var offset = header.offsetHeight + 16;
                var pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });

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
