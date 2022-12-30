import type { ReactNode } from 'react';

export const WrapperCalculator = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="h-screen pt-5 pb-20">
      <div className="h-full w-full rounded-xl border-2 border-gray-800/90 bg-zinc-100/40 px-6">
        <div className="h-16">
          <h2 className="py-2 text-4xl font-medium text-gray-900/90">
            {title}
          </h2>
          <div className="block h-[1.6px] w-full">
            <span className="block h-full w-full bg-gray-700" />
          </div>
        </div>
        <div className="flex h-[calc(100%-64px)]">{children}</div>
      </div>
    </div>
  );
};
