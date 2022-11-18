export function SimpleButton({
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
      className="relative flex h-12 w-full cursor-pointer items-center justify-center rounded-md border-2 bg-white px-1 py-3 font-medium tracking-wide shadow-md transition-colors duration-300 hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-gray-400"
      onClick={onClick}
    >
      {fetching ? (
        <span className="mr-1 inline-block h-full w-5 animate-spin rounded-full border-[3px] border-gray-700 border-l-gray-400" />
      ) : null}
      {label}
    </button>
  );
}
