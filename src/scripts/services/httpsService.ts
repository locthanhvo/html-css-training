import dotenv from 'dotenv';
import { commonHttpRequest, queryParams } from '@/utils';
import { HTTP_METHOD } from '@/constants';
import { QueryParamsType, UserForm } from '@/types';
dotenv.config();

/**
 * @class HttpsService
 * Manages the common data
 */
export class HttpsService<
  T,
  U,
  V extends Record<string, string | number | boolean>
> {
  private fullPath: string;
  constructor(path: string) {
    this.fullPath = process.env.API_ENDPOINT + path;
  }

  /**
   * @description get data detail by id from server
   * @param {String} path request path
   * @query {filter, page, limit, sortBy, order}
   * @returns data after request
   */
  get = async (path: string, query: QueryParamsType<V>): Promise<U | U[]> => {
    const queryString = queryParams(query);
    const url = `${this.fullPath}/${path}?${queryString}`;

    return await commonHttpRequest<T, U | U[]>(HTTP_METHOD.GET, url);
  };

  /**
   * Call api post data
   * @body {object} data
   *
   */
  post = async (data: T): Promise<U> => {
    return await commonHttpRequest<T, U>(HTTP_METHOD.POST, this.fullPath, data);
  };

  /**
   * @description delete data at server
   * @param {String} path
   * @returns data after request
   */
  delete = async (path: string): Promise<void> => {
    const url = `${this.fullPath}/${path}`;

    return await commonHttpRequest(HTTP_METHOD.DELETE, url);
  };

  /**
   * Call api put data
   * @param {String} path
   * @body {object} data
   */
  put = async (path: string, data: T): Promise<U> => {
    const url = `${this.fullPath}/${path}`;

    return await commonHttpRequest<T, U>(HTTP_METHOD.PUT, url, data);
  };
}
