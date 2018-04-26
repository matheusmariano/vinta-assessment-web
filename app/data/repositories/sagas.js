import { call, put } from 'redux-saga/effects';
import RepositoriesActions from './redux';

export function* repositoriesRequest(http, { token }) {
  const response = yield call(http.repositoriesRequest, token);

  if (response.ok) {
    yield put(RepositoriesActions.repositoriesRequestSuccess(response.data));
  } else {
    yield put(RepositoriesActions.repositoriesRequestFailure());
  }
}

export function* repositoriesAdd(http, { token, name }) {
  const response = yield call(http.repositoriesAdd, token, name);

  if (response.ok) {
    yield put(RepositoriesActions.repositoriesAddSuccess(response.data));
  } else {
    yield put(RepositoriesActions.repositoriesAddFailure());
  }
}
