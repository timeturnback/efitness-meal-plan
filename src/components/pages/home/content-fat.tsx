import { SimpleButton } from '@/components/button';
import { DISEASES, SUGGESTIONS } from '@/constants/select-options';

export const ContentFat = () => {
  return (
    <div className="max-w-5xl mx-auto gap-8">
      <div>
        <h2 className="text-3xl font-bold drop-shadow-md">
          Addressing Overweight and Obesity Issues
        </h2>
        <span className="font-medium pb-3 pt-6 block">
          For individuals who are overweight or obese, there can be several
          harmful effects and related health conditions. Accumulation of excess
          fat in the body can lead to the following:
        </span>
        <div className="list-decimal flex flex-col gap-3">
          {DISEASES.map((item, index) => (
            <div key={item.name}>
              <span>
                <span className="font-medium">{index + 1}.</span> {item.name}
              </span>
              : <span>{item.description}</span>
            </div>
          ))}
        </div>
        <span className="font-medium block pb-3 pt-6">
          To help individuals who are overweight or obese, the following
          suggestions can be considered:
        </span>
        <div className="list-decimal flex flex-col gap-3">
          {SUGGESTIONS.map((item, index) => (
            <div key={item.name}>
              <span>
                <span className="font-medium">{index + 1}.</span> {item.name}
              </span>
              : <span>{item.description}</span>
            </div>
          ))}
        </div>
        <span className="font-medium pb-3 pt-6 block">
          For individuals who are overweight or obese, it is essential to have
          specific information about their body composition, particularly the
          percentage of body fat. If you are unsure about your body fat
          percentage, we recommend using our Body Fat Calculator. This tool will
          provide you with valuable insights into your body&apos;s condition and
          guide you towards necessary steps to improve your overall health.
        </span>
        <div className="w-80">
          <SimpleButton label="Calculate Now" to="body-fat-calculator" />
        </div>
      </div>
    </div>
  );
};
