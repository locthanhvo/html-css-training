import { API_BASE_URL, API_PATH_URL, HTTP_METHOD } from '@constants'
import { queryParams } from '@helpers'
import { commonHttpRequest } from '@helpers/httpsRequest'
import { QueryParamsType } from '@types'

const fullPath = API_BASE_URL + API_PATH_URL.USERS_URL

export const addUser = async <T, U>(data: T): Promise<U> => {
  try {
    return await commonHttpRequest<T, U>(HTTP_METHOD.POST, fullPath, data)
  } catch (error) {
    throw error
  }
}

/**
 * @description get data detail by id from server
 * @param {String} path request path
 * @query {filter, page, limit, sortBy, order}
 * @returns data after request
 */
export const getUser = async <T, U, V extends Record<string, string | number | boolean>>(
  path: string,
  query: QueryParamsType<V>,
): Promise<U | U[]> => {
  const queryString = queryParams(query)
  const url = `${fullPath}/${path}?${queryString}`

  return await commonHttpRequest<T, U | U[]>(HTTP_METHOD.GET, url)
}

/**
 * @description delete data at server
 * @param {String} path
 * @returns data after request
 */
export const deleteUser = async (path?: string): Promise<void> => {
  const url = `${fullPath}/${path}`

  return await commonHttpRequest(HTTP_METHOD.DELETE, url)
}

/**
 * Call api put data
 * @param {String} path
 * @body {object} data
 */
export const updateUser = async <T, U>(path: string, data: T): Promise<U> => {
  const url = `${fullPath}/${path}`

  return await commonHttpRequest<T, U>(HTTP_METHOD.PUT, url, data)
}
