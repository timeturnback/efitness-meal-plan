import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import type {
  SelectOptionFatClassification,
  SelectOptionPercentBar,
} from '@/components/constants/select-options';
import {
  FAT_CLASSIFICATION_OPTIONS,
  MENS_PERCENT_BAR_OPTIONS,
  WOMENS_PERCENT_BAR_OPTIONS,
} from '@/components/constants/select-options';

export const ResultBodyFat = ({
  gender,
  value,
}: {
  gender: string;
  value: number;
}) => {
  return (
    <div className="h-full py-5">
      <h2 className="px-7 text-2xl font-medium text-gray-800">Your Result</h2>
      <div className="flex items-center justify-between py-3 pl-7">
        <h3 className="text-lg font-medium text-gray-800">
          Your body fat percentage is:
        </h3>
        <span className="text-4xl font-bold uppercase text-gray-900 drop-shadow-md">
          {value}%
        </span>
      </div>
      <div className="pl-7">
        {gender === 'male' ? (
          <PrecentBar
            value={value}
            gender={gender}
            option={MENS_PERCENT_BAR_OPTIONS}
          />
        ) : (
          <PrecentBar
            value={value}
            gender={gender}
            option={WOMENS_PERCENT_BAR_OPTIONS}
          />
        )}
      </div>
      <div className="pt-4 pl-7">
        <h2 className="pt-5 pb-2">Table of fat percentage classifications</h2>
        <ClassificationTable option={FAT_CLASSIFICATION_OPTIONS} />
      </div>
    </div>
  );
};

const PrecentBar = ({
  option,
  value,
  gender,
}: {
  option: SelectOptionPercentBar[];
  value: number;
  gender: string;
}) => {
  return (
    <div className="relative flex h-20 w-[340px] select-none justify-center">
      <div className="flex h-full w-full items-end justify-center">
        {option.map((item, index) => (
          <div
            key={index}
            className="relative flex h-full rounded-2xl pt-11 text-white drop-shadow-md"
          >
            <div
              className="relative h-full rounded-l-3xl bg-red-500"
              style={{ width: item.low }}
            >
              <ContentSpan>{item.value_low}</ContentSpan>
            </div>
            <div
              className="relative h-full bg-green-500"
              style={{ width: item.good }}
            >
              <ContentSpan>{item.value_good}</ContentSpan>
            </div>
            <div
              className="relative h-full bg-green-600"
              style={{ width: item.fair }}
            >
              <ContentSpan>{item.value_fair}</ContentSpan>
            </div>
            <div
              className="relative h-full bg-amber-400"
              style={{ width: item.poor }}
            >
              <ContentSpan>{item.value_poor}</ContentSpan>
            </div>
            <div
              className="relative h-full rounded-r-3xl bg-red-500"
              style={{ width: item.high }}
            >
              <ContentSpan>{item.value_high}+</ContentSpan>
            </div>
            <span className="absolute -right-6 text-2xl font-medium text-gray-800 drop-shadow-md">
              %
            </span>
          </div>
        ))}
      </div>
      <PercentArrows gender={gender} value={value} />
    </div>
  );
};

const ContentSpan = ({ children }: { children: ReactNode }) => {
  return (
    <span className="absolute z-10 flex h-full w-full items-center justify-center text-xs drop-shadow-md">
      {children}
    </span>
  );
};

const PercentArrows = ({
  gender,
  value,
}: {
  gender: string;
  value: number;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const percentElement = document.getElementById('percent');
      if (value <= 0) {
        percentElement!.style.left = `-30px`;
      } else {
        let valueLeft = value * 10 - 30;
        if (valueLeft <= 0) valueLeft = -30;
        percentElement!.style.left = `${value * 10 - 30}px`;
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);
  return (
    <div
      className="absolute top-2.5 -left-1.5 w-14 text-center drop-shadow-md transition-all duration-1000"
      // style={{ left: value * 10 - 30 }}
      id="percent"
    >
      {gender === 'male' ? (
        <span
          className={classNames(
            'relative block w-full rounded-xl after:absolute text-white after:left-2/4 after:-bottom-2 after:-ml-1.5 after:border-x-8 after:border-t-8 after:border-x-transparent',
            value <= 5 && 'bg-red-500 after:border-t-red-500',
            value > 5 && value <= 13 && 'bg-green-500 after:border-t-green-500',
            value > 13 &&
              value <= 17 &&
              'bg-green-600 after:border-t-green-600',
            value > 17 &&
              value <= 24 &&
              'bg-amber-400 after:border-t-amber-400',
            value > 24 && 'bg-red-500 after:border-t-red-500'
          )}
        >
          {value}%
        </span>
      ) : (
        <span
          className={classNames(
            'relative block w-full rounded-xl after:absolute text-white after:left-2/4 after:-bottom-2 after:-ml-1.5 after:border-x-8 after:border-t-8 after:border-x-transparent',
            value <= 13 && 'bg-red-500 after:border-t-red-500',
            value > 13 &&
              value <= 20 &&
              'bg-green-500 after:border-t-green-500',
            value > 20 &&
              value <= 24 &&
              'bg-green-600 after:border-t-green-600',
            value > 24 &&
              value <= 31 &&
              'bg-amber-400 after:border-t-amber-400',
            value > 31 && 'bg-red-500 after:border-t-red-500'
          )}
        >
          {value}%
        </span>
      )}
    </div>
  );
};

export const ClassificationTable = ({
  option,
}: {
  option: SelectOptionFatClassification[];
}) => {
  return (
    <div className="block">
      <ContentOfClassificationTable option={option} />
    </div>
  );
};

const ContentOfClassificationTable = ({
  option,
}: {
  option: SelectOptionFatClassification[];
}) => {
  return (
    <div className="rounded-xl border-gray-400 shadow-md drop-shadow-md">
      {option.map((item, index) => (
        <div
          key={item.label}
          className={classNames(
            'flex text-center py-1 justify-around drop-shadow-md',
            index === 0 ? 'rounded-t-xl bg-gray-300' : 'text-white',
            index === option.length - 1 && 'rounded-b-xl',
            item.label === 'Essential' && 'bg-red-500',
            item.label === 'Athletes' && 'bg-green-500',
            item.label === 'Fitness' && 'bg-green-600',
            item.label === 'Average' && 'bg-amber-500',
            item.label === 'Obese' && 'bg-red-500'
          )}
        >
          <span className="w-24">{item.label}</span>
          <span className="w-16">
            {item.female}
            {index !== 0 && '%'}
          </span>
          <span className="w-16">
            {item.male}
            {index !== 0 && '%'}
          </span>
        </div>
      ))}
    </div>
  );
};
