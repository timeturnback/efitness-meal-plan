import type { ReactNode } from 'react';

export const InfoBoard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="py-4">
      <div className="pl-7">
        <h5 className="text-[17px] font-medium">
          Fill in your information and press the Calculate button. Your results
          will be displayed here!
        </h5>
        <div className="mt-4">
          <p className="text-justify leading-8">{children}</p>
        </div>
      </div>
    </div>
  );
};

export const HighlightSpan = ({ children }: { children: ReactNode }) => (
  <span className="font-medium text-amber-500">{children}</span>
);
