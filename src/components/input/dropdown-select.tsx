import classNames from 'classnames';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { useClickOutSide } from '@/hooks/useClickOutSide';

import type { SelectOptionObject } from '../../constants/select-options';

export function DropDownSelect({
  label,
  error,
  setCurrentValue,
  options,
  defaultValue,
}: {
  label: string;
  error?: string;
  setCurrentValue: (value: string) => void;
  options: SelectOptionObject[];
  defaultValue?: string;
}) {
  const [rotate, setRotate] = useState(false);
  const [text, setText] = useState('');
  useEffect(() => {
    if (defaultValue) setText(defaultValue);
  }, [defaultValue]);

  const _onClick = () => {
    setRotate(!rotate);
  };

  const menuref = useClickOutSide(() => {
    setRotate(false);
  });
  return (
    <div
      className={clsx('relative w-auto', error ? 'pb-8' : null)}
      ref={menuref}
    >
      <span className="font-medium text-gray-800">{label}</span>
      <div
        onClick={_onClick}
        className={clsx(
          'relative h-12 bg-white rounded-md shadow-md cursor-pointer',
          label ? 'mt-3' : null
        )}
      >
        <div className="absolute right-0 flex items-center h-full pt-0.5 mr-5">
          <div
            className={classNames(
              'w-2 h-2 mb-1 transition-all rotate-45 border-b-2 border-r-2 border-gray-900',
              rotate && '-rotate-[135deg] mb-0'
            )}
          />
        </div>
        {text && (
          <span className="flex h-full select-none items-center pl-5 pr-9 pt-1 pb-[3px] text-sm leading-4">
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
        <div className="absolute w-full z-10 mt-2 max-h-[155px] overflow-auto select-none rounded-md border bg-white py-1 drop-shadow-md transition-all scrollbar">
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
      className="block w-full cursor-pointer px-2 py-[5px] text-sm text-center leading-4 transition-all hover:bg-zinc-600/20"
    >
      {label}
    </span>
  );
};
