const printButtonNode = document.querySelector('[data-print-product]');

if (printButtonNode) {
  printButtonNode.addEventListener('click', () => {
    window.print();
  });
}
