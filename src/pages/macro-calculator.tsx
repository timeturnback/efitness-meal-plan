import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from 'src/styles/input_range.module.scss';

import { NUTRIENT_RATIO_OPTIONS } from '@/components/constants/select-options';
import { DropDownSelect, SimpleInput } from '@/components/input';
import { SimpleInputRange } from '@/components/input/simple-input-range';

export const MacroCalculator = () => {
  const [tdee, setTdee] = useState({ value: '', error: '' });
  const [macronutrient, setMacroNutrient] = useState({ value: '', error: '' });
  const [customprotein, setCustomProtein] = useState('0');
  const [customfat, setCustomFat] = useState('0');
  const [customcarb, setCustomCarb] = useState('0');
  useEffect(() => {
    if (
      (tdee.value && +tdee.value >= 500) ||
      (tdee.value && +tdee.value <= 0)
    ) {
      setTdee({ ...tdee, error: 'Please enter your TDEE correctly.' });
    }
  }, [tdee.value]);
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
            <div className="flex w-3/5 flex-col justify-around">
              <div className="flex justify-between">
                <div className="inline-block">
                  <SimpleInput
                    label="TDEE"
                    type="number"
                    value={tdee.value}
                    error={tdee.error}
                    onChangeText={(e) => setTdee({ value: e, error: '' })}
                    maxvalue={3}
                  />
                  <Link href="bmr-calculator">
                    <div className="top-3/4 inline w-52 leading-3">
                      <a className="text-xs font-medium text-black hover:border-b-gray-800">
                        I don&#39;t know my total daily energy expenditure
                        (TDEE).
                      </a>
                    </div>
                  </Link>
                </div>
                <div className="w-44">
                  <DropDownSelect
                    options={NUTRIENT_RATIO_OPTIONS}
                    label="Macronutrient Ratios"
                    error={macronutrient.error}
                    setCurrentValue={(e) =>
                      setMacroNutrient({ value: e, error: '' })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col rounded-2xl border-2 px-5 py-6 shadow-md">
                <div className="flex flex-col">
                  <span>
                    Carbs:{' '}
                    <span className="font-medium drop-shadow-md">
                      {customcarb}%
                    </span>
                  </span>
                  <SimpleInputRange
                    onChange={setCustomCarb}
                    value={customcarb}
                    styleSlider={styles.slider_carb}
                    styleColor={styles.slider_color_carb}
                  />
                </div>
                <div className="flex flex-col">
                  <span>
                    Fat:{' '}
                    <span className="font-medium drop-shadow-md">
                      {customfat}%
                    </span>
                  </span>
                  <SimpleInputRange
                    onChange={setCustomFat}
                    value={customfat}
                    styleSlider={styles.slider_fat}
                    styleColor={styles.slider_color_fat}
                  />
                </div>
                <div className="flex flex-col">
                  <span>
                    Protein:{' '}
                    <span className="font-medium drop-shadow-md">
                      {customprotein}%
                    </span>
                  </span>
                  <SimpleInputRange
                    onChange={setCustomProtein}
                    value={customprotein}
                    styleSlider={styles.slider_protein}
                    styleColor={styles.slider_color_protein}
                  />
                </div>
              </div>
            </div>
            <div className="w-2/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroCalculator;
