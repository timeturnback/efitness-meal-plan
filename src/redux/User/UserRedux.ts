import type { PayloadAction } from '@reduxjs/toolkit';
import type { AnyAction } from 'redux';
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';

import type { SelectOptionApiFoods } from '../../components/constants/select-options';

/* ------------- Model interface Create Action ------------- */
export interface UserAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  GET_USER_INFO: 'getUserInfo';
}

interface IActionCreators extends DefaultActionCreators {
  setCurrentUserInfo: (data: SelectOptionApiFoods) => AnyAction;
}

export interface UserState {
  foodlist: SelectOptionApiFoods[];
  beanslist: SelectOptionApiFoods[];
  cereallist: SelectOptionApiFoods[];
  fruitslist: SelectOptionApiFoods[];
  milklist: SelectOptionApiFoods[];
  vegetableslist: SelectOptionApiFoods[];
  valuemainsuggestlist: String[];
}

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  getUserInfo: null,
});

export const UserTypes = Types;
export default Creators;

const initialState: UserState = {
  foodlist: [],
  beanslist: [],
  cereallist: [],
  fruitslist: [],
  milklist: [],
  vegetableslist: [],
  valuemainsuggestlist: [],
};

export const reducer = createReducer(initialState, {
  foodList: (state, action: PayloadAction<SelectOptionApiFoods>) => ({
    ...state,
    foodlist: [...state.foodlist, action.payload],
  }),
  itemBeansList: (state, action: PayloadAction<SelectOptionApiFoods>) => ({
    ...state,
    beanslist: [...state.beanslist, action.payload],
  }),
  itemCerealList: (state, action: PayloadAction<SelectOptionApiFoods>) => ({
    ...state,
    cereallist: [...state.cereallist, action.payload],
  }),
  itemFruitsList: (state, action: PayloadAction<SelectOptionApiFoods>) => ({
    ...state,
    fruitslist: [...state.fruitslist, action.payload],
  }),
  itemMilkList: (state, action: PayloadAction<SelectOptionApiFoods>) => ({
    ...state,
    milklist: [...state.milklist, action.payload],
  }),
  itemVegetablesList: (state, action: PayloadAction<SelectOptionApiFoods>) => ({
    ...state,
    vegetableslist: [...state.vegetableslist, action.payload],
  }),
  valueMainSuggestList: (state, action: PayloadAction<string>) => ({
    ...state,
    valuemainsuggestlist: [...state.valuemainsuggestlist, action.payload],
  }),
});
