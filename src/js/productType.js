const productTypeTogglersNode = document.querySelector('[data-product-toggle]');

const productTypeTogglerNodeList = document.querySelectorAll(
  '[data-product-type-toggler]',
);
const productTypeTogglerArray = Array.from(productTypeTogglerNodeList);
const productListNode = document.querySelector('[data-product-list]');

const togglerActiveClass = 'product-type__toggler--active';
const productListCardClass = 'product-list--card';
const productListCompactClass = 'product-list--compact';

let activeProductType = null;

let isMobile = window.innerWidth >= 1200;

function toggleProductType() {
  activeProductType = activeProductType === 'card' ? 'list' : 'card';
  const isCard = activeProductType === 'card';

  productTypeTogglerArray.forEach((toggler) => {
    const togglerType = toggler.getAttribute('data-product-type');

    if (activeProductType === null) {
      if (togglerType === 'card') {
        toggler.classList.add(togglerActiveClass);
      } else {
        toggler.classList.remove(togglerActiveClass);
      }
    } else {
      if (togglerType === activeProductType) {
        toggler.classList.add(togglerActiveClass);
      } else {
        toggler.classList.remove(togglerActiveClass);
      }
    }
  });

  if (isCard) {
    productListNode.classList.add(productListCardClass);
    productListNode.classList.remove(productListCompactClass);
  } else {
    productListNode.classList.remove(productListCardClass);
    productListNode.classList.add(productListCompactClass);
  }
}

function initProductTypeTogglers() {
  toggleProductType();

  productTypeTogglerArray.forEach((toggler) => {
    toggler.addEventListener('click', toggleProductType);
  });
}

if (productTypeTogglersNode) {
  if (isMobile) {
    initProductTypeTogglers();
  }

  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 1200;

    if (isMobile) {
      initProductTypeTogglers();
    }
  });
}
