import { useContext, useEffect, useState } from 'react';

import { FORMULA_EQUATIONS_OPTIONS } from '@/components/constants/select-options';
import {
  HighlightSpan,
  InfoBoard,
  InfoInput,
  OptionsSelect,
  ResultCalories,
  SimpleEquations,
} from '@/components/pages/home';
import { HomeContext, HomeProvider } from '@/context/home-context';
import { ApiInstance } from '@/utils/api';
import { handleError } from '@/utils/apiHelper';

const Index = () => {
  const { bmr } = useContext(HomeContext);
  const [catsList, setCatsList] = useState<any>(); // TODO : types

  useEffect(() => {
    _getCats();
  }, []);

  const _getCats = async () => {
    const res = await ApiInstance.getCats('American');
    const { error, result } = handleError(res);
    if (error) {
      // toast.error(error.message);
      // TODO add react-hot-toast and use it here
    } else {
      setCatsList(result);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="my-0 h-screen py-11">
        <div className="grid h-full w-full rounded-xl border-2 border-gray-800/90 px-6">
          <h2 className="py-2 text-4xl font-medium text-gray-800 ">
            Calorie Calculate
          </h2>
          <div>
            {catsList?.map((cat: any) => (
              <div key={cat.name}>
                {cat.name}
                {cat.origin}
                <img src={cat.image_link} alt="cat image" />
              </div>
            ))}
          </div>
          <div className="block h-[1.6px] w-full">
            <span className="block h-full w-full bg-gray-700" />
          </div>
          <div className="flex">
            <div className="flex w-full">
              <InfoInput />
              <OptionsSelect />
            </div>
            {bmr ? (
              <ResultCalories bmr={bmr} />
            ) : (
              <div className="w-3/4">
                <InfoBoard>
                  A calorie calculator can be used to estimate the number of
                  calories a person needs to consume each day and output
                  calories for <HighlightSpan>weight loss</HighlightSpan>,{' '}
                  <HighlightSpan>weight gain</HighlightSpan>, and{' '}
                  <HighlightSpan>maintain weight</HighlightSpan>. For weight
                  loss, include:{' '}
                  <HighlightSpan>light weight loss</HighlightSpan>,{' '}
                  <HighlightSpan>weight loss</HighlightSpan>, and{' '}
                  <HighlightSpan>extreme weight loss</HighlightSpan>. Weight
                  gain includes <HighlightSpan>light weight gain</HighlightSpan>
                  , <HighlightSpan>weight gain</HighlightSpan>, and{' '}
                  <HighlightSpan>rapid weight gain</HighlightSpan>.
                </InfoBoard>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-screen">
        <h2 className="text-lg font-medium">
          The three formulas&apos; equation:
        </h2>
        <SimpleEquations option={FORMULA_EQUATIONS_OPTIONS} />
      </div>
    </div>
  );
};

const HomeWrapper = () => {
  return (
    <HomeProvider>
      <Index />
    </HomeProvider>
  );
};

export default HomeWrapper;
