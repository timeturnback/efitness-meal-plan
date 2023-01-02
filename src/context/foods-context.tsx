import type {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from 'react';
import { createContext, useEffect, useState } from 'react';

import type {
  SelectOptionApiFoods,
  SelectOptionValue,
} from '@/components/constants/select-options';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ApiInstance } from '@/utils/api';
import { handleError } from '@/utils/apiHelper';

interface FoodsProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  mainsuggest: {
    value: string;
    listitem: SelectOptionValue[];
    listvalue: string[];
  };
  setMainSuggest: Dispatch<
    SetStateAction<{
      value: string;
      listitem: SelectOptionValue[];
      listvalue: string[];
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
  blsearch: {
    click: boolean;
    findfoods: boolean;
  };
  setBLSearch: Dispatch<
    SetStateAction<{
      click: boolean;
      findfoods: boolean;
    }>
  >;
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
}

export const FoodsContext = createContext({} as FoodsProps);
export const FoodsProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('');
  const [listitemsearch, setListItemSearch] = useState(
    [] as SelectOptionApiFoods[]
  );
  const [blsearch, setBLSearch] = useState({ click: false, findfoods: true });
  const [mainsuggest, setMainSuggest] = useState({
    value: '',
    listitem: [] as SelectOptionValue[],
    listvalue: [] as string[],
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
  useEffect(() => {
    const _addItem = () => {
      if (mainsuggest.value === 'beans') {
        setItemInMainSuggest(listiteminmainsuggest.beans);
      } else if (mainsuggest.value === 'cereal') {
        setItemInMainSuggest(listiteminmainsuggest.cereal);
      } else if (mainsuggest.value === 'fruits') {
        setItemInMainSuggest(listiteminmainsuggest.fruits);
      } else if (mainsuggest.value === 'milk') {
        setItemInMainSuggest(listiteminmainsuggest.milk);
      } else if (mainsuggest.value === 'vegetables') {
        setItemInMainSuggest(listiteminmainsuggest.vegetables);
      }
    };
    const _iteminmainsuggest = async () => {
      setItemInMainSuggest([]);
      mainsuggest.listitem.forEach(async (item) => {
        const res = await ApiInstance.getFoods(item.value);
        const { error, result } = handleError(res);
        if (error) {
          //
        } else {
          setItemInMainSuggest((prev) => [...prev, result[0]]);
          if (mainsuggest.value === 'beans') {
            setListItemInMainSuggest((prev) => ({
              ...listiteminmainsuggest,
              beans: [...prev.beans, result[0]],
            }));
          } else if (mainsuggest.value === 'cereal') {
            setListItemInMainSuggest((prev) => ({
              ...listiteminmainsuggest,
              cereal: [...prev.cereal, result[0]],
            }));
          } else if (mainsuggest.value === 'fruits') {
            setListItemInMainSuggest((prev) => ({
              ...listiteminmainsuggest,
              fruits: [...prev.fruits, result[0]],
            }));
          } else if (mainsuggest.value === 'milk') {
            setListItemInMainSuggest((prev) => ({
              ...listiteminmainsuggest,
              milk: [...prev.milk, result[0]],
            }));
          } else if (mainsuggest.value === 'vegetables') {
            setListItemInMainSuggest((prev) => ({
              ...listiteminmainsuggest,
              vegetables: [...prev.vegetables, result[0]],
            }));
          }
        }
      });
    };
    if (!mainsuggest.listvalue.includes(mainsuggest.value)) {
      _iteminmainsuggest();
      setMainSuggest((prev) => ({
        ...mainsuggest,
        listvalue: [...prev.listvalue, mainsuggest.value],
      }));
    } else {
      _addItem();
    }
    if (iteminmainsuggest.length === mainsuggest.listitem.length) {
      setMainSuggestClick(false);
    }
  }, [mainsuggest, listiteminmainsuggest, iteminmainsuggest]);

  useEffect(() => {
    const _search = async () => {
      if (blsearch.click) {
        blsearch.click = false;
        setListItemSearch([]);
        const res = await ApiInstance.getFoods(search);
        const { error, result } = handleError(res);
        if (error || result.length === 0) {
          setBLSearch({ ...blsearch, findfoods: false });
        } else {
          setBLSearch({ ...blsearch, findfoods: true });
          setListItemSearch(result);
        }
      }
    };
    _search();
  }, [blsearch]);
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
    blsearch,
    setBLSearch,
    listitemsearch,
    setListItemSearch,
    mainsuggestclick,
    setMainSuggestClick,
    fooddetails,
    setFoodDetails,
    itemfooddetails,
    setItemFoodDetails,
    scrollfromleft,
  };
  return (
    <FoodsContext.Provider value={value}>{children}</FoodsContext.Provider>
  );
};
