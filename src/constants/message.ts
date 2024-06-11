export const ERROR_MESSAGES = {
  EMPTY_DATA: 'No data',
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required`,
  INVALID_EMAIL: 'Invalid email address',
  INVALID_PHONE: 'Invalid phone number',
  INVALID_PASSWORD: 'Please enter at least 8 characters for password',
  PASSWORD_NOT_MATCH: 'Password does not match',
  REQUIRE_UPPER_CASE: 'Upper case is required',
  REQUIRE_LOWER_CASE: 'Lower case is required',
  REQUIRE_NUMBER: 'Number is required',
  REQUIRE_SPECIAL_CHARACTER: 'Special character is required',

  SIGN_UP_FAILED: 'Sign up failed',
  SIGN_IN_FAILED: 'Sign in failed',

  INVALID_USERS: 'Email or Password invalid',
  USER_EXISTS: 'User already exists',

  ADD_FAILED: 'Add failed',
  EDIT_FAILED: 'Edit failed',
  DELETE_FAILED: 'Delete failed',

  DELETE_YOURSELF: 'Do not delete yourself',
};

export const SUCCESS_MESSAGES = {
  SIGN_UP_SUCCESS: 'Sign up success',
  SIGN_IN_SUCCESS: 'Sign in success',

  ADD_SUCCESS: 'Add success',
  EDIT_SUCCESS: 'Edit success',
  DELETE_SUCCESS: 'Delete success',
};
