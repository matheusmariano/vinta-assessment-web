import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  userSignIn: ['token'],
  userSignInSuccess: null,
  userSignInFailure: null,
});

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  user: null,
  requesting: false,
  requestSuccess: null,
});

export const signIn = state =>
  state.merge({
    requesting: true,
  });

export const signInSuccess = state =>
  state.merge({
    requesting: false,
    requestSuccess: true,
  });

export const signInFailure = state =>
  state.merge({
    requesting: false,
    requestSuccess: false,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_SIGN_IN]: signIn,
  [Types.USER_SIGN_IN_SUCCESS]: signInSuccess,
  [Types.USER_SIGN_IN_FAILURE]: signInFailure,
});
