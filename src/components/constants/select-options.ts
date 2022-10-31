import type { StaticImageData } from 'next/image';

import { ImageFormulaEquation } from '../Images/ImageFormulaEquation';

export interface SelectOptionObject {
  label: string;
  value: string;
}

export interface SelectOptionFormulaEquation {
  label: string;
  image?: string | StaticImageData;
  value?: string;
  gender?: {
    male: {
      label: string;
      image: string | StaticImageData;
      value: string;
    };
    female: {
      label: string;
      image: string | StaticImageData;
      value: string;
    };
  };
}

export const DROP_DOWN_OPTIONS: SelectOptionObject[] = [
  {
    label: 'Little or no exercise',
    value: 'little or no exercise',
  },
  {
    label: 'Light exercise: 1-3 times/week',
    value: 'light exercise: 1-3 times/week',
  },
  {
    label: 'Moderate exercise: 3-5 times/week',
    value: 'moderate exercise: 3-5 times/week',
  },
  {
    label: 'Exercise a lot: 6-7 times/week',
    value: 'exercise a lot: 6-7 times/week',
  },
  {
    label: 'Heavy exercise: More than 7 times a week',
    value: 'heavy exercise: more than 7 times a week',
  },
];

export const GENDER_OPTIONS: SelectOptionObject[] = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
];

export const FORMULA_OPTIONS: SelectOptionObject[] = [
  {
    label: 'Mifflin-St Jeor',
    value: 'mifflin st jeor',
  },
  {
    label: 'Revised Harris-Benedict',
    value: 'revised harris benedict',
  },
  {
    label: 'Katch-McArdle',
    value: 'katch mcardle',
  },
];

export const FORMULA_EQUATIONS_OPTIONS: SelectOptionFormulaEquation[] = [
  {
    label: 'Mifflin-St Jeor',
    gender: {
      male: {
        label: 'Male',
        image: ImageFormulaEquation.Male,
        value:
          'BMR = (10 x weight in kg) + (6,25 x height in cm) - (5 x age) + 5',
      },
      female: {
        label: 'Female',
        image: ImageFormulaEquation.Female,
        value:
          'BMR = (10 x weight in kg) + (6,25 x height in cm) - (5 x age) - 161',
      },
    },
  },
  {
    label: 'Revised Harris-Benedict',
    gender: {
      male: {
        label: 'Male',
        image: ImageFormulaEquation.Male,
        value:
          'BMR = (13,397 x weight in kg) + (4,799 x height in cm) - (5,677 x age) + 88,362',
      },
      female: {
        label: 'Female',
        image: ImageFormulaEquation.Female,
        value:
          'BMR = (9,247 x weight in kg) + (3,098 x height in cm) - (4,330 x age) + 447,593',
      },
    },
  },
  {
    label: 'Katch-McArdle',
    image: ImageFormulaEquation.FatPercent,
    value: 'BMR = 370 + (21,6 x (weight in kg x (100 - body fat %) / 100))',
  },
];
