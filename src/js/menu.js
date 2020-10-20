import { toggleClassname } from './utils.js';

const hamburger = document.querySelector('[data-hamburger]');
const hamburgerMenu = document.querySelector('[data-hamburger-menu]');
const headerMain = document.querySelector('[data-header-main]');
const catalogMenuNodeList = document.querySelectorAll('[data-catalog-menu]');
const catalogMenuOpenButtonMobileNode = document.querySelector('[data-catalog-menu-open-button-mobile]');
const catalogMenuCloseButtonMobileNode = document.querySelector('[data-catalog-menu-close-button-mobile]');
const catalogMenuOverlayNode = document.querySelector('[data-catalog-menu-overlay]');
const catalogMenuPanelNode = catalogMenuOverlayNode.querySelector('[data-catalog-menu-panel]');
const catalogMenuOpenOnHoverNodeList = document.querySelectorAll('[data-catalog-menu-open-hover]');
const catalogMenuItemActiveClassname = 'catalog-menu__item--active';
const catalogMenuPanelActiveClassname = 'header__catalog-menu-overlay--active';
const catalogMenuPanelNoTitleClassname = 'catalog-menu--no-title';
const activeClass = 'is-active';

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const hadClassName = toggleClassname(hamburger, activeClass);
    if (hadClassName) {
      hamburgerMenu.classList.remove(activeClass);
      closeCatalogMenuPanel();
    } else {
      hamburgerMenu.classList.add(activeClass);
    }
  });
}

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

catalogMenuOpenButtonMobileNode.addEventListener('click', () => {
  openCatalogMenuPanel();
});

catalogMenuCloseButtonMobileNode.addEventListener('click', () => {
  closeCatalogMenuPanel();
});

catalogMenuOverlayNode.addEventListener('mouseover', () => {
  closeCatalogMenuPanel();
});

catalogMenuPanelNode.addEventListener('mouseover', (e) => {
  e.stopPropagation();
});

for (let i = 0; i < catalogMenuOpenOnHoverNodeList.length; i++) {
  const catalogMenuOpenOnHoverNode = catalogMenuOpenOnHoverNodeList[i];
  catalogMenuOpenOnHoverNode.addEventListener('mouseover', () => {
    const isWithoutTitle = catalogMenuOpenOnHoverNode.dataset.catalogMenuOpenHover === 'no-title';
    openCatalogMenuPanel(isWithoutTitle);
  });
}

// задаем ширину бургер-меню на десктопе
function setDesktopPanelsSizes() {
  if (window.innerWidth >= 1200) {
    const headerMainWidth = headerMain.offsetWidth;
    hamburgerMenu.style.width = headerMainWidth + 'px';
    catalogMenuPanelNode.style.width = headerMainWidth + 'px';
    catalogMenuPanelNode.style.height = hamburgerMenu.offsetHeight - 100 + 'px'; // 100 header desktop height
  } else {
    hamburgerMenu.style.width = null;
    catalogMenuPanelNode.style.width = null;
    catalogMenuPanelNode.style.height = null;
  }
}

setDesktopPanelsSizes();
window.addEventListener('resize', setDesktopPanelsSizes);
