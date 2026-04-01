/* ============================================
   APRESENTAÇÃO COMERCIAL — NAVEGAÇÃO
   Garagem 72 | Vantt Marketing
   ============================================ */

(function() {
    const slides = document.querySelectorAll('.slide');
    const progressBar = document.getElementById('progressBar');
    const slideCounter = document.getElementById('slideCounter');
    const navHint = document.querySelector('.nav-hint');
    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateSlide(index) {
        if (index < 0 || index >= totalSlides) return;

        slides[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');

        // Atualizar barra de progresso
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = progress + '%';

        // Atualizar contador
        slideCounter.textContent = (currentSlide + 1) + ' / ' + totalSlides;

        // Ajustar cor do contador conforme o slide
        const isDark = slides[currentSlide].classList.contains('slide--dark') ||
                       slides[currentSlide].classList.contains('slide--cover') ||
                       slides[currentSlide].classList.contains('slide--accent');
        slideCounter.style.color = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)';

        // Esconder dica apos primeiro clique
        if (currentSlide > 0) {
            navHint.style.opacity = '0';
        }
    }

    // Navegacao por teclado
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                updateSlide(currentSlide + 1);
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                updateSlide(currentSlide - 1);
                break;
            case 'Home':
                e.preventDefault();
                updateSlide(0);
                break;
            case 'End':
                e.preventDefault();
                updateSlide(totalSlides - 1);
                break;
        }
    });

    // Navegacao por clique
    document.addEventListener('click', function(e) {
        const x = e.clientX;
        const w = window.innerWidth;

        if (x > w * 0.3) {
            updateSlide(currentSlide + 1);
        } else {
            updateSlide(currentSlide - 1);
        }
    });

    // Navegacao por toque (swipe)
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                updateSlide(currentSlide + 1);
            } else {
                updateSlide(currentSlide - 1);
            }
        }
    });

    // Inicializar
    updateSlide(0);
})();
