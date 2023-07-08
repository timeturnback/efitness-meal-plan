import clsx from 'clsx';
import { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';

import type { SelectOptionApiFoods } from '@/components/constants/select-options';
import { ImageFoods } from '@/components/images/foods';
import { FoodsContext } from '@/context/foods-context';
import { PercentFoods } from '@/helper/percent-foods';

export const SearchFoods = () => {
  const { findfoods, listitemsearch } = useContext(FoodsContext);
  return (
    <div className="mt-6">
      {findfoods && listitemsearch.length === 0 ? (
        <CantFindFoods />
      ) : (
        <div
          className={clsx(
            'grid grid-cols-2 gap-6',
            findfoods && listitemsearch.length !== 0 ? 'pt-12' : null
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
              data={item}
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
  data,
}: {
  label: string;
  calorie: number;
  carb: number;
  fat: number;
  protein: number;
  data: SelectOptionApiFoods;
}) => {
  const { setFoodDetails, setItemFoodDetails } = useContext(FoodsContext);
  const { data_doughnut, data_carb, data_fat, data_protein } = PercentFoods(
    carb,
    fat,
    protein
  );
  const _onClick = () => {
    setItemFoodDetails({
      datadoughnut: data_doughnut,
      data,
      percentdoughnut: {
        carb: data_carb,
        fat: data_fat,
        protein: data_protein,
      },
    });
    document.body.style.overflow = 'hidden';
    setFoodDetails(true);
  };
  return (
    <div
      className="cursor-pointer rounded-xl bg-white p-2 shadow drop-shadow-md transition-all duration-300 hover:bg-gray-200"
      onClick={() => _onClick()}
    >
      <div className="flex items-center">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full">
          <Doughnut className="drop-shadow-md" data={data_doughnut} />
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
