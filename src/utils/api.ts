import apisauce from 'apisauce';
import Axios from 'axios';

const axiosApi = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_FOOD,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY_FOOD,
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

  const getExerciseByName = (name: string) =>
    api.get(`v1/exercises?name=${name}`);

  return {
    getFoods,
    getExerciseByName,
  };
};

export const ApiInstance = create();
