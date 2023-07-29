import { useContext, useMemo } from 'react';
import { MdZoomOutMap } from 'react-icons/md';

import { Pagination } from '@/components/pagination';
import { MainContext } from '@/context/main-context';
import { MuscleExercisesContext } from '@/context/muscle-exercises-context';

export const RenderResultSearchExercise = () => {
  const { itemrender, listexercisessearchedbynameandoptions } = useContext(
    MuscleExercisesContext
  );
  return (
    <div className="h-screen w-full">
      <div className="h-[600px]">
        <div className="grid grid-cols-2 gap-5">
          {itemrender.listitem.map((item) => (
            <Exercises
              key={item.id}
              name={item.name}
              image={item.gifUrl}
              equipment={item.equipment}
              bodyParts={item.bodyPart}
              target={item.target}
            />
          ))}
        </div>
      </div>
      <Pagination
        maxItem={listexercisessearchedbynameandoptions.length}
        itemNumberInPage={6}
      />
    </div>
  );
};

const Exercises = ({
  name,
  image,
  equipment,
  bodyParts,
  target,
}: {
  name: string;
  image: string;
  equipment: string;
  bodyParts: string;
  target: string;
}) => {
  const nameExercise = useMemo(() => {
    return name.replace(/(?:^|\s)\S/g, (e) => e.toUpperCase());
  }, [name]);

  const { setExerciseImageZoom } = useContext(MainContext);
  return (
    <div className="flex items-center justify-start border-2 rounded-xl shadow-md transition-all hover:shadow-xl hover:scale-105">
      <div className="h-44 w-44 relative group">
        <img className="h-full w-full rounded-lg" src={image} alt="" />
        <div
          onClick={() => setExerciseImageZoom(image)}
          className="absolute w-full h-full top-0 bg-gray-700/30 rounded-lg flex items-center transition-all justify-center invisible group-hover:visible hover:cursor-zoom-in"
        >
          <MdZoomOutMap className="text-4xl drop-shadow-md text-gray-900 transition-all hover:scale-125" />
        </div>
      </div>
      <div className="pl-3 flex flex-col justify-start h-full w-[calc(100%-176px)]">
        <h2 className="text-2xl font-medium">{nameExercise}</h2>
        <div className="flex flex-col h-full mt-3 gap-1">
          <div>
            <h2 className="bg-neutral-500 inline-block w-32 text-center p-1 px-2 rounded-full drop-shadow-md border-2 text-slate-100 border-slate-200">
              Equipment
            </h2>
            :<span className="ml-2 font-medium">{equipment}</span>
          </div>
          <div>
            <h2 className="bg-blue-500 inline-block w-32 text-center p-1 px-2 rounded-full drop-shadow-md border-2 text-slate-100 border-slate-200">
              BodyParts
            </h2>
            :<span className="ml-2 font-medium">{bodyParts}</span>
          </div>
          <div>
            <h2 className="bg-green-500 inline-block w-32 text-center p-1 px-2 rounded-full drop-shadow-md border-2 text-slate-100 border-slate-200">
              Target Muscle
            </h2>
            :<span className="ml-2 font-medium">{target}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ZoomImageExercise = () => {
  const { exerciseimagezoom, setExerciseImageZoom } = useContext(MainContext);
  return (
    <div
      onClick={() => setExerciseImageZoom('')}
      className="h-full fixed w-full flex items-center justify-center z-50 bg-gray-800/80 cursor-zoom-out"
    >
      <img className="h-96 w-96" src={exerciseimagezoom} alt="" />
    </div>
  );
};
