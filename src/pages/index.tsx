import { useContext } from 'react';

import { SimpleButton } from '@/components/button';
import { ImageHome } from '@/components/images/home';
import { CalculateNowContext } from '@/context/calculate-now-context';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const HomeWrapper = () => {
  const imghome = useScrollReveal({ origin: 'bottom' });
  const contenthome = useScrollReveal();
  const { setCalculateNow } = useContext(CalculateNowContext);
  return (
    <div className="h-screen pt-16">
      <div className="mx-auto flex h-full max-w-5xl items-center">
        <div className="flex items-center justify-between">
          <div ref={contenthome}>
            <h2 className="text-5xl font-bold">
              Calculate and choose the right food for your body.
            </h2>
            <span>
              Do you need to calculate your body&apos;s calories, or do you need
              to calculate your body fat? Calculate now with SimpleHealthPlan.
            </span>
            <div className="mt-6 w-4/5">
              <SimpleButton
                label="Calculate Now!"
                to="calculate-now"
                onClick={() => setCalculateNow(false)}
              />
            </div>
          </div>
          <img
            ref={imghome}
            className="w-3/5"
            src={ImageHome.background.src}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return <HomeWrapper />;
};

export default Index;
