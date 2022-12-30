import classNames from 'classnames';
import Link from 'next/link';
import { useContext } from 'react';

import { SimpleButton } from '@/components/button';
import {
  DROP_DOWN_OPTIONS,
  FORMULA_OPTIONS,
} from '@/components/constants/select-options';
import {
  DropDownSelect,
  SimpleInput,
  SimpleSelectInput,
} from '@/components/input';
import { BMRContext } from '@/context/bmr-context';

export const OptionsSelect = () => {
  const {
    activity,
    setActivity,
    formula,
    setFormula,
    fatpercent,
    setFatPercent,
    onFormulaEquation,
    onSubmit,
  } = useContext(BMRContext);
  return (
    <div className="ml-20 w-full justify-between">
      <div className="h-full w-full">
        <div className="h-[416px]">
          <div className="relative my-5">
            <DropDownSelect
              label="Activity"
              error={activity.error}
              options={DROP_DOWN_OPTIONS}
              setCurrentValue={(e) => setActivity({ value: e, error: '' })}
            />
          </div>
          <div className="relative">
            <SimpleSelectInput
              label="BMR estimation formula"
              currentValue={formula.value}
              setCurrentValue={(e) => setFormula({ value: e, error: '' })}
              options={FORMULA_OPTIONS}
              column={true}
            />
            <div
              className={classNames(
                'absolute top-[50px] transition-all right-[6px] inline-block h-5 w-5 cursor-pointer rounded-full border border-gray-500 text-center text-gray-500 hover:border-gray-800 hover:text-gray-800 select-none',
                formula.value === 'revised harris benedict' && 'top-[120px]',
                formula.value === 'katch mcardle' && 'top-[188px]'
              )}
              onClick={() => onFormulaEquation(formula.value)}
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
                onChangeText={(e) => setFatPercent({ value: e, error: '' })}
                maxvalue={3}
                placeholder="Ex: 20"
              />
              {formula.value === 'katch mcardle' && !fatpercent.error && (
                <div className="absolute top-3/4 w-full text-center leading-3">
                  <Link href={'body-fat-calculator'}>
                    <a className="text-xs font-medium text-black hover:border-b-gray-800">
                      I don&apos;t know my body fat percentage.
                    </a>
                  </Link>
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
          <SimpleButton label="Calculate" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};
