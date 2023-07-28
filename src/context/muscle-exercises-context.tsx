import { getDownloadURL, listAll, ref } from 'firebase/storage';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';

import { storage } from '@/components/firebase';
import type { SelectOptionsDataExercise } from '@/constants/select-options';
import { UseGetListExercises } from '@/hooks';

interface MuscleExercisesProps {
  searchtype: string;
  setSearchType: Dispatch<SetStateAction<string>>;
  inputsearch: {
    value: string;
    error: string;
  };
  setInputSearch: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  dropdownbodyparts: {
    value: string;
    error: string;
  };
  setDropDownBodyParts: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  dropdowntarget: {
    value: string;
    error: string;
  };
  setDropDownTarget: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  dropdownquipment: {
    value: string;
    error: string;
  };
  setDropDownEquipment: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  Submit: () => void;
  dropdownsearch: SelectOptionsDataExercise[];
  setDropDownSearch: Dispatch<SetStateAction<SelectOptionsDataExercise[]>>;
  loadingdropdownsearch: boolean;
  setLoadingDropDownSearch: Dispatch<SetStateAction<boolean>>;
  SubmitDropdownSearch: (name: string, id: string) => void;
  listnamesearch: {
    name: string;
    id: string;
  }[];
  setListNameSearch: Dispatch<
    SetStateAction<
      {
        name: string;
        id: string;
      }[]
    >
  >;
  numberofdisplays: {
    number: string;
    value: string;
    error: boolean;
  };
  setNumberOfDisplays: Dispatch<
    SetStateAction<{
      number: string;
      value: string;
      error: boolean;
    }>
  >;
  listexercisessearchedbynameandoptions: SelectOptionsDataExercise[];
  setlistexercisessearchedbynameandoptionsAndOptions: Dispatch<
    SetStateAction<SelectOptionsDataExercise[]>
  >;
  RemoveNameSearchInList: (name: string) => void;
}

export const MuscleExercisesContext = createContext({} as MuscleExercisesProps);

export const MuscleExercisesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [inputsearch, setInputSearch] = useState({ value: '', error: '' });
  const [searchtype, setSearchType] = useState('search');
  const [dropdownbodyparts, setDropDownBodyParts] = useState({
    value: '',
    error: '',
  });
  const [dropdowntarget, setDropDownTarget] = useState({
    value: '',
    error: '',
  });
  const [dropdownquipment, setDropDownEquipment] = useState({
    value: '',
    error: '',
  });
  const [dropdownsearch, setDropDownSearch] = useState<
    SelectOptionsDataExercise[]
  >([]);

  const [loadingdropdownsearch, setLoadingDropDownSearch] = useState(false);

  const [listnamesearch, setListNameSearch] = useState<
    { name: string; id: string }[]
  >([]);

  const [numberofdisplays, setNumberOfDisplays] = useState({
    number: '10',
    value: 'options',
    error: false,
  });

  const [
    listexercisessearchedbynameandoptions,
    setlistexercisessearchedbynameandoptionsAndOptions,
  ] = useState<SelectOptionsDataExercise[]>([]);

  useEffect(() => {
    if (+numberofdisplays.number > 20) {
      setNumberOfDisplays({
        number: Math.floor(+numberofdisplays.number / 10).toString(),
        value: 'options',
        error: false,
      });
    }
  }, [numberofdisplays.number]);

  useEffect(() => {
    const handle = async (value: string) => {
      if (inputsearch.value.length > 0) {
        const arrayValue: SelectOptionsDataExercise[] =
          await UseGetListExercises();
        const newarray = arrayValue.filter(
          (item) =>
            item.name.toLowerCase().startsWith(value) ||
            item.name.startsWith(value)
        );
        setDropDownSearch(newarray);
        setLoadingDropDownSearch(false);
      } else {
        setDropDownSearch([]);
        setLoadingDropDownSearch(false);
      }
    };
    const timeout = setTimeout(() => {
      handle(inputsearch.value);
    }, 500);
    setLoadingDropDownSearch(true);

    return () => clearTimeout(timeout);
  }, [inputsearch.value]);

  useEffect(() => {
    if (searchtype !== 'search') {
      setInputSearch({ value: '', error: '' });
    } else {
      setListNameSearch([]);
      setDropDownBodyParts({ value: '', error: '' });
      setDropDownTarget({ value: '', error: '' });
      setDropDownEquipment({ value: '', error: '' });
    }
  }, [searchtype]);

  const SubmitDropdownSearch = (name: string, id: string) => {
    if (!listnamesearch.some((item) => item.name === name)) {
      setListNameSearch((e) => [...e, { name, id }]);
      setInputSearch({ value: '', error: '' });
      setDropDownSearch([]);
    }
  };

  const RemoveNameSearchInList = (name: string) => {
    const result = listnamesearch.filter((item) => item.name !== name);
    setListNameSearch(result);
  };

  const _CheckSUbmit = () => {
    let isCheck = false;
    if (searchtype === 'search') {
      if (listnamesearch.length === 0) {
        isCheck = true;
        setInputSearch({ value: '', error: 'Not be empty' });
      }
    } else if (
      !dropdownbodyparts.value &&
      !dropdownbodyparts.value &&
      !dropdownbodyparts.value
    ) {
      isCheck = true;
      setDropDownBodyParts({ value: '', error: 'Not be empty' });
      setDropDownTarget({ value: '', error: 'Not be empty' });
      setDropDownEquipment({ value: '', error: 'Not be empty' });
    } else if (
      numberofdisplays.value === 'options' &&
      numberofdisplays.number === ''
    ) {
      isCheck = true;
      setNumberOfDisplays({ value: 'options', error: true, number: '' });
    }
    return !isCheck;
  };

  const Submit = async () => {
    if (_CheckSUbmit()) {
      if (searchtype === 'search') {
        setlistexercisessearchedbynameandoptionsAndOptions([]);
        const imgRef = ref(storage, 'ImagesExercises/');
        const listRef = await listAll(imgRef);
        const allExercises: SelectOptionsDataExercise[] =
          await UseGetListExercises();
        listRef.items.map(async (items) => {
          if (listnamesearch.some((item) => item.id === items.name)) {
            const result = allExercises.find((item) => item.id === items.name);
            if (
              result?.bodyPart &&
              result.equipment &&
              result.id &&
              result.name &&
              result.target
            ) {
              await getDownloadURL(items).then((url) => {
                setlistexercisessearchedbynameandoptionsAndOptions((e) => [
                  ...e,
                  {
                    bodyPart: result?.bodyPart,
                    equipment: result?.equipment,
                    gifUrl: url,
                    id: result?.id,
                    name: result?.name,
                    target: result?.target,
                  },
                ]);
              });
            }
          }
        });
      } else {
        //
      }
    }

    //
  };
  const value = {
    searchtype,
    setSearchType,
    inputsearch,
    setInputSearch,
    dropdownbodyparts,
    setDropDownBodyParts,
    dropdowntarget,
    setDropDownTarget,
    dropdownquipment,
    setDropDownEquipment,
    Submit,
    dropdownsearch,
    setDropDownSearch,
    loadingdropdownsearch,
    setLoadingDropDownSearch,
    SubmitDropdownSearch,
    setListNameSearch,
    listnamesearch,
    numberofdisplays,
    setNumberOfDisplays,
    setlistexercisessearchedbynameandoptionsAndOptions,
    listexercisessearchedbynameandoptions,
    RemoveNameSearchInList,
  };
  return (
    <MuscleExercisesContext.Provider value={value}>
      {children}
    </MuscleExercisesContext.Provider>
  );
};
