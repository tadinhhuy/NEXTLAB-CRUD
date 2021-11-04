import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const initAxiosInstance = (apiHost: string | undefined) => {
  const instance = axios.create({
    baseURL: apiHost,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
  return instance;
};

const requestMockApi = initAxiosInstance(
  'https://jsonplaceholder.typicode.com'
);

export { requestMockApi };
