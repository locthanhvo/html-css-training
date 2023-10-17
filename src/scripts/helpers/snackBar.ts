import { SNACKBAR_DURATION } from '@/constants';
import { getSnackBarTemplate } from '@/templates';
import { querySelector } from '@/helpers';

/**
 *
 * @param message message status snackbar
 * @param status status snackbar
 */
export const showSnackBar = (message: string, status: string) => {
  const mainElement: HTMLDivElement = querySelector('.main-content');
  const snackBar: HTMLDivElement = document.createElement('div');

  snackBar.classList.add('snack-bar', 'open', `snack-bar-${status}`);

  snackBar.innerHTML = getSnackBarTemplate(message);

  requestAnimationFrame(() => {
    snackBar.style.top = '40px';
  });

  setTimeout(() => {
    snackBar.remove();
  }, SNACKBAR_DURATION);

  snackBar.onclick = (event: Event) => {
    const target = event.target as Element;

    if (target.closest('.snack-bar-close')) {
      snackBar.remove();
    }
  };

  mainElement.appendChild(snackBar);
};
