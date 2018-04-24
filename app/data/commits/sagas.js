import { call, put } from 'redux-saga/effects';
import CommitsActions from './redux';

export function* commitsRequest(http, { token }) {
  const response = yield call(http.commitsRequest, token);

  if (response.ok) {
    yield put(CommitsActions.commitsRequestSuccess(response.data));
  } else {
    yield put(CommitsActions.commitsRequestFailure());
  }
}

export function* commitsRequestFromRepository(http, { token, username, repository }) {
  const response = yield call(http.commitsRequestFromRepository, token, username, repository);

  if (response.ok) {
    yield put(CommitsActions.commitsRequestSuccess(response.data));
  } else {
    yield put(CommitsActions.commitsRequestFailure());
  }
}
