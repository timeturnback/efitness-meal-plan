import { useContext } from 'react';

import { Button } from '@/components/button';
import { FORMULA_FAT_PERCENTAGE_OPTIONS } from '@/components/constants/select-options';
import {
  InfoInput,
  ResultBodyFat,
} from '@/components/pages/body-fat-calculator';
import { InfoBoard, SimpleEquations } from '@/components/pages/home';
import { BodyFatContext, BodyFatProvider } from '@/context/body-fat-context';

const BodyFatCalculator = () => {
  const { onSubmit, fatpercent } = useContext(BodyFatContext);
  return (
    <div className="mx-auto max-w-5xl">
      <div className="h-screen py-11 pt-24">
        <div className="h-full w-full rounded-xl border-2 border-gray-800/90 px-6">
          <div>
            <h2 className="py-2 text-4xl font-medium text-gray-800">
              Body Fat Calculator
            </h2>
            <div className="h-[1.5px] w-full">
              <span className="block h-full w-full bg-gray-700"></span>
            </div>
          </div>
          <div className="flex h-5/6">
            <div className="flex w-full">
              <div className="flex h-full w-full flex-col">
                <InfoInput />
                <div className="flex h-2/5 items-end justify-end">
                  <div className="w-full pb-2">
                    <Button label="Calculate" onClick={onSubmit} />
                  </div>
                </div>
              </div>
              <div className="ml-8 h-full w-[1.5px] pt-6">
                <span className="block h-full w-full bg-gray-700"></span>
              </div>
            </div>
            <div className="w-8/12">
              {fatpercent.value ? (
                <ResultBodyFat
                  gender={fatpercent.gender}
                  value={+fatpercent.value}
                />
              ) : (
                <InfoBoard>
                  The body fat percentage or BFP is a good measure of your
                  body&apos;s composition. It can help you determine how much
                  fat you have and how many calories you have to burn in order
                  to lose a certain amount. The Body Fat Calculator can help you
                  keep track of your body fat percentage and provide you with
                  the necessary information to make informed decisions.
                </InfoBoard>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen">
        <SimpleEquations option={FORMULA_FAT_PERCENTAGE_OPTIONS} />
      </div>
    </div>
  );
};

const BodyFatWrapper = () => {
  return (
    <BodyFatProvider>
      <BodyFatCalculator />
    </BodyFatProvider>
  );
};

export default BodyFatWrapper;
