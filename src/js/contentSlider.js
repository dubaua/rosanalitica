import Swiper, { Navigation } from 'swiper';
Swiper.use([Navigation]);

const contentSliderNodeList = document.querySelectorAll('[data-content-slider]');

if (contentSliderNodeList.length) {
  for (let i = 0; i < contentSliderNodeList.length; i++) {
    initContentSlider(contentSliderNodeList[i]);
  }
}

function initContentSlider(contentSlider) {
  const contentSliderControls = contentSlider.querySelector('[data-content-slider-controls]');
  const slideNodeList = contentSlider.querySelectorAll('[data-content-slider-slide]');
  const slideArray = Array.from(slideNodeList);
  const slidesCount = slideArray.length;

  const currentSliderNode = contentSlider.querySelector('[data-content-slider-current]');
  const totalSliderNode = contentSlider.querySelector('[data-content-slider-total]');

  const bannerSlideClass = 'banner--slider';

  function updateCurrentSlide(number) {
    currentSliderNode.innerText = number;
  }

  // init swiper only if slides more than 1
  if (slidesCount > 1) {
    const swiperContainerNode = contentSlider.querySelector('[data-content-slider-container]');
    new Swiper(swiperContainerNode, {
      loop: true,
      roundLengths: true,

      navigation: {
        nextEl: '.content-slider__navigation-button--next',
      },

      grabCursor: true,

      on: {
        slideChange() {
          updateCurrentSlide(this.realIndex + 1);
        },
        init() {
          updateCurrentSlide(this.realIndex + 1);
          totalSliderNode.innerText = slidesCount;
        },
      },
    });

    const bannerNodeList = contentSlider.querySelectorAll('[data-content-slider-banner]');
    for (let i = 0; i < bannerNodeList.length; i++) {
      bannerNodeList[i].classList.add(bannerSlideClass);
    }
  } else {
    // hide controls if swiper is no needed
    contentSliderControls.style.display = 'none';
  }
}
