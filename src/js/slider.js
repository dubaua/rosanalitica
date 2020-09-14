import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

//TODO если элемент один, то слайдер не нужен

const mainSlider = new Swiper('.main-swiper-container', {
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
});

console.log('slider');