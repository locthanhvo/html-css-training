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
} from '@/constants';
import { showErrorMessage } from './form-error';
import { FormValidators } from '@/types';

const validateFieldRequired = (field: string, value: string): string | null => {
  if (!value) {
    return VALIDATE_MESSAGE.REQUIRED_ERROR.replace('{field}', field);
  }
  return null;
};

const validateEmail = (field: string, value: string): string | null => {
  if (!value.match(EMAIL_REGEX)) {
    return VALIDATE_MESSAGE.INVALID_EMAIL;
  }
  return null;
};

const validateUsername = (field: string, value: string): string | null => {
  if (!value.match(USERNAME_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.INVALID_USERNAME;
  }
  return null;
};

const validatePassword = (field: string, value: string): string | null => {
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
  return null;
};

const validatePhone = (field: string, value: string): string | null => {
  if (!value.match(PHONE_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.INVALID_PHONE;
  }
  return null;
};

const validateConfirmPassword = <T>(password: keyof T) => {
  return (field: string, value: string, form?: T) => {
    if (value !== form?.[password]) {
      return VALIDATE_MESSAGE.INVALID_CONFIRM_PASSWORD;
    }
    return '';
  };
};

export const getFormErrors = <T>(form: T, validators: FormValidators<T>): T => {
  const formErrors = {} as T;
  console.log(validators);

  for (const field in validators) {
    const fieldValidators = validators[field];
    for (const validator of fieldValidators) {
      const error = validator(field, form[field as keyof T] as string, form);
      if (error) {
        (formErrors[field as keyof T] as string) = error;
        break;
      }
    }
  }

  return formErrors;
};

export const validateForm = <T>(
  form: T,
  validators: FormValidators<T>,
  formElement: HTMLFormElement
): boolean | undefined => {
  const formErrors = getFormErrors(form, validators) as T[];
  const invalidForm = Object.keys(formErrors).length;

  if (!invalidForm) {
    return true;
  }
  showErrorMessage(formErrors, formElement);
};

export const validateUserForm = () => {
  return {
    username: [validateFieldRequired, validateUsername],
    firstName: [validateFieldRequired],
    lastName: [validateFieldRequired],
    email: [validateFieldRequired, validateEmail],
    phone: [validateFieldRequired, validatePhone],
    gender: [validateFieldRequired],
    password: [validateFieldRequired, validatePassword],
    confirmPassword: [
      validateFieldRequired,
      validateConfirmPassword('password'),
    ],
  };
};
