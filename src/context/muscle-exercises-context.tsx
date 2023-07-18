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
  dropdowntype: {
    value: string;
    error: string;
  };
  setDropDownType: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  dropdownmusclegroup: {
    value: string;
    error: string;
  };
  setDropDownMuscleGroup: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  dropdowndifficulty: {
    value: string;
    error: string;
  };
  setDropDownDifficulty: Dispatch<
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
  const [dropdowntype, setDropDownType] = useState({ value: '', error: '' });
  const [dropdownmusclegroup, setDropDownMuscleGroup] = useState({
    value: '',
    error: '',
  });
  const [dropdowndifficulty, setDropDownDifficulty] = useState({
    value: '',
    error: '',
  });
  // const [searchcurrent, setSearchCurrent] = useState();

  useEffect(() => {
    if (searchtype !== 'search') {
      setInputSearch({ ...inputsearch, error: '' });
    } else {
      setDropDownType({ ...dropdowntype, error: '' });
      setDropDownMuscleGroup({ ...dropdownmusclegroup, error: '' });
      setDropDownDifficulty({ ...dropdowndifficulty, error: '' });
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
      if (!dropdowntype.value) {
        isCheck = true;
        setDropDownType({ value: '', error: 'Not be empty' });
      }
      if (!dropdowntype.value) {
        isCheck = true;
        setDropDownMuscleGroup({ value: '', error: 'Not be empty' });
      }
      if (!dropdowntype.value) {
        isCheck = true;
        setDropDownDifficulty({ value: '', error: 'Not be empty' });
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
    dropdowntype,
    setDropDownType,
    dropdownmusclegroup,
    setDropDownMuscleGroup,
    dropdowndifficulty,
    setDropDownDifficulty,
    Submit,
  };
  return (
    <MuscleExercisesContext.Provider value={value}>
      {children}
    </MuscleExercisesContext.Provider>
  );
};
