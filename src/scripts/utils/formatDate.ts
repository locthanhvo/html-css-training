/**
 *
 * @param inputDate value need format date
 * @returns {string}
 */
export const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);

  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return formattedDate;
};
