import { useContext } from 'react';

import { SimpleButton } from '@/components/button';
import { SimpleSelectInput } from '@/components/input';
import { MUSCLE_EXERCISE_OPTIONS } from '@/constants/select-options';
import { MuscleExercisesContext } from '@/context/muscle-exercises-context';

import { SearchTypeInOptions } from './search-by-name';
import { OptionstTypeInOptions } from './search-by-options';

export const Options = () => {
  const {
    searchtype,
    setSearchType,
    Submit,
    dropdownbodyparts,
    dropdownquipment,
    dropdowntarget,
  } = useContext(MuscleExercisesContext);
  return (
    <div className="h-full w-3/5">
      <h2 className="text-4xl font-medium drop-shadow-md py-2 text-gray-900/90">
        Muscle Exercises
      </h2>
      <SimpleSelectInput
        currentValue={searchtype}
        setCurrentValue={setSearchType}
        label="Search type:"
        options={MUSCLE_EXERCISE_OPTIONS}
      />
      <div className="flex flex-col justify-between h-[calc(100%-186px)]">
        <div>
          {searchtype === 'search' ? (
            <SearchTypeInOptions />
          ) : (
            <>
              <OptionstTypeInOptions />
              {dropdownbodyparts.value ||
              dropdownquipment.value ||
              dropdowntarget.value ? (
                <_PreviewResults />
              ) : null}
            </>
          )}
        </div>
        <div className="mb-6">
          <SimpleButton label="Search" onClick={Submit} />
        </div>
      </div>
    </div>
  );
};

const _PreviewResults = () => {
  const { dropdownbodyparts, dropdownquipment, dropdowntarget } = useContext(
    MuscleExercisesContext
  );
  return (
    <div className="mt-3 flex flex-col">
      <h2 className="mb-1">The results include the following options:</h2>
      {dropdownbodyparts.value ? (
        <div>
          <h2 className="bg-blue-500 inline-block w-32 text-center p-1 px-2 rounded-full drop-shadow-md border-2 text-slate-100 border-slate-200">
            BodyParts
          </h2>
          :<span className="ml-2 font-medium">{dropdownbodyparts.value}</span>
        </div>
      ) : null}
      {dropdowntarget.value ? (
        <div>
          <h2 className="bg-green-500 inline-block w-32 text-center p-1 px-2 rounded-full drop-shadow-md border-2 text-slate-100 border-slate-200">
            Target Muscle
          </h2>
          :<span className="ml-2 font-medium">{dropdowntarget.value}</span>
        </div>
      ) : null}
      {dropdownquipment.value ? (
        <div>
          <h2 className="bg-neutral-500 inline-block w-32 text-center p-1 px-2 rounded-full drop-shadow-md border-2 text-slate-100 border-slate-200">
            Equipment
          </h2>
          :<span className="ml-2 font-medium">{dropdownquipment.value}</span>
        </div>
      ) : null}
    </div>
  );
};
