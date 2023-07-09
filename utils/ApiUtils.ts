import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

export default class ApiUtils {
  static async SendRequest<TResponse, TRequest = unknown>(
    method: Method,
    endpoint: string,
    body?: TRequest | null,
    params?: Record<string, string> | null
  ): Promise<TResponse> {
    let response: AxiosResponse<TResponse>;
    let queryString = '';

    if (params) {
      queryString = new URLSearchParams(params).toString();
      if (queryString) {
        queryString = `?${queryString}`;
      }
    }

    const headers = {
      'Content-Type': 'application/json',
    };

    const requestConfig: AxiosRequestConfig = { headers };
    const axiosInstance = axios.create(requestConfig);

    const baseUrl = 'https://schipkedit.xyz';

    try {
      const url = `${baseUrl}/${endpoint}${queryString}`;
      switch (method) {
        case 'POST':
          response = await axiosInstance({
            method,
            url,
            headers,
            data: body,
            ...requestConfig,
          });
          break;
        case 'GET':
          response = await axiosInstance.get(url, requestConfig);
          break;
        case 'PUT':
          response = await axiosInstance.put(url, body, requestConfig);
          break;
        case 'DELETE':
          response = await axiosInstance.delete(url, requestConfig);
          break;
        default:
          throw new Error('Invalid HTTP method.');
      }

      const { data, status } = response;

      if (status === 200) {
        return data;
      }
    } catch (err) {
      throw err;
    }
    throw new Error('ERROR: Status of valid HTTP request is not 200.');
  }
}
