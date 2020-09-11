import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

//TODO если элемент один, то слайдер не нужен

const mainSlider = new Swiper('.swiper-container', {
  loop: true,
  autoplay: {
    delay: 3000,
  },
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
