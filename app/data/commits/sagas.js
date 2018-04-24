import { call, put } from 'redux-saga/effects';
import CommitsActions from './redux';

export default function* commitsRequest(http, { token }) {
  const response = yield call(http.commitsRequest, token);

  if (response.ok) {
    yield put(CommitsActions.commitsRequestSuccess(response.data));
  } else {
    yield put(CommitsActions.commitsRequestFailure());
  }
}
