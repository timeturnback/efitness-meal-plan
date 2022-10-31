import apisauce from 'apisauce';
import Axios from 'axios';

const axiosApi = Axios.create({
  baseURL: 'https://api.api-ninjas.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': 'mlEdHCv8gOzhuQ6pRGkJjQ==NpaCyq3OxleKi4I4',
    // 'Cache-Control': 'no-cache',
  },
  timeout: 50000,
});

const create = () => {
  const api = apisauce.create({
    // @ts-ignore
    axiosInstance: axiosApi,
  });

  // SET AUTH TOKEN
  const setAuthToken = (userAuth: string) => {
    if (userAuth) {
      api.setHeader('Authorization', `Bearer ${userAuth}`);
    } else {
      api.setHeader('Authorization', '');
    }
  };
  // API function

  // USER
  const getCats = (name: string) => api.get(`v1/cats?name=${name}`);

  return {
    // CATS
    getCats,
    //
    setAuthToken,
  };
};

export const ApiInstance = create();
