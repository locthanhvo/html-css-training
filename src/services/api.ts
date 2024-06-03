import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const BASE_URL = process.env.VITE_API_ENDPOINT || '';

class APIHelper {
  private axiosClient;

  constructor(readonly baseUrl: string) {
    this.axiosClient = axios.create({
      baseURL: baseUrl,
      headers: {
        accept: 'application/json',
      },
    });
  }

  private errorHandler<T>(
    callback: () => Promise<AxiosResponse<T>>,
  ): Promise<T> {
    return callback()
      .then((res) => res.data)
      .catch((error: AxiosError) => {
        if (!error.response) {
          throw new Error('Network error. Please try again later.');
        }

        throw error.response.data;
      });
  }

  private request<T>(
    method: string,
    url: string,
    options: AxiosRequestConfig = {},
  ): Promise<T> {
    return this.errorHandler<T>(() =>
      this.axiosClient.request<T>({ method, url, ...options }),
    );
  }

  get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('GET', url, options);
  }

  post<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('POST', url, { ...options });
  }

  put<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('PUT', url, { ...options });
  }

  patch<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('PATCH', url, { ...options });
  }

  delete<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, options);
  }
}

export const APIs = new APIHelper(BASE_URL);
