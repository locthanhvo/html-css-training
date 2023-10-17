/**
 *
 * @param phoneNumber phone number need format
 * @returns {string}
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  phoneNumber = phoneNumber.replace(/\D/g, '');

  phoneNumber = `+84 ${phoneNumber.substring(1, 4)} ${phoneNumber.substring(
    4,
    7
  )} ${phoneNumber.substring(7)}`;

  return phoneNumber;
};
