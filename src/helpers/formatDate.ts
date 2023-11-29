/**
 *
 * @param inputDate value need format date (input: 2019-05-29T18:32:31.554Z)
 * @returns {string} (output: 29/05/19)
 */

export const formatDate = (inputDate: string): string => {
  const dateObject = new Date(inputDate)

  const day = dateObject.getUTCDate()
  const month = dateObject.getUTCMonth() + 1
  const year = dateObject.getUTCFullYear()

  const formattedDate = `${day}/${month}/${year.toString().slice(-2)}`

  return formattedDate
}
