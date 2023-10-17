import { ModalProps } from '@/types';
import { querySelector } from '@/helpers';

export const displayModal = ({ template, handler }: ModalProps): void => {
  const modalElement = document.createElement('div');
  const mainElement = querySelector<HTMLDivElement>('.main-content');

  modalElement.classList.add('modal', 'flex-center', 'open');
  modalElement.innerHTML = template;
  mainElement.appendChild(modalElement);

  const modalContent = querySelector<HTMLDivElement>(
    '.form-modal, .confirm-modal',
    modalElement
  );

  modalContent.addEventListener('click', (e: Event) => {
    const target = e.target as Element;
    const btnClose = target.closest('.btn-close');
    const iconClose = target.closest('.icon-close');
    const btnCancel = target.closest('.btn-cancel');
    const btnConfirm = target.closest('.btn-confirm');

    btnClose || btnCancel || iconClose
      ? modalElement.remove()
      : e.stopPropagation();

    if (btnConfirm) {
      handler?.();
      modalElement.remove();
    }
  });

  modalElement.addEventListener('click', function (event) {
    event.target === modalElement && modalElement.remove();
  });
};
