export const PercentFoods = (carb: number, fat: number, protein: number) => {
  let total = 0;
  let data_carb = 0;
  let data_fat = 0;
  let data_protein = 0;
  if (!carb) {
    total = fat + protein;
    data_fat = Math.round((fat / total) * 100);
    data_protein = Math.round((protein / total) * 100);
  } else if (!fat) {
    total = carb + protein;
    data_carb = Math.round((carb / total) * 100);
    data_protein = Math.round((protein / total) * 100);
  } else if (!protein) {
    total = carb + fat;
    data_carb = Math.round((carb / total) * 100);
    data_fat = Math.round((fat / total) * 100);
  } else if (carb && fat && protein) {
    total = carb + fat + protein;
    data_carb = Math.round((carb / total) * 100);
    data_protein = Math.round((protein / total) * 100);
    data_fat = 100 - (data_protein + data_carb);
  } else {
    data_carb = carb;
    data_fat = fat;
    data_protein = protein;
  }
  const data_doughnut = {
    datasets: [
      {
        data: [data_carb, data_fat, data_protein],
        backgroundColor: [
          'rgb(139,174,71)',
          'rgb(247,183,74)',
          'rgb(8,145,178)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return { data_doughnut, data_carb, data_fat, data_protein };
};
