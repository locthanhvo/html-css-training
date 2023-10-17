// convert date to the form: Sep 5, 2023
export const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return formattedDate;
};
