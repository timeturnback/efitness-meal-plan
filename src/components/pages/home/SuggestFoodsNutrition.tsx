import { GrNext, GrPrevious } from 'react-icons/gr';
import Slider from 'react-slick';

import { ImageFoods } from '@/components/images/foods';

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
        <Slider {...settings}>{/* ItemSuggestFoodsNutrition  */}</Slider>
      </div>
    </div>
  );
};

interface ItemValue {
  title: string;
  image: string;
  description: string;
}

export const ItemSuggestFoodsNutrition = (listItem: ItemValue[]) => {
  return listItem.map((item) => (
    <div
      key={item.title}
      className="h-full w-full rounded-xl border-2 border-gray-300 shadow-sm transition-all flex items-center justify-center"
    >
      <div className="flex items-center justify-between h-full bg-slate-50 rounded-xl">
        <div className="w-3/5 pl-2 h-full text-center py-4">
          <h2 className="text-2xl font-medium">{item.title}</h2>
          <p className="break-words text-left">{item.description}</p>
        </div>
        <div className="h-full w-2/5">
          <img
            className="w-full h-full object-contain"
            src={ImageFoods.search_cantfindfood.src}
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
