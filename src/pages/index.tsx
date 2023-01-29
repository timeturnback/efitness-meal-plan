import { useContext } from 'react';

import { SimpleButton } from '@/components/button';
import { ImageHome } from '@/components/images/home';
import { MainContext } from '@/context/main-context';

const HomeWrapper = () => {
  // const imghome = useScrollReveal({ origin: 'bottom' });
  // const contenthome = useScrollReveal();
  const { setCalculateNow } = useContext(MainContext);
  return (
    <div className="h-screen pt-16">
      <div className="flex items-center h-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-5xl font-bold">
              Calculate and choose the right food for your body.
            </h2>
            <span>
              Do you need to calculate your body&apos;s calories, or do you need
              to calculate your body fat? Calculate now with SimpleHealthPlan.
            </span>
            <div className="w-4/5 mt-6">
              <SimpleButton
                label="Calculate Now!"
                to="calculate-now"
                onClick={() => setCalculateNow(false)}
              />
            </div>
          </div>
          <img className="w-3/5" src={ImageHome.background.src} alt="" />
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return <HomeWrapper />;
};

export default Index;
