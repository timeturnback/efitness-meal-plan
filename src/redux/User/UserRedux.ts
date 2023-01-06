import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createReducer } from '@reduxjs/toolkit';
import type { AnyAction } from 'redux';

import type { SelectOptionApiFoods } from '../../components/constants/select-options';

export interface UserAction extends AnyAction {}

export interface FoodState {
  foodlist: SelectOptionApiFoods[];
}

const initialState: FoodState = {
  foodlist: [],
};

export const addFood = createAction<SelectOptionApiFoods>('food/addFood');

export const reducer = createReducer(initialState, {
  [addFood.type]: (state, action: PayloadAction<SelectOptionApiFoods>) => {
    const food = action.payload;
    state.foodlist.push(food);
  },
});
