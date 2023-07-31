import { getDownloadURL, listAll, ref } from 'firebase/storage';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';

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
  dropdownequipment: {
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
  listexercisessearchedbyname: SelectOptionsDataExercise[];
  setListExercisesSearchedByName: Dispatch<
    SetStateAction<SelectOptionsDataExercise[]>
  >;
  RemoveNameSearchInList: (name: string) => void;
  itemrenderbysearch: {
    listitem: SelectOptionsDataExercise[];
    index: number;
  };
  setItemRenderBySearch: Dispatch<
    SetStateAction<{
      listitem: SelectOptionsDataExercise[];
      index: number;
    }>
  >;
  itemrenderbyoptionsequipment: {
    listitem: SelectOptionsDataExercise[];
    index: number;
  };
  setItemRenderByoptionsEquipment: Dispatch<
    SetStateAction<{
      listitem: SelectOptionsDataExercise[];
      index: number;
    }>
  >;
  itemrenderbyoptionstarget: {
    listitem: SelectOptionsDataExercise[];
    index: number;
  };
  setItemRenderByOptionsTarget: Dispatch<
    SetStateAction<{
      listitem: SelectOptionsDataExercise[];
      index: number;
    }>
  >;
  itemrenderbyoptionsbodypart: {
    listitem: SelectOptionsDataExercise[];
    index: number;
  };
  setItemRenderByOptionsBodyPart: Dispatch<
    SetStateAction<{
      listitem: SelectOptionsDataExercise[];
      index: number;
    }>
  >;

  listexerciseschoosebyoptions: {
    bodyParts: SelectOptionsDataExercise[];
    target: SelectOptionsDataExercise[];
    equipment: SelectOptionsDataExercise[];
  };
  setListExercisesChooseByOptions: Dispatch<
    SetStateAction<{
      bodyParts: SelectOptionsDataExercise[];
      target: SelectOptionsDataExercise[];
      equipment: SelectOptionsDataExercise[];
    }>
  >;

  optionsrender: string;
  setOptionsRender: Dispatch<SetStateAction<string>>;
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
  const [dropdownequipment, setDropDownEquipment] = useState({
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

  const [itemrenderbysearch, setItemRenderBySearch] = useState<{
    listitem: SelectOptionsDataExercise[];
    index: number;
  }>({
    listitem: [],
    index: 0,
  });
  const [itemrenderbyoptionsbodypart, setItemRenderByOptionsBodyPart] =
    useState<{
      listitem: SelectOptionsDataExercise[];
      index: number;
    }>({
      listitem: [],
      index: 0,
    });
  const [itemrenderbyoptionstarget, setItemRenderByOptionsTarget] = useState<{
    listitem: SelectOptionsDataExercise[];
    index: number;
  }>({
    listitem: [],
    index: 0,
  });
  const [itemrenderbyoptionsequipment, setItemRenderByoptionsEquipment] =
    useState<{
      listitem: SelectOptionsDataExercise[];
      index: number;
    }>({
      listitem: [],
      index: 0,
    });

  const [listexercisessearchedbyname, setListExercisesSearchedByName] =
    useState<SelectOptionsDataExercise[]>([]);

  const [listexerciseschoosebyoptions, setListExercisesChooseByOptions] =
    useState<{
      bodyParts: SelectOptionsDataExercise[];
      target: SelectOptionsDataExercise[];
      equipment: SelectOptionsDataExercise[];
    }>({
      bodyParts: [],
      target: [],
      equipment: [],
    });

  const [optionsrender, setOptionsRender] = useState('bodyparts');

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
      !dropdownequipment.value &&
      !dropdowntarget.value
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

  const AllIdExercises = useMemo(async () => {
    const imgRef = ref(storage, 'ImagesExercises/');
    const listRef = await listAll(imgRef);
    return listRef;
  }, []);

  const _handleSubmitSearch = async (data: SelectOptionsDataExercise[]) => {
    // const imgRef = ref(storage, 'ImagesExercises/');
    // const listRef = await listAll(imgRef);
    (await AllIdExercises).items.map(async (items) => {
      if (listnamesearch.some((item) => item.id === items.name)) {
        const result = data.find((item) => item.id === items.name);
        if (
          result?.bodyPart &&
          result.equipment &&
          result.id &&
          result.name &&
          result.target
        ) {
          await getDownloadURL(items).then((url) => {
            setListExercisesSearchedByName((e) => [
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
  };

  function isSelectOptionsDataExercise(
    item: SelectOptionsDataExercise | undefined
  ): item is SelectOptionsDataExercise {
    return item !== undefined;
  }

  const getDataListExercises = async (
    name: string,
    data: SelectOptionsDataExercise[],
    isCheck: string
  ) => {
    if (!isCheck) {
      return Promise.resolve([[], []]);
    }

    let Result: SelectOptionsDataExercise[] = [];

    let ResultAll: SelectOptionsDataExercise[] = [];

    const filterFunction = (element: {
      bodyPart: string;
      equipment: string;
      target: string;
    }) => {
      if (name === 'bodyPart') {
        return element.bodyPart === dropdownbodyparts.value;
      }
      if (name === 'equipment') {
        return element.equipment === dropdownequipment.value;
      }
      if (name === 'target') {
        return element.target === dropdowntarget.value;
      }
      return false;
    };

    const filteredResults = await Promise.all(
      data
        .filter(filterFunction)
        .map(
          async (element: {
            id: string;
            bodyPart: any;
            equipment: any;
            name: any;
            target: any;
          }) => {
            const result = (await AllIdExercises).items.find(
              (items) => items.name === element.id
            );
            if (result) {
              const url = await getDownloadURL(result);
              return {
                bodyPart: element.bodyPart,
                equipment: element.equipment,
                gifUrl: url,
                id: element.id,
                name: element.name,
                target: element.target,
              };
            }
            return undefined;
          }
        )
    );

    ResultAll = filteredResults.filter(isSelectOptionsDataExercise);
    Result = ResultAll.sort(() => Math.random() - 0.5).slice(
      0,
      Math.min(+numberofdisplays.number, ResultAll.length)
    );
    return Promise.resolve([Result, ResultAll]);
  };

  const Submit = async () => {
    if (_CheckSUbmit()) {
      setListExercisesSearchedByName([]);
      setListExercisesChooseByOptions({
        bodyParts: [],
        equipment: [],
        target: [],
      });
      const allExercises: SelectOptionsDataExercise[] =
        await UseGetListExercises();
      if (searchtype === 'search') {
        _handleSubmitSearch(allExercises);
      } else {
        const [bodyPartsResult, bodyPartsResultAll] =
          await getDataListExercises(
            'bodyPart',
            allExercises,
            dropdownbodyparts.value
          );
        const [equipmentResult, equipmentResultAll] =
          await getDataListExercises(
            'equipment',
            allExercises,
            dropdownequipment.value
          );
        const [targetResult, targetResultAll] = await getDataListExercises(
          'target',
          allExercises,
          dropdowntarget.value
        );

        if (numberofdisplays.value === 'options') {
          setListExercisesChooseByOptions({
            ...listexerciseschoosebyoptions,
            bodyParts: bodyPartsResult || [],
            equipment: equipmentResult || [],
            target: targetResult || [],
          });
        } else {
          setListExercisesChooseByOptions({
            ...listexerciseschoosebyoptions,
            bodyParts: bodyPartsResultAll || [],
            equipment: equipmentResultAll || [],
            target: targetResultAll || [],
          });
        }
      }
    }
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
    dropdownequipment,
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
    setListExercisesSearchedByName,
    listexercisessearchedbyname,
    RemoveNameSearchInList,
    setItemRenderBySearch,
    itemrenderbysearch,
    listexerciseschoosebyoptions,
    setListExercisesChooseByOptions,
    optionsrender,
    setOptionsRender,
    itemrenderbyoptionsequipment,
    itemrenderbyoptionstarget,
    itemrenderbyoptionsbodypart,
    setItemRenderByoptionsEquipment,
    setItemRenderByOptionsTarget,
    setItemRenderByOptionsBodyPart,
  };
  return (
    <MuscleExercisesContext.Provider value={value}>
      {children}
    </MuscleExercisesContext.Provider>
  );
};
