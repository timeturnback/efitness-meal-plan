import { useContext } from 'react';

import { SimpleButton } from '@/components/button';
import { InfoBoard } from '@/components/pages/calore-calculator';
import {
  InfoInputAndSelect,
  ResultMacro,
  SelectInputRange,
} from '@/components/pages/macro-calculator';
import { Wrapper } from '@/components/pages/wrapper';
import { WrapperCalculator } from '@/components/pages/wrapper-calculator';
import { MacroContext, MacroProvider } from '@/context/macro-context';

export const MacroCalculator = () => {
  const { onSubmit, macronutrient, tdee, macro } = useContext(MacroContext);

  return (
    <Wrapper>
      <WrapperCalculator title="Macro Calculator">
        <div className="flex w-3/5 flex-col justify-evenly">
          <InfoInputAndSelect />
          <SelectInputRange />
          <div className="flex justify-end">
            <SimpleButton label="Calculate" onClick={onSubmit} />
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
              The Macro Calculator helps you figure out how many macronutrients
              are available that your body needs each day based on your daily
              activity level. The Macro Calculator will give you exactly how
              many carbs, fat, and protein you should eat each day to reach your
              goal.
            </InfoBoard>
          )}
        </div>
      </WrapperCalculator>
    </Wrapper>
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
