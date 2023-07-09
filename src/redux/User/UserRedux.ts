import type { PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import type { AnyAction } from 'redux';
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';

import type {
  InfoUsers,
  SelectOptionApiFoods,
} from '../../constants/select-options';

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

export interface FoodState {
  foodlist: TypeValue;
  foodsuggestlist: TypeValue;
  users: InfoUsers;
}

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  getUserInfo: null,
});

export const UserTypes = Types;
export default Creators;

const initialState: FoodState = {
  foodlist: {},
  foodsuggestlist: {},
  users: {} as InfoUsers,
};

export const useUserActions = () => {
  const dispatch = useDispatch();

  const foodList = (value: SelectOptionApiFoods) => {
    dispatch({ type: 'foodList', payload: value });
  };

  const foodSuggestList = (value: SelectOptionApiFoods) => {
    dispatch({ type: 'foodSuggestList', payload: value });
  };

  return {
    foodList,
    foodSuggestList,
  };
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
  infousers: (state, action: PayloadAction<InfoUsers>) => ({
    ...state,
    users: { ...state.users, ...action.payload },
  }),
});
