export const calculateBMRXActivity = (activity: string, value: number) => {
  if (activity === 'little or no exercise') {
    return value * 1.2;
  }
  if (activity === 'light exercise: 1-3 times/week') {
    return value * 1.375;
  }
  if (activity === 'moderate exercise: 3-5 times/week') {
    return value * 1.55;
  }
  if (activity === 'exercise a lot: 6-7 times/week') {
    return value * 1.725;
  }
  return value * 1.79;
};

export const _calorieResultsMSJ = (
  gender: string,
  weight: string,
  height: string,
  activity: string,
  age: string
) => {
  if (gender === 'male') {
    const result = 10 * +weight + 6.25 * +height - 5 * +age + 5;
    return calculateBMRXActivity(activity, result);
  }
  const result = 10 * +weight + 6.25 * +height - 5 * +age - 161;
  return calculateBMRXActivity(activity, result);
};

export const _calorieResultsRHB = (
  gender: string,
  weight: string,
  height: string,
  activity: string,
  age: string
) => {
  if (gender === 'male') {
    const result = 13.397 * +weight + 4.799 * +height - 5.677 * +age + 88.362;
    return calculateBMRXActivity(activity, result);
  }
  const result = 9.247 * +weight + 3.098 * +height - 4.33 * +age + 447.593;
  return calculateBMRXActivity(activity, result);
};
