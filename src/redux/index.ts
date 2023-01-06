import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/lib/persistStore';
import { storage } from 'redux-persist/lib/storage';

import immutablePersistenceTransform from './immutable-persistence-transfrom';
import type { FoodState } from './User/UserRedux';
import { reducer as FoodReducer } from './User/UserRedux';

export const reducers = combineReducers({
  food: FoodReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  transforms: [immutablePersistenceTransform],
};

const Redux = () => {
  const finalReducers = persistReducer(persistConfig, reducers);
  const store = createStore(finalReducers);
  const persistor = persistStore(store);

  return { store, persistor };
};

export default Redux;

const createStore = (rootReducer: any) => {
  const store = configureStore({
    reducer: rootReducer,
  });
  return store;
};

export type RootState = ReturnType<typeof reducers>;
export const selector = {
  food: (state: RootState) => state.food as unknown as FoodState,
};
