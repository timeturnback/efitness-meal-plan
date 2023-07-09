import type {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from 'react';
import { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type {
  SelectOptionApiFoods,
  SelectOptionValue,
} from '@/constants/select-options';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { selector } from '@/redux';
import type { TypeValue } from '@/redux/User/UserRedux';
import { ApiInstance } from '@/utils/api';
import { handleError } from '@/utils/apiHelper';

interface FoodsProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  mainsuggest: {
    value: string;
    listitem: SelectOptionValue[];
  };
  setMainSuggest: Dispatch<
    SetStateAction<{
      value: string;
      listitem: SelectOptionValue[];
    }>
  >;
  listiteminmainsuggest: {
    beans: SelectOptionApiFoods[];
    cereal: SelectOptionApiFoods[];
    fruits: SelectOptionApiFoods[];
    milk: SelectOptionApiFoods[];
    vegetables: SelectOptionApiFoods[];
  };
  setListItemInMainSuggest: Dispatch<
    SetStateAction<{
      beans: SelectOptionApiFoods[];
      cereal: SelectOptionApiFoods[];
      fruits: SelectOptionApiFoods[];
      milk: SelectOptionApiFoods[];
      vegetables: SelectOptionApiFoods[];
    }>
  >;
  iteminmainsuggest: SelectOptionApiFoods[];
  setItemInMainSuggest: Dispatch<SetStateAction<SelectOptionApiFoods[]>>;
  listitemsearch: SelectOptionApiFoods[];
  setListItemSearch: Dispatch<SetStateAction<SelectOptionApiFoods[]>>;
  mainsuggestclick: boolean;
  setMainSuggestClick: Dispatch<SetStateAction<boolean>>;
  fooddetails: boolean;
  setFoodDetails: Dispatch<SetStateAction<boolean>>;
  itemfooddetails: {
    datadoughnut: {
      datasets: {
        data: number[];
        backgroundColor: string[];
        borderWidth: number;
      }[];
    };
    data: SelectOptionApiFoods;
    percentdoughnut: {
      carb: number;
      fat: number;
      protein: number;
    };
  };
  setItemFoodDetails: Dispatch<
    SetStateAction<{
      datadoughnut: {
        datasets: {
          data: number[];
          backgroundColor: string[];
          borderWidth: number;
        }[];
      };
      data: SelectOptionApiFoods;
      percentdoughnut: {
        carb: number;
        fat: number;
        protein: number;
      };
    }>
  >;
  scrollfromleft: MutableRefObject<null>;
  findfoods: boolean;
  setFindFoods: Dispatch<SetStateAction<boolean>>;
  inputsubmit: boolean;
  setInputSubmit: Dispatch<SetStateAction<boolean>>;
  fooditemlist: string[];
  setFoodItemList: Dispatch<SetStateAction<string[]>>;
}

export const FoodsContext = createContext({} as FoodsProps);
export const FoodsProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('');
  const [listitemsearch, setListItemSearch] = useState(
    [] as SelectOptionApiFoods[]
  );
  const [mainsuggest, setMainSuggest] = useState({
    value: '',
    listitem: [] as SelectOptionValue[],
  });
  const [mainsuggestclick, setMainSuggestClick] = useState(false);
  const [listiteminmainsuggest, setListItemInMainSuggest] = useState({
    beans: [] as SelectOptionApiFoods[],
    cereal: [] as SelectOptionApiFoods[],
    fruits: [] as SelectOptionApiFoods[],
    milk: [] as SelectOptionApiFoods[],
    vegetables: [] as SelectOptionApiFoods[],
  });
  const [iteminmainsuggest, setItemInMainSuggest] = useState<
    SelectOptionApiFoods[]
  >([]);
  const [fooddetails, setFoodDetails] = useState(false);
  const [itemfooddetails, setItemFoodDetails] = useState({
    datadoughnut: {
      datasets: [
        {
          data: [0],
          backgroundColor: [''],
          borderWidth: 0,
        },
      ],
    },
    data: '' as unknown as SelectOptionApiFoods,
    percentdoughnut: { carb: 0, fat: 0, protein: 0 },
  });

  const [findfoods, setFindFoods] = useState(false);
  const [inputsubmit, setInputSubmit] = useState(false);
  const [fooditemlist, setFoodItemList] = useState([] as string[]);

  const dispatch = useDispatch();

  const { foodsuggestlist, foodlist } = useSelector(selector.food);

  useEffect(() => {
    const _addItem = () => {
      if (mainsuggest.value === 'beans') {
        setItemInMainSuggest(foodsuggestlist[mainsuggest.value]);
      } else if (mainsuggest.value === 'cereal') {
        setItemInMainSuggest(foodsuggestlist[mainsuggest.value]);
      } else if (mainsuggest.value === 'fruits') {
        setItemInMainSuggest(foodsuggestlist[mainsuggest.value]);
      } else if (mainsuggest.value === 'milk') {
        setItemInMainSuggest(foodsuggestlist[mainsuggest.value]);
      } else if (mainsuggest.value === 'vegetables') {
        setItemInMainSuggest(foodsuggestlist[mainsuggest.value]);
      }
    };

    const _iteminmainsuggest = async (itemlist: SelectOptionValue[]) => {
      let subarray: SelectOptionApiFoods[] = [];
      const count: TypeValue = {};
      itemlist.forEach(async (item) => {
        const res = await ApiInstance.getFoods(item.value);

        const { result } = handleError(res);

        setItemInMainSuggest((prev) => [...prev, result[0]]);
        subarray = [...subarray, result[0]];
        count[mainsuggest.value] = subarray;
        dispatch({ type: 'foodSuggestList', payload: count });
      });
    };

    if (!foodsuggestlist[mainsuggest.value] && mainsuggestclick) {
      setItemInMainSuggest([]);
      _iteminmainsuggest(mainsuggest.listitem);
    } else {
      _addItem();
    }
  }, [mainsuggest, mainsuggestclick]);

  useEffect(() => {
    if (iteminmainsuggest.length === mainsuggest.listitem.length) {
      setMainSuggestClick(false);
    }
  }, [iteminmainsuggest]);

  useEffect(() => {
    const _search = async () => {
      if (inputsubmit && search) {
        setInputSubmit(false);
        setListItemSearch([]);
        if (foodlist[search]) {
          setListItemSearch(foodlist[search]);
        } else {
          const res = await ApiInstance.getFoods(search);
          const { error, result } = handleError(res);
          if (error || result.length === 0) {
            setFindFoods(true);
          } else {
            setFindFoods(false);
            setListItemSearch(result);
            const count: TypeValue = {};
            count[search] = result;
            dispatch({ type: 'foodList', payload: count });
          }
        }
      }
    };
    _search();
  }, [inputsubmit, foodlist]);

  const scrollfromleft = useScrollReveal({ origin: 'left' });

  const value = {
    search,
    setSearch,
    mainsuggest,
    setMainSuggest,
    listiteminmainsuggest,
    setListItemInMainSuggest,
    iteminmainsuggest,
    setItemInMainSuggest,
    findfoods,
    setFindFoods,
    listitemsearch,
    setListItemSearch,
    mainsuggestclick,
    setMainSuggestClick,
    fooddetails,
    setFoodDetails,
    itemfooddetails,
    setItemFoodDetails,
    scrollfromleft,
    inputsubmit,
    setInputSubmit,
    fooditemlist,
    setFoodItemList,
  };
  return (
    <FoodsContext.Provider value={value}>{children}</FoodsContext.Provider>
  );
};
