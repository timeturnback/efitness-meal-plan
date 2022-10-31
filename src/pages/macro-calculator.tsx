import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from 'src/styles/input_range.module.scss';

import { Button } from '@/components/button';
import { NUTRIENT_RATIO_OPTIONS } from '@/components/constants/select-options';
import { DropDownSelect, SimpleInput } from '@/components/input';
import { SimpleInputRange } from '@/components/input/simple-input-range';
import { InfoBoard, ResultMacro } from '@/components/pages/home';

export const MacroCalculator = () => {
  const [tdee, setTdee] = useState({ value: '', error: '' });
  const [macronutrient, setMacroNutrient] = useState({ value: '', error: '' });
  const [customprotein, setCustomProtein] = useState(0);
  const [customfat, setCustomFat] = useState(0);
  const [customcarb, setCustomCarb] = useState(0);
  const [macro, setMacro] = useState({ carb: 0, fat: 0, protein: 0 });
  useEffect(() => {
    if (
      (tdee.value && +tdee.value >= 4000) ||
      (tdee.value && +tdee.value <= 0)
    ) {
      setTdee({ ...tdee, error: 'Please enter your TDEE correctly.' });
    }
  }, [tdee.value]);

  useEffect(() => {
    if (macronutrient.value === 'custom' && +tdee.value > 500) {
      setMacro({ carb: customcarb, fat: customfat, protein: customprotein });
    }
  }, [macronutrient.value, tdee.value, customcarb, customfat, customprotein]);

  const _onSubmit = () => {
    if (_validateForm()) {
      if (macronutrient.value === 'hgiher carb') {
        setMacro({ carb: 60, fat: 15, protein: 25 });
        setCustomCarb(60);
        setCustomFat(15);
        setCustomProtein(25);
      } else if (macronutrient.value === 'moderate carb') {
        setMacro({ carb: 50, fat: 25, protein: 25 });
        setCustomCarb(50);
        setCustomFat(25);
        setCustomProtein(25);
      } else if (macronutrient.value === 'lower carb') {
        setMacro({ carb: 10, fat: 50, protein: 40 });
        setCustomCarb(10);
        setCustomFat(50);
        setCustomProtein(40);
      }
    }
  };

  const _validateForm = () => {
    let isError = false;
    if (!tdee.value) {
      isError = true;
      setTdee({ value: '', error: 'Please enter your TDEE.' });
    }
    if (!macronutrient.value) {
      isError = true;
      setMacroNutrient({ value: '', error: 'Please select a nutrient ratio.' });
    }
    return !isError;
  };

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
              <div className="flex flex-col rounded-2xl border-2 p-5 shadow-md">
                <div className="flex flex-col">
                  <span>
                    Carbs:{' '}
                    <span className="font-medium drop-shadow-md">
                      {customcarb}%
                    </span>
                  </span>
                  <SimpleInputRange
                    onChange={(e) => setCustomCarb(e)}
                    value={customcarb}
                    styleSlider={styles.slider_carb}
                    styleColor={styles.slider_color_carb}
                    disabled={
                      macronutrient.value === 'custom' && +tdee.value > 500
                    }
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
                    onChange={(e) => setCustomFat(e)}
                    value={customfat}
                    styleSlider={styles.slider_fat}
                    styleColor={styles.slider_color_fat}
                    disabled={
                      macronutrient.value === 'custom' && +tdee.value > 500
                    }
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
                    onChange={(e) => setCustomProtein(e)}
                    value={customprotein}
                    styleSlider={styles.slider_protein}
                    styleColor={styles.slider_color_protein}
                    disabled={
                      macronutrient.value === 'custom' && +tdee.value > 500
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button label="Calculate" onClick={_onSubmit} />
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

export default MacroCalculator;
