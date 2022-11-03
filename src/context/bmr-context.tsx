import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';

import { calorieResultsMSJ, calorieResultsRHB } from '@/helper/bmr-calculation';

interface BMRContextProps {
  gender: { value: string; error: string };
  setGender: Dispatch<SetStateAction<{ value: string; error: string }>>;
  age: { value: string; error: string };
  setAge: Dispatch<SetStateAction<{ value: string; error: string }>>;
  height: { value: string; error: string };
  setHeight: Dispatch<SetStateAction<{ value: string; error: string }>>;
  weight: { value: string; error: string };
  setWeight: Dispatch<SetStateAction<{ value: string; error: string }>>;
  activity: { value: string; error: string };
  setActivity: Dispatch<SetStateAction<{ value: string; error: string }>>;
  formula: { value: string; error: string };
  setFormula: Dispatch<SetStateAction<{ value: string; error: string }>>;
  onFormulaEquation: (value: SetStateAction<string>) => void;
  fatpercent: { value: string; error: string };
  setFatPercent: Dispatch<SetStateAction<{ value: string; error: string }>>;
  onSubmit: () => void;
  bmrandtdee: { bmr: number; tdee: number };
  setBMRAndTDEE: Dispatch<SetStateAction<{ bmr: number; tdee: number }>>;
  validateForm: () => boolean;
  calculateTDEE: (value: number) => number;
}

const BMRContext = createContext({} as BMRContextProps);

const BMRProvider = ({ children }: { children: ReactNode }) => {
  const [gender, setGender] = useState({ value: '', error: '' });
  const [age, setAge] = useState({ value: '', error: '' });
  const [height, setHeight] = useState({ value: '', error: '' });
  const [weight, setWeight] = useState({ value: '', error: '' });
  const [activity, setActivity] = useState({ value: '', error: '' });
  const [formula, setFormula] = useState({
    value: 'mifflin st jeor',
    error: '',
  });
  const [fatpercent, setFatPercent] = useState({ value: '', error: '' });
  const [bmrandtdee, setBMRAndTDEE] = useState({ bmr: 0, tdee: 0 });

  useEffect(() => {
    if (
      (height.value && +height.value >= 300) ||
      (height.value && +height.value <= 30)
    ) {
      setHeight({
        ...height,
        error: 'Please enter the corrent height.',
      });
    }
    if ((age.value && +age.value < 15) || (age.value && +age.value > 80)) {
      setAge({
        ...age,
        error: 'Age is only from 15 years old to 80 years old.',
      });
    }
    if (
      (weight.value && +weight.value >= 500) ||
      (weight.value && +weight.value <= 0)
    ) {
      setWeight({
        ...weight,
        error: 'Please enter the corrent weight.',
      });
    }
    if (
      (formula.value === 'katch mcardle' &&
        fatpercent.value &&
        +fatpercent.value >= 100) ||
      (formula.value === 'katch mcardle' &&
        fatpercent.value &&
        +fatpercent.value <= 0)
    ) {
      setFatPercent({
        ...fatpercent,
        error: 'Please enter your fat percentage.',
      });
    }
  }, [height.value, age.value, weight.value, fatpercent.value, formula.value]);

  const validateForm = () => {
    let isError = false;
    if (!gender.value) {
      isError = true;
      setGender({ value: '', error: 'Please select your gender.' });
    }
    if (!age.value) {
      isError = true;
      setAge({ value: '', error: 'Please enter the correct age.' });
    }
    if (!height.value) {
      isError = true;
      setHeight({ value: '', error: 'Please enter the corrent height.' });
    }
    if (!weight.value) {
      isError = true;
      setWeight({ value: '', error: 'Please enter the corrent weight.' });
    }
    if (!fatpercent.value && formula.value === 'katch mcardle') {
      isError = true;
      setFatPercent({ value: '', error: 'Please enter your fat percentage.' });
    }
    if (!activity.value) {
      isError = true;
      setActivity({ value: '', error: 'Please select an activity.' });
    }
    return !isError;
  };

  const onSubmit = () => {
    if (validateForm()) {
      if (formula.value === 'mifflin st jeor') {
        const valuetdee = calculateTDEE(
          Math.round(
            calorieResultsMSJ(
              gender.value,
              weight.value,
              height.value,
              age.value,
              activity.value
            )
          )
        );
        setBMRAndTDEE({
          bmr: Math.round(
            calorieResultsMSJ(
              gender.value,
              weight.value,
              height.value,
              age.value,
              activity.value
            )
          ),
          tdee: Math.round(valuetdee),
        });
      } else if (formula.value === 'revised harris benedict') {
        const valuetdee = calculateTDEE(
          Math.round(
            calorieResultsRHB(
              gender.value,
              weight.value,
              height.value,
              age.value,
              activity.value
            )
          )
        );
        setBMRAndTDEE({
          bmr: Math.round(
            calorieResultsRHB(
              gender.value,
              weight.value,
              height.value,
              age.value,
              activity.value
            )
          ),
          tdee: Math.round(valuetdee),
        });
      } else {
        const result =
          370 + 21.6 * ((+weight.value * (100 - +fatpercent.value)) / 100);
        const valuetdee = calculateTDEE(Math.round(result));
        setBMRAndTDEE({ bmr: Math.round(result), tdee: Math.round(valuetdee) });
      }
    }
  };

  const calculateTDEE = (bmr: number) => {
    if (activity.value === 'little or no exercise') {
      return bmr * 1.2;
    }
    if (activity.value === 'light exercise: 1-3 times/week') {
      return bmr * 1.375;
    }
    if (activity.value === 'moderate exercise: 3-5 times/week') {
      return bmr * 1.55;
    }
    if (activity.value === 'exercise a lot: 6-7 times/week') {
      return bmr * 1.725;
    }
    return bmr * 1.9;
  };

  const onFormulaEquation = (value: SetStateAction<string>) => {
    if (value === 'katch mcardle') {
      window.scrollTo({
        top: 720,
        behavior: 'smooth',
      });
    } else if (value === 'revised harris benedict') {
      window.scrollTo({
        top: 620,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 420,
        behavior: 'smooth',
      });
    }
  };
  const value = {
    gender,
    setGender,
    age,
    setAge,
    height,
    setHeight,
    weight,
    setWeight,
    activity,
    setActivity,
    formula,
    setFormula,
    onFormulaEquation,
    fatpercent,
    setFatPercent,
    onSubmit,
    bmrandtdee,
    setBMRAndTDEE,
    validateForm,
    calculateTDEE,
  };
  return <BMRContext.Provider value={value}>{children}</BMRContext.Provider>;
};

export { BMRContext, BMRProvider };
