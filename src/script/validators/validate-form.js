import {
  EMAIL_REGEX,
  LOWERCASE_CHARACTERS_REGEX,
  NUMBER_CHARACTERS_REGEX,
  PASSWORD_CHARACTERS_REGEX,
  PHONE_CHARACTERS_REGEX,
  SPECIAL_CHARACTERS_REGEX,
  UPPERCASE_CHARACTERS_REGEX,
  USERNAME_CHARACTERS_REGEX,
  VALIDATE_MESSAGE,
} from '../constants';
import { showErrorMessage } from './form-error';

const validateFieldRequired = () => {
  return (field, value) => {
    if (!value) {
      return VALIDATE_MESSAGE.REQUIRED_ERROR.replace('{field}', field);
    }
    return '';
  };
};

const validateEmail = () => {
  return (field, value) => {
    if (!value.match(EMAIL_REGEX)) {
      return VALIDATE_MESSAGE.INVALID_EMAIL;
    }
    return '';
  };
};

const validateUsername = () => {
  return (field, value) => {
    if (!value.match(USERNAME_CHARACTERS_REGEX)) {
      return VALIDATE_MESSAGE.INVALID_USERNAME;
    }
    return '';
  };
};

const validatePassword = () => {
  return (field, value) => {
    if (!value.match(PASSWORD_CHARACTERS_REGEX)) {
      return VALIDATE_MESSAGE.INVALID_PASSWORD;
    }

    if (!value.match(UPPERCASE_CHARACTERS_REGEX)) {
      return VALIDATE_MESSAGE.REQUIRE_UPPER_CASE;
    }

    if (!value.match(LOWERCASE_CHARACTERS_REGEX)) {
      return VALIDATE_MESSAGE.REQUIRE_LOWER_CASE;
    }

    if (!value.match(NUMBER_CHARACTERS_REGEX)) {
      return VALIDATE_MESSAGE.REQUIRE_NUMBER;
    }

    if (!value.match(SPECIAL_CHARACTERS_REGEX)) {
      return VALIDATE_MESSAGE.REQUIRE_SPECIAL_CHARACTER;
    }
    return '';
  };
};

const validatePhone = () => {
  return (field, value) => {
    if (!value.match(PHONE_CHARACTERS_REGEX)) {
      return VALIDATE_MESSAGE.INVALID_PHONE;
    }
    return '';
  };
};

const validateConfirmPassword = (password) => {
  return (field, value) => {
    if (value !== password) {
      return VALIDATE_MESSAGE.INVALID_CONFIRM_PASSWORD;
    }
    return '';
  };
};

export const getFormErrors = (form, validators) => {
  const formErrors = {};

  for (const field in validators) {
    const fieldValidators = validators[field];
    for (const validator of fieldValidators) {
      const error = validator(field, form[field]);
      if (error) {
        formErrors[field] = error;
        break;
      }
    }
  }

  return formErrors;
};

export const validateForm = (form, validators, formElement) => {
  const formErrors = getFormErrors(form, validators);
  const invalidForm = Object.keys(formErrors).length;

  if (invalidForm) {
    showErrorMessage(formErrors, formElement);
  } else {
    return !invalidForm;
  }
};

export const userFormValidator = (user) => {
  return {
    username: [validateFieldRequired(), validateUsername()],
    firstName: [validateFieldRequired()],
    lastName: [validateFieldRequired()],
    email: [validateFieldRequired(), validateEmail()],
    phone: [validateFieldRequired(), validatePhone()],
    gender: [validateFieldRequired()],
    password: [validateFieldRequired(), validatePassword()],
    confirmPassword: [
      validateFieldRequired(),
      validateConfirmPassword(user.password),
    ],
  };
};
