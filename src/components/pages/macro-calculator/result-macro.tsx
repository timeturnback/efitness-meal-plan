import { ArcElement, Chart } from 'chart.js';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { ImageMacro } from '@/components/Images/Macro';

Chart.register(ArcElement);

export const ResultMacro = ({
  carbs,
  fat,
  protein,
  tdee,
  activity,
}: {
  carbs: number;
  fat: number;
  protein: number;
  tdee: number;
  activity: string;
}) => {
  const [count, setCount] = useState(100);
  useEffect(() => {
    if (activity === 'custom') {
      if (carbs + protein + fat > 100) {
        setCount(0);
      } else {
        const result = carbs + protein + fat;
        setCount(100 - result);
      }
    } else {
      const result = carbs + protein + fat;
      setCount(100 - result);
    }
  }, [carbs, fat, protein]);
  const data = {
    labels: ['Carbs', 'Fat', 'Protein'],
    datasets: [
      {
        data: [carbs, fat, protein, count],
        backgroundColor: [
          'rgb(139,174,71)',
          'rgb(247,183,74)',
          'rgb(8,145,178)',
          'rgb(205,205,255)',
        ],
      },
    ],
  };
  return (
    <div className="h-full pt-3 pb-5">
      <h2 className="px-7 text-2xl font-medium text-gray-800">Your Result</h2>
      <div className="relative m-auto ml-20 flex h-64 w-64 items-center justify-center">
        <Doughnut className="drop-shadow-md" data={data} />
        <div className="absolute flex flex-col items-center text-lg leading-8 drop-shadow-md">
          Total
          <span className="text-3xl font-bold leading-7">{tdee}</span>
          <span className="text-sm leading-4">cal</span>
        </div>
      </div>
      <div className="pl-7">
        <span className="block py-4 font-medium">Your Daily Macros</span>
        <div className="flex justify-between">
          <InfoNutrients
            image={ImageMacro.Carb}
            value="Carbs"
            macro={Math.round((tdee * carbs) / 100 / 4)}
          />
          <InfoNutrients
            image={ImageMacro.Fat}
            value="Fat"
            macro={Math.round((tdee * fat) / 100 / 9)}
          />
          <InfoNutrients
            image={ImageMacro.Protein}
            value="Protein"
            macro={Math.round((tdee * protein) / 100 / 4)}
          />
        </div>
      </div>
    </div>
  );
};

const InfoNutrients = ({
  image,
  value,
  macro,
}: {
  image: StaticImageData;
  value: string;
  macro: number;
}) => {
  return (
    <div className="relative mt-4 h-24 w-20 rounded-md shadow-md">
      <div className="-mt-4 text-center">
        <Image
          className="absolute top-2"
          height={35}
          width={35}
          src={image}
          alt="Macro"
        />
      </div>
      <span className="flex flex-col items-center text-2xl font-bold drop-shadow-md">
        {macro}g<span className="text-sm font-normal">{value}</span>
      </span>
    </div>
  );
};
