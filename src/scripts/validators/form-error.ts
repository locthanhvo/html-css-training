import { getElementById, querySelector, querySelectorAll } from '../helpers';

/**
 *
 * @param error data error
 * @param form HTML form element
 */
export const showErrorMessage = <T>(error: T, form: HTMLFormElement): void => {
  changeErrorMessage();
  Object.entries(error as keyof T).forEach(([key, value]) => {
    const target = form.elements.namedItem(key) as HTMLElement | null;
    const nextElementSibling = target?.nextElementSibling as HTMLElement | null;

    if (nextElementSibling) {
      nextElementSibling.innerText = value.toString();
    }
  });
};

/**
 * @description change error message in form
 */
export const changeErrorMessage = (): void => {
  const errorFields = querySelectorAll('.error-message');

  errorFields.forEach((field) => {
    field.innerText = '';
  });
};

/**
 * @description remove error message in form when focus
 */
export const removeErrorMessage = (): void => {
  querySelectorAll('.item-validate').forEach((item) => {
    const name = item.getAttribute('name');

    name &&
      getElementById(name).addEventListener('focus', () => {
        const errorElement = querySelector(`.${name}-error`) as HTMLElement;
        errorElement.textContent = '';
      });
  });
};
