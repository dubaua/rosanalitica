const catalogMenuNode = document.querySelector('[catalog-menu]');
let isMobile = window.innerWidth >= 1200;

const toggleDataSelector = 'data-catalog-menu-toggle-button';
const innerCategoryDataSelector = 'data-catalog-menu-category-list';

const toggleActiveClass = 'catalog-menu__toggle--active';
const categoryActiveClass = 'catalog-menu__inner-list--active';

let activeToggle = null;

function handleToggles(currentToggle, menuToggleArray) {
  menuToggleArray.forEach((toggle) => {
    if (toggle === currentToggle && currentToggle !== activeToggle) {
      toggle.classList.add(toggleActiveClass);
    } else {
      toggle.classList.remove(toggleActiveClass);
    }
  });
}

function handleCategories(currentToggle, menuInnerCategoryArray) {
  menuInnerCategoryArray.forEach((category) => {
    const currentToggleId = currentToggle.getAttribute(toggleDataSelector);
    const categoryId = category.getAttribute(innerCategoryDataSelector);

    if (currentToggleId === categoryId && currentToggle !== activeToggle) {
      category.classList.add(categoryActiveClass);
    } else {
      category.classList.remove(categoryActiveClass);
    }
  });
}

function initCatalogMenu() {
  const menuToggleListNode = catalogMenuNode.querySelectorAll(
    `[${toggleDataSelector}]`,
  );
  const menuInnerCategoryListNode = catalogMenuNode.querySelectorAll(
    `[${innerCategoryDataSelector}]`,
  );
  const menuToggleArray = Array.from(menuToggleListNode);
  const menuInnerCategoryArray = Array.from(menuInnerCategoryListNode);

  menuToggleArray.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      handleToggles(toggle, menuToggleArray);
      handleCategories(toggle, menuInnerCategoryArray);

      if (activeToggle !== toggle) {
        activeToggle = toggle;
      } else {
        activeToggle = null;
      }
    });
  });
}

if (catalogMenuNode) {
  if (isMobile) {
    initCatalogMenu();
  }

  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 1200;

    if (isMobile) {
      initCatalogMenu();
    }
  });
}
