// Карусель популярных разделов - простой вариант
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Показываем слайды по 3 на десктопе, по 1 на мобильных
    function updateVisibleSlides() {
        const isMobile = window.innerWidth <= 768;
        const visibleCount = isMobile ? 1 : 3;
        
        // Скрываем все слайды
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Показываем только нужные слайды
        for (let i = 0; i < visibleCount; i++) {
            const slideIndex = (currentIndex + i) % slideCount;
            slides[slideIndex].style.display = 'block';
        }
        
        // Обновление точек
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Переход к следующему слайду
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateVisibleSlides();
    }
    
    // Переход к предыдущему слайду
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateVisibleSlides();
    }
    
    // События для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateVisibleSlides();
        });
    });
    
    // Кнопка вперед
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Кнопка назад
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Автопрокрутка
    let autoplay = setInterval(nextSlide, 5000);
    
    // Остановка автопрокрутки при наведении
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            autoplay = setInterval(nextSlide, 5000);
        });
    }
    
    // Адаптация при ресайзе
    window.addEventListener('resize', updateVisibleSlides);
    
    // Инициализация
    updateVisibleSlides();
    
    // Остальной код...
});