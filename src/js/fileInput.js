const fileInputNode = document.querySelector('[data-file-input]');
const defaultLabel = 'загрузить резюме';
const labelUploaded = 'выбрать другой файл';

function initFileInput() {
  const nativeInputNode = fileInputNode.querySelector('[data-file-native-input]');
  const labelNode = fileInputNode.querySelector('[data-file-input-label]');
  const currentFileBoxNode = fileInputNode.querySelector(
    '[data-file-input-current-file]',
  );
  labelNode.textContent = defaultLabel;

  nativeInputNode.addEventListener('change', () => {
    const uploadedFile = nativeInputNode.files[0];

    if (uploadedFile) {
      labelNode.textContent = labelUploaded;
      currentFileBoxNode.style.display = 'block';
      currentFileBoxNode.textContent = uploadedFile.name;
    } else {
      labelNode.textContent = defaultLabel;
      currentFileBoxNode.style.display = 'none';
      currentFileBoxNode.textContent = '';
    }
  });
}

if (fileInputNode) {
  initFileInput();
}
