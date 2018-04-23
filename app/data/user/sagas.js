import { call, put } from 'redux-saga/effects';
import UserActions from './redux';

export default function* userSignIn(http, { token }) {
  const response = yield call(http.userSignIn, token);

  if (response.ok) {
    yield put(UserActions.userSignInSuccess());
  } else {
    yield put(UserActions.userSignInFailure());
  }
}
