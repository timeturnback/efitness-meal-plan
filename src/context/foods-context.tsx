import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';

import type {
  SelectOptionApiFoods,
  SelectOptionValue,
} from '@/components/constants/select-options';
import { ApiInstance } from '@/utils/api';
import { handleError } from '@/utils/apiHelper';

interface FoodsProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  mainsuggest: {
    value: string;
    listitem: SelectOptionValue[];
    listvalue: string[];
    click: boolean;
  };
  setMainSuggest: Dispatch<
    SetStateAction<{
      value: string;
      listitem: SelectOptionValue[];
      listvalue: string[];
      click: boolean;
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
    click: false,
  });
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
    if (mainsuggest.click) {
      if (mainsuggest.listvalue.includes(mainsuggest.value)) {
        _addItem();
      } else {
        _iteminmainsuggest();
        setMainSuggest((prev) => ({
          ...mainsuggest,
          listvalue: [...prev.listvalue, mainsuggest.value],
        }));
      }
      mainsuggest.click = false;
    }
  }, [mainsuggest, listiteminmainsuggest]);

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
  };
  return (
    <FoodsContext.Provider value={value}>{children}</FoodsContext.Provider>
  );
};
