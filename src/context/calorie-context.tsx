import type { Dispatch, ReactNode, SetStateAction } from 'react';
import React, { createContext, useEffect, useState } from 'react';

import { _calorieResultsMSJ, _calorieResultsRHB } from '@/helper/calculation';

interface CalorieContextProps {
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
  bmr: number;
}

const CalorieContext = createContext({} as CalorieContextProps);

const CalorieProvider = ({ children }: { children: ReactNode }) => {
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
  const [bmr, setBMR] = useState(0);

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
  }, [height.value, age.value, weight.value]);

  useEffect(() => {
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
  }, [fatpercent.value, formula.value]);

  const _validateForm = () => {
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

  const onFormulaEquation = (value: SetStateAction<string>) => {
    if (value === 'katch mcardle') {
      window.scrollTo({
        top: 1460,
        behavior: 'smooth',
      });
    } else if (value === 'revised harris benedict') {
      window.scrollTo({
        top: 1115,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 770,
        behavior: 'smooth',
      });
    }
  };

  const onSubmit = () => {
    if (_validateForm()) {
      if (formula.value === 'mifflin st jeor') {
        setBMR(
          Math.round(
            _calorieResultsMSJ(
              gender.value,
              weight.value,
              height.value,
              activity.value,
              age.value
            )
          )
        );
      } else if (formula.value === 'revised harris benedict') {
        setBMR(
          Math.round(
            _calorieResultsRHB(
              gender.value,
              weight.value,
              height.value,
              activity.value,
              age.value
            )
          )
        );
      } else {
        const result =
          370 + 21.6 * ((+weight.value * (100 - +fatpercent.value)) / 100);
        setBMR(Math.round(result));
      }
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
    bmr,
  };
  return (
    <CalorieContext.Provider value={value}>{children}</CalorieContext.Provider>
  );
};

export { CalorieContext, CalorieProvider };
