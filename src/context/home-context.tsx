import type { ReactNode, SetStateAction } from 'react';
import React, { createContext, useEffect, useState } from 'react';

import { calculateBMRXActivity } from '@/helper/calculation';

interface HomeContextProps {
  gender: any;
  setGender: any;
  age: any;
  setAge: any;
  height: any;
  setHeight: any;
  weight: any;
  setWeight: any;
  activity: any;
  setActivity: any;
  formula: any;
  setFormula: any;
  onFormulaEquation: any;
  fatpercent: any;
  setFatPercent: any;
  onSubmit: any;
  bmr: any; // TODO add correct types
}

const HomeContext = createContext({} as HomeContextProps);

const HomeProvider = ({ children }: { children: ReactNode }) => {
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

  const _calorieResultsMSJ = () => {
    if (gender.value === 'male') {
      const result =
        10 * +weight.value + 6.25 * +height.value - 5 * +age.value + 5;
      return calculateBMRXActivity(activity.value, result);
    }
    const result =
      10 * +weight.value + 6.25 * +height.value - 5 * +age.value - 161;
    return calculateBMRXActivity(activity.value, result);
  };

  const _calorieResultsRHB = () => {
    if (gender.value === 'male') {
      const result =
        13.397 * +weight.value +
        4.799 * +height.value -
        5.677 * +age.value +
        88.362;
      return calculateBMRXActivity(activity.value, result);
    }
    const result =
      9.247 * +weight.value +
      3.098 * +height.value -
      4.33 * +age.value +
      447.593;
    return calculateBMRXActivity(activity.value, result);
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

  const onSubmit = () => {
    if (_validateForm()) {
      if (formula.value === 'mifflin st jeor') {
        setBMR(Math.round(_calorieResultsMSJ()));
      } else if (formula.value === 'revised harris benedict') {
        setBMR(Math.round(_calorieResultsRHB()));
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
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export { HomeContext, HomeProvider };
