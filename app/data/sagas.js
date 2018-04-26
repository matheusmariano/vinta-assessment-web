import { all, takeLatest } from 'redux-saga/effects';
import HttpService from '../services/HttpService';

import { UserTypes } from './user/redux';
import userSignIn from './user/sagas';

import { RepositoriesTypes } from './repositories/redux';
import { repositoriesRequest, repositoriesAdd } from './repositories/sagas';

import { CommitsTypes } from './commits/redux';
import {
  commitsRequest,
  commitsRequestFromRepository,
} from './commits/sagas';

const http = HttpService.create();

export default function* root() {
  yield all([
    takeLatest(UserTypes.USER_SIGN_IN, userSignIn, http),
    takeLatest(RepositoriesTypes.REPOSITORIES_REQUEST, repositoriesRequest, http),
    takeLatest(RepositoriesTypes.REPOSITORIES_ADD, repositoriesAdd, http),
    takeLatest(CommitsTypes.COMMITS_REQUEST, commitsRequest, http),
    takeLatest(CommitsTypes.COMMITS_REQUEST_FROM_REPOSITORY, commitsRequestFromRepository, http),
  ]);
}
