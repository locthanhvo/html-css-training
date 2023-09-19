import { getElementById, querySelector, querySelectorAll } from '../helpers';

export const showErrorMessage = (error, form) => {
  changeErrorMessage();
  Object.entries(error).forEach(([key, value]) => {
    const target = form.elements[key].nextElementSibling;

    if (target) {
      target.innerText = value;
    }
  });
};

export const changeErrorMessage = () => {
  const errorFields = querySelectorAll('.error-message');
  errorFields.forEach((field) => {
    field.innerText = '';
  });
};

export const removeErrorMessage = () => {
  const formItems = querySelectorAll('.item-validate');

  formItems.forEach((item) => {
    getElementById(item.name).addEventListener('focus', () => {
      querySelector(`.${item.name}-error`).textContent = '';
    });
  });
};
