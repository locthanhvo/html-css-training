export const displayModal = ({ template, handler }) => {
  const modalElement = document.createElement('div');
  const mainElement = document.querySelector('.main-content');

  modalElement.classList.add('modal', 'flex-center', 'open');
  modalElement.innerHTML = template;
  mainElement.appendChild(modalElement);

  modalElement.onclick = async (e) => {
    const target = e.target;
    const btnClose = target.closest('.btn-close');
    const iconClose = target.closest('.close-icon');
    const btnCancel = target.closest('.btn-cancel');
    const btnConfirm = target.closest('.btn-confirm');

    btnClose || btnCancel || iconClose
      ? modalElement.remove()
      : e.stopPropagation();

    if (btnConfirm) {
      handler();
      modalElement.remove();
    }
  };
};
