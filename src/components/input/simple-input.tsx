import classNames from 'classnames';
import type { FC, InputHTMLAttributes } from 'react';

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
  value: string;
  maxvalue: number;
  placeholder: string;
  error?: string;
  onChangeText?: (value: string) => void;
}

export const SimpleInput: FC<SimpleInputProps> = ({
  label,
  unit,
  value,
  error,
  onChange,
  onChangeText,
  ...rest
}) => {
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    if (onChangeText) {
      onChangeText(e.target.value);
    }
  };

  return (
    <div className="pb-8">
      <span className="font-medium text-gray-800">{label}</span>
      <div
        className={classNames(
          'relative mt-3 w-[220px] flex h-12 items-center rounded-md border drop-shadow-md bg-white focus-within:border-blue-700/80',
          error ? 'focus-within:border-red-500/90' : null
        )}
      >
        <input
          value={value}
          className={classNames(
            'h-full w-full px-3 outline-none rounded-md',
            unit ? 'w-4/5' : ''
          )}
          onChange={_onChange}
          {...rest}
        />
        {unit ? (
          <span className="absolute right-1 h-3/5 select-none pr-1 leading-7 text-gray-600/70 outline-none before:absolute before:right-8 before:h-full before:border before:border-white before:bg-gray-800 before:content-['']">
            {unit}
          </span>
        ) : null}
      </div>
      {error ? (
        <div className="absolute mt-3 w-full max-w-[192px] select-none rounded-xl bg-red-500/90 px-2 text-xs text-white before:absolute before:-top-2 before:left-4 before:h-0 before:w-0 before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-red-500/90 before:content-['']">
          <p>{error}</p>
        </div>
      ) : null}
    </div>
  );
};
