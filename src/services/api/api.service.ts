import axios, {AxiosError} from 'axios';
import dotenv from 'dotenv';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
dotenv.config();
const Api = axios.create({
  baseURL: process.env.MODE !== 'development' ? process.env.BACKEND_URL : 'http://localhost:1337',
  headers,
});

Api.interceptors.request.use(async config => {
  const token = localStorage.getItem('user_token');
  if (token) {
    if (config.headers) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    if (error?.code === 'ERR_NETWORK') return Promise.reject(new Error('Não foi possível se conectar com o servidor.'));
    const data = error.response?.data as any;
    if (data?.errors?.[0]?.message === 'token-expired') {
      localStorage.clear();
      return window.location.replace('/entrar');
    }
    return Promise.reject(error);
  },
);

export default Api;
