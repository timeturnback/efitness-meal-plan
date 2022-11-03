import { useContext } from 'react';

import { Button } from '@/components/button';
import { InfoBoard } from '@/components/pages/home';
import {
  InfoInputAndSelect,
  ResultMacro,
  SelectInputRange,
} from '@/components/pages/macro-calculator';
import { MacroContext, MacroProvider } from '@/context/macro-context';

export const MacroCalculator = () => {
  const { onSubmit, macronutrient, tdee, macro } = useContext(MacroContext);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="my-0 h-screen py-11">
        <div className="h-full w-full rounded-xl border-2 border-gray-800/90 px-6">
          <div className="h-20">
            <h2 className="py-2 text-4xl font-medium text-gray-800 ">
              Macro Calculate
            </h2>
            <div className="block h-[1.6px] w-full">
              <span className="block h-full w-full bg-gray-700" />
            </div>
          </div>
          <div className="flex h-[calc(100%-80px)]">
            <div className="flex w-3/5 flex-col justify-evenly">
              <InfoInputAndSelect />
              <SelectInputRange />
              <div className="flex justify-end">
                <Button label="Calculate" onClick={onSubmit} />
              </div>
            </div>
            <div className="w-2/5">
              {(+tdee.value > 500 && macronutrient.value === 'custom') ||
              (macronutrient.value !== 'custom' &&
                +tdee.value > 500 &&
                macro.carb !== 0) ? (
                <ResultMacro
                  tdee={+tdee.value}
                  carbs={macro.carb}
                  fat={macro.fat}
                  protein={macro.protein}
                  activity={macronutrient.value}
                />
              ) : (
                <InfoBoard>
                  The Macro Calculator helps you figure out how many
                  macronutrients are available that your body needs each day
                  based on your daily activity level. The Macro Calculator will
                  give you exactly how many carbs, fat, and protein you should
                  eat each day to reach your goal.
                </InfoBoard>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MacroWrapper = () => {
  return (
    <MacroProvider>
      <MacroCalculator />
    </MacroProvider>
  );
};

export default MacroWrapper;
