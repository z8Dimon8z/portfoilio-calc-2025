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
}); // Базовая стоимость за страницу
const basePrices = {
  simple: 5000,
  medium: 10000,
  complex: 15000,
  custom: 25000,
};

// Множители для адаптивности
const responsiveMultipliers = {
  none: 1.0,
  mobile: 1.3,
  tablet: 1.5,
  full: 1.8,
};

// Дополнительные стоимости
const additionalCosts = {
  framework: {
    none: 0,
    bootstrap: 1000,
    tailwind: 1500,
    foundation: 1200,
  },
  animation: 2000,
  crossbrowser: 1500,
  deadline: 3000,
};

function calculatePrice() {
  // Получаем значения из формы
  const pages = parseInt(document.getElementById("pages").value) || 1;
  const complexity = document.getElementById("complexity").value;
  const responsive = document.getElementById("responsive").value;
  const framework = document.getElementById("framework").value;
  const hasAnimation = document.getElementById("animation").checked;
  const hasCrossbrowser = document.getElementById("crossbrowser").checked;
  const hasDeadline = document.getElementById("deadline").checked;

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

  // Итоговая стоимость
  let totalCost =
    basePrice + frameworkCost + animationCost + crossbrowserCost + deadlineCost;

  // Форматируем цены
  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  // Показываем результат
  document.getElementById("priceBreakdown").innerHTML = `
                <div class="price-item">
                    <span class="price-label">Базовая стоимость (${pages} стр.):</span>
                    <span class="price-value">${formatPrice(basePrice)}</span>
                </div>
                ${
                  frameworkCost > 0
                    ? `
                <div class="price-item">
                    <span class="price-label">Фреймворк:</span>
                    <span class="price-value">+${formatPrice(
                      frameworkCost
                    )}</span>
                </div>
                `
                    : ""
                }
                ${
                  animationCost > 0
                    ? `
                <div class="price-item">
                    <span class="price-label">Анимации:</span>
                    <span class="price-value">+${formatPrice(
                      animationCost
                    )}</span>
                </div>
                `
                    : ""
                }
                ${
                  crossbrowserCost > 0
                    ? `
                <div class="price-item">
                    <span class="price-label">Кроссбраузерность:</span>
                    <span class="price-value">+${formatPrice(
                      crossbrowserCost
                    )}</span>
                </div>
                `
                    : ""
                }
                ${
                  deadlineCost > 0
                    ? `
                <div class="price-item">
                    <span class="price-label">Срочный заказ:</span>
                    <span class="price-value">+${formatPrice(
                      deadlineCost
                    )}</span>
                </div>
                `
                    : ""
                }
            `;

  document.getElementById("totalPrice").textContent = `Итого: ${formatPrice(
    totalCost
  )}`;
  document.getElementById("result").style.display = "block";
}

// Автоматический расчёт при изменении значений
document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.addEventListener("change", calculatePrice);
  });
  // Первоначальный расчёт
  calculatePrice();
});
