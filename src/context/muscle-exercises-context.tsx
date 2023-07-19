import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';

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
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  SubmitDropDownSearch: (value: string) => void;
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

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const handle = async (value: string) => {
      if (inputsearch.value.length > 0 && !disabled) {
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

  // useEffect(() => {
  //   if (!inputsearch.value) setDisabled(false);
  // }, [inputsearch.value]);

  useEffect(() => {
    if (searchtype !== 'search') {
      setInputSearch({ value: '', error: '' });
    } else {
      setDropDownBodyParts({ value: '', error: '' });
      setDropDownTarget({ value: '', error: '' });
      setDropDownEquipment({ value: '', error: '' });
    }
  }, [searchtype]);

  const SubmitDropDownSearch = (value: string) => {
    setDisabled(true);
    setInputSearch({ value, error: '' });
    setDropDownSearch([]);
  };

  const _CheckSUbmit = () => {
    let isCheck = false;
    if (searchtype === 'search') {
      if (!inputsearch.value) {
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
    }
    return !isCheck;
  };

  const Submit = async () => {
    if (_CheckSUbmit()) {
      if (searchtype === 'search') {
        //
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
    disabled,
    setDisabled,
    SubmitDropDownSearch,
  };
  return (
    <MuscleExercisesContext.Provider value={value}>
      {children}
    </MuscleExercisesContext.Provider>
  );
};
