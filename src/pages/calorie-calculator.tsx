import { useContext } from 'react';

import {
  CALORIE_RECIPE_KM_OPTIONS,
  CALORIE_RECIPE_MSJ_OPTIONS,
  CALORIE_RECIPE_RHB_OPTIONS,
} from '@/components/constants/select-options';
import { SimpleEquations } from '@/components/equations';
import {
  InfoBoard,
  InfoInput,
  OptionsSelect,
  ResultCalories,
} from '@/components/pages/home';
import { Wrapper } from '@/components/pages/wrapper';
import { WrapperCalculator } from '@/components/pages/wrapper-calculator';
import { CalorieContext, CalorieProvider } from '@/context/calorie-context';

const CalorieCalculatorWrapper = () => {
  const { bmr } = useContext(CalorieContext);
  return (
    <Wrapper>
      <div className="my-0 h-screen py-11">
        <WrapperCalculator title="Calorie Calculator">
          <div className="flex w-full">
            <InfoInput />
            <OptionsSelect />
          </div>
          {bmr ? (
            <ResultCalories bmr={bmr} />
          ) : (
            <div className="w-3/4">
              <InfoBoard>
                A calorie calculator can be used to estimate the number of
                calories a person needs to consume each day and output calories
                for weight loss, weight gain, and maintain weight. For weight
                loss, include: light weight loss, weight loss, and extreme
                weight loss. Weight gain includes light weight gain , weight
                gain, and rapid weight gain.
              </InfoBoard>
            </div>
          )}
        </WrapperCalculator>
      </div>
      <div className="h-screen">
        <h2 className="pb-4 text-lg font-medium">
          The three formulas&apos; equation:
        </h2>
        <div className="rounded-xl border-2 border-gray-800/90 bg-zinc-100/40 px-6">
          <SimpleEquations
            title="Mifflin-St Jeor Formula"
            option={CALORIE_RECIPE_MSJ_OPTIONS}
          />
          <SimpleEquations
            title="Revised Harris-Benedict Formula"
            option={CALORIE_RECIPE_RHB_OPTIONS}
          />
          <SimpleEquations
            title="Katch-McArdle Formula"
            option={CALORIE_RECIPE_KM_OPTIONS}
          />
        </div>
      </div>
    </Wrapper>
  );
};

const CalorieCalculator = () => {
  return (
    <CalorieProvider>
      <CalorieCalculatorWrapper />
    </CalorieProvider>
  );
};

export default CalorieCalculator;
