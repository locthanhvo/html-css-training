import { createElement, querySelector } from './doms';

export const displayModal = ({ template, handler }) => {
  const modalElement = createElement('div');
  const mainElement = querySelector('.main-content');

  modalElement.classList.add('modal', 'flex-center', 'open');
  modalElement.innerHTML = template;
  mainElement.appendChild(modalElement);

  const modalContent = modalElement.querySelector(
    '.form-modal, .confirm-modal'
  );

  modalContent.addEventListener('click', (e) => {
    const target = e.target;
    const btnClose = target.closest('.btn-close');
    const iconClose = target.closest('.icon-close');
    const btnCancel = target.closest('.btn-cancel');
    const btnConfirm = target.closest('.btn-confirm');

    btnClose || btnCancel || iconClose
      ? modalElement.remove()
      : e.stopPropagation();

    if (btnConfirm) {
      handler();
      modalElement.remove();
    }
  });

  modalElement.addEventListener('click', function (event) {
    event.target === modalElement && modalElement.remove();
  });
};
