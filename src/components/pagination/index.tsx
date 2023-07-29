import clsx from 'clsx';
import { useContext, useEffect, useMemo } from 'react';

import type { SelectOptionsDataExercise } from '@/constants/select-options';
import { MuscleExercisesContext } from '@/context/muscle-exercises-context';

export const Pagination = ({
  maxItem,
  itemNumberInPage,
}: {
  maxItem: number;
  itemNumberInPage: number;
}) => {
  const { itemrender, setItemRender, listexercisessearchedbynameandoptions } =
    useContext(MuscleExercisesContext);

  const numberPages = useMemo(() => {
    return Math.ceil(maxItem / itemNumberInPage);
  }, [maxItem, itemNumberInPage]);

  const newarray: SelectOptionsDataExercise[][] = useMemo(() => {
    const newarr = [];
    for (
      let i = 0;
      i < listexercisessearchedbynameandoptions.length;
      i += itemNumberInPage
    ) {
      const result = listexercisessearchedbynameandoptions.slice(
        i,
        i + itemNumberInPage
      );
      newarr.push(result);
    }
    return newarr;
  }, [itemNumberInPage, listexercisessearchedbynameandoptions]);

  useEffect(() => {
    setItemRender({ index: 0, listitem: newarray[0] || [] });
  }, [newarray]);

  const _handleOnSubmit = (index: number) => {
    setItemRender({ index, listitem: newarray[index] || [] });
  };

  const _handleOnPrev = () => {
    if (itemrender.index !== 0) {
      setItemRender({
        index: itemrender.index - 1,
        listitem: newarray[itemrender.index - 1] || [],
      });
    }
  };

  const _handleOnNext = () => {
    if (itemrender.index < itemrender.listitem.length - 1) {
      setItemRender({
        index: itemrender.index + 1,
        listitem: newarray[itemrender.index + 1] || [],
      });
    }
  };

  return maxItem > itemNumberInPage ? (
    <div className="w-full flex items-center justify-center mt-5 pb-10">
      <div className="flex items-center justify-center rounded-full bg-white border-2 border-slate-100 shadow-lg px-1">
        <div
          onClick={_handleOnPrev}
          className="mx-4 flex items-center drop-shadow-md cursor-pointer group pr-2 py-2"
        >
          <div className="text-3xl text-gray-800 drop-shadow-md group-hover:text-gray-900 transition-all h-3 w-3 border-t-2 border-l-2 border-gray-800 rotate-[315deg] " />
          <h2 className="font-medium transition-all text-gray-800 group-hover:text-gray-900 select-none">
            Prev
          </h2>
        </div>
        {Array(numberPages)
          .fill('a')
          .map((_, index) => (
            <div
              onClick={() => _handleOnSubmit(index)}
              key={index}
              className={clsx(
                'rounded-full p-2 w-10 h-10 m-1 flex items-center justify-center font-medium cursor-pointer',
                index === itemrender.index ? 'bg-slate-800' : null
              )}
            >
              <h2
                className={clsx(
                  index === itemrender.index
                    ? 'bg-slate-800 text-white'
                    : 'text-gray-900'
                )}
              >
                {index + 1}
              </h2>
            </div>
          ))}
        <div
          onClick={_handleOnNext}
          className="mx-4 flex items-center drop-shadow-md cursor-pointer group pl-2 py-2"
        >
          <h2 className="font-medium transition-all text-gray-800 group-hover:text-gray-900 select-none">
            Next
          </h2>
          <div className="text-3xl text-gray-800 drop-shadow-md group-hover:text-gray-900 transition-all h-3 w-3 border-t-2 border-l-2 border-gray-800 rotate-[135deg] " />
        </div>
      </div>
    </div>
  ) : null;
};
