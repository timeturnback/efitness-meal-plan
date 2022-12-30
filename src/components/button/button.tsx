import Link from 'next/link';

export function SimpleButton({
  label,
  fetching,
  disabled,
  onClick,
  to,
}: {
  label: string;
  fetching?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  to?: string;
}) {
  return to ? (
    <Link href={to}>
      <a className="text-black">
        <Button
          disabled={disabled}
          fetching={fetching}
          onClick={onClick}
          label={label}
        />
      </a>
    </Link>
  ) : (
    <Button
      disabled={disabled}
      fetching={fetching}
      onClick={onClick}
      label={label}
    />
  );
}

const Button = ({
  disabled,
  fetching,
  onClick,
  label,
}: {
  label: string;
  fetching?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      disabled={disabled || fetching}
      className="relative flex h-12 w-full cursor-pointer items-center justify-center rounded-md border-2 bg-white px-1 py-3 font-medium tracking-wide text-gray-900 shadow-md transition-colors duration-300 hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-gray-400"
      onClick={onClick}
    >
      {fetching ? (
        <span className="mr-1 inline-block h-full w-5 animate-spin rounded-full border-[3px] border-gray-700 border-l-gray-400" />
      ) : null}
      {label}
    </button>
  );
};
