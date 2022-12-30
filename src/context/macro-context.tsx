import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';

interface MacroContextProps {
  tdee: { value: string; error: string };
  setTdee: Dispatch<SetStateAction<{ value: string; error: string }>>;
  macronutrient: { value: string; error: string };
  setMacroNutrient: Dispatch<SetStateAction<{ value: string; error: string }>>;
  customprotein: number;
  setCustomProtein: Dispatch<SetStateAction<number>>;
  customfat: number;
  setCustomFat: Dispatch<SetStateAction<number>>;
  customcarb: number;
  setCustomCarb: Dispatch<SetStateAction<number>>;
  macro: { carb: number; fat: number; protein: number };
  setMacro: Dispatch<
    SetStateAction<{ carb: number; fat: number; protein: number }>
  >;
  onSubmit: () => void;
}

const MacroContext = createContext({} as MacroContextProps);

const MacroProvider = ({ children }: { children: ReactNode }) => {
  const [tdee, setTdee] = useState({ value: '', error: '' });
  const [macronutrient, setMacroNutrient] = useState({ value: '', error: '' });
  const [customprotein, setCustomProtein] = useState(0);
  const [customfat, setCustomFat] = useState(0);
  const [customcarb, setCustomCarb] = useState(0);
  const [macro, setMacro] = useState({ carb: 0, fat: 0, protein: 0 });
  useEffect(() => {
    if (
      (tdee.value && +tdee.value >= 4000) ||
      (tdee.value && +tdee.value <= 0)
    ) {
      setTdee({ ...tdee, error: 'Please enter your TDEE correctly.' });
    }
  }, [tdee.value]);

  useEffect(() => {
    if (macronutrient.value === 'custom' && +tdee.value > 500) {
      setMacro({ carb: customcarb, fat: customfat, protein: customprotein });
    }
  }, [macronutrient.value, tdee.value, customcarb, customfat, customprotein]);

  const onSubmit = () => {
    if (validateForm()) {
      if (macronutrient.value === 'hgiher carb') {
        setMacro({ carb: 60, fat: 15, protein: 25 });
        setCustomCarb(60);
        setCustomFat(15);
        setCustomProtein(25);
      } else if (macronutrient.value === 'moderate carb') {
        setMacro({ carb: 50, fat: 25, protein: 25 });
        setCustomCarb(50);
        setCustomFat(25);
        setCustomProtein(25);
      } else if (macronutrient.value === 'lower carb') {
        setMacro({ carb: 10, fat: 50, protein: 40 });
        setCustomCarb(10);
        setCustomFat(50);
        setCustomProtein(40);
      }
    }
  };

  const validateForm = () => {
    let isError = false;
    if (!tdee.value) {
      isError = true;
      setTdee({ value: '', error: 'Please enter your TDEE.' });
    }
    if (!macronutrient.value) {
      isError = true;
      setMacroNutrient({ value: '', error: 'Please select a nutrient ratio.' });
    }
    return !isError;
  };
  const value = {
    tdee,
    setTdee,
    customcarb,
    setCustomCarb,
    customfat,
    setCustomFat,
    customprotein,
    setCustomProtein,
    macronutrient,
    setMacroNutrient,
    setMacro,
    macro,
    validateForm,
    onSubmit,
  };
  return (
    <MacroContext.Provider value={value}>{children}</MacroContext.Provider>
  );
};

export { MacroContext, MacroProvider };
