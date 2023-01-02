import { all, takeLatest } from 'redux-saga/effects';

import { UserTypes } from './User/UserRedux';
import { getUserInfo } from './User/UserSaga';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // user

    takeLatest(UserTypes.GET_USER_INFO, getUserInfo),
  ]);
}
