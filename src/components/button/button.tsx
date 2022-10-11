import { useEffect, useState } from 'react';

export function Button({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string[];
  onClick: () => void;
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (value.length !== 0 && value.find((e) => e !== '') !== undefined) {
      setLoading(true);
      if (value.every((e) => e !== '')) setLoading(false);
    }
  }, [value]);
  return (
    <>
      {!loading ? (
        <button
          onClick={onClick}
          className="duration-400 block h-12 w-48 rounded-md bg-white py-3 tracking-wide shadow-inner drop-shadow-md transition-colors hover:bg-teal-50/40 hover:shadow-inner"
        >
          {label}
        </button>
      ) : (
        <button className="duration-400 relative flex h-12 w-48 cursor-default justify-center rounded-md bg-white px-1 py-3 tracking-wide shadow-inner drop-shadow-md transition-colors">
          <span className="mr-1 inline-block h-full w-6 animate-spin rounded-full border-[3px] border-gray-700 border-l-white" />
          {label}
          <span className="absolute top-0 h-full w-full rounded-md bg-white opacity-40" />
        </button>
      )}
    </>
  );
}
