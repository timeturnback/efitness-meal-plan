import type { ReactNode } from 'react';

export const InfoBoard = () => {
  return (
    <div className="w-3/4 select-none py-[35px]">
      <div className="px-7">
        <h5 className="text-[17px] font-medium">
          Fill in your information and press the Calculate button. Your results
          will be displayed here!
        </h5>
        <div className="mt-4">
          <p className="leading-8">
            A calorie calculator can be used to estimate the number of calories
            a person needs to consume each day and output calories for{' '}
            <HighlightSpan>weight loss</HighlightSpan>,{' '}
            <span className="relative inline-block font-medium before:absolute before:left-[-3px] before:bottom-1 before:-z-10 before:h-2/4 before:w-[calc(100%+4px)] before:rotate-2 before:bg-amber-300/80 before:content-['']">
              weight gain
            </span>
            , and <HighlightSpan>weight maintenance</HighlightSpan>. For weight
            loss, include:{' '}
            <span className="relative inline-block font-medium before:absolute before:left-[-3px] before:bottom-1 before:-z-10 before:h-2/4 before:w-[calc(100%+4px)] before:rotate-2 before:bg-amber-300/80 before:content-['']">
              light weight loss
            </span>
            , <HighlightSpan>weight loss</HighlightSpan>, and{' '}
            <span className="relative inline-block font-medium before:absolute before:left-[-3px] before:bottom-1 before:-z-10 before:h-2/4 before:w-[calc(100%+4px)] before:rotate-2 before:bg-amber-300/80 before:content-['']">
              extremely effective weight loss
            </span>
            . Weight gain includes{' '}
            <HighlightSpan>slight weight gain</HighlightSpan>,{' '}
            <HighlightSpan>weight gain</HighlightSpan>, and{' '}
            <span className="relative inline-block font-medium before:absolute before:left-[-3px] before:bottom-1 before:-z-10 before:h-2/4 before:w-[calc(100%+4px)] before:rotate-2 before:bg-amber-300/80 before:content-['']">
              rapid weight gain
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

const HighlightSpan = ({ children }: { children: ReactNode }) => (
  <span className="relative inline-block font-medium before:absolute before:left-[-3px] before:bottom-1 before:-z-10 before:h-2/4 before:w-[calc(100%+4px)] before:rotate-2 before:bg-amber-300/80 before:content-['']">
    {children}
  </span>
);
