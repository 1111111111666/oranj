
document.querySelectorAll('.order-btn, .carousel-order-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const productCard = this.closest('.product-card, .carousel-item');
        const productName = productCard.querySelector('.product-title, .carousel-title')?.textContent || 'Букет';
        const productPrice = productCard.querySelector('.product-price, .new-price, .current-price')?.textContent || '1 999 ₽';
        
        if (window.openOrderModal) {
            window.openOrderModal(productName, productPrice);
        }
    });
});

// Простое модальное окно оформления заказа
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('orderModal');
    const modalClose = document.querySelector('.modal-close');
    const modalSteps = document.querySelectorAll('.modal-step');
    let currentStep = 'step1';
    
    // Функция открытия модального окна
    function openOrderModal(productName, productPrice) {
        // Заполняем информацию о товаре
        document.getElementById('modalProductName').textContent = productName;
        document.getElementById('modalProductPrice').textContent = productPrice;
        
        // Сбрасываем все шаги
        modalSteps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Показываем первый шаг
        document.getElementById('step1').classList.add('active');
        currentStep = 'step1';
        
        // Сбрасываем форму
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            if (radio.name === 'deliveryType' && radio.value === 'pickup') {
                radio.checked = true;
            }
        });
        
        document.querySelectorAll('input[type="text"], input[type="tel"]').forEach(input => {
            input.value = '';
        });
        
        // Показываем модальное окно
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Функция закрытия модального окна
    function closeOrderModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Функция перехода к следующему шагу
    function goToStep(stepId) {
        modalSteps.forEach(step => {
            step.classList.remove('active');
        });
        
        document.getElementById(stepId).classList.add('active');
        currentStep = stepId;
    }
    
    // Функция обработки выбора способа доставки
    function handleDeliveryTypeChange() {
        const deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
        
        if (deliveryType === 'pickup') {
            // Переходим к выбору магазина
            goToStep('step3-pickup');
        } else {
            // Переходим к вводу адреса доставки
            goToStep('step3-delivery');
        }
    }
    
    // Обработчики событий
    
    // Закрытие модального окна
    modalClose.addEventListener('click', closeOrderModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeOrderModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeOrderModal();
        }
    });
    
    // Кнопки "Далее" и "Назад"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('next-btn')) {
            const nextStep = e.target.getAttribute('data-next');
            
            if (currentStep === 'step2') {
                // Определяем, какой следующий шаг показать
                handleDeliveryTypeChange();
            } else if (nextStep) {
                goToStep(nextStep);
            }
        }
        
        if (e.target.classList.contains('back-btn')) {
            const backStep = e.target.getAttribute('data-back');
            if (backStep) {
                goToStep(backStep);
            }
        }
        
        if (e.target.classList.contains('close-modal-btn')) {
            closeOrderModal();
        }
    });
    
    // Кнопка "Подтвердить заказ"
    document.querySelector('.confirm-btn').addEventListener('click', function() {
        // Проверяем заполнены ли обязательные поля
        const nameInput = document.querySelector('.contact-form-simple input[type="text"]');
        const phoneInput = document.querySelector('.contact-form-simple input[type="tel"]');
        
        if (!nameInput.value.trim() || !phoneInput.value.trim()) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        // Генерируем случайный номер заказа
        const orderNumber = Math.floor(1000 + Math.random() * 9000);
        document.getElementById('orderNumber').textContent = orderNumber;
        
        // Переходим к финальному шагу
        goToStep('step5');
        
        // Выводим информацию о заказе в консоль
        const deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
        const productName = document.getElementById('modalProductName').textContent;
        
        console.log('Новый заказ:', {
            номер: orderNumber,
            товар: productName,
            способ: deliveryType === 'pickup' ? 'Самовывоз' : 'Доставка',
            имя: nameInput.value,
            телефон: phoneInput.value
        });
    });
    
    // Обновляем все кнопки "В корзину" на странице
    document.querySelectorAll('.order-btn, .carousel-order-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Находим информацию о товаре
            const productCard = this.closest('.product-card, .carousel-item');
            let productName, productPrice;
            
            if (productCard) {
                productName = productCard.querySelector('.product-title, .carousel-title')?.textContent || 'Букет';
                productPrice = productCard.querySelector('.product-price, .new-price, .current-price')?.textContent || '1 999 ₽';
            } else {
                productName = 'Букет';
                productPrice = '1 999 ₽';
            }
            
            // Открываем модальное окно
            openOrderModal(productName, productPrice);
        });
    });
    
    // Делаем функцию глобальной
    window.openOrderModal = openOrderModal;
    window.closeOrderModal = closeOrderModal;
});