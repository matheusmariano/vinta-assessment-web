import { all, takeLatest } from 'redux-saga/effects';
import HttpService from '../services/HttpService';

import { UserTypes } from './user/redux';
import userSignIn from './user/sagas';

import { RepositoriesTypes } from './repositories/redux';
import repositoriesRequest from './repositories/sagas';

const http = HttpService.create();

export default function* root() {
  yield all([
    takeLatest(UserTypes.USER_SIGN_IN, userSignIn, http),
    takeLatest(RepositoriesTypes.REPOSITORIES_REQUEST, repositoriesRequest, http),
  ]);
}
