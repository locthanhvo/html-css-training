import { BASE_URL } from '@/constants';

const handleResponse = async <T>(response: Response): Promise<T> => {
  return !response.ok ? [] : response.json();
};

const fetchData = async <T>(
  path: string,
  options: RequestInit,
): Promise<{ data: T; total?: number }> => {
  const response = await fetch(path, options);
  const data = await handleResponse<T>(response);

  return { data };
};

export const getData = async <T>(
  path: string,
  configOptions?: RequestInit,
): Promise<{ data: T }> => {
  const url = `${BASE_URL}/${path}`;

  return fetchData<T>(url, configOptions || {});
};

export const postData = async <T>(
  path: string,
  body: object,
  configOptions?: RequestInit,
): Promise<T> => {
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...configOptions,
  };

  return fetchData<T>(`${BASE_URL}/${path}`, options).then((res) => res.data);
};

export const putData = async <T>(
  path: string,
  body: object,
  configOptions?: RequestInit,
): Promise<T> => {
  const options: RequestInit = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...configOptions,
  };

  return fetchData<T>(`${BASE_URL}${path}`, options).then((res) => res.data);
};

export const deleteData = async (
  path: string,
  configOptions?: RequestInit,
): Promise<void> => {
  const options: RequestInit = {
    method: 'DELETE',
    ...configOptions,
  };

  await fetch(`${BASE_URL}/${path}`, options).then(handleResponse);
};

const apiClient = { getData, postData, putData, deleteData };

export { apiClient };
