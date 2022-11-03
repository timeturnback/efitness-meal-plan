import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';

import { BodyFatCalculation } from '@/helper/body-fat-calculation';

interface BodyFatContextProps {
  gender: { value: string; error: string };
  setGender: Dispatch<SetStateAction<{ value: string; error: string }>>;
  height: { value: string; error: string };
  setHeight: Dispatch<SetStateAction<{ value: string; error: string }>>;
  neck: { value: string; error: string };
  setNeck: Dispatch<SetStateAction<{ value: string; error: string }>>;
  waist: { value: string; error: string };
  setWaist: Dispatch<SetStateAction<{ value: string; error: string }>>;
  hip: { value: string; error: string };
  setHip: Dispatch<SetStateAction<{ value: string; error: string }>>;
  fatpercent: { value: string; gender: string };
  setFatPercent: Dispatch<SetStateAction<{ value: string; gender: string }>>;
  onSubmit: () => void;
  validateForm: () => boolean;
}

const BodyFatContext = createContext({} as BodyFatContextProps);
const BodyFatProvider = ({ children }: { children: ReactNode }) => {
  const [gender, setGender] = useState({ value: '', error: '' });
  const [height, setHeight] = useState({ value: '', error: '' });
  const [neck, setNeck] = useState({ value: '', error: '' });
  const [waist, setWaist] = useState({ value: '', error: '' });
  const [hip, setHip] = useState({ value: '', error: '' });
  const [fatpercent, setFatPercent] = useState({ value: '', gender: '' });

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
    if (
      (neck.value && +neck.value >= 100) ||
      (neck.value && +neck.value <= 0)
    ) {
      setNeck({
        ...neck,
        error: 'Please enter your correct neck measurement.',
      });
    }
    if (
      (waist.value && +waist.value >= 500) ||
      (waist.value && +waist.value <= 0)
    ) {
      setWaist({
        ...waist,
        error: 'Please enter your correct waist measurement.',
      });
    }
    if ((hip.value && +hip.value >= 800) || (hip.value && +hip.value <= 0)) {
      setHip({
        ...hip,
        error: 'Please enter your exact hip measurements.',
      });
    }
  }, [height.value, neck.value, waist.value, hip.value]);

  const onSubmit = () => {
    if (validateForm()) {
      if (gender.value === 'male') {
        setFatPercent({
          value: BodyFatCalculation(
            gender.value,
            waist.value,
            neck.value,
            hip.value,
            height.value
          ),
          gender: 'male',
        });
      } else {
        setFatPercent({
          value: BodyFatCalculation(
            gender.value,
            waist.value,
            neck.value,
            hip.value,
            height.value
          ),
          gender: 'female',
        });
      }
    }
  };

  const validateForm = () => {
    let isError = false;
    if (!gender.value) {
      isError = true;
      setGender({ value: '', error: 'Please select your gender.' });
    }
    if (!height.value) {
      isError = true;
      setHeight({ value: '', error: 'Please enter the corrent height.' });
    }
    if (!neck.value) {
      isError = true;
      setNeck({ value: '', error: 'Please enter your neck measurement.' });
    }
    if (!waist.value) {
      isError = true;
      setWaist({ value: '', error: 'Please enter your waist measurement.' });
    }
    if (!hip.value && gender.value === 'female') {
      isError = true;
      setHip({ value: '', error: 'Please enter your hip measurement.' });
    }
    return !isError;
  };
  const value = {
    gender,
    setGender,
    height,
    setHeight,
    neck,
    setNeck,
    waist,
    setWaist,
    hip,
    setHip,
    fatpercent,
    setFatPercent,
    onSubmit,
    validateForm,
  };
  return (
    <BodyFatContext.Provider value={value}>{children}</BodyFatContext.Provider>
  );
};

export { BodyFatContext, BodyFatProvider };
