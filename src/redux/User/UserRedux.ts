import type { PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
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

export interface SelectOptionVerifyPage {
  title: string;
  email: string;
  query: string;
  code: string | number;
}

export type TypeValueVerifyPData = {
  reset_password: SelectOptionVerifyPage;
  signup: {};
};

export interface FoodState {
  foodlist: TypeValue;
  foodsuggestlist: TypeValue;
  verify_p_data: TypeValueVerifyPData;
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
  verify_p_data: {} as TypeValueVerifyPData,
};

export const useUserActions = () => {
  const dispatch = useDispatch();

  const foodList = (value: SelectOptionApiFoods) => {
    dispatch({ type: 'foodList', payload: value });
  };

  const foodSuggestList = (value: SelectOptionApiFoods) => {
    dispatch({ type: 'foodSuggestList', payload: value });
  };

  const verifyPageData = (value: TypeValue) => {
    dispatch({ type: 'verifyPageData', payload: value });
  };

  const DELETEItemVerifyPageData = (value: SelectOptionVerifyPage) => {
    dispatch({ type: 'DELETEItemVerifyPageData', payload: value });
  };

  return {
    foodList,
    foodSuggestList,
    verifyPageData,
    DELETEItemVerifyPageData,
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
  verifyPageData: (state, action: PayloadAction<SelectOptionVerifyPage>) => ({
    ...state,
    verify_p_data: { ...state.verify_p_data, ...action.payload },
  }),
  DELETEItemVerifyPageData: (state) => ({
    ...state,
    // verify_p_data: state.verify_p_data.filter(
    //   (item) => item.title !== action.payload.title
    // ),
  }),
});
