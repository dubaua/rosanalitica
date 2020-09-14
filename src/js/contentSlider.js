import Swiper, { Navigation } from 'swiper';

Swiper.use([Navigation]);

const contentSliderControls = document.querySelector(
  '[data-content-slider-controls]',
);
const slideNodeList = document.querySelectorAll('[data-content-slider-slide]');
const slideArray = Array.from(slideNodeList);
const slidesCount = slideArray.length;

const currentSliderNode = document.querySelector(
  '[data-content-slider-current]',
);
const totalSliderNode = document.querySelector('[data-content-slider-total]');

function updateCurrentSlide(number) {
  currentSliderNode.innerText = number;
}

// init swiper only if slides more than 1
if (slidesCount > 1) {
  const contentSlider = new Swiper('.content-swiper-container', {
    loop: true,
    roundLengths: true,

    navigation: {
      nextEl: '.content-slider__navigation-button--next',
    },
  });

  totalSliderNode.innerText = slidesCount;
  updateCurrentSlide(contentSlider.realIndex + 1);

  contentSlider.on('slideChange', () => {
    updateCurrentSlide(contentSlider.realIndex + 1);
  });
} else {
  // hide controls if swiper is no needed
  contentSliderControls.style.display = 'none';
}
