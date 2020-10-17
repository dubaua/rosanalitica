import axios from 'axios';
import { redrawActiveJobsItem } from './jobs.js';
import { nextTick } from './utils.js';

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

    formData.append('target', senderFormNode.dataset.senderForm);

    senderSubmitButtonNode.classList.add(buttonLoadingClassname);
    const headers = senderFormNode.encoding ? { 'Content-Type': senderFormNode.encoding } : null;

    let result = null;

    try {
      const { data } = await axios({
        method: senderFormNode.method,
        headers,
        url: senderFormNode.action,
        data: formData,
      });
      result = data;
    } catch (error) {
      result = error;
    }

    const { success, message, errors } = result;

    if (errors) {
      printErrors(errors);
    }

    senderSubmitButtonNode.classList.remove(buttonLoadingClassname);

    if (success) {
      senderFormNode.remove();
    }

    senderMessageNode.textContent = message;
    senderMessageNode.classList.remove(messageNodePositiveClassname);
    senderMessageNode.classList.remove(messageNodeNegativeClassname);
    senderMessageNode.classList.add(success ? messageNodePositiveClassname : messageNodeNegativeClassname);

    nextTick(redrawActiveJobsItem);

    if (typeof senderNode.onSuccess === 'function') {
      senderNode.onSuccess();
    }
  });
}

function printErrors(errors) {
  for (const key in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      const errorMessage = errors[key];
      const errorMessageNode = document.querySelector(`[data-sender-form-error="${key}"]`);
      errorMessageNode.textContent = errorMessage;
    }
  }
}
