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
  const [, setDropDown] = useState('');
  const [formula, setFormula] = useState('');
  const Calculate = () => {
    console.log('a');
  };
  return (
    <div className="mx-auto my-0 h-screen max-w-5xl py-14">
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
              <div className="my-3">
                <SimpleSelectInput
                  label="Gender"
                  currentValue={gender}
                  setCurrentValue={setGender}
                  options={GENDER_OPTIONS}
                  column={false}
                />
              </div>
              <div className="my-3">
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
              </div>
              <div className="my-3">
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
              </div>
              <div className="my-3">
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
              </div>
            </div>
            <div className="ml-20 flex w-full justify-between">
              <div className="h-full">
                <div className="h-60">
                  <div className="my-3">
                    <DropDownSelect
                      label="Activity"
                      options={DROP_DOWN_OPTIONS}
                      setCurrentValue={setDropDown}
                    />
                  </div>
                  <SimpleSelectInput
                    label="BMR estimation formula"
                    currentValue={formula}
                    setCurrentValue={setFormula}
                    options={FORMULA_OPTIONS}
                    column={true}
                  />
                </div>
                <div className="flex h-[calc(100%-312px)] flex-col items-end justify-end">
                  <Button value="Calculate" onClick={Calculate} />
                </div>
              </div>
              <div className="block h-full w-[1.5px] pb-4">
                <span className="block h-full w-full bg-gray-700" />
              </div>
            </div>
          </div>
          <div className="w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
