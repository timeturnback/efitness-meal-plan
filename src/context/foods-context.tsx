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
} from '@/components/constants/select-options';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { selector } from '@/redux';
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

  const dispatch = useDispatch();

  const {
    beanslist,
    cereallist,
    fruitslist,
    milklist,
    vegetableslist,
    valuemainsuggestlist,
  } = useSelector(selector.user);

  useEffect(() => {
    const _addItem = () => {
      if (mainsuggest.value === 'beans') {
        setItemInMainSuggest(beanslist);
      } else if (mainsuggest.value === 'cereal') {
        setItemInMainSuggest(cereallist);
      } else if (mainsuggest.value === 'fruits') {
        setItemInMainSuggest(fruitslist);
      } else if (mainsuggest.value === 'milk') {
        setItemInMainSuggest(milklist);
      } else if (mainsuggest.value === 'vegetables') {
        setItemInMainSuggest(vegetableslist);
      }
    };

    const _iteminmainsuggest = async (itemlist: SelectOptionValue[]) => {
      itemlist.forEach(async (item) => {
        const res = await (await ApiInstance).getFoods(item.value);

        const { result } = await handleError(res);

        setItemInMainSuggest((prev) => [...prev, result[0]]);

        if (mainsuggest.value === 'beans') {
          dispatch({ type: 'itemBeansList', payload: result[0] });
        } else if (mainsuggest.value === 'cereal') {
          dispatch({ type: 'itemCerealList', payload: result[0] });
        } else if (mainsuggest.value === 'fruits') {
          dispatch({ type: 'itemFruitsList', payload: result[0] });
        } else if (mainsuggest.value === 'milk') {
          dispatch({ type: 'itemMilkList', payload: result[0] });
        } else if (mainsuggest.value === 'vegetables') {
          dispatch({ type: 'itemVegetablesList', payload: result[0] });
        }
      });
    };

    if (!valuemainsuggestlist.includes(mainsuggest.value) && mainsuggestclick) {
      setItemInMainSuggest([]);
      _iteminmainsuggest(mainsuggest.listitem);
      dispatch({ type: 'valueMainSuggestList', payload: mainsuggest.value });
    } else {
      _addItem();
    }
  }, [mainsuggest, mainsuggestclick, valuemainsuggestlist]);

  useEffect(() => {
    if (iteminmainsuggest.length === mainsuggest.listitem.length) {
      setMainSuggestClick(false);
    }
  }, [iteminmainsuggest]);

  useEffect(() => {
    const _search = async () => {
      if (blsearch.click) {
        blsearch.click = false;
        setListItemSearch([]);
        const res = await (await ApiInstance).getFoods(search);
        const { error, result } = await handleError(res);
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
