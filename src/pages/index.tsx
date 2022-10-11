import classNames from 'classnames';
import { useState } from 'react';

import { Button } from '@/components/button';
import { InfoBoard } from '@/components/pages/home';

const Index = () => {
  const [gender, setGender] = useState({ value: '', error: '' });
  const [age, setAge] = useState({ value: '', error: '' });
  // const [height, setHeight] = useState({ value: '', error: '' });
  // const [weight, setWeight] = useState({ value: '', error: '' });
  // const [activity, setActivity] = useState({ value: '', error: '' });
  // const [formula, setFormula] = useState({
  //   value: 'mifflin st jeor',
  //   error: '',
  // });
  // const [fatpercent, setFatPercent] = useState({ value: '', error: '' });
  // const [showerrormessage, setShowErrorMessage] = useState(false);

  const _validateForm = () => {
    let isError = false;
    if (!gender.value) {
      isError = true;
      setGender({ value: '', error: 'Please select your gender.' });
    }
    if (!age.value) {
      isError = true;
      setAge({ value: '', error: 'Please enter the correct age.' });
    } else if (+age.value < 0 || +age.value > 120) {
      isError = true;
      setAge({ value: '', error: 'Please enter the correct age.' });
    }
    return !isError;
  };

  const _onSubmit = () => {
    if (_validateForm()) {
      //
    }
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
            {/* <div>
              <div className="relative my-5">
                <SimpleSelectInput
                  label="Gender"
                  currentValue={gender.value}
                  error={gender.error}
                  setCurrentValue={(value) => setGender({ value, error: '' })}
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
                  onChangeText={(value) => setAge({ value, error: '' })}
                  maxvalue={2}
                  placeholder="Ex: 22"
                />
                {showerrormessage && age === '' && (
                  <span className="absolute bottom-3 text-xs font-medium text-red-500 drop-shadow-md">
                    Please enter your age.
                  </span>
                )}
              </div>
              <div className="relative my-5">
                <SimpleInput
                  label="Height"
                  type="number"
                  unit="cm"
                  value={height}
                  onChangeText={setHeight}
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
                <SimpleInput
                  label="Weight"
                  type="number"
                  unit="kg"
                  value={weight}
                  onChangeText={setWeight}
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
            </div> */}
            <div className="ml-20 flex w-full justify-between">
              <div className="h-full w-full">
                {/* <div className="h-[416px]">
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
                    <SimpleInput
                      label=""
                      type="number"
                      unit="%"
                      value={fatpercent}
                      onChangeText={setFatPercent}
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
                </div> */}
                <div
                  className={classNames(
                    'flex flex-col items-end justify-end transition-all mr-[35px]'
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
  );
};

export default Index;
