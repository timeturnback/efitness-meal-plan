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

export type TypeValue = {
  [key: string]: any;
};

export interface UserState {
  foodlist: TypeValue;
  foodsuggestlist: TypeValue;
}

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  getUserInfo: null,
});

export const UserTypes = Types;
export default Creators;

const initialState: UserState = {
  foodlist: {},
  foodsuggestlist: {},
};

export const reducer = createReducer(initialState, {
  foodList: (state, action: PayloadAction<SelectOptionApiFoods>) => ({
    ...state,
    foodlist: { ...state.foodlist, ...action.payload },
  }),
  foodSuggestList: (state, action: PayloadAction<SelectOptionApiFoods>) => ({
    ...state,
    foodsuggestlist: { ...state.foodsuggestlist, ...action.payload },
  }),
});
