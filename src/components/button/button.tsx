export function Button({
  label,
  fetching,
  disabled,
  onClick,
}: {
  label: string;
  fetching?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      disabled={disabled || fetching}
      className="relative flex h-12 w-48 cursor-default justify-center rounded-md bg-white px-1 py-3 tracking-wide shadow-inner drop-shadow-md transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-gray-300"
      onClick={onClick}
    >
      {fetching ? (
        <span className="mr-1 inline-block h-full w-6 animate-spin rounded-full border-[3px] border-gray-700 border-l-white" />
      ) : null}
      {label}
      <span className="absolute top-0 h-full w-full rounded-md bg-white opacity-40" />
    </button>
  );
}
