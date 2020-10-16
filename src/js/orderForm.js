// selectors
const productSelector = '[data-product]';
const productTitleSelector = '[data-product-title]';
const productButtonSelector = '[data-product-button]';
const productPriceSelector = '[data-product-price]';

const formOverlaySelector = '[data-order-form-overlay]';
const formTitleSelector = '[data-order-form-title]';
const formButtonSelector = '[data-order-form-button]';
const formCloseButtonSelector = '[data-order-form-close]';

// nodes
const orderFormNode = document.querySelector('[data-order-form]');
const productNodeList = document.querySelectorAll(productSelector);
const productArray = Array.from(productNodeList);

// variables
let vendorCodeInputNode = null;
let productTitleInputNode = null;

let overlayNode = null;
let closeButtonNode = null;

// functions
function showOrderForm() {
  orderFormNode.style.display = 'block';
}
function hideOrderForm() {
  orderFormNode.style.display = 'none';
}

function handleOpenForm(event, product) {
  showOrderForm();
  event.stopPropagation();
  event.preventDefault();

  const vendorCode = product.dataset.productVendorCode;

  const priceNode = product.querySelector(productPriceSelector);
  const productTitleNode = product.querySelector(productTitleSelector);

  const formTitleNode = orderFormNode.querySelector(formTitleSelector);
  const formButtonNode = orderFormNode.querySelector(formButtonSelector);

  formTitleNode.innerText = priceNode ? 'Заказ' : 'Запрос цены';
  formButtonNode.innerText = priceNode ? 'заказать' : 'отправить';

  vendorCodeInputNode.value = vendorCode;
  productTitleInputNode.value = productTitleNode.innerText;
}

function initProductForm() {
  vendorCodeInputNode = orderFormNode.querySelector(
    '[data-order-form-vendor-code]',
  );
  productTitleInputNode = orderFormNode.querySelector(
    '[data-order-form-product-title]',
  );

  overlayNode = orderFormNode.querySelector(formOverlaySelector);
  closeButtonNode = orderFormNode.querySelector(formCloseButtonSelector);

  productArray.forEach((product) => {
    const buttonNode = product.querySelector(productButtonSelector);
    buttonNode.addEventListener('click', (event) =>
      handleOpenForm(event, product),
    );
  });

  overlayNode.addEventListener('click', hideOrderForm);
  closeButtonNode.addEventListener('click', hideOrderForm);
}

if (productNodeList.length > 0 && orderFormNode) {
  initProductForm();
}
