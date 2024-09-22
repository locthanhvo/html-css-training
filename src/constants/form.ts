import { ERROR_MESSAGES } from './message';
import { REGEX } from './regex';

export const USER_SCHEMA = {
  NAME: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Full Name'),
  },
  EMAIL: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Email Address'),
  },
  PHONE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Phone'),
    pattern: {
      value: REGEX.PHONE,
      message: ERROR_MESSAGES.INVALID_PHONE,
    },
  },
  POSITION: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Position'),
  },
  COMPANY: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Company'),
  },
  LOCATION: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Location'),
  },
  WEBSITE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Website'),
  },
  TEAM_NAME: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Team Name'),
  },
  RANK: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Rank'),
  },
  OFFICE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Office'),
  },
  BILL_NAME: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Full Name'),
  },
  ADDRESS: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Address'),
  },
  STATE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('State'),
  },
  ZIP_CODE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Zip Code'),
  },
};
