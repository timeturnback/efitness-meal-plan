export const BodyFatCalculation = (
  gender: string,
  waist: string,
  neck: string,
  hip: string,
  height: string
) => {
  if (gender === 'male') {
    const calculation_1 =
      1.0324 -
      0.19077 * Math.log10(+waist - +neck) +
      0.15456 * Math.log10(+height);
    const calculation_2 = 495 / calculation_1;
    const result = calculation_2 - 450;
    return result.toFixed(1);
  }
  const calculation_1 =
    1.29579 -
    0.35004 * Math.log10(+waist + +hip - +neck) +
    0.221 * Math.log10(+height);
  const calculation_2 = 495 / calculation_1;
  const result = calculation_2 - 450;
  return result.toFixed(1);
};
