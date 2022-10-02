import classNames from 'classnames';

import type { SelectOptionObject } from '../constants/select-options';
import { GENDER_OPTIONS } from '../constants/select-options';

export function SimpleSelectInput({
  label,
  currentValue,
  setCurrentValue,
  options,
}: {
  label: string;
  currentValue: string;
  setCurrentValue: (value: string) => void;
  options: SelectOptionObject[];
}) {
  return (
    <div className="p-2">
      <span className="mb-2 font-medium text-gray-800">{label}</span>
      <div className="flex items-center gap-3">
        {options.map((item) => (
          <SelectOption
            key={item.value}
            data={item}
            currentValue={currentValue}
            onClick={setCurrentValue}
          />
        ))}
      </div>
    </div>
  );
}

const SelectOption = ({
  onClick,
  data,
  currentValue,
}: {
  onClick: (value: string) => void;
  data: SelectOptionObject;
  currentValue: string;
}) => {
  const { value, label } = data || {};
  const isSelected = value === currentValue;

  const _onClick = () => {
    onClick(value);
  };

  return (
    <button
      className="flex items-center rounded-md bg-white p-3 drop-shadow-md"
      onClick={_onClick}
    >
      <div className="relative flex items-center border-black pl-7 leading-4 before:absolute before:left-0 before:h-5 before:w-5 before:rounded-3xl before:border before:border-bl-ccc before:content-['']">
        <div
          className={classNames(
            'absolute w-3 h-3 transition-all scale-0 opacity-0 bg-gray-800 rounded-3xl left-1',
            isSelected && 'scale-100 opacity-100'
          )}
        />
      </div>
      {label}
    </button>
  );
};

export const GenderSelect = ({
  currentValue,
  setCurrentValue,
}: {
  currentValue: string;
  setCurrentValue: (value: string) => void;
}) => {
  return (
    <SimpleSelectInput
      options={GENDER_OPTIONS}
      currentValue={currentValue}
      setCurrentValue={setCurrentValue}
      label="Gender"
    />
  );
};
