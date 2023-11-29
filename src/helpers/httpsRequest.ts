import { RequestOptions, httpsMethod } from '@types'
import { HTTP_METHOD } from '@constants'

/**
 * @function commonHttpRequest
 * A generic function to perform common HTTP requests (GET, POST, PUT, DELETE).
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @param {string} path - The path for the request.
 * @param {object} data - Optional data to send in the request body (for POST).
 * @returns {Promise} A Promise that resolves to the JSON response from the server.
 */
export const commonHttpRequest = async <T, U>(
  method: httpsMethod,
  path: string,
  data?: T,
): Promise<U> => {
  const requestOptions: RequestOptions = {
    method: method,
  }

  if ((method === HTTP_METHOD.POST || method === HTTP_METHOD.PUT) && data) {
    requestOptions.headers = {
      'Content-Type': 'application/json',
    }
    requestOptions.body = JSON.stringify(data)
  }

  const response = await fetch(path, requestOptions)

  return (await response.json()) as U
}
