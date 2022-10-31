import type { ReactNode } from 'react';

export const InfoBoard = () => {
  return (
    <div className="w-3/4 py-4">
      <div className="px-7">
        <h5 className="text-[17px] font-medium">
          Fill in your information and press the Calculate button. Your results
          will be displayed here!
        </h5>
        <div className="mt-4">
          <p className="text-justify leading-8">
            A calorie calculator can be used to estimate the number of calories
            a person needs to consume each day and output calories for{' '}
            <HighlightSpan>weight loss</HighlightSpan>,{' '}
            <HighlightSpan>weight gain</HighlightSpan>, and{' '}
            <HighlightSpan>maintain weight</HighlightSpan>. For weight loss,
            include: <HighlightSpan>light weight loss</HighlightSpan>,{' '}
            <HighlightSpan>weight loss</HighlightSpan>, and{' '}
            <HighlightSpan>extreme weight loss</HighlightSpan>. Weight gain
            includes <HighlightSpan>light weight gain</HighlightSpan>,{' '}
            <HighlightSpan>weight gain</HighlightSpan>, and{' '}
            <HighlightSpan>rapid weight gain</HighlightSpan>.
          </p>
        </div>
      </div>
    </div>
  );
};

const HighlightSpan = ({ children }: { children: ReactNode }) => (
  <span className="font-medium text-amber-500">{children}</span>
);
