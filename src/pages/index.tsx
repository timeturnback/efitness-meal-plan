import 'firebase/compat/auth';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useContext } from 'react';

import { SimpleButton } from '@/components/button';
import { ImageHome } from '@/components/Images/home';
import { ContentFat, SuggestFoodsNutrition } from '@/components/pages/home';
import { MuscleSpecificExercisesHome } from '@/components/pages/muscle-specific-exercises';
import { Wrapper } from '@/components/pages/wrapper';
import { MainContext } from '@/context/main-context';

const HomeWrapper = () => {
  const { setCalculateNow } = useContext(MainContext);
  return (
    <div className="h-full">
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
            <div className="w-80 mt-6">
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
  return (
    <Wrapper title="Home | SimpleHealthPlan">
      <div className="h-[calc(100vh-64px)]">
        <HomeWrapper />
        <MuscleSpecificExercisesHome />
        <ContentFat />
        <div className="h-screen">
          <SuggestFoodsNutrition />
        </div>
      </div>
    </Wrapper>
  );
};

export default Index;
