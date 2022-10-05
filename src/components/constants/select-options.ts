export interface SelectOptionObject {
  label: string;
  value: string;
}

export interface SelectOptionInput {
  type: string;
  unit: string;
  maxvalue: number;
  notification: string;
  placeholder: string;
}

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

export const BUTTON_OPTIONS: SelectOptionObject[] = [
  {
    label: 'Calulate',
    value: 'calulate',
  },
];

export const INPUT_OPTIONS_HEIGHT: SelectOptionInput[] = [
  {
    type: 'number',
    unit: 'cm',
    maxvalue: 3,
    notification: 'Please enter the correct height',
    placeholder: 'Ex: 180',
  },
];

export const INPUT_OPTIONS_AGE: SelectOptionInput[] = [
  {
    type: 'number',
    unit: '',
    maxvalue: 3,
    notification: 'Please enter the correct age',
    placeholder: 'Ex: 20',
  },
];

export const INPUT_OPTIONS_TEXT: SelectOptionInput[] = [
  {
    type: 'text',
    unit: '',
    maxvalue: 180,
    notification: '',
    placeholder: '',
  },
];
