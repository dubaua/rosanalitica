import { debounce } from 'throttle-debounce';
import { toggleClassname } from './utils.js';

const hamburger = document.querySelector('[data-hamburger]');
const hamburgerMenuNode = document.querySelector('[data-hamburger-menu]');
const headerMain = document.querySelector('[data-header-main]');
const catalogMenuNodeList = document.querySelectorAll('[data-catalog-menu]');
const catalogMenuOpenButtonMobileNode = document.querySelector('[data-catalog-menu-open-button-mobile]');
const catalogMenuCloseButtonMobileNode = document.querySelector('[data-catalog-menu-close-button-mobile]');
const catalogMenuOverlayNode = document.querySelector('[data-catalog-menu-overlay]');
const catalogMenuPanelNode = catalogMenuOverlayNode.querySelector('[data-catalog-menu-panel]');
insertCatalogLinkNode();
const catalogMenuOpenOnHoverNodeList = document.querySelectorAll('[data-catalog-menu-open-hover]');
const catalogMenuItemActiveClassname = 'catalog-menu__item--active';
const catalogMenuPanelActiveClassname = 'header__catalog-menu-overlay--active';
const catalogMenuPanelNoTitleClassname = 'catalog-menu--no-title';
const activeClass = 'is-active';

if (hamburger) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const hadClassName = toggleClassname(hamburger, activeClass);
    if (hadClassName) {
      hamburgerMenuNode.classList.remove(activeClass);
      closeCatalogMenuPanel();
    } else {
      hamburgerMenuNode.classList.add(activeClass);
    }
  });
}

hamburgerMenuNode.addEventListener('click', (e) => {
  e.stopPropagation();
});

document.addEventListener('click', () => {
  hamburgerMenuNode.classList.remove(activeClass);
  hamburger.classList.remove(activeClass);
  closeCatalogMenuPanel();
});

function toggleCatalogCategory(catalogMenuNode, catalogMenuItemId) {
  const catalogMenuItemNodeList = catalogMenuNode.querySelectorAll('[data-catalog-menu-item-id');
  for (let i = 0; i < catalogMenuItemNodeList.length; i++) {
    const catalogMenuItemNode = catalogMenuItemNodeList[i];
    if (catalogMenuItemNode.dataset.catalogMenuItemId === catalogMenuItemId) {
      toggleClassname(catalogMenuItemNode, catalogMenuItemActiveClassname);
    } else {
      catalogMenuItemNode.classList.remove(catalogMenuItemActiveClassname);
    }
  }
}

function initCatalogMenu(catalogMenuNode) {
  const catalogMenuToggleButtonNodeList = catalogMenuNode.querySelectorAll('[data-catalog-menu-toggle-button]');

  for (let i = 0; i < catalogMenuToggleButtonNodeList.length; i++) {
    const catalogMenuToggleButtonNode = catalogMenuToggleButtonNodeList[i];
    catalogMenuToggleButtonNode.addEventListener('click', () => {
      const catalogMenuItemId = catalogMenuToggleButtonNode.dataset.catalogMenuToggleButton;
      toggleCatalogCategory(catalogMenuNode, catalogMenuItemId);
    });
  }
}

for (let i = 0; i < catalogMenuNodeList.length; i++) {
  const catalogMenuNode = catalogMenuNodeList[i];
  initCatalogMenu(catalogMenuNode);
}

function openCatalogMenuPanel(isWithoutTitle = false) {
  catalogMenuOverlayNode.classList.add(catalogMenuPanelActiveClassname);
  if (isWithoutTitle) {
    catalogMenuPanelNode.classList.add(catalogMenuPanelNoTitleClassname);
  }
}

function closeCatalogMenuPanel() {
  catalogMenuOverlayNode.classList.remove(catalogMenuPanelActiveClassname);
  catalogMenuPanelNode.classList.remove(catalogMenuPanelNoTitleClassname);
}

const debouncedToogleCatalogMenuPanel = debounce(32, (nextState, isWithoutTitle) => {
  console.log(nextState);
  if (nextState) {
    openCatalogMenuPanel(isWithoutTitle);
  } else {
    closeCatalogMenuPanel();
  }
});

catalogMenuOpenButtonMobileNode.addEventListener('click', () => {
  openCatalogMenuPanel();
});

catalogMenuCloseButtonMobileNode.addEventListener('click', () => {
  closeCatalogMenuPanel();
});

catalogMenuPanelNode.addEventListener('click', (e) => {
  e.stopPropagation();
});

catalogMenuPanelNode.addEventListener('mouseenter', () => {
  debouncedToogleCatalogMenuPanel(true);
});

catalogMenuPanelNode.addEventListener('mouseleave', () => {
  debouncedToogleCatalogMenuPanel(false);
});

for (let i = 0; i < catalogMenuOpenOnHoverNodeList.length; i++) {
  const catalogMenuOpenOnHoverNode = catalogMenuOpenOnHoverNodeList[i];
  catalogMenuOpenOnHoverNode.addEventListener('mouseenter', () => {
    const isWithoutTitle = catalogMenuOpenOnHoverNode.dataset.catalogMenuOpenHover === 'no-title';
    debouncedToogleCatalogMenuPanel(true, isWithoutTitle);
  });
  catalogMenuOpenOnHoverNode.addEventListener('mouseleave', () => {
    debouncedToogleCatalogMenuPanel(false);
  });
}

// задаем ширину бургер-меню на десктопе
function setDesktopPanelsSizes() {
  if (window.innerWidth >= 1200) {
    const headerMainWidth = headerMain.offsetWidth;
    hamburgerMenuNode.style.width = headerMainWidth + 'px';
    catalogMenuPanelNode.style.width = headerMainWidth + 'px';
    catalogMenuPanelNode.style.height = hamburgerMenuNode.offsetHeight - 100 + 'px'; // 100 header desktop height
  } else {
    hamburgerMenuNode.style.width = null;
    catalogMenuPanelNode.style.width = null;
    catalogMenuPanelNode.style.height = null;
  }
}

setDesktopPanelsSizes();
window.addEventListener('resize', setDesktopPanelsSizes);

// вставляем ссылку каталога
function insertCatalogLinkNode() {
  const headerHamburderSiteMenuNode = document.querySelector('.navigation--hamburger-menu');
  const headerHamburderSiteMenuFirstLinkNode = headerHamburderSiteMenuNode.querySelector('.navigation__item');

  const catalogLinkNode = document.querySelector(
    '.navigation--header .navigation__item[data-catalog-menu-open-hover] a',
  );

  const newMenuItemNode = document.createElement('li');
  newMenuItemNode.classList.add('navigation__item');
  newMenuItemNode.dataset.catalogMenuOpenHover = '';
  const newMenuLinkNode = document.createElement('a');
  newMenuLinkNode.textContent = catalogLinkNode.textContent;
  newMenuLinkNode.href = catalogLinkNode.href;
  newMenuItemNode.appendChild(newMenuLinkNode);

  headerHamburderSiteMenuNode.insertBefore(newMenuItemNode, headerHamburderSiteMenuFirstLinkNode);

  const commentNode = document.createComment(' Ссылка на каталог добавлена с помощью javascript ');
  headerHamburderSiteMenuNode.insertBefore(commentNode, newMenuItemNode);
}
