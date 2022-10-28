import type { Argument } from 'classnames';
import classNames from 'classnames';
import styles from 'src/styles/input_range.module.scss';

export const SimpleInputRange = ({
  value,
  onChange,
  styleColor,
  styleSlider,
}: {
  value: string;
  onChange: (value: string) => void;
  styleColor: Argument;
  styleSlider: Argument;
}) => {
  return (
    <div className="inline-block px-4 py-6">
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
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
