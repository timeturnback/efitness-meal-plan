import { useContext } from 'react';

import { SimpleButton } from '@/components/button';
import { FAT_PERCENTAGE_OPTIONS } from '@/components/constants/select-options';
import { SimpleEquations } from '@/components/equations';
import {
  InfoInput,
  ResultBodyFat,
} from '@/components/pages/body-fat-calculator';
import { InfoBoard } from '@/components/pages/calore-calculator';
import { Wrapper } from '@/components/pages/wrapper';
import { WrapperCalculator } from '@/components/pages/wrapper-calculator';
import { BodyFatContext, BodyFatProvider } from '@/context/body-fat-context';

const BodyFatCalculator = () => {
  const { onSubmit, fatpercent } = useContext(BodyFatContext);
  return (
    <Wrapper>
      <WrapperCalculator title="Body Fat Calculator">
        <div className="w-full">
          <div className="flex h-full w-full flex-col">
            <InfoInput />
            <div className="flex h-1/3 items-end justify-end">
              <div className="w-full">
                <SimpleButton label="Calculate" onClick={onSubmit} />
              </div>
            </div>
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
              body&apos;s composition. It can help you determine how much fat
              you have and how many calories you have to burn in order to lose a
              certain amount. The Body Fat Calculator can help you keep track of
              your body fat percentage and provide you with the necessary
              information to make informed decisions.
            </InfoBoard>
          )}
        </div>
      </WrapperCalculator>
      <div className="h-screen">
        <div className="rounded-xl border-2 border-gray-800/90 bg-zinc-100/40 px-6">
          <SimpleEquations
            title="Body Fat Percentage (BFP) Formula"
            option={FAT_PERCENTAGE_OPTIONS}
          />
        </div>
      </div>
    </Wrapper>
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
