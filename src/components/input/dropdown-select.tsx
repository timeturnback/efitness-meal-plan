import classNames from 'classnames';
import { useState } from 'react';

import type { SelectOptionObject } from '../constants/select-options';

export function DropDownSelect({
  label,
  error,
  setCurrentValue,
  options,
}: {
  label: string;
  error?: string;
  setCurrentValue: (value: string) => void;
  options: SelectOptionObject[];
}) {
  const [rotate, setRotate] = useState(false);
  const [text, setText] = useState('');
  const _onClick = () => {
    setRotate(!rotate);
  };
  return (
    <div className="relative pb-8">
      <span className="font-medium text-gray-800">{label}</span>
      <div
        onClick={_onClick}
        className="relative mt-3 h-12 max-w-[220px] cursor-pointer rounded-md bg-white shadow-md"
      >
        <div className="absolute right-0 mr-5 flex h-full items-center">
          <div
            className={classNames(
              'w-2 h-2 mb-1 transition-all rotate-45 border-b-2 border-r-2 border-gray-900',
              rotate && '-rotate-[135deg] mb-0'
            )}
          />
        </div>
        {text && (
          <span className="absolute flex h-full select-none items-center pl-2 pr-9 pb-[3px] text-sm leading-4">
            {text}
          </span>
        )}
      </div>
      {error ? (
        <div className="absolute bottom-0 w-full max-w-[192px] select-none rounded-xl bg-red-500/90 px-2 text-xs text-white before:absolute before:-top-2 before:left-4 before:h-0 before:w-0 before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-red-500/90 before:content-['']">
          <p>{error}</p>
        </div>
      ) : null}
      {rotate && (
        <div className="absolute z-10 mt-2 max-w-[220px] select-none rounded-md border bg-white py-1 drop-shadow-md transition-all">
          {options.map((item) => (
            <SelectOption
              key={item.value}
              label={item.label}
              data={item}
              onClick={setCurrentValue}
              setCurrentText={setText}
              setCurrentRotate={setRotate}
              currentRotate={rotate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const SelectOption = ({
  label,
  data,
  currentRotate,
  onClick,
  setCurrentText,
  setCurrentRotate,
}: {
  label: string;
  data: SelectOptionObject;
  currentRotate: boolean;
  onClick: (value: string) => void;
  setCurrentText: (value: string) => void;
  setCurrentRotate: (value: boolean) => void;
}) => {
  const _onClick = () => {
    const { value } = data || {};
    onClick(value);
    setCurrentText(label);
    setCurrentRotate(!currentRotate);
  };
  return (
    <span
      onClick={_onClick}
      className="block w-full cursor-pointer px-2 py-[5px] text-sm leading-4 transition-all hover:bg-zinc-600/20"
    >
      {label}
    </span>
  );
};
