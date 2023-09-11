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
    : VALIDATE_MESSAGE.requiredError.replace('{field}', 'First Name');
};

const validateLastName = (lastName = '') => {
  return lastName
    ? undefined
    : VALIDATE_MESSAGE.requiredError.replace('{field}', 'Last Name');
};

const validateGender = (gender = '') => {
  return gender
    ? undefined
    : VALIDATE_MESSAGE.requiredError.replace('{field}', 'Gender');
};

const validateEmail = (email = '') => {
  if (!email) return VALIDATE_MESSAGE.requiredError.replace('{field}', 'Email');

  if (!email.match(EMAIL_REGEX)) {
    return VALIDATE_MESSAGE.inValidEmail;
  }
};

const validateUsername = (username = '') => {
  if (!username)
    return VALIDATE_MESSAGE.requiredError.replace('{field}', 'Username');

  if (!username.match(USERNAME_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.inValidUsername;
  }
  return;
};

const validatePassword = (password = '') => {
  if (!password)
    return VALIDATE_MESSAGE.requiredError.replace('{field}', 'Password');

  if (!password.match(PASSWORD_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.inValidPassword;
  }

  if (!password.match(UPPERCASE_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.requireUpperCase;
  }

  if (!password.match(LOWERCASE_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.requireLowerCase;
  }

  if (!password.match(NUMBER_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.requireNumber;
  }

  if (!password.match(SPECIAL_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.requireSpecialCharacter;
  }
  return;
};

const validateConfirmPassword = (confirmPassword = '', password = '') => {
  if (!confirmPassword)
    return VALIDATE_MESSAGE.requiredError.replace(
      '{field}',
      'Confirm Password'
    );

  if (confirmPassword !== password) {
    return VALIDATE_MESSAGE.invalidConfirmPassword;
  }
  return;
};

const validatePhone = (phone = '') => {
  if (!phone) return VALIDATE_MESSAGE.requiredError.replace('{field}', 'Phone');

  if (!phone.match(PHONE_CHARACTERS_REGEX)) {
    return VALIDATE_MESSAGE.invalidPhone;
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
