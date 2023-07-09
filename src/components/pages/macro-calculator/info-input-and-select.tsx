import Link from 'next/link';
import { useContext } from 'react';

import { DropDownSelect, SimpleInput } from '@/components/input';
import { NUTRIENT_RATIO_OPTIONS } from '@/constants/select-options';
import { MacroContext } from '@/context/macro-context';

export const InfoInputAndSelect = () => {
  const { tdee, setTdee, setMacroNutrient, macronutrient } =
    useContext(MacroContext);
  return (
    <div className="mb-3 flex justify-between">
      <div className="inline-block">
        <SimpleInput
          label="TDEE"
          type="number"
          unit="cal"
          value={tdee.value}
          error={tdee.error}
          onChangeText={(e) => setTdee({ value: e, error: '' })}
          maxvalue={4}
        />
        <Link href="bmr-calculator">
          <div className="top-3/4 inline w-52 leading-3">
            <a className="cursor-pointer text-xs font-medium text-black drop-shadow-md hover:border-b-gray-800">
              I don&#39;t know my total daily energy expenditure (TDEE).
            </a>
          </div>
        </Link>
      </div>
      <div className="w-44">
        <DropDownSelect
          options={NUTRIENT_RATIO_OPTIONS}
          label="Macronutrient Ratios"
          error={macronutrient.error}
          setCurrentValue={(e) => setMacroNutrient({ value: e, error: '' })}
        />
      </div>
    </div>
  );
};
