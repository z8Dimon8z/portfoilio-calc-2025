// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Свой код пишем здесь
//E-mail Ajax Send
$(".popup__form").submit(function () {
  //Change
  var th = $(this);
  $.ajax({
    type: "POST",
    url: "./files/mail.php", //Change
    data: th.serialize(),
  }).done(function () {
    alert("Thank you!");
    setTimeout(function () {
      // Done Functions
      th.trigger("reset");
    }, 1000);
  });
  return false;
}); 


        // Базовая стоимость за страницу
        const basePrices = {
            simple: 5000,
            medium: 10000,
            complex: 15000,
            custom: 25000
        };

        // Множители для адаптивности
        const responsiveMultipliers = {
            none: 1.0,
            mobile: 1.3,
            tablet: 1.5,
            full: 1.8
        };

        // Дополнительные стоимости
        const additionalCosts = {
            framework: {
                none: 0,
                bootstrap: 1000,
                tailwind: 1500,
                foundation: 1200
            },
            animation: 2000,
            crossbrowser: 1500,
            deadline: 3000,
            // Стоимости для WordPress
            wordpress: {
                base: 10000, // Базовая стоимость натяжки
                theme: 5000, // Создание темы
                acf: 3000,   // Настройка ACF
                plugins: 2000, // Настройка плагинов
                admin: 1500, // Кастомизация админки
                training: 2500 // Обучение
            }
        };

        // Получаем элементы DOM
        const wordpressCheckbox = document.getElementById('wordpress');
        const wpOptions = document.getElementById('wpOptions');
        const calculateBtn = document.getElementById('calculateBtn');
        const resultDiv = document.getElementById('result');
        const priceBreakdown = document.getElementById('priceBreakdown');
        const totalPrice = document.getElementById('totalPrice');

        // Функция для переключения видимости WordPress опций
        function toggleWPOptions() {
            if (wordpressCheckbox.checked) {
                wpOptions.classList.add('active');
            } else {
                wpOptions.classList.remove('active');
                // Сбрасываем все чекбоксы WordPress
                document.querySelectorAll('.wp-options input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
            }
            calculatePrice();
        }

        // Функция форматирования цены
        function formatPrice(price) {
            return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
        }

        function calculatePrice() {
            // Получаем значения из формы
            const pages = parseInt(document.getElementById('pages').value) || 1;
            const complexity = document.getElementById('complexity').value;
            const responsive = document.getElementById('responsive').value;
            const framework = document.getElementById('framework').value;
            const hasAnimation = document.getElementById('animation').checked;
            const hasCrossbrowser = document.getElementById('crossbrowser').checked;
            const hasWordPress = document.getElementById('wordpress').checked;
            const hasDeadline = document.getElementById('deadline').checked;

            // WordPress опции
            const hasWPTheme = document.getElementById('wp_theme')?.checked || false;
            const hasWPAcf = document.getElementById('wp_acf')?.checked || false;
            const hasWPPlugins = document.getElementById('wp_plugins')?.checked || false;
            const hasWPAdmin = document.getElementById('wp_admin')?.checked || false;
            const hasWPTraining = document.getElementById('wp_training')?.checked || false;

            // Рассчитываем базовую стоимость
            let basePrice = basePrices[complexity] * pages;
            
            // Применяем множитель адаптивности
            basePrice *= responsiveMultipliers[responsive];

            // Добавляем стоимость фреймворка
            let frameworkCost = additionalCosts.framework[framework];

            // Добавляем дополнительные опции
            let animationCost = hasAnimation ? additionalCosts.animation : 0;
            let crossbrowserCost = hasCrossbrowser ? additionalCosts.crossbrowser : 0;
            let deadlineCost = hasDeadline ? additionalCosts.deadline : 0;

            // Стоимость WordPress
            let wordpressCost = 0;
            let wordpressDetails = [];

            if (hasWordPress) {
                wordpressCost += additionalCosts.wordpress.base;
                wordpressDetails.push(`Базовая натяжка: ${formatPrice(additionalCosts.wordpress.base)}`);

                if (hasWPTheme) {
                    wordpressCost += additionalCosts.wordpress.theme;
                    wordpressDetails.push(`Создание темы: +${formatPrice(additionalCosts.wordpress.theme)}`);
                }
                if (hasWPAcf) {
                    wordpressCost += additionalCosts.wordpress.acf;
                    wordpressDetails.push(`ACF поля: +${formatPrice(additionalCosts.wordpress.acf)}`);
                }
                if (hasWPPlugins) {
                    wordpressCost += additionalCosts.wordpress.plugins;
                    wordpressDetails.push(`Плагины: +${formatPrice(additionalCosts.wordpress.plugins)}`);
                }
                if (hasWPAdmin) {
                    wordpressCost += additionalCosts.wordpress.admin;
                    wordpressDetails.push(`Админ-панель: +${formatPrice(additionalCosts.wordpress.admin)}`);
                }
                if (hasWPTraining) {
                    wordpressCost += additionalCosts.wordpress.training;
                    wordpressDetails.push(`Обучение: +${formatPrice(additionalCosts.wordpress.training)}`);
                }
            }

            // Итоговая стоимость
            let totalCost = basePrice + frameworkCost + animationCost + crossbrowserCost + 
                           wordpressCost + deadlineCost;

            // Формируем детализацию
            let breakdownHTML = `
                <div class="price-item">
                    <span class="price-label">Базовая стоимость (${pages} стр.):</span>
                    <span class="price-value">${formatPrice(basePrice)}</span>
                </div>
            `;

            // Добавляем опции в детализацию
            if (frameworkCost > 0) {
                breakdownHTML += `
                <div class="price-item">
                    <span class="price-label">Фреймворк:</span>
                    <span class="price-value">+${formatPrice(frameworkCost)}</span>
                </div>
                `;
            }

            if (animationCost > 0) {
                breakdownHTML += `
                <div class="price-item">
                    <span class="price-label">Анимации:</span>
                    <span class="price-value">+${formatPrice(animationCost)}</span>
                </div>
                `;
            }

            if (crossbrowserCost > 0) {
                breakdownHTML += `
                <div class="price-item">
                    <span class="price-label">Кроссбраузерность:</span>
                    <span class="price-value">+${formatPrice(crossbrowserCost)}</span>
                </div>
                `;
            }

            if (wordpressCost > 0) {
                breakdownHTML += `
                <div class="price-item">
                    <span class="price-label" style="color: #e74c3c; font-weight: bold;">WordPress:</span>
                    <span class="price-value" style="color: #e74c3c;">+${formatPrice(wordpressCost)}</span>
                </div>
                `;
                
                // Детализация WordPress
                wordpressDetails.forEach(detail => {
                    breakdownHTML += `
                    <div class="price-item" style="margin-left: 20px; font-size: 14px;">
                        <span class="price-label">${detail.split(':')[0]}:</span>
                        <span class="price-value">${detail.split(':')[1]}</span>
                    </div>
                    `;
                });
            }

            if (deadlineCost > 0) {
                breakdownHTML += `
                <div class="price-item">
                    <span class="price-label">Срочный заказ:</span>
                    <span class="price-value">+${formatPrice(deadlineCost)}</span>
                </div>
                `;
            }

            // Показываем результат
            priceBreakdown.innerHTML = breakdownHTML;
            totalPrice.textContent = `Итого: ${formatPrice(totalCost)}`;
            resultDiv.style.display = 'block';
        }

        // Назначаем обработчики событий
        function initEventListeners() {
            // Обработчик для WordPress чекбокса
            wordpressCheckbox.addEventListener('change', toggleWPOptions);
            
            // Обработчик для кнопки расчета
            calculateBtn.addEventListener('click', calculatePrice);
            
            // Обработчики для всех input и select элементов (автоматический пересчет)
            const inputs = document.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.addEventListener('change', calculatePrice);
            });
            
            // Обработчики для WordPress под-опций
            const wpSubOptions = document.querySelectorAll('.wp-options input[type="checkbox"]');
            wpSubOptions.forEach(option => {
                option.addEventListener('change', calculatePrice);
            });
        }

        // Инициализация при загрузке страницы
        document.addEventListener('DOMContentLoaded', function() {
            initEventListeners();
            // Первоначальный расчёт
            calculatePrice();
        });