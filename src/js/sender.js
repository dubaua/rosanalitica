import axios from 'axios';

const senderSelector = '[data-sender]';
const senderFormSelector = '[data-sender-form]';
const senderMessageSelector = '[data-sender-message]';
const senderPrivacyAcceptSelector = '[data-sender-privacy-accept]';
const senderSubmitButtonSelector = '[data-sender-submit-button]';

const buttonLoadingClassname = 'button--loading';
const messageNodePositiveClassname = 'sender__message--positive';
const messageNodeNegativeClassname = 'sender__message--negative';

const senderNodeList = document.querySelectorAll(senderSelector);

for (let i = 0; i < senderNodeList.length; i++) {
  const senderNode = senderNodeList[i];
  const senderFormNode = senderNode.querySelector(senderFormSelector);
  const senderMessageNode = senderNode.querySelector(senderMessageSelector);
  const senderPrivacyAcceptNode = senderNode.querySelector(senderPrivacyAcceptSelector);
  const senderSubmitButtonNode = senderNode.querySelector(senderSubmitButtonSelector);

  senderPrivacyAcceptNode.addEventListener('change', () => {
    if (senderPrivacyAcceptNode.checked) {
      senderSubmitButtonNode.removeAttribute('disabled');
    } else {
      senderSubmitButtonNode.setAttribute('disabled', '');
    }
  });

  senderFormNode.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(senderFormNode);

    senderSubmitButtonNode.classList.add(buttonLoadingClassname);
    const headers = senderFormNode.encoding ? { 'Content-Type': senderFormNode.encoding } : null;

    let message = '';
    let success = false;

    try {
      const { data } = await axios({
        method: senderFormNode.method,
        headers,
        url: senderFormNode.action,
        data: formData,
      });
      message = data.message;
      success = data.message;
    } catch (error) {
      message = error.message;
    }

    senderSubmitButtonNode.classList.remove(buttonLoadingClassname);

    if (success) {
      senderFormNode.remove();
    }

    senderMessageNode.textContent = message;
    senderMessageNode.classList.remove(messageNodePositiveClassname);
    senderMessageNode.classList.remove(messageNodeNegativeClassname);
    senderMessageNode.classList.add(success ? messageNodePositiveClassname : messageNodeNegativeClassname);
  });
}
