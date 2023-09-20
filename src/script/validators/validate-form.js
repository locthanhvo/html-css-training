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

const validateFirstName = (firstName = '') => {
  return firstName
    ? undefined
    : VALIDATE_MESSAGE.REQUIRED_ERROR.replace('{field}', 'First Name');
};

const validateLastName = (lastName = '') => {
  return lastName
    ? undefined
    : VALIDATE_MESSAGE.REQUIRED_ERROR.replace('{field}', 'Last Name');
};

const validateGender = (gender = '') => {
  return gender
    ? undefined
    : VALIDATE_MESSAGE.REQUIRED_ERROR.replace('{field}', 'Gender');
};

const validateEmail = (email = '') => {
  if (!email)
    return VALIDATE_MESSAGE.REQUIRED_ERROR.replace('{field}', 'Email');

  if (!email.match(EMAIL_REGEX)) {
    return VALIDATE_MESSAGE.INVALID_EMAIL;
  }
};

const validateUsername = (username = '') => {
  if (!username)
    return VALIDATE_MESSAGE.REQUIRED_ERROR.replace('{field}', 'Username');

  if (!username.match(USERNAME_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.INVALID_USERNAME;
  }
  return;
};

const validatePassword = (password = '') => {
  if (!password)
    return VALIDATE_MESSAGE.REQUIRED_ERROR.replace('{field}', 'Password');

  if (!password.match(PASSWORD_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.INVALID_PASSWORD;
  }

  if (!password.match(UPPERCASE_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.REQUIRE_UPPER_CASE;
  }

  if (!password.match(LOWERCASE_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.REQUIRE_LOWER_CASE;
  }

  if (!password.match(NUMBER_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.REQUIRE_NUMBER;
  }

  if (!password.match(SPECIAL_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.REQUIRE_SPECIAL_CHARACTER;
  }
  return;
};

const validateConfirmPassword = (confirmPassword = '', password = '') => {
  if (!confirmPassword)
    return VALIDATE_MESSAGE.REQUIRED_ERROR.replace(
      '{field}',
      'Confirm Password'
    );

  if (confirmPassword !== password) {
    return VALIDATE_MESSAGE.invalidConfirmPassword;
  }
  return;
};

const validatePhone = (phone = '') => {
  if (!phone)
    return VALIDATE_MESSAGE.REQUIRED_ERROR.replace('{field}', 'Phone');

  if (!phone.match(PHONE_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.INVALID_PHONE;
  }
  return;
};

export const validateForm = (user) => {
  const error = {
    ...(validateFirstName(user.firstName) && {
      firstName: validateFirstName(user.firstName),
    }),
    ...(validateEmail(user.email) && {
      email: validateEmail(user.email),
    }),
    ...(validateLastName(user.lastName) && {
      lastName: validateLastName(user.lastName),
    }),
    ...(validateGender(user.gender) && {
      gender: validateGender(user.gender),
    }),
    ...(validateUsername(user.username) && {
      username: validateUsername(user.username),
    }),
    ...(validatePassword(user.password) && {
      password: validatePassword(user.password),
    }),
    ...(validateConfirmPassword(user.confirmPassword, user.password) && {
      confirmPassword: validateConfirmPassword(
        user.confirmPassword,
        user.password
      ),
    }),
    ...(validatePhone(user.phone) && {
      phone: validatePhone(user.phone),
    }),
  };

  return error;
};
