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

export const USER_SCHEMA = {
  EMAIL: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: ERROR_MESSAGES.INVALID_EMAIL,
    },
  },
  PHONE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Phone'),
    pattern: {
      value: REGEX.PHONE,
      message: ERROR_MESSAGES.INVALID_PHONE,
    },
  },
  FIRST_NAME: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('First Name'),
  },
  LAST_NAME: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Last Name'),
  },
  CREATED_AT: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Created At'),
  },
  UPDATED_AT: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Updated At'),
  },
};

export const COMPANY_SCHEMA = {
  COMPANY: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Company'),
  },
  BRANCH: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Branch'),
  },
  PHONE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Phone'),
    pattern: {
      value: REGEX.PHONE,
      message: ERROR_MESSAGES.INVALID_PHONE,
    },
  },
  WEBSITE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Website'),
  },
  GPS_LATITUDE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('GPS latitude'),
  },
  GPS_LONGITUDE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('GPS Longitude'),
  },
  COUNTRY: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Country'),
  },
  CITY: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('City'),
  },
  MAIN_EMAIL: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Main Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: ERROR_MESSAGES.INVALID_EMAIL,
    },
  },
  SECONDARY_EMAIL: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Secondary Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: ERROR_MESSAGES.INVALID_EMAIL,
    },
  },
  COMMISSIONER: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Commissioner'),
  },
};

export const CONTROL_SCHEMA = {
  NAME: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Name'),
  },
  DESCRIPTION: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Description'),
  },
};

export const BRIGADE_SCHEMA = {
  NAME: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Name'),
  },
  DESCRIPTION: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Description'),
  },
  COMMISSIONER: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Commissioner'),
  },
  ROLE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Role'),
  },
};
