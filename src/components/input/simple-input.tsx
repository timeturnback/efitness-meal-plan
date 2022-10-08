import classNames from 'classnames';

export const Input = ({
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
          'relative mt-3 block max-w-[192px] h-11 w-48 items-center rounded-md border-2 border-gray-700 bg-white drop-shadow-md focus-within:border-blue-700/80',
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
          <span className="absolute right-1 h-3/5 select-none pr-1 leading-5 text-gray-600/70 outline-none before:absolute before:right-8 before:h-full before:border before:border-white before:bg-gray-800 before:content-['']">
            {unit}
          </span>
        )}
      </div>
      {value.length > maxvalue && (
        <div className="absolute mt-3 w-full max-w-[192px] select-none rounded-xl bg-red-500/90 px-2 text-xs before:absolute before:-top-2 before:left-4 before:h-0 before:w-0 before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-red-500/90 before:content-['']">
          <p>{notify}</p>
        </div>
      )}
    </>
  );
};
