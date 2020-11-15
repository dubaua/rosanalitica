import SimpleBar from 'simplebar';

const customScrollBarNodeList = document.querySelectorAll('[data-simplebar]');
const customScrollBarNodeArray = Array.from(customScrollBarNodeList);

customScrollBarNodeArray.forEach((node) => {
  new SimpleBar(node);
});
