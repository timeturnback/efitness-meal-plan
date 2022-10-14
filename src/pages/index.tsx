import classNames from 'classnames';
import type { SetStateAction } from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/button';
import {
  DROP_DOWN_OPTIONS,
  FORMULA_OPTIONS,
  GENDER_OPTIONS,
} from '@/components/constants/select-options';
import {
  DropDownSelect,
  SimpleInput,
  SimpleSelectInput,
} from '@/components/input';
import { InfoBoard, ThreeEquations } from '@/components/pages/home';

const Index = () => {
  const [gender, setGender] = useState({ value: '', error: '' });
  const [age, setAge] = useState({ value: '', error: '' });
  const [height, setHeight] = useState({ value: '', error: '' });
  const [weight, setWeight] = useState({ value: '', error: '' });
  const [activity, setActivity] = useState({ value: '', error: '' });
  const [formula, setFormula] = useState({
    value: 'mifflin st jeor',
    error: '',
  });
  const [fatpercent, setFatPercent] = useState({ value: '', error: '' });

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
    if ((age.value && +age.value < 15) || (age.value && +age.value > 80)) {
      setAge({
        ...age,
        error: 'Age is only from 15 years old to 80 years old.',
      });
    }
    if (
      (weight.value && +weight.value >= 500) ||
      (weight.value && +weight.value <= 0)
    ) {
      setWeight({
        ...weight,
        error: 'Please enter the corrent weight.',
      });
    }
    if (
      (formula.value === 'katch mcardle' &&
        fatpercent.value &&
        +fatpercent.value >= 100) ||
      (formula.value === 'katch mcardle' &&
        fatpercent.value &&
        +fatpercent.value <= 0)
    ) {
      setFatPercent({
        ...fatpercent,
        error: 'Please enter your fat percentage.',
      });
    }
  }, [height.value, age.value, weight.value, fatpercent.value, formula.value]);

  const _validateForm = () => {
    let isError = false;
    if (!gender.value) {
      isError = true;
      setGender({ value: '', error: 'Please select your gender.' });
    }
    if (!age.value) {
      isError = true;
      setAge({ value: '', error: 'Please enter the correct age.' });
    }
    if (!height.value) {
      isError = true;
      setHeight({ value: '', error: 'Please enter the corrent height.' });
    }
    if (!weight.value) {
      isError = true;
      setWeight({ value: '', error: 'Please enter the corrent weight.' });
    }
    if (!fatpercent.value) {
      isError = true;
      setFatPercent({ value: '', error: 'Please enter your fat percentage.' });
    }
    if (!activity.value) {
      isError = true;
      setActivity({ value: '', error: 'Please select an activity.' });
    }
    return !isError;
  };

  const _onSubmit = () => {
    if (_validateForm()) {
      //
      console.log('a');
    }
  };

  const _FormulaEquation = (value: SetStateAction<string>) => {
    if (value === 'katch mcardle') {
      window.scrollTo({
        top: 720,
        behavior: 'smooth',
      });
    } else if (value === 'revised harris benedict') {
      window.scrollTo({
        top: 620,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 420,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="my-0 h-screen py-11">
        <div className="grid h-full w-full rounded-xl border-2 border-gray-800/90 px-6">
          <h2 className="py-2 text-4xl font-medium text-gray-800 ">
            Calorie Calculate
          </h2>
          <div className="block h-[1.6px] w-full">
            <span className="block h-full w-full bg-gray-700" />
          </div>
          <div className="flex">
            <div className="flex w-full">
              <div>
                <div className="relative my-5">
                  <SimpleSelectInput
                    label="Gender"
                    currentValue={gender.value}
                    error={gender.error}
                    setCurrentValue={(e) => setGender({ value: e, error: '' })}
                    options={GENDER_OPTIONS}
                    column={false}
                  />
                </div>
                <div className="relative my-5">
                  <SimpleInput
                    label="Age"
                    type="number"
                    value={age.value}
                    error={age.error}
                    onChangeText={(e) => setAge({ value: e, error: '' })}
                    maxvalue={2}
                    placeholder="Ex: 22"
                  />
                </div>
                <div className="relative my-5">
                  <SimpleInput
                    label="Height"
                    type="number"
                    unit="cm"
                    value={height.value}
                    error={height.error}
                    onChangeText={(e) => setHeight({ value: e, error: '' })}
                    maxvalue={3}
                    placeholder="Ex: 180"
                  />
                </div>
                <div className="relative my-5">
                  <SimpleInput
                    label="Weight"
                    type="number"
                    unit="kg"
                    value={weight.value}
                    error={weight.error}
                    onChangeText={(e) => setWeight({ value: e, error: '' })}
                    maxvalue={3}
                    placeholder="Ex: 65"
                  />
                </div>
              </div>
              <div className="ml-20 flex w-full justify-between">
                <div className="h-full w-full">
                  <div className="h-[416px]">
                    <div className="relative my-5">
                      <DropDownSelect
                        label="Activity"
                        error={activity.error}
                        options={DROP_DOWN_OPTIONS}
                        setCurrentValue={(e) =>
                          setActivity({ value: e, error: '' })
                        }
                      />
                    </div>
                    <div className="relative">
                      <SimpleSelectInput
                        label="BMR estimation formula"
                        currentValue={formula.value}
                        setCurrentValue={(e) =>
                          setFormula({ value: e, error: '' })
                        }
                        options={FORMULA_OPTIONS}
                        column={true}
                      />
                      <div
                        className={classNames(
                          'absolute top-[50px] transition-all right-[6px] inline-block h-5 w-5 cursor-pointer rounded-full border border-gray-500 text-center text-gray-500 hover:border-gray-800 hover:text-gray-800 select-none',
                          formula.value === 'revised harris benedict' &&
                            'top-[120px]',
                          formula.value === 'katch mcardle' && 'top-[188px]'
                        )}
                        onClick={() => _FormulaEquation(formula.value)}
                      >
                        <span className="block leading-4">?</span>
                      </div>
                      <div
                        className={classNames(
                          formula.value === 'katch mcardle'
                            ? 'block transition-all absolute -bottom-14'
                            : 'hidden'
                        )}
                      >
                        <SimpleInput
                          label=""
                          type="number"
                          unit="%"
                          value={fatpercent.value}
                          error={fatpercent.error}
                          onChangeText={(e) =>
                            setFatPercent({ value: e, error: '' })
                          }
                          maxvalue={3}
                          placeholder="Ex: 20"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={classNames(
                      'mr-[35px] mt-7 flex flex-col items-end justify-end transition-all',
                      formula.value === 'katch mcardle' && fatpercent.error
                        ? 'mt-10'
                        : null
                    )}
                  >
                    <Button label="Calculate" onClick={_onSubmit} />
                  </div>
                </div>
                <div className="block h-full w-[1.5px] pb-2">
                  <span className="block h-full w-full bg-gray-700" />
                </div>
              </div>
            </div>
            <InfoBoard />
          </div>
        </div>
      </div>
      <div className="h-screen">
        <h2 className="text-lg font-medium">
          The three formulas&apos; equation:
        </h2>
        <ThreeEquations />
      </div>
    </div>
  );
};

export default Index;
