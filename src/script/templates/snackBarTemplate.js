export const getSnackBarTemplate = (message) => {
  return `  <div class="snack-bar-body">
                <p class="snack-bar-message">${message}</p>
            </div>
            <button class="snack-bar-close">&times;</button>`;
};
