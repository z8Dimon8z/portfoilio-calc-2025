/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
// import Swiper, { Navigation } from 'swiper';

import Swiper from 'swiper';
import {
  Navigation, Pagination, Scrollbar
} from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
// import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';




// Инициализация слайдеров
function initSliders() {
  // Перечень слайдеров
  // Проверяем, есть ли слайдер на стронице
  if (document.querySelector('.advantages__slider')) { // Указываем скласс нужного слайдера
    // Создаем слайдер
    new Swiper('.swiper', { // Указываем скласс нужного слайдера
      // Подключаем модули слайдера
      // для конкретного случая
      modules: [Navigation, Pagination, Scrollbar],
      // observer: true,
      // observeParents: true,
      //  autoHeight: true,
    
      speed: 800,
      slidesPerView: 3,
      spaceBetween: 65,

      //touchRatio: 0,
      //simulateTouch: false,
      //loop: true,
      //preloadImages: false,
      //lazy: true,

      /*
      // Эффекты
      effect: 'fade',
      autoplay: {
      	delay: 3000,
      	disableOnInteraction: false,
      },
      */

      // Пагинация
      
      pagination: {
      	el: '.swiper-pagination',
      	type: 'fraction',
      },
      

      // Скроллбар
    
      scrollbar: {
      	el: '.swiper-scrollbar',
      	draggable: true,
      },
    

      /*
			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},
      */

      // Брейкпоинты

      breakpoints: {

          320: {
          spaceBetween: 15,
          slidesPerView: 1,
        },

          375: {
          spaceBetween: 25,
          slidesPerView: 1,
        },

          500: {
          spaceBetween: 60,
          slidesPerView: 2,
        },

          1220: {
          slidesPerView: 3,
          spaceBetween: 60,
        },

        2560: {
          slidesPerView: 3,
          spaceBetween: 62,
        },

      },

      // События
      on: {

      }
    });
  }
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
  let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: {
          enabled: true,
        },
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      });
      sliderScroll.scrollbar.updateSize();
    }
  }
}

window.addEventListener("load", function (e) {
  // Запуск инициализации слайдеров
  initSliders();
  // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
  //initSlidersScroll();
});