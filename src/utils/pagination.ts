export const getRecordRange = (
  currentPage: number,
  pageSize: number,
  total: number,
) => {
  const startRecord = (currentPage - 1) * pageSize + 1;
  let endRecord = currentPage * pageSize;

  if (endRecord > total) {
    endRecord = total;
  }
  return `${startRecord} - ${endRecord}`;
};
