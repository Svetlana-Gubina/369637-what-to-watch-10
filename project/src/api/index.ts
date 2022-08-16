import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getItem, AUTH_TOKEN_KEY_NAME } from '../services/localStorageItem';

const BASE_URL = 'https://10.react.pages.academy/wtw';
const TIMEOUT = 5000;

export const createApi = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  });

  instance.interceptors.request.use(
    (
      config: AxiosRequestConfig
    ): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
      const token = getItem(AUTH_TOKEN_KEY_NAME);
      if (token) {
        config.headers['x-token'] = token;
      }
      return config;
    }
  );

  return instance;
};
