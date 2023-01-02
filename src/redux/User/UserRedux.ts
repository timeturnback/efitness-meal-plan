import type { AnyAction } from 'redux';
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

/* ------------- Model interface Create Action ------------- */
export interface UserAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SET_CURRENT_USER_INFO: 'setCurrentUserInfo';
  GET_USER_INFO: 'getUserInfo';
  SET_CURRENT_WORKSPACE: 'setCurrentWorkspace';
}

interface IActionCreators extends DefaultActionCreators {
  setCurrentUserInfo: (data: any) => AnyAction;
  setToken: (token: string) => AnyAction;
  setCurrentWorkspace: (data: any) => AnyAction;
}

type IActions = UserAction | AnyAction;

export interface UserState {
  currentUserInfo: any;
  isLoggedIn: boolean;
  currentWorkspace: any;
}

type ImmutableMyType = Immutable.ImmutableObject<UserState>;

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  setCurrentUserInfo: ['data'],
  getUserInfo: null,
  setCurrentWorkspace: ['data'],
});

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE: ImmutableMyType = Immutable.from({
  currentUserInfo: undefined,
  isLoggedIn: false,
  currentWorkspace: undefined,
});

export const setCurrentUserInfo = (
  state: ImmutableMyType,
  { data }: { data: any }
) => state.merge({ currentUserInfo: data, isLoggedIn: !!data });

export const setCurrentWorkspace = (
  state: ImmutableMyType,
  { data }: { data: any }
) => state.merge({ currentWorkspace: data });

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.SET_CURRENT_USER_INFO]: setCurrentUserInfo,
  [Types.SET_CURRENT_WORKSPACE]: setCurrentWorkspace,
});
