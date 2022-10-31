export const calculateBMRXActivity = (activityValue: string, value: number) => {
  if (activityValue === 'little or no exercise') {
    return value * 1.2;
  }
  if (activityValue === 'light exercise: 1-3 times/week') {
    return value * 1.375;
  }
  if (activityValue === 'moderate exercise: 3-5 times/week') {
    return value * 1.55;
  }
  if (activityValue === 'exercise a lot: 6-7 times/week') {
    return value * 1.725;
  }
  return value * 1.79;
};
