import { call, put } from 'redux-saga/effects';
import RepositoriesActions from './redux';

export default function* userSignIn(http, { token }) {
  const response = yield call(http.repositoriesRequest, token);

  if (response.ok) {
    yield put(RepositoriesActions.repositoriesRequestSuccess(response.data));
  } else {
    yield put(RepositoriesActions.repositoriesRequestFailure());
  }
}
