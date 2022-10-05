import classNames from 'classnames';

import type { SelectOptionInput } from '../constants/select-options';

export function SimpleInput({
  label,
  currentValue,
  setCurrentValue,
  options,
}: {
  label: string;
  currentValue: string;
  setCurrentValue: (value: string) => void;
  options: SelectOptionInput[];
}) {
  return (
    <div className="relative inline-block p-2">
      <span className="mb-2 font-medium text-gray-800">{label}</span>
      {options.map((item, index) => (
        <SelectOptions
          key={index}
          type={item.type}
          unit={item.unit}
          value={currentValue}
          placeholder={item.placeholder}
          maxvalue={item.maxvalue}
          notify={item.notification}
          onChange={setCurrentValue}
        />
      ))}
    </div>
  );
}

const SelectOptions = ({
  type,
  unit,
  value,
  maxvalue,
  placeholder,
  notify,
  onChange,
}: {
  type: string;
  unit: string;
  value: string;
  maxvalue: number;
  placeholder: string;
  notify: string;
  onChange: (value: string) => void;
}) => {
  return (
    <>
      <div
        className={classNames(
          'relative my-3 block h-11 w-48 items-center rounded-md border-2 border-gray-700 bg-white drop-shadow-md focus-within:border-blue-700/80',
          unit !== '' && 'flex'
        )}
      >
        <input
          type={type}
          value={value}
          maxLength={maxvalue}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={classNames(
            'h-full w-full px-3 outline-none rounded-md',
            unit !== '' && 'w-4/5'
          )}
        />
        {unit !== '' && (
          <span className="before:content[''] track absolute right-1 h-3/5 select-none pr-1 leading-5 text-gray-600/70 outline-none before:absolute before:right-8 before:h-full before:border before:border-white before:bg-gray-800">
            {unit}
          </span>
        )}
      </div>
      {value.length > maxvalue && (
        <div className="before:content[''] absolute w-11/12 select-none rounded-2xl bg-red-500/90 px-1 text-xs before:absolute before:bottom-[18px] before:left-2 before:h-0 before:w-0 before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-red-500/90">
          <p>{notify}</p>
        </div>
      )}
    </>
  );
};

export const Input = ({
  currentValue,
  setCurrentValue,
  options,
}: {
  currentValue: string;
  setCurrentValue: (value: string) => void;
  options: SelectOptionInput[];
}) => {
  return (
    <SimpleInput
      label="Input"
      currentValue={currentValue}
      setCurrentValue={setCurrentValue}
      options={options}
    />
  );
};
