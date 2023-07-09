import { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { IoClose } from 'react-icons/io5';

import type { SelectOptionApiFoods } from '@/constants/select-options';
import { FoodsContext } from '@/context/foods-context';

export const FoodDetails = ({
  datadoughnut,
  data,
}: {
  datadoughnut: {
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  };
  data: SelectOptionApiFoods;
}) => {
  const { setFoodDetails, itemfooddetails } = useContext(FoodsContext);

  return (
    <div className="fixed top-0 left-0 z-20 h-full w-full bg-black/20 pt-16">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-center">
        <div className="rounded-2xl bg-slate-100 px-6 py-4 pt-12 shadow-md drop-shadow-lg">
          <IoClose
            className="absolute top-0 right-0 mt-4 mr-4 cursor-pointer text-4xl text-gray-800 drop-shadow-md transition-all hover:text-gray-900"
            onClick={() => {
              document.body.style.overflow = 'auto';
              setFoodDetails(false);
            }}
          />
          <div className="flex">
            <div className="relative flex items-center justify-center rounded-full">
              <Doughnut
                className="drop-shadow-md"
                data={datadoughnut}
                height={288}
                width={288}
              />
              <span className="absolute flex flex-col text-center text-5xl font-bold leading-10 text-gray-900 drop-shadow-md">
                {Math.round(data.calories || 0)}
                <span className="text-center text-4xl font-medium leading-tight drop-shadow-md">
                  Cal
                </span>
              </span>
            </div>
            <div className="flex flex-col justify-center pl-5">
              <h2 className="text-4xl font-bold text-gray-900 drop-shadow-md">
                {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
              </h2>
              <span className="text-xl font-medium text-gray-900 drop-shadow-sm">
                Nutrition Facts
              </span>
              <NutritionFood data={data} />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <PercentDoughnut
              color="rgb(139,174,71)"
              label="Carbohydrates"
              percent={itemfooddetails.percentdoughnut.carb}
            />
            <PercentDoughnut
              color="rgb(247,183,74)"
              label="Fat"
              percent={itemfooddetails.percentdoughnut.fat}
            />
            <PercentDoughnut
              color="rgb(8,145,178)"
              label="Protein"
              percent={itemfooddetails.percentdoughnut.protein}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const NutritionFood = ({ data }: { data: SelectOptionApiFoods }) => {
  return (
    <div className="flex h-4/5 gap-6 py-3">
      <div className="flex h-full flex-col gap-3">
        <TextNutritionFood
          label="Serving Size"
          value={data.serving_size_g}
          unit="g"
        />
        <TextNutritionFood label="Calories" value={data.calories} />
        <TextNutritionFood
          label="Carbohydrates"
          value={data.carbohydrates_total_g}
          unit="g"
        />
        <div className="flex flex-col">
          <TextNutritionFood
            label="Total Fat"
            value={data.fat_total_g}
            unit="g"
          />
          <TextNutritionFood
            label="• Fat Saturated"
            value={data.fat_saturated_g}
            unit="g"
          />
        </div>
        <TextNutritionFood label="Protein" value={data.protein_g} unit="g" />
      </div>
      <div className="flex h-full flex-col gap-3">
        <TextNutritionFood label="Sodium" value={data.sodium_mg} unit="mg" />
        <TextNutritionFood
          label="Potassium"
          value={data.potassium_mg}
          unit="mg"
        />
        <TextNutritionFood
          label="Cholesterol"
          value={data.cholesterol_mg}
          unit="mg"
        />
        <TextNutritionFood label="Fiber" value={data.fiber_g} unit="g" />
        <TextNutritionFood label="Sugar" value={data.sugar_g} unit="g" />
      </div>
    </div>
  );
};

const PercentDoughnut = ({
  color,
  label,
  percent,
}: {
  color: string;
  label: string;
  percent: number;
}) => {
  return (
    <div className="flex items-center">
      <div
        style={{ backgroundColor: color }}
        className="h-8 w-8 rounded-full border border-gray-500 bg-black drop-shadow-md"
      ></div>
      <span className="pl-3">
        {label}: <span className="font-medium">{percent}%</span>
      </span>
    </div>
  );
};

const TextNutritionFood = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit?: string;
}) => {
  return (
    <span className="group font-medium text-gray-900 transition-all">
      {label}:{' '}
      <span className="font-normal group-hover:underline group-hover:underline-offset-4">
        {value || 0} {unit || null}
      </span>
    </span>
  );
};
