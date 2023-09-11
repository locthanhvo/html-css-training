export const showErrorMessage = (error, formValues) => {
  changeErrorMessage();
  Object.entries(error).forEach(([key, value]) => {
    const target = formValues.elements[key].nextElementSibling;

    if (target) {
      target.innerText = value;
    }
  });
};

export const changeErrorMessage = () => {
  const errorFields = document.querySelectorAll('.error-message');
  errorFields.forEach((field) => {
    field.innerText = '';
  });
};

export const removeErrorMessage = () => {
  const formItems = document.querySelectorAll('.item-validate');

  formItems.forEach((item) => {
    document.getElementById(item.name).addEventListener('focus', () => {
      document.querySelector(`.${item.name}-error`).textContent = '';
    });
  });
};
