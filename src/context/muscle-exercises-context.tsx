import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';

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
  // const [searchcurrent, setSearchCurrent] = useState();

  useEffect(() => {
    if (searchtype !== 'search') {
      setInputSearch({ ...inputsearch, error: '' });
    } else {
      setDropDownBodyParts({ ...dropdownbodyparts, error: '' });
      setDropDownTarget({ ...dropdowntarget, error: '' });
      setDropDownEquipment({ ...dropdownquipment, error: '' });
    }
  }, [searchtype]);

  const _CheckSUbmit = () => {
    let isCheck = false;
    if (searchtype === 'search') {
      if (!inputsearch.value) {
        isCheck = true;
        setInputSearch({ value: '', error: 'Not be empty' });
      }
    } else {
      if (!dropdownbodyparts.value) {
        isCheck = true;
        setDropDownBodyParts({ value: '', error: 'Not be empty' });
      }
      if (!dropdownbodyparts.value) {
        isCheck = true;
        setDropDownTarget({ value: '', error: 'Not be empty' });
      }
      if (!dropdownbodyparts.value) {
        isCheck = true;
        setDropDownEquipment({ value: '', error: 'Not be empty' });
      }
    }
    return isCheck;
  };

  const Submit = () => {
    if (_CheckSUbmit()) {
      console.log('a');
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
  };
  return (
    <MuscleExercisesContext.Provider value={value}>
      {children}
    </MuscleExercisesContext.Provider>
  );
};
