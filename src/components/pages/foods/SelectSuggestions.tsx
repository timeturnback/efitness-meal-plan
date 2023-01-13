import { ArcElement, Chart } from 'chart.js';
import clsx from 'clsx';
import { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import styles from 'src/styles/global.module.scss';
import style_color from 'src/styles/input_range.module.scss';

import type {
  SelectOptionApiFoods,
  SelectOptionValue,
} from '@/components/constants/select-options';
import { MAIN_SUGGESTIONS } from '@/components/constants/select-options';
import { FoodsContext } from '@/context/foods-context';
import { PercentFoods } from '@/helper/percent-foods';

Chart.register(ArcElement);

export const SelectSuggestions = () => {
  const { iteminmainsuggest, mainsuggest } = useContext(FoodsContext);
  return (
    <div>
      <h2 className="py-6 text-2xl font-medium text-gray-900 drop-shadow-md">
        Suggestions:
      </h2>
      <div className="flex gap-10 pb-4">
        <SuggestNutrien
          label="Protein"
          color={style_color.slider_color_protein}
        />
        <SuggestNutrien label="Carb" color={style_color.slider_color_carb} />
        <SuggestNutrien label="Fat" color={style_color.slider_color_fat} />
      </div>
      <div className="mt-5 flex flex-wrap justify-between gap-20 pb-4">
        {MAIN_SUGGESTIONS.map((item) => (
          <MainSuggestions
            key={item.value}
            image={item.image}
            label={item.label}
            value={item.value}
            listitem={item.listitem}
          />
        ))}
      </div>
      {mainsuggest.listitem.length !== 0 && (
        <div>
          {mainsuggest.value && (
            <h2 className="pb-6 text-2xl font-medium text-gray-900 drop-shadow-md">
              Some suggestions of{' '}
              {mainsuggest.value.charAt(0).toUpperCase() +
                mainsuggest.value.slice(1)}
            </h2>
          )}
          <div className="grid grid-cols-4 gap-11 pb-8">
            {iteminmainsuggest.length === mainsuggest.listitem.length
              ? iteminmainsuggest.map((item) => {
                  return (
                    <ItemInMainSuggest
                      key={item.name}
                      label={item.name}
                      calorie={item.calories}
                      carb={item.carbohydrates_total_g}
                      fat={item.fat_total_g}
                      protein={item.protein_g}
                      data={item}
                    />
                  );
                })
              : Array.from(Array(mainsuggest.listitem.length).keys()).map(
                  (item) => <ItemInMainSuggestLoading key={item} />
                )}
          </div>
        </div>
      )}
    </div>
  );
};

const ItemInMainSuggestLoading = () => {
  return (
    <div className="w-56 rounded-xl bg-white p-2 shadow drop-shadow-md transition-all duration-300">
      <div className="flex items-center justify-evenly pb-1">
        <div className={clsx('h-24 w-24 rounded-full', styles.skeleton)}></div>
        <div
          className={clsx('inline h-5 w-16 rounded-md', styles.skeleton)}
        ></div>
      </div>
      <div className={clsx(styles.skeleton, 'h-6 w-full rounded-md')}></div>
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
      className="w-56 cursor-pointer rounded-xl bg-white p-2 shadow drop-shadow-md transition-all duration-300 hover:bg-gray-200 hover:drop-shadow-md"
      onClick={() => _onClick()}
    >
      <div className="flex items-center justify-evenly pb-1">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full">
          <Doughnut className="drop-shadow-md" data={data_doughnut} />
          <span className="absolute flex flex-col text-center text-lg font-bold text-gray-900 drop-shadow-md">
            {Math.round(calorie || 0)}
            <span className="text-center font-medium leading-3 drop-shadow-md">
              Cal
            </span>
          </span>
        </div>
        <div className="inline">
          <h2 className="text-center text-xl font-medium text-cyan-700 drop-shadow-md">
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </h2>
        </div>
      </div>
      <div>
        <span className="block pb-2 text-center text-xs text-gray-900 drop-shadow-md">
          Carbs: <b className="font-medium">{carb}</b> • Fat:{' '}
          <b className="font-medium">{fat}</b> • Protein:{' '}
          <b className="font-medium">{protein}</b>
        </span>
      </div>
    </div>
  );
};

const SuggestNutrien = ({
  label,
  color,
}: {
  label: string;
  color?: string;
}) => {
  return (
    <div className="flex items-center drop-shadow-md">
      <h2 className="pr-3 font-medium">{label}:</h2>
      <div
        className={clsx(
          'h-10 w-10 rounded-full border border-gray-200 shadow',
          color
        )}
      ></div>
    </div>
  );
};

const MainSuggestions = ({
  image,
  label,
  value,
  listitem,
}: {
  image: string;
  label: string;
  value: string;
  listitem?: SelectOptionValue[];
}) => {
  const { mainsuggest, setMainSuggest, setMainSuggestClick, mainsuggestclick } =
    useContext(FoodsContext);
  const _onClick = (e: string) => {
    setMainSuggestClick(true);
    setMainSuggest({
      value: e,
      listitem: listitem || [],
    });
  };
  return (
    <button
      className={clsx(
        'group flex w-48 flex-col items-center justify-center rounded-xl bg-white py-2 shadow drop-shadow transition-all duration-300 ',
        value === mainsuggest.value ? 'bg-gray-200 drop-shadow-md' : null,
        mainsuggestclick
          ? 'cursor-default'
          : 'cursor-pointer hover:bg-gray-100 hover:drop-shadow-md'
      )}
      onClick={() => _onClick(value)}
      disabled={mainsuggestclick}
    >
      <img
        className={clsx(
          'mx-auto drop-shadow-md transition-all',
          mainsuggestclick ? '' : 'group-hover:scale-110'
        )}
        src={image}
        alt=""
      />
      <h2 className="pt-2 text-xl font-medium text-gray-900 drop-shadow-md">
        {label}
      </h2>
    </button>
  );
};
