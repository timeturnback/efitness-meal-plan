import classNames from 'classnames';
import type { FC, InputHTMLAttributes } from 'react';
import { useEffect, useState } from 'react';
import { ImSearch } from 'react-icons/im';

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  unit?: string;
  value: string;
  maxvalue?: number;
  search?: boolean;
  maxwidth?: boolean;
  placeholder?: string;
  error?: string;
  onChangeText?: (value: string) => void;
  onSubmitSeach?: () => void;
}

export const SimpleInput: FC<SimpleInputProps> = ({
  label,
  unit,
  value,
  error,
  search,
  maxwidth,
  onChange,
  onChangeText,
  onSubmitSeach,
  ...rest
}) => {
  const [winput, setWInput] = useState('100%');
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    if (onChangeText) {
      onChangeText(e.target.value);
    }
  };
  useEffect(() => {
    if (unit && maxwidth) {
      if (unit.length === 1) {
        setWInput('98%');
      } else {
        setWInput(`${99 - unit.length}%`);
      }
    } else if (unit && !maxwidth) {
      setWInput(`${100 - unit.length * 7}%`);
    }
  }, [unit]);

  useEffect(() => {
    const inputs = document.querySelector('input');
    const _handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && onSubmitSeach) {
        e.preventDefault();
        onSubmitSeach();
      }
    };
    inputs?.addEventListener('keypress', _handler);
    // return inputs?.addEventListener('keypress', _handler);
  }, []);

  return (
    <div className="z-10 pb-8">
      <span className="font-medium text-gray-800">{label}</span>
      <div
        className={classNames(
          'relative mt-3 flex h-12 items-center rounded-md border drop-shadow-md bg-white focus-within:border-blue-700/80',
          error ? 'focus-within:border-red-500/90' : null,
          maxwidth ? 'w-full' : 'w-[220px]'
        )}
      >
        {search && (
          <div
            className="absolute flex h-full cursor-pointer items-center pl-3"
            onClick={onSubmitSeach}
          >
            <ImSearch className="text-2xl text-gray-800" />
          </div>
        )}
        <input
          style={{ width: winput }}
          value={value}
          className={classNames(
            'h-full w-full px-3 outline-none rounded-md',
            search ? 'pl-11' : null
          )}
          onChange={_onChange}
          {...rest}
        />
        {unit ? (
          <span className="absolute right-0 h-3/5 select-none pr-3 leading-7 text-gray-600/70 outline-none">
            {unit}
          </span>
        ) : null}
      </div>
      {error ? (
        <div className="absolute mt-3 max-w-[220px] select-none rounded-xl bg-red-500/90 px-2 text-xs text-white before:absolute before:-top-2 before:left-4 before:h-0 before:w-0 before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-red-500/90 before:content-['']">
          <p>{error}</p>
        </div>
      ) : null}
    </div>
  );
};
