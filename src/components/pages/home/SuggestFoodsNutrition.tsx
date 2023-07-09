import { GrNext, GrPrevious } from 'react-icons/gr';
import Slider from 'react-slick';

import {
  type SelectOptionNutritionFoods,
  NUTRITIOUS_FOODS,
} from '@/components/constants/select-options';

export const SuggestFoodsNutrition = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="h-full flex flex-col items-center justify-center max-w-5xl mx-auto">
      <h2 className="text-4xl font-medium drop-shadow-md py-5 mb-10">
        Suggestions for nutritious dishes
      </h2>
      <div className="h-96 w-4/5 p-3 rounded-xl border-2 border-gray-800/90 drop-shadow-md shadow-lg flex flex-col justify-center">
        <Slider {...settings}>
          {ItemSuggestFoodsNutrition(NUTRITIOUS_FOODS)}
        </Slider>
      </div>
    </div>
  );
};

const ItemSuggestFoodsNutrition = (listItem: SelectOptionNutritionFoods[]) => {
  return listItem.map((item) => (
    <div
      key={item.name}
      className="h-full w-full rounded-2xl border-2 shadow-sm transition-all flex items-center justify-center"
    >
      <div className="flex items-center justify-between h-full bg-slate-50 rounded-xl">
        <div className="w-3/5 pl-2 h-full text-center py-4 relative">
          <h2 className="text-3xl font-medium drop-shadow-md">{item.name}</h2>
          <p className="break-words text-left leading-8 z-10 absolute">
            {item.description}
          </p>
          <div className="border_radius_suggest_foods_nutrition_bottom absolute h-2/3 w-2/4 bg-red-100 z-0 drop-shadow-md left-0 -bottom-16"></div>
        </div>
        <div className="h-full w-2/5 relative">
          <div className="border_radius_suggest_foods_nutrition_top absolute h-2/3 w-5/6 bg-red-100 z-0 drop-shadow-md right-0 -top-24"></div>
          <img
            className="w-full h-full object-contain absolute z-10"
            src={item.img.src}
            alt=""
          />
        </div>
      </div>
    </div>
  ));
};

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="inline-block absolute top-[44%] cursor-pointer transition-all hover:bg-slate-100 -right-16 border-2 bg-white p-2 rounded-full drop-shadow-md"
    >
      <GrNext className="text-2xl" />
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="inline-block absolute top-[44%] cursor-pointer transition-all hover:bg-slate-100 -left-16 bg-white p-2 rounded-full drop-shadow-md border-2"
    >
      <GrPrevious className="text-2xl" />
    </div>
  );
}
