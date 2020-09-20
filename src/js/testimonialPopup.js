import { popup } from 'leaflet';

const popupNode = document.querySelector('[data-testimonial-popup]');
const popupImageNode = document.querySelector('[data-testimonial-popup-image]');
const picturesNodeList = document.querySelectorAll(
  '[data-testimonial-picture]',
);
const picturesArray = Array.from(picturesNodeList);
const overlayNode = document.querySelector('[data-testimonial-popup-overlay]');
const closeButtonNode = document.querySelector(
  '[data-testimonial-popup-close]',
);
const isMobile = window.innerWidth >= 1200;

if (popupNode && isMobile) {
  overlayNode.addEventListener('click', closePopup);
  closeButtonNode.addEventListener('click', closePopup);
  
  document.addEventListener('click', ({ target }) => {
    picturesArray.forEach((picture) => {
      const zoomNode = picture.querySelector('[data-testimonial-zoom]');

      if (target === zoomNode) {
        openPopup(picture);
      }
    });
  });
}

function closePopup() {
  popupNode.style.display = 'none';
}

function openPopup(picture) {
  popupNode.style.display = 'block';

  const image = picture.getElementsByTagName('IMG')[0];
  const src = image.src;
  const alt = image.alt;

  popupImageNode.alt = alt;
  popupImageNode.src = src;
}
