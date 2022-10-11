import classNames from 'classnames';
import { useState } from 'react';

import { Button } from '@/components/button';
import {
  DROP_DOWN_OPTIONS,
  FORMULA_OPTIONS,
  GENDER_OPTIONS,
} from '@/components/constants/select-options';
import { DropDownSelect, Input, SimpleSelectInput } from '@/components/input';

const Index = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('');
  const [formula, setFormula] = useState('mifflin st jeor');
  const [fatpercent, setFatPercent] = useState('');
  const [showerrormessage, setShowErrorMessage] = useState(false);
  const _onCalculate = () => {
    if (
      [gender, age, height, weight, activity, fatpercent].find(
        (e) => e === ''
      ) === ''
    )
      setShowErrorMessage(true);
  };
  return (
    <div className="mx-auto my-0 h-screen max-w-5xl py-11">
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
                  currentValue={gender}
                  setCurrentValue={setGender}
                  options={GENDER_OPTIONS}
                  column={false}
                />
                {showerrormessage && gender === '' && (
                  <span className="absolute -bottom-5 text-xs font-medium text-red-500 drop-shadow-md">
                    Please select your gender.
                  </span>
                )}
              </div>
              <div className="relative my-5">
                <Input
                  label="Age"
                  type="number"
                  unit=""
                  value={age}
                  onChange={setAge}
                  maxvalue={2}
                  placeholder="Ex: 22"
                  notify="Please enter the correct age."
                />
                {showerrormessage && age === '' && (
                  <span className="absolute bottom-3 text-xs font-medium text-red-500 drop-shadow-md">
                    Please enter your age.
                  </span>
                )}
              </div>
              <div className="relative my-5">
                <Input
                  label="Height"
                  type="number"
                  unit="cm"
                  value={height}
                  onChange={setHeight}
                  maxvalue={3}
                  placeholder="Ex: 180"
                  notify="Please enter the correct height."
                />
                {showerrormessage && height === '' && (
                  <span className="absolute bottom-3 text-xs font-medium text-red-500 drop-shadow-md">
                    Please enter your height.
                  </span>
                )}
              </div>
              <div className="relative my-5">
                <Input
                  label="Weight"
                  type="number"
                  unit="kg"
                  value={weight}
                  onChange={setWeight}
                  maxvalue={3}
                  placeholder="Ex: 65"
                  notify="Please enter the correct weight."
                />
                {showerrormessage && weight === '' && (
                  <span className="absolute bottom-3 text-xs font-medium text-red-500 drop-shadow-md">
                    Please enter your weight.
                  </span>
                )}
              </div>
            </div>
            <div className="ml-20 flex w-full justify-between">
              <div className="h-full w-full">
                <div className="h-[416px]">
                  <div className="relative my-5">
                    <DropDownSelect
                      label="Activity"
                      options={DROP_DOWN_OPTIONS}
                      setCurrentValue={setActivity}
                    />
                    {showerrormessage && activity === '' && (
                      <span className="absolute -bottom-5 text-xs font-medium text-red-500 drop-shadow-md">
                        Please choose your activity.
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <SimpleSelectInput
                      label="BMR estimation formula"
                      currentValue={formula}
                      setCurrentValue={setFormula}
                      options={FORMULA_OPTIONS}
                      column={true}
                    />
                    <div
                      className={classNames(
                        'absolute top-[50px] transition-all right-[6px] inline-block h-5 w-5 cursor-pointer rounded-full border border-gray-500 text-center text-gray-500 hover:border-gray-800 hover:text-gray-800 select-none',
                        formula === 'revised harris benedict' && 'top-[120px]',
                        formula === 'katch mcardle' && 'top-[188px]'
                      )}
                    >
                      <span className="block leading-4">?</span>
                    </div>
                  </div>
                  <div
                    className={classNames(
                      'transition-all opacity-0 relative',
                      formula === 'katch mcardle' && 'opacity-100'
                    )}
                  >
                    <Input
                      label=""
                      type="number"
                      unit="%"
                      value={fatpercent}
                      onChange={setFatPercent}
                      maxvalue={3}
                      placeholder="Ex: 20"
                      notify="Please enter your correct fat percentage."
                    />
                    {showerrormessage &&
                      formula === 'katch mcardle' &&
                      fatpercent === '' && (
                        <span className="absolute bottom-3 text-xs font-medium text-red-500 drop-shadow-md">
                          Please enter your fat percentage.
                        </span>
                      )}
                  </div>
                </div>
                <div
                  className={classNames(
                    'flex flex-col items-end justify-end transition-all mr-[35px]',
                    fatpercent.length > 3 && 'mt-8'
                  )}
                >
                  <Button label="Calculate" onClick={_onCalculate} />
                </div>
              </div>
              <div className="block h-full w-[1.5px] pb-2">
                <span className="block h-full w-full bg-gray-700" />
              </div>
            </div>
          </div>
          <div className="w-3/4 select-none py-[35px]">
            <div className="px-7">
              <h5 className="text-[17px] font-medium">
                Fill in your information and press the Calculate button. Your
                results will be displayed here!
              </h5>
              <div className="mt-4">
                <p className="leading-8">
                  A calorie calculator can be used to estimate the number of
                  calories a person needs to consume each day and output
                  calories for{' '}
                  <span className="relative font-medium before:absolute before:left-[-3px] before:bottom-0 before:-z-10 before:h-[70%] before:w-[calc(100%+4px)] before:rotate-2 before:bg-amber-300/80 before:content-['']">
                    weight loss
                  </span>
                  ,{' '}
                  <span className="relative inline-block font-medium before:absolute before:left-[-3px] before:bottom-1 before:-z-10 before:h-2/4 before:w-[calc(100%+4px)] before:rotate-2 before:bg-amber-300/80 before:content-['']">
                    weight gain
                  </span>
                  , and{' '}
                  <span className="relative font-medium before:absolute before:left-[-3px] before:bottom-0 before:-z-10 before:h-[70%] before:w-[calc(100%+4px)] before:rotate-2 before:bg-amber-300/80 before:content-['']">
                    weight maintenance
                  </span>
                  . For weight loss, include:{' '}
                  <span className="relative inline-block font-medium before:absolute before:left-[-3px] before:bottom-1 before:-z-10 before:h-2/4 before:w-[calc(100%+4px)] before:rotate-2 before:bg-amber-300/80 before:content-['']">
                    light weight loss
                  </span>
                  ,{' '}
                  <span className="relative font-medium before:absolute before:left-[-3px] before:bottom-0 before:-z-10 before:h-[70%] before:w-[calc(100%+4px)] before:rotate-2 before:bg-amber-300/80 before:content-['']">
                    weight loss
                  </span>
                  , and{' '}
                  <span className="relative inline-block font-medium before:absolute before:left-[-3px] before:bottom-1 before:-z-10 before:h-2/4 before:w-[calc(100%+4px)] before:rotate-2 before:bg-amber-300/80 before:content-['']">
                    extremely effective weight loss
                  </span>
                  . Weight gain includes{' '}
                  <span className="relative font-medium before:absolute before:left-[-3px] before:bottom-0 before:-z-10 before:h-[70%] before:w-[calc(100%+4px)] before:rotate-2 before:bg-amber-300/80 before:content-['']">
                    slight weight gain
                  </span>
                  ,{' '}
                  <span className="relative font-medium before:absolute before:left-[-3px] before:bottom-0 before:-z-10 before:h-[70%] before:w-[calc(100%+4px)] before:rotate-2 before:bg-amber-300/80 before:content-['']">
                    weight gain
                  </span>
                  , and{' '}
                  <span className="relative inline-block font-medium before:absolute before:left-[-3px] before:bottom-1 before:-z-10 before:h-2/4 before:w-[calc(100%+4px)] before:rotate-2 before:bg-amber-300/80 before:content-['']">
                    rapid weight gain
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
