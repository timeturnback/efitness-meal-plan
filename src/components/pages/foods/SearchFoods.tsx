import clsx from 'clsx';
import { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { ImageFoods } from '@/components/images/foods';
import { FoodsContext } from '@/context/foods-context';

export const SearchFoods = () => {
  const { blsearch, listitemsearch } = useContext(FoodsContext);
  return (
    <div>
      {!blsearch.findfoods && listitemsearch.length === 0 ? (
        <CantFindFoods />
      ) : (
        <div
          className={clsx(
            'grid grid-cols-2 gap-6',
            blsearch.findfoods && listitemsearch.length !== 0 ? 'pt-12' : null
          )}
        >
          {listitemsearch.map((item) => (
            <ItemInMainSuggest
              key={item.name}
              label={item.name}
              calorie={item.calories}
              carb={item.carbohydrates_total_g}
              fat={item.fat_total_g}
              protein={item.protein_g}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CantFindFoods = () => {
  return (
    <div className="relative mx-auto flex w-2/4 flex-col items-center">
      <h2 className="absolute top-9 text-4xl font-medium text-gray-800 drop-shadow-sm">
        Can&apos;t find food :(
      </h2>
      <img
        className="drop-shadow-md grayscale"
        src={ImageFoods.search_cantfindfood.src}
        alt=""
      />
    </div>
  );
};

const ItemInMainSuggest = ({
  label,
  calorie,
  carb,
  fat,
  protein,
}: {
  label: string;
  calorie: number;
  carb: number;
  fat: number;
  protein: number;
}) => {
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
  const data = {
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
  return (
    <div className="cursor-pointer rounded-xl bg-white p-2 shadow drop-shadow-md transition-all duration-300">
      <div className="flex items-center">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full">
          <Doughnut className="drop-shadow-md" data={data} />
          <span className="absolute flex flex-col text-center text-lg font-bold text-gray-900 drop-shadow-md">
            {Math.round(calorie || 0)}
            <span className="text-center font-medium leading-3 drop-shadow-md">
              Cal
            </span>
          </span>
        </div>
        <div className="flex w-full justify-center">
          <div className="inline-block">
            <h2 className="text-xl font-medium text-cyan-800 drop-shadow-md">
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </h2>
            <span className="block pb-2 text-base text-gray-900 drop-shadow-md">
              Carbs: <b className="font-medium">{carb}</b> • Fat:{' '}
              <b className="font-medium">{fat}</b> • Protein:{' '}
              <b className="font-medium">{protein}</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
