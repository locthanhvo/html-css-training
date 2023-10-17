// Check email have @ symbol, a string precedes it and the following string needs to contain a period, followed by 2-3 characters.
export const EMAIL_REGEX = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// check characters with strings or numbers between 6 and 30 characters in length
export const USERNAME_CHARACTERS_REGEX = /[0-9a-zA-Z]{6,30}/;

// check the character must match the phone number format.
export const PHONE_CHARACTERS_REGEX = /^(?:\+84|0)[1-9]\d{8,9}$/;

// check characters least 8 characters minimum
export const PASSWORD_CHARACTERS_REGEX = /^.{8,}$/;

// check characters least 1 uppercase letter
export const UPPERCASE_CHARACTERS_REGEX = /^(?=.*[A-Z]).*$/;

// check characters least 1 lowercase letter
export const LOWERCASE_CHARACTERS_REGEX = /^(?=.*[a-z]).*$/;

// check characters least 1 number letter
export const NUMBER_CHARACTERS_REGEX = /^(?=.*\d).*$/;

// check character least 1 special letter
export const SPECIAL_CHARACTERS_REGEX = /^(?=.*[#$@!%&*?])/;
