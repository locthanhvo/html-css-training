import {
  EMAIL_REGEX,
  IMAGE_URL_REGEX,
  LOWERCASE_CHARACTERS_REGEX,
  NUMBER_CHARACTERS_REGEX,
  PASSWORD_CHARACTERS_REGEX,
  PHONE_CHARACTERS_REGEX,
  SPECIAL_CHARACTERS_REGEX,
  UPPERCASE_CHARACTERS_REGEX,
  USERNAME_CHARACTERS_REGEX,
  VALIDATE_MESSAGE,
} from '@constants'
import { FormValidators } from '@types'

const validateFieldRequired = (field: string, value: string): string | null =>
  !value ? VALIDATE_MESSAGE.REQUIRED_ERROR.replace('{field}', field) : null

const validateEmail = (_field: string, value: string): string | null =>
  !value.match(EMAIL_REGEX) ? VALIDATE_MESSAGE.INVALID_EMAIL : null

const validateUsername = (_field: string, value: string): string | null =>
  !value.match(USERNAME_CHARACTERS_REGEX) ? VALIDATE_MESSAGE.INVALID_USERNAME : null

const validatePassword = (_field: string, value: string): string | null => {
  if (!value.match(PASSWORD_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.INVALID_PASSWORD
  }

  if (!value.match(UPPERCASE_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.REQUIRE_UPPER_CASE
  }

  if (!value.match(LOWERCASE_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.REQUIRE_LOWER_CASE
  }

  if (!value.match(NUMBER_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.REQUIRE_NUMBER
  }

  if (!value.match(SPECIAL_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.REQUIRE_SPECIAL_CHARACTER
  }
  return null
}

const validatePhone = (_field: string, value: string): string | null =>
  !value.match(PHONE_CHARACTERS_REGEX) ? VALIDATE_MESSAGE.INVALID_PHONE : null

const validateConfirmPassword = <T>(password: keyof T) => {
  return (_field: string, value: string, form?: T) => {
    if (value !== form?.[password]) {
      return VALIDATE_MESSAGE.INVALID_CONFIRM_PASSWORD
    }
    return ''
  }
}

const validateImageUrl = (_field: string, value: string): string | null =>
  value !== '' && !IMAGE_URL_REGEX.test(value) ? VALIDATE_MESSAGE.INVALID_AVATAR : null

export const getFormErrors = <T>(form: T, validators: FormValidators<T>): T => {
  const formErrors = {} as T

  for (const field in validators) {
    const fieldValidators = validators[field]

    for (const validator of fieldValidators) {
      const error = validator(field, form[field as keyof T] as string, form)

      if (error) {
        ;(formErrors[field as keyof T] as string) = error
        break
      }
    }
  }

  return formErrors
}

export const validateForm = <T>(
  form: T,
  validators: FormValidators<T>,
): Record<keyof T, string> | null => {
  const formErrors = getFormErrors(form, validators) as Record<keyof T, string>
  const invalidForm = Object.keys(formErrors).length

  return invalidForm ? formErrors : null
}

export const validateUserForm = {
  username: [validateFieldRequired, validateUsername],
  firstName: [validateFieldRequired],
  lastName: [validateFieldRequired],
  email: [validateFieldRequired, validateEmail],
  phone: [validateFieldRequired, validatePhone],
  avatar: [validateImageUrl],
  password: [validateFieldRequired, validatePassword],
  confirmPassword: [validateFieldRequired, validateConfirmPassword('password')],
}
