import type { SelectOptionObject } from '../constants/select-options';
import { BUTTON_OPTIONS } from '../constants/select-options';

export function SimpleSelectButton({
  label,
  options,
  setCurrentValue,
}: {
  label: string;
  options: SelectOptionObject[];
  setCurrentValue: (value: string) => void;
}) {
  return (
    <div className="p-2">
      <span className="mb-2 font-medium text-gray-800">{label}</span>
      {options.map((item) => (
        <SelectOptions key={item.value} data={item} onClick={setCurrentValue} />
      ))}
    </div>
  );
}

const SelectOptions = ({
  data,
  onClick,
}: {
  data: SelectOptionObject;
  onClick: (value: string) => void;
}) => {
  const { label, value } = data || {};

  const _onClick = () => {
    onClick(value);
  };

  return (
    <button
      onClick={_onClick}
      className="duration-400 block rounded-md bg-white px-16 py-3 tracking-wide shadow-inner drop-shadow-md transition-colors hover:bg-teal-50/40 hover:shadow-inner"
    >
      {label}
    </button>
  );
};

export const Button = ({
  setCurrentValue,
}: {
  setCurrentValue: (value: string) => void;
}) => {
  return (
    <SimpleSelectButton
      options={BUTTON_OPTIONS}
      label="Calculate"
      setCurrentValue={setCurrentValue}
    />
  );
};
