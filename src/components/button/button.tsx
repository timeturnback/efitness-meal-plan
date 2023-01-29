import clsx from 'clsx';
import Link from 'next/link';

export function SimpleButton({
  label,
  fetching,
  disabled,
  onClick,
  to,
  color,
}: {
  label: string;
  fetching?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  to?: string;
  color?: boolean;
}) {
  return to ? (
    <Link href={to}>
      <a className="text-black">
        <Button
          disabled={disabled}
          fetching={fetching}
          onClick={onClick}
          label={label}
          buttoncolor={color}
        />
      </a>
    </Link>
  ) : (
    <Button
      disabled={disabled}
      fetching={fetching}
      onClick={onClick}
      label={label}
      buttoncolor={color}
    />
  );
}

const Button = ({
  disabled,
  fetching,
  onClick,
  label,
  buttoncolor,
}: {
  label: string;
  fetching?: boolean;
  disabled?: boolean;
  buttoncolor?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      disabled={disabled || fetching}
      className={clsx(
        'relative flex h-12 w-full cursor-pointer items-center justify-center rounded-md px-1 py-3 font-medium tracking-wide drop-shadow-md transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-gray-400',
        buttoncolor
          ? 'bg-cyan-800 text-white hover:bg-cyan-900'
          : 'bg-white text-gray-900 shadow-md hover:bg-slate-200'
      )}
      onClick={onClick}
    >
      {fetching ? (
        <span className="mr-1 inline-block h-full w-5 animate-spin rounded-full border-[3px] border-gray-700 border-l-gray-400" />
      ) : null}
      {label}
    </button>
  );
};
