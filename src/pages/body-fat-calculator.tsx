import { useContext } from 'react';

import { Button } from '@/components/button';
import { FAT_PERCENTAGE_OPTIONS } from '@/components/constants/select-options';
import { SimpleEquations } from '@/components/equations';
import {
  InfoInput,
  ResultBodyFat,
} from '@/components/pages/body-fat-calculator';
import { InfoBoard } from '@/components/pages/home';
import { WrapperCalculator } from '@/components/pages/wrapper-calculator';
import { BodyFatContext, BodyFatProvider } from '@/context/body-fat-context';

const BodyFatCalculator = () => {
  const { onSubmit, fatpercent } = useContext(BodyFatContext);
  return (
    <div className="mx-auto max-w-5xl">
      <div className="h-screen py-11 pt-24">
        <WrapperCalculator title="Body Fat Calculator">
          <div className="w-full">
            <div className="flex h-full w-full flex-col">
              <InfoInput />
              <div className="flex h-1/3 items-end justify-end">
                <div className="w-full">
                  <Button label="Calculate" onClick={onSubmit} />
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
                you have and how many calories you have to burn in order to lose
                a certain amount. The Body Fat Calculator can help you keep
                track of your body fat percentage and provide you with the
                necessary information to make informed decisions.
              </InfoBoard>
            )}
          </div>
        </WrapperCalculator>
      </div>
      <div className="h-screen">
        <SimpleEquations
          title="Body Fat Percentage (BFP) Formula"
          option={FAT_PERCENTAGE_OPTIONS}
        />
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
