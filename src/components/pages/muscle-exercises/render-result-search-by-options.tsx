import { useContext } from 'react';

import { SimpleSelectInput } from '@/components/input';
import { Pagination } from '@/components/pagination';
import type { SelectOptionsDataExercise } from '@/constants/select-options';
import { OPTIONS_RENDER } from '@/constants/select-options';
import { MuscleExercisesContext } from '@/context/muscle-exercises-context';

import { Exercises } from './render-result-search-exercise';

export const RenderResultSearchByOptions = () => {
  const {
    listexerciseschoosebyoptions,
    optionsrender,
    setItemRenderByOptionsBodyPart,
    setItemRenderByOptionsTarget,
    setItemRenderByoptionsEquipment,
    itemrenderbyoptionsbodypart,
    itemrenderbyoptionsequipment,
    itemrenderbyoptionstarget,
  } = useContext(MuscleExercisesContext);
  const { bodyParts, equipment, target } = listexerciseschoosebyoptions;

  return (
    <div className="h-screen w-full">
      <ChooseOptions />
      <div>
        {optionsrender === 'bodyparts' ? (
          <RenderExercises
            dataRender={itemrenderbyoptionsbodypart.listitem}
            itemrender={itemrenderbyoptionsbodypart}
            maxItem={bodyParts.length}
            setItemRender={(index, listitem) =>
              setItemRenderByOptionsBodyPart({ index, listitem })
            }
            data={bodyParts}
          />
        ) : null}
        {optionsrender === 'target' ? (
          <RenderExercises
            dataRender={itemrenderbyoptionstarget.listitem}
            itemrender={itemrenderbyoptionstarget}
            maxItem={target.length}
            setItemRender={(index, listitem) =>
              setItemRenderByOptionsTarget({ index, listitem })
            }
            data={target}
          />
        ) : null}
        {optionsrender === 'equipment' ? (
          <RenderExercises
            dataRender={itemrenderbyoptionsequipment.listitem}
            itemrender={itemrenderbyoptionsequipment}
            maxItem={equipment.length}
            setItemRender={(index, listitem) =>
              setItemRenderByoptionsEquipment({ index, listitem })
            }
            data={equipment}
          />
        ) : null}
      </div>
    </div>
  );
};

const RenderExercises = ({
  data,
  maxItem,
  setItemRender,
  itemrender,
  dataRender,
}: {
  data: SelectOptionsDataExercise[];
  maxItem: number;
  setItemRender: (index: number, listitem: SelectOptionsDataExercise[]) => void;
  itemrender: {
    listitem: SelectOptionsDataExercise[];
    index: number;
  };
  dataRender: SelectOptionsDataExercise[];
}) => {
  return data.length !== 0 ? (
    <div>
      <div className="h-[1041px]">
        <div className="grid grid-cols-2 gap-5">
          {dataRender.map((item) => (
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
        maxItem={maxItem}
        itemNumberInPage={10}
        setItemRender={(index, listitem) => setItemRender(index, listitem)}
        itemrender={itemrender}
        data={data}
      />
    </div>
  ) : (
    <h2 className="text-center font-bold text-3xl text-gray-800">
      No results for this selection
    </h2>
  );
};

const ChooseOptions = () => {
  const { optionsrender, setOptionsRender } = useContext(
    MuscleExercisesContext
  );
  return (
    <div>
      <SimpleSelectInput
        label="Options"
        options={OPTIONS_RENDER}
        currentValue={optionsrender}
        setCurrentValue={setOptionsRender}
      />
    </div>
  );
};
