import apisauce from 'apisauce';
import Axios from 'axios';

const axiosApiFood = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_FOOD,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY_FOOD,
    // 'Cache-Control': 'no-cache',
  },
  timeout: 50000,
});

const axiosApiExercise = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_EXERCISE,
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_KEY_EXERCISE,
    'X-RapidAPI-Host': process.env.NEXT_PUBLIC_HEADER_HOST,
  },
  timeout: 50000,
});

const create = () => {
  const apifood = apisauce.create({
    // @ts-ignore
    axiosInstance: axiosApiFood,
  });

  const apiexercise = apisauce.create({
    // @ts-ignore
    axiosInstance: axiosApiExercise,
  });

  const getFoods = (value: string) =>
    apifood.get(`v1/nutrition?query=${value}`);

  const getExerciseByName = (name: string) => apiexercise.get(`name/${name}`);

  const getExerciseByBodyParts = (value: string) =>
    apiexercise.get(`bodyPart/${value}`);
  const getExerciseByTarget = (value: string) =>
    apiexercise.get(`target/${value}`);
  const getExerciseByEquipment = (value: string) =>
    apiexercise.get(`equipment/${value}`);

  return {
    getFoods,
    getExerciseByName,
    getExerciseByBodyParts,
    getExerciseByTarget,
    getExerciseByEquipment,
  };
};

export const ApiInstance = create();
