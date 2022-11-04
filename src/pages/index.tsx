import { useContext } from 'react';

import { FORMULA_EQUATIONS_OPTIONS } from '@/components/constants/select-options';
import {
  InfoBoard,
  InfoInput,
  OptionsSelect,
  ResultCalories,
  SimpleEquations,
} from '@/components/pages/home';
import { HomeContext, HomeProvider } from '@/context/home-context';

const Index = () => {
  const { bmr } = useContext(HomeContext);
  // const [catsList, setCatsList] = useState<any>(); // TODO : types

  // useEffect(() => {
  //   _getCats();
  // }, []);

  // const _getCats = async () => {
  //   const res = await ApiInstance.getCats('American');
  //   const { error, result } = handleError(res);
  //   if (error) {
  //     // toast.error(error.message);
  //     // TODO add react-hot-toast and use it here
  //   } else {
  //     setCatsList(result);
  //   }
  // };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="my-0 h-screen py-11">
        <div className="h-full w-full rounded-xl border-2 border-gray-800/90 bg-zinc-100/30 px-6">
          <div className="h-20">
            <h2 className="py-2 text-4xl font-medium text-gray-800 ">
              Calorie Calculator
            </h2>
            {/* <div>
              {catsList?.map((cat: any) => (
                <div key={cat.name}>
                  {cat.name}
                  {cat.origin}
                  <img src={cat.image_link} alt="cat image" />
                </div>
              ))}
            </div> */}
            <div className="block h-[1.6px] w-full">
              <span className="block h-full w-full bg-gray-700" />
            </div>
          </div>
          <div className="flex h-[calc(100%-80px)]">
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
                  calories for weight loss, weight gain, and maintain weight.
                  For weight loss, include: light weight loss, weight loss, and
                  extreme weight loss. Weight gain includes light weight gain ,
                  weight gain, and rapid weight gain.
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
