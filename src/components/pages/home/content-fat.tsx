import { useContext } from 'react';

import { SimpleButton } from '@/components/button';
import { DISEASES, SUGGESTIONS } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';

export const ContentFat = () => {
  const { setCalculateNow } = useContext(MainContext);

  return (
    <div className="h-screen max-w-5xl mx-auto flex flex-col gap-8">
      <h2 className="text-5xl font-bold drop-shadow-md">
        Addressing Overweight and Obesity Issues
      </h2>
      <span className="font-bold">
        For individuals who are overweight or obese, there can be several
        harmful effects and related health conditions. Accumulation of excess
        fat in the body can lead to the following:
      </span>
      <ol className="list-decimal flex flex-col gap-3">
        {DISEASES.map((item) => (
          <li key={item.name}>
            <span>{item.name}</span>: <span>{item.description}</span>
          </li>
        ))}
      </ol>
      <span className="font-bold">
        To help individuals who are overweight or obese, the following
        suggestions can be considered:
      </span>
      <ol className="list-decimal flex flex-col gap-3">
        {SUGGESTIONS.map((item) => (
          <li key={item.name}>
            <span>{item.name}</span>: <span>{item.description}</span>
          </li>
        ))}
      </ol>
      <span className="font-bold">
        For individuals who are overweight or obese, it is essential to have
        specific information about their body composition, particularly the
        percentage of body fat. If you are unsure about your body fat
        percentage, we recommend using our Body Fat Calculator. This tool will
        provide you with valuable insights into your body&apos;s condition and
        guide you towards necessary steps to improve your overall health.
      </span>
      <div>
        <SimpleButton
          label="Calculate Now!"
          to="calculate-now"
          onClick={() => setCalculateNow(false)}
        />
      </div>
    </div>
  );
};
