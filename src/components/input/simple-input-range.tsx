import type { Argument } from 'classnames';
import classNames from 'classnames';
import styles from 'src/styles/input_range.module.scss';

export const SimpleInputRange = ({
  value,
  onChange,
  styleColor,
  styleSlider,
  disabled,
}: {
  value: number;
  onChange: (value: number) => void;
  styleColor: Argument;
  styleSlider: Argument;
  disabled?: boolean;
}) => {
  return (
    <div className="relative inline-block px-4 py-6">
      <div className="relative flex h-3 items-center rounded-full">
        <span className="absolute h-3 w-full rounded-full border-2 border-gray-300 bg-gray-300/80 shadow-md">
          <span
            style={{ width: `${value}%` }}
            className={classNames('block h-full rounded-full', styleColor)}
          ></span>
        </span>
        <input
          type="range"
          max={100}
          min={0}
          className={classNames(
            'relative w-full bg-transparent appearance-none transition-all',
            styleSlider,
            styles.slider
          )}
          value={value}
          onChange={(e) => onChange(+e.target.value)}
        />
      </div>
      {!disabled && disabled !== undefined && (
        <div className="absolute top-0 left-0 h-full w-full bg-white opacity-40"></div>
      )}
    </div>
  );
};
