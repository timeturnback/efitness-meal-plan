import { useEffect, useState } from 'react';

import { Button } from '@/components/button';
import {
  FORMULA_FAT_PERCENTAGE_OPTIONS,
  GENDER_OPTIONS,
} from '@/components/constants/select-options';
import { SimpleInput, SimpleSelectInput } from '@/components/input';
import {
  InfoBoard,
  ResultBodyFat,
  SimpleEquations,
} from '@/components/pages/home';

const BodyFatCalculator = () => {
  const [gender, setGender] = useState({ value: '', error: '' });
  const [height, setHeight] = useState({ value: '', error: '' });
  const [neck, setNeck] = useState({ value: '', error: '' });
  const [waist, setWaist] = useState({ value: '', error: '' });
  const [hip, setHip] = useState({ value: '', error: '' });
  const [fatpercent, setFatPercent] = useState({ value: '', gender: '' });

  useEffect(() => {
    if (
      (height.value && +height.value >= 300) ||
      (height.value && +height.value <= 30)
    ) {
      setHeight({
        ...height,
        error: 'Please enter the corrent height.',
      });
    }
    if (
      (neck.value && +neck.value >= 100) ||
      (neck.value && +neck.value <= 0)
    ) {
      setNeck({
        ...neck,
        error: 'Please enter your correct neck measurement.',
      });
    }
    if (
      (waist.value && +waist.value >= 500) ||
      (waist.value && +waist.value <= 0)
    ) {
      setWaist({
        ...waist,
        error: 'Please enter your correct waist measurement.',
      });
    }
    if ((hip.value && +hip.value >= 800) || (hip.value && +hip.value <= 0)) {
      setHip({
        ...hip,
        error: 'Please enter your exact hip measurements.',
      });
    }
  }, [height.value, neck.value, waist.value, hip.value]);

  const _onSubmit = () => {
    if (_validateForm()) {
      if (gender.value === 'male') {
        const calculation_1 =
          1.0324 -
          0.19077 * Math.log10(+waist.value - +neck.value) +
          0.15456 * Math.log10(+height.value);
        const calculation_2 = 495 / calculation_1;
        const result = calculation_2 - 450;
        setFatPercent({ value: result.toFixed(1), gender: 'male' });
      } else {
        const calculation_1 =
          1.29579 -
          0.35004 * Math.log10(+waist.value + +hip.value - +neck.value) +
          0.221 * Math.log10(+height.value);
        const calculation_2 = 495 / calculation_1;
        const result = calculation_2 - 450;
        setFatPercent({ value: result.toFixed(1), gender: 'female' });
      }
    }
  };

  const _validateForm = () => {
    let isError = false;
    if (!gender.value) {
      isError = true;
      setGender({ value: '', error: 'Please select your gender.' });
    }
    if (!height.value) {
      isError = true;
      setHeight({ value: '', error: 'Please enter the corrent height.' });
    }
    if (!neck.value) {
      isError = true;
      setNeck({ value: '', error: 'Please enter your neck measurement.' });
    }
    if (!waist.value) {
      isError = true;
      setWaist({ value: '', error: 'Please enter your waist measurement.' });
    }
    if (!hip.value && gender.value === 'female') {
      isError = true;
      setHip({ value: '', error: 'Please enter your hip measurement.' });
    }
    return !isError;
  };
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
                <div className="flex h-3/5 w-full items-start justify-between">
                  <div>
                    <div className="my-5">
                      <SimpleSelectInput
                        label="Gender"
                        currentValue={gender.value}
                        setCurrentValue={(e) =>
                          setGender({ value: e, error: '' })
                        }
                        options={GENDER_OPTIONS}
                        error={gender.error}
                      />
                    </div>
                    <div className="my-5">
                      <SimpleInput
                        label="Height"
                        type="number"
                        value={height.value}
                        error={height.error}
                        maxvalue={3}
                        placeholder="Ex: 175"
                        unit="cm"
                        onChangeText={(e) => setHeight({ value: e, error: '' })}
                      />
                    </div>
                    {gender.value === 'female' && (
                      <div className="my-5">
                        <SimpleInput
                          label="Hip"
                          type="number"
                          value={hip.value}
                          error={hip.error}
                          maxvalue={3}
                          placeholder="Ex: 98"
                          unit="cm"
                          onChangeText={(e) => setHip({ value: e, error: '' })}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="my-5">
                      <SimpleInput
                        label="Neck"
                        type="number"
                        value={neck.value}
                        error={neck.error}
                        maxvalue={3}
                        placeholder="Ex: 56"
                        unit="cm"
                        onChangeText={(e) => setNeck({ value: e, error: '' })}
                      />
                    </div>
                    <div className="my-5">
                      <SimpleInput
                        label="Waist"
                        type="number"
                        value={waist.value}
                        error={waist.error}
                        maxvalue={3}
                        placeholder="Ex: 96"
                        unit="cm"
                        onChangeText={(e) => setWaist({ value: e, error: '' })}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex h-2/5 items-end justify-end">
                  <div className="pb-2">
                    <Button label="Calculate" onClick={_onSubmit} />
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

export default BodyFatCalculator;
