export const REGEX = {
  PHONE: /^0(\d{9})$/,
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD_CHARACTERS: /^.{8,}$/,
  SPECIAL_CHARACTERS: /^(?=.*[#$@!%&*?])/,
  NUMBER_CHARACTERS: /^(?=.*\d).*$/,
  LOWERCASE_CHARACTERS: /^(?=.*[a-z]).*$/,
  UPPERCASE_CHARACTERS: /^(?=.*[A-Z]).*$/,
};
