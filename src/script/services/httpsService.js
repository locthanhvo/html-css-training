import dotenv from 'dotenv';
import { commonHttpRequest } from '../constants';
dotenv.config();

/**
 * @class HttpsService
 * Manages the common data
 */
export class HttpsService {
  constructor(path) {
    this.fullPath = process.env.API_ENDPOINT + path;
  }

  /**
   * Call api post data
   * @body {object} data
   *
   */

  post = (data) => {
    return commonHttpRequest('POST', this.fullPath, data);
  };

  /**
   * @description get data from server
   * @param {String} path request path
   * @query {filter, page, limit, sortBy, order}
   * @returns data after request
   */
  getList = async (query) => {
    const url = `${this.fullPath}?${query}`;

    return commonHttpRequest('GET', url);
  };

  /**
   * @description get data detail by id from server
   * @param {String} path request path
   * @returns data after request
   */
  get = async (path) => {
    const url = `${this.fullPath}/${path}`;

    return commonHttpRequest('GET', url);
  };

  /**
   * @description delete data at server
   * @param {String} path
   * @returns data after request
   */
  delete = async (path) => {
    const url = `${this.fullPath}/${path}`;

    return commonHttpRequest('DELETE', url);
  };

  /**
   * Call api put data
   * @param {String} path
   * @body {object} data
   */

  put = (path, data) => {
    const url = `${this.fullPath}/${path}`;

    return commonHttpRequest('PUT', url, data);
  };
}
