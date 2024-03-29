import classNames from 'classnames';
import clsx from 'clsx';
import type { FC, InputHTMLAttributes } from 'react';
import { useEffect, useRef, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { ImSearch } from 'react-icons/im';
import { IoClose } from 'react-icons/io5';

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  unit?: string;
  value: string;
  maxvalue?: number;
  search?: boolean;
  maxwidth?: boolean;
  seepassword?: boolean;
  placeholder?: string;
  error?: string;
  removetext?: boolean;
  onChangeText?: (value: string) => void;
  onSubmitSeach?: () => void;
  onConditionRemoveText?: () => void;
}

export const SimpleInput: FC<SimpleInputProps> = ({
  label,
  unit,
  value,
  error,
  search,
  maxwidth,
  seepassword,
  removetext,
  onChange,
  onChangeText,
  onSubmitSeach,
  onConditionRemoveText,
  ...rest
}) => {
  const [winput, setWInput] = useState('100%');
  const [seepassw, setSeePassW] = useState(false);
  const [inputtype, setInputType] = useState('text');
  const Ref = useRef<HTMLInputElement>(null);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    if (onChangeText) {
      onChangeText(e.target.value);
    }
  };

  const _closeText = () => {
    if (onConditionRemoveText) onConditionRemoveText();
    if (onChangeText) {
      onChangeText('');
      if (Ref.current) {
        Ref.current.focus();
      }
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

  useEffect(() => {
    if (seepassword) {
      if (seepassw) setInputType('text');
      else setInputType('password');
    }
  }, [seepassword, seepassw]);

  return (
    <div
      className={classNames(
        'relative z-10',
        maxwidth ? 'w-full' : null,
        error ? 'pb-8' : null
      )}
    >
      <span className="font-medium text-gray-800">{label}</span>
      <div
        className={classNames(
          'mt-3 flex h-12 items-center rounded-md border drop-shadow-md bg-white focus-within:border-blue-700/80',
          error ? 'focus-within:border-red-500/90 border-red-500/90' : null,
          maxwidth ? 'w-full' : 'w-[220px]'
        )}
      >
        {search && (
          <div
            className="absolute z-20 flex items-center h-full pl-3 cursor-pointer"
            onClick={onSubmitSeach}
          >
            <ImSearch className="text-2xl text-gray-800" />
          </div>
        )}
        <div className="relative flex items-center w-full h-full justify-start">
          <input
            ref={Ref}
            style={{ width: winput }}
            value={value}
            className={classNames(
              'h-full w-full px-3 outline-none rounded-md',
              search ? 'pl-11' : null,
              seepassword ? 'pr-11' : null
            )}
            onChange={_onChange}
            type={inputtype}
            {...rest}
          />
          {removetext ? (
            <div className="h-full flex items-center px-3">
              <IoClose
                className="text-2xl text-gray-900/90 drop-shadow-md cursor-pointer"
                onClick={() => _closeText()}
              />
            </div>
          ) : null}
          {seepassword ? (
            <>
              <AiFillEyeInvisible
                className={clsx(
                  'absolute text-xl text-gray-900 drop-shadow-md right-3.5 cursor-pointer',
                  seepassw ? 'hidden' : 'block'
                )}
                onClick={() => setSeePassW(!seepassw)}
              />
              <AiFillEye
                className={clsx(
                  'absolute text-xl text-gray-900 drop-shadow-md right-3.5 cursor-pointer',
                  seepassw ? 'block' : 'hidden'
                )}
                onClick={() => setSeePassW(!seepassw)}
              />
            </>
          ) : null}
        </div>
        {unit ? (
          <span className="absolute right-0 pr-3 leading-7 outline-none select-none h-3/5 text-gray-600/70">
            {unit}
          </span>
        ) : null}
      </div>
      {error ? (
        <div
          className={classNames(
            "absolute mt-3 select-none rounded-xl bg-red-500/90 px-2 text-xs text-white before:absolute before:-top-2 before:left-4 before:h-0 before:w-0 before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-red-500/90 before:content-[''] w-auto"
          )}
        >
          <p>{error}</p>
        </div>
      ) : null}
    </div>
  );
};
