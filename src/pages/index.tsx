import classNames from 'classnames';
import type { SetStateAction } from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/button';
import {
  DROP_DOWN_OPTIONS,
  FORMULA_EQUATIONS_OPTIONS,
  FORMULA_OPTIONS,
  GENDER_OPTIONS,
} from '@/components/constants/select-options';
import {
  DropDownSelect,
  SimpleInput,
  SimpleSelectInput,
} from '@/components/input';
import {
  HighlightSpan,
  InfoBoard,
  ResultCalories,
  SimpleEquations,
} from '@/components/pages/home';

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
  const [bmr, setBMR] = useState(0);

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
    if (!fatpercent.value && formula.value === 'katch mcardle') {
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
      if (formula.value === 'mifflin st jeor') {
        setBMR(Math.round(_calorieResultsMSJ()));
      } else if (formula.value === 'revised harris benedict') {
        setBMR(Math.round(_calorieResultsRHB()));
      } else {
        const result =
          370 + 21.6 * ((+weight.value * (100 - +fatpercent.value)) / 100);
        setBMR(Math.round(result));
      }
    }
  };

  const _calorieResultsMSJ = () => {
    if (gender.value === 'male') {
      const result =
        10 * +weight.value + 6.25 * +height.value - 5 * +age.value + 5;
      return _calculateBMRXActivity(result);
    }
    const result =
      10 * +weight.value + 6.25 * +height.value - 5 * +age.value - 161;
    return _calculateBMRXActivity(result);
  };

  const _calorieResultsRHB = () => {
    if (gender.value === 'male') {
      const result =
        13.397 * +weight.value +
        4.799 * +height.value -
        5.677 * +age.value +
        88.362;
      return _calculateBMRXActivity(result);
    }
    const result =
      9.247 * +weight.value +
      3.098 * +height.value -
      4.33 * +age.value +
      447.593;
    return _calculateBMRXActivity(result);
  };

  const _calculateBMRXActivity = (value: number) => {
    if (activity.value === 'little or no exercise') {
      return value * 1.2;
    }
    if (activity.value === 'light exercise: 1-3 times/week') {
      return value * 1.375;
    }
    if (activity.value === 'moderate exercise: 3-5 times/week') {
      return value * 1.55;
    }
    if (activity.value === 'exercise a lot: 6-7 times/week') {
      return value * 1.725;
    }
    return value * 1.79;
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
                <div className="my-5">
                  <SimpleSelectInput
                    label="Gender"
                    currentValue={gender.value}
                    error={gender.error}
                    setCurrentValue={(e) => setGender({ value: e, error: '' })}
                    options={GENDER_OPTIONS}
                  />
                </div>
                <div className="my-5">
                  <SimpleInput
                    label="Age"
                    type="number"
                    value={age.value}
                    error={age.error}
                    onChangeText={(e) => setAge({ value: e, error: '' })}
                    maxvalue={2}
                    placeholder="Ex: 20"
                  />
                </div>
                <div className="my-5">
                  <SimpleInput
                    label="Height"
                    type="number"
                    unit="cm"
                    value={height.value}
                    error={height.error}
                    onChangeText={(e) => setHeight({ value: e, error: '' })}
                    maxvalue={3}
                    placeholder="Ex: 175"
                  />
                </div>
                <div className="my-5">
                  <SimpleInput
                    label="Weight"
                    type="number"
                    unit="kg"
                    value={weight.value}
                    error={weight.error}
                    onChangeText={(e) => setWeight({ value: e, error: '' })}
                    maxvalue={3}
                    placeholder="Ex: 62"
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
                        {formula.value === 'katch mcardle' &&
                          !fatpercent.error && (
                            <div className="absolute top-3/4 w-full text-center leading-3">
                              <a
                                href="body-fat-calculator"
                                className="text-xs font-medium text-black hover:border-b-gray-800"
                              >
                                I don&apos;t know my body fat percentage.
                              </a>
                            </div>
                          )}
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
                <div className="block h-full w-[1.5px] pt-6 pb-7">
                  <span className="block h-full w-full bg-gray-700" />
                </div>
              </div>
            </div>
            {bmr ? (
              <ResultCalories bmr={bmr} />
            ) : (
              <div className="w-3/4">
                <InfoBoard>
                  A calorie calculator can be used to estimate the number of
                  calories a person needs to consume each day and output
                  calories for <HighlightSpan>weight loss</HighlightSpan>,{' '}
                  <HighlightSpan>weight gain</HighlightSpan>, and{' '}
                  <HighlightSpan>maintain weight</HighlightSpan>. For weight
                  loss, include:{' '}
                  <HighlightSpan>light weight loss</HighlightSpan>,{' '}
                  <HighlightSpan>weight loss</HighlightSpan>, and{' '}
                  <HighlightSpan>extreme weight loss</HighlightSpan>. Weight
                  gain includes <HighlightSpan>light weight gain</HighlightSpan>
                  , <HighlightSpan>weight gain</HighlightSpan>, and{' '}
                  <HighlightSpan>rapid weight gain</HighlightSpan>.
                </InfoBoard>
              </div>
            )}
          </div>
        </div>
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

export default Index;
