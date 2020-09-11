const hamburger = document.querySelector('[data-hamburger]');
const catalogToggler = document.querySelector('[data-catalog-toggler]');
const catalogMobileToggler = document.querySelector(
  '[data-catalog-mobile-toggler]',
);

const catalogMenu = document.querySelector('[data-catalog-menu]');
const hamburgerMenu = document.querySelector('[data-hamburger-menu]');

const activeClass = 'is-active';

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle(activeClass);
  hamburgerMenu.classList.toggle(activeClass);
});
catalogToggler.addEventListener('click', () => {
  catalogMenu.classList.toggle(activeClass);
});
catalogMobileToggler.addEventListener('click', () => {
  catalogMenu.classList.toggle(activeClass);
});

// задаем ширину бургер-меню на десктопе
function setBurgerMenuWidth() {
  if (window.innerWidth >= 1200) {
    const headerMain = document.querySelector('[data-header-main]');
    const headerMainWidth = headerMain.offsetWidth;

    hamburgerMenu.style.width = headerMainWidth + 'px';
  } else {
    hamburgerMenu.style.width = 'auto';
  }
}

setBurgerMenuWidth();
window.addEventListener('resize', setBurgerMenuWidth);
