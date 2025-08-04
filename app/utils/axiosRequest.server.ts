import axios, { type Method } from 'axios';
import { apiDomain, authDomain } from '~/constants/domains';

const authAxios = (method: Method, endpoint: string, params: any) =>
  axios({
    method,
    url: endpoint,
    params: params,
    baseURL: authDomain,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`).toString('base64')}`,
    },
  });

const apiAxios = () =>
  axios.create({
    baseURL: apiDomain,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export { authAxios, apiAxios };
