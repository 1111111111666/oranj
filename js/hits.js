// Карусель для страницы "Хиты"
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainers = document.querySelectorAll('.carousel-container');
    
    carouselContainers.forEach(container => {
        const track = container.querySelector('.carousel-track');
        const items = container.querySelectorAll('.carousel-item');
        const prevBtn = container.querySelector('.carousel-btn.prev');
        const nextBtn = container.querySelector('.carousel-btn.next');
        
        if (!track || items.length === 0) return;
        
        let currentIndex = 0;
        const itemWidth = items[0].offsetWidth + 20; // + gap
        
        // Показываем только 3 товара на десктопе, 1 на мобильных
        function updateVisibleItems() {
            const isMobile = window.innerWidth <= 768;
            const visibleCount = isMobile ? 1 : 5;
            
            // Скрываем все элементы
            items.forEach(item => {
                item.style.display = 'none';
            });
            
            // Показываем только нужные
            for (let i = 0; i < visibleCount; i++) {
                const itemIndex = (currentIndex + i) % items.length;
                items[itemIndex].style.display = 'block';
            }
        }
        
        // Следующий слайд
        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            updateVisibleItems();
        }
        
        // Предыдущий слайд
        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateVisibleItems();
        }
        
        // Кнопка вперед
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // Кнопка назад
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Автопрокрутка
        let autoplay = setInterval(nextSlide, 4000);
        
        // Остановка при наведении
        container.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });
        
        container.addEventListener('mouseleave', () => {
            autoplay = setInterval(nextSlide, 4000);
        });
        
        
        // Адаптация при ресайзе
        window.addEventListener('resize', updateVisibleItems);
        
        // Инициализация
        updateVisibleItems();
    });
    
    // Обработка URL с якорями
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }
});