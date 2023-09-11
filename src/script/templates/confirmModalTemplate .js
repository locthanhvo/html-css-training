export const getConfirmModalTemplate = (message) => {
  return `
    <div class="confirm-modal">
    <div class="header-confirm"><span class="btn-close">×</span></div>
    <div class="content-confirm">
      <div class="body-confirm">
          <p class="text-description-medium product-description">${message}</p>
          <div class='btn-action-confirm'>
              <button class="btn btn-cancel">Cancel</button>
              <button class="btn btn-confirm">Confirm</button>
          </div>
      </div>
    </div>
    </div>
    `;
};
