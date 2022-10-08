import 'react-loading-skeleton/dist/skeleton.css';

import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

export function Button({
  value,
  onClick,
}: {
  value: string;
  onClick: () => void;
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
    }, 2000);
    return () => clearTimeout(timer);
  });
  return (
    <>
      {loading ? (
        <button
          onClick={onClick}
          className="duration-400 block h-12 w-48 rounded-md bg-white px-16 py-3 tracking-wide shadow-inner drop-shadow-md transition-colors hover:bg-teal-50/40 hover:shadow-inner"
        >
          {value}
        </button>
      ) : (
        <button className="h-12 w-48">
          <Skeleton width="100%" height="100%" className="-top-1 rounded-md" />
        </button>
      )}
    </>
  );
}
