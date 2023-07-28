import clsx from 'clsx';
import { useContext } from 'react';
import { FiLoader } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

import { SimpleInput } from '@/components/input';
import type { SelectOptionsDataExercise } from '@/constants/select-options';
import { MuscleExercisesContext } from '@/context/muscle-exercises-context';

export const SearchTypeInOptions = () => {
  const { inputsearch, setInputSearch, dropdownsearch } = useContext(
    MuscleExercisesContext
  );
  return (
    <div className="relative">
      <SimpleInput
        removetext={inputsearch.value.length > 0}
        maxwidth
        search
        value={inputsearch.value}
        error={inputsearch.error}
        onChangeText={(e) => setInputSearch({ value: e, error: '' })}
      />
      <RenderNameTheExercisesInclude />
      {dropdownsearch.length > 0 ? (
        <DropDownExerciseSearch listitem={dropdownsearch} />
      ) : null}
    </div>
  );
};

const RenderNameTheExercisesInclude = () => {
  const { listnamesearch, RemoveNameSearchInList } = useContext(
    MuscleExercisesContext
  );
  return (
    <div className="mt-4 absolute">
      <h2>
        The exercises include:{' '}
        {listnamesearch.map((item, index) => (
          <span key={item.id} className="font-medium inline-block">
            {item.name}
            <IoClose
              onClick={() => RemoveNameSearchInList(item.name)}
              className="inline-block cursor-pointer text-gray-900 border-2 rounded-full ml-1 border-gray-700 hover:text-red-500 hover:border-red-500"
            />
            {index + 1 === listnamesearch.length ? (
              <span className="font-normal">.</span>
            ) : (
              <span className="font-normal">, </span>
            )}
          </span>
        ))}
      </h2>
    </div>
  );
};

const DropDownExerciseSearch = ({
  listitem,
}: {
  listitem: SelectOptionsDataExercise[];
}) => {
  const { loadingdropdownsearch, SubmitDropdownSearch } = useContext(
    MuscleExercisesContext
  );
  return (
    <div
      className={clsx(
        'absolute w-full z-10 mt-2 max-h-[155px] select-none rounded-md border bg-white py-1 drop-shadow-md transition-all scrollbar',
        !loadingdropdownsearch ? 'overflow-auto' : null
      )}
    >
      {loadingdropdownsearch ? (
        <div className="w-full flex items-center justify-center">
          <FiLoader className="animate-spin text-3xl text-gray-900/90" />
        </div>
      ) : (
        listitem.map((item) => (
          <span
            onClick={() => SubmitDropdownSearch(item.name, item.id)}
            key={item.id}
            className="block w-full cursor-pointer p-2 text-sm text-center leading-4 hover:bg-zinc-600/20 transition-all duration-100 hover:font-medium"
          >
            {item.name}
          </span>
        ))
      )}
    </div>
  );
};
