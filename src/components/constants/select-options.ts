export interface SelectOptionObject {
  label: string;
  value: string;
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
