import apisauce from 'apisauce';
import Axios from 'axios';

const axiosApi = Axios.create({
  baseURL: 'https://api.api-ninjas.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': '26CO3nov8PvVnfGWGAVu7w==oZ0VOyDcA6mwdM5Z',
    // 'Cache-Control': 'no-cache',
  },
  timeout: 50000,
});

const create = () => {
  const api = apisauce.create({
    // @ts-ignore
    axiosInstance: axiosApi,
  });

  const getFoods = (value: string) => api.get(`v1/nutrition?query=${value}`);

  return {
    getFoods,
  };
};

export const ApiInstance = create();
