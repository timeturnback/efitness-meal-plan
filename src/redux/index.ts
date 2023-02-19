/* eslint-disable global-require */
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import immutablePersistenceTransform from './immutable-persistence-transfrom';
// import logger from 'redux-logger';
import Saga from './saga';
import type { FoodState } from './User/UserRedux';
import { reducer as FoodReducer } from './User/UserRedux';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  user: FoodReducer,
});

const persistConfig = {
  key: 'data',
  storage,
  whitelist: ['user'],
  transforms: [immutablePersistenceTransform],
};

const Redux = () => {
  const finalReducers = persistReducer(persistConfig, reducers);

  const store = createStore(finalReducers, Saga);

  const persistor = persistStore(store);

  return { store, persistor };
};

export default Redux;

const createStore = (rootReducer: any, rootSaga: any) => {
  const middleware = [];
  // middleware.push(logger)

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  const store = configureStore({
    reducer: rootReducer,
    middleware,
  });
  sagaMiddleware.run(rootSaga);

  return store;
};

export type RootState = ReturnType<typeof reducers>;
export const selector = {
  food: (state: RootState) => state.user as unknown as FoodState,
};
