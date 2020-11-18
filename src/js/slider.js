import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

const swiperContainer = document.querySelector('.main-swiper-container');

function initMainSlider() {
  new Swiper('.main-swiper-container', {
    loop: true,
    roundLengths: true,

    pagination: {
      el: '.slider__pagination',
      clickable: true,
    },

    navigation: {
      prevEl: '.slider__navigation-button--prev',
      nextEl: '.slider__navigation-button--next',
    },

    grabCursor: true,
  });
}

if (swiperContainer) {
  const slideNodeList = swiperContainer.querySelectorAll('.swiper-slide');
  const slideArray = Array.from(slideNodeList);
  const sliderNavigation = document.querySelector('[data-main-slider-navigation]');
  const sliderPagination = document.querySelector('[data-main-slider-pagination]');

  if (slideArray.length > 1) {
    initMainSlider();
  } else {
    sliderNavigation.style.display = 'none';
    sliderPagination.style.display = 'none';
  }
}
