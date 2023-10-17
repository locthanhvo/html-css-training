import { SNACKBAR_DURATION } from '../constants';
import { getSnackBarTemplate } from '../templates';
import { createElement, querySelector } from './doms';

export class SnackBar {
  showSnackBar(message, status) {
    const mainElement = querySelector('.main-content');
    const snackBar = createElement('div');

    snackBar.classList.add('snack-bar', 'open', `snack-bar-${status}`);

    snackBar.innerHTML = getSnackBarTemplate(message);

    requestAnimationFrame(() => {
      snackBar.style.top = '40px';
    });

    setTimeout(() => {
      snackBar.remove();
    }, SNACKBAR_DURATION);

    snackBar.onclick = (event) => {
      const target = event.target;

      if (target.closest('.snack-bar-close')) {
        snackBar.remove();
      }
    };

    mainElement.appendChild(snackBar);
  }

  handleSnackBarSuccess = (message) => {
    this.showSnackBar(message, 'success');
  };

  handleSnackBarError = (message) => {
    this.showSnackBar(message, 'error');
  };
}
