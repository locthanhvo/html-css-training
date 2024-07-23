export const countLines = (text: string): number => {
  return text.split('</p><p>').length;
};

export const calculateDaysLeft = (
  startDate: string,
  endDate: string,
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const differenceInTime = end.getTime() - start.getTime();

  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return Math.round(differenceInDays);
};
