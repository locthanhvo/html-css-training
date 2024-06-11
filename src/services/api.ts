const BASE_URL = process.env.VITE_API_ENDPOINT || '';

import { RequestOptions, httpsMethod } from '@/types';

import { HTTP_METHOD } from '@/constants';

export const apiRequest = async <T>(
  method: httpsMethod,
  path: string,
  data?: T,
): Promise<T> => {
  const requestOptions: RequestOptions = {
    method: method,
  };

  if ((method === HTTP_METHOD.POST || method === HTTP_METHOD.PUT) && data) {
    requestOptions.headers = {
      'Content-Type': 'application/json',
    };
    requestOptions.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${path}`, requestOptions);

  return await response.json();
};
