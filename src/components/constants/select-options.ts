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

export interface SelectOptionPercentBar {
  low: number;
  value_low: string;
  good: number;
  value_good: string;
  fair: number;
  value_fair: string;
  poor: number;
  value_poor: string;
  high: number;
  value_high: string;
}

export interface SelectOptionFatClassification {
  label: string;
  male: string;
  female: string;
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
    label: 'Mifflin-St Jeor Formula',
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
    label: 'Revised Harris-Benedict Formula',
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
    label: 'Katch-McArdle Formula',
    image: ImageFormulaEquation.FatPercent,
    value: 'BMR = 370 + (21,6 x (weight in kg x (100 - body fat %) / 100))',
  },
];

export const MENS_PERCENT_BAR_OPTIONS: SelectOptionPercentBar[] = [
  {
    low: 50,
    value_low: '2 - 5',
    good: 80,
    value_good: '6 - 13',
    fair: 40,
    value_fair: '14 - 17',
    poor: 70,
    value_poor: '18 - 24',
    high: 100,
    value_high: '25',
  },
];

export const WOMENS_PERCENT_BAR_OPTIONS: SelectOptionPercentBar[] = [
  {
    low: 130,
    value_low: '10 - 13',
    good: 70,
    value_good: '14 - 20',
    fair: 40,
    value_fair: '12 - 24',
    poor: 70,
    value_poor: '25 - 31',
    high: 30,
    value_high: '32',
  },
];

export const FAT_CLASSIFICATION_OPTIONS: SelectOptionFatClassification[] = [
  {
    label: 'Description',
    female: 'Women',
    male: 'Men',
  },
  {
    label: 'Essential',
    female: '10 - 13',
    male: '2 - 5',
  },
  {
    label: 'Athletes',
    female: '14 - 20',
    male: '6 - 13',
  },
  {
    label: 'Fitness',
    female: '21 - 24',
    male: '14 - 17',
  },
  {
    label: 'Average',
    female: '25 - 31',
    male: '18 - 24',
  },
  {
    label: 'Obese',
    female: '32+',
    male: '25+',
  },
];

export const FORMULA_FAT_PERCENTAGE_OPTIONS: SelectOptionFormulaEquation[] = [
  {
    label: 'Body Fat Percentage (BFP) Formula',
    gender: {
      male: {
        label: 'Male',
        image: ImageFormulaEquation.Male,
        value:
          'BFP = ((495 / 1.0324 - 0.19077 * log10(waist in cm - neck in cm) + 0.15456 * log10(height in cm)) - 450)',
      },
      female: {
        label: 'Female',
        image: ImageFormulaEquation.Female,
        value:
          'BFP = ((495 / 1.29579 - 0.35004 * log10(waist in cm + hip in cm - neck in cm) + 0.22100 * log10(height in cm)) - 450)',
      },
    },
  },
];
