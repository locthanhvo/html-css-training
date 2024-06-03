import { ERROR_MESSAGES } from './message';
import { REGEX } from './regex';

export const AUTH_SCHEMA = {
  EMAIL: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: ERROR_MESSAGES.INVALID_EMAIL,
    },
  },
  PASSWORD: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Password'),
    validate: (val: string) => {
      if (!val.match(REGEX.PASSWORD_CHARACTERS)) {
        return ERROR_MESSAGES.INVALID_PASSWORD;
      }

      if (!val.match(REGEX.UPPERCASE_CHARACTERS)) {
        return ERROR_MESSAGES.REQUIRE_UPPER_CASE;
      }

      if (!val.match(REGEX.LOWERCASE_CHARACTERS)) {
        return ERROR_MESSAGES.REQUIRE_LOWER_CASE;
      }

      if (!val.match(REGEX.NUMBER_CHARACTERS)) {
        return ERROR_MESSAGES.REQUIRE_NUMBER;
      }

      if (!val.match(REGEX.SPECIAL_CHARACTERS)) {
        return ERROR_MESSAGES.REQUIRE_SPECIAL_CHARACTER;
      }
    },
  },
  CONFIRM_PASSWORD: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Confirm password'),
    validate: (val: string, { password }: { password: string }) => {
      if (password && val !== password) {
        return ERROR_MESSAGES.PASSWORD_NOT_MATCH;
      }
    },
  },
  PHONE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Phone'),
    pattern: {
      value: REGEX.PHONE,
      message: ERROR_MESSAGES.INVALID_PHONE,
    },
  },
  AGREE_POLICY: {
    validate: (
      value: boolean,
      { isAcceptPrivacyPolicy: __, ...fieldValues }: any,
    ) => Object.values(fieldValues).every((value) => value) && value,
  },
};
