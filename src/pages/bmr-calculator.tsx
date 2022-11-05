import { useContext } from 'react';

import { FORMULA_EQUATIONS_OPTIONS } from '@/components/constants/select-options';
import { InfoInput, OptionsSelect } from '@/components/pages/bmr-calculator';
import { ResultBMR } from '@/components/pages/bmr-calculator/result-bmr';
import { InfoBoard, SimpleEquations } from '@/components/pages/home';
import { WrapperCalculator } from '@/components/pages/wrapper-calculator';
import { BMRContext, BMRProvider } from '@/context/bmr-context';

const BMRCalculator = () => {
  const { bmrandtdee } = useContext(BMRContext);
  return (
    <div className="mx-auto max-w-5xl">
      <div className="my-0 h-screen py-11">
        <WrapperCalculator title="BMR Calculator">
          <div className="flex w-full">
            <InfoInput />
            <OptionsSelect />
          </div>
          {bmrandtdee.bmr !== 0 ? (
            <ResultBMR bmr={bmrandtdee.bmr} tdee={bmrandtdee.tdee} />
          ) : (
            <div className="w-3/4">
              <InfoBoard>
                The Basal Metabolic Rate (BMR) calculator estimates your basal
                metabolic rate, which is an estimate of how many calories you
                burn while you&apos;re resting. The Basal Metabolic Rate (BMR)
                calculator will print out for you 2 values of BMR and TDEE.
                <br></br>
                <span className="font-medium text-gray-900">What is TDEE?</span>
                <br></br> TDEE stands for Total Daily Energy Expenditure.
                It&apos;s the total energy a person uses in a day and is
                calculated by multiplying your BMR by your chosen activity.
              </InfoBoard>
            </div>
          )}
        </WrapperCalculator>
      </div>
      <div className="h-screen">
        <h2 className="text-lg font-medium">
          The three formulas&apos; equation:
        </h2>
        <SimpleEquations option={FORMULA_EQUATIONS_OPTIONS} />
      </div>
    </div>
  );
};

const BMRWappers = () => {
  return (
    <BMRProvider>
      <BMRCalculator />
    </BMRProvider>
  );
};

export default BMRWappers;
