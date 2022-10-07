import classNames from 'classnames';
import { useState } from 'react';

import type { SelectOptionObject } from '../constants/select-options';

export function DropDownSelect({
  setCurrentValue,
  options,
}: {
  setCurrentValue: (value: string) => void;
  options: SelectOptionObject[];
}) {
  const [rotate, setRotate] = useState(false);
  const [text, setText] = useState('');
  const _onClick = () => {
    setRotate(!rotate);
  };
  return (
    <>
      <div
        onClick={_onClick}
        className="relative h-11 max-w-[224px] cursor-pointer rounded-md border border-gray-700 shadow-md"
      >
        <div className="absolute right-0 mr-5 flex h-full items-center">
          <div
            className={classNames(
              'w-2 h-2 mb-1 transition-all rotate-45 border-b-2 border-r-2 border-gray-900',
              rotate && '-rotate-[135deg] mb-0'
            )}
          />
        </div>
        <span className="absolute flex h-full select-none items-center pl-2 pr-9 pb-[3px] text-sm leading-4">
          {text}
        </span>
      </div>
      {rotate && (
        <div className="fixed mt-2 max-w-[224px] select-none rounded-md border border-gray-700 bg-white py-1 transition-all">
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
    </>
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
