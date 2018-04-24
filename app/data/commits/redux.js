import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  commitsRequest: ['token'],
  commitsRequestFromRepository: ['token', 'username', 'repository'],
  commitsRequestSuccess: ['commits'],
  commitsRequestFailure: null,
});

export const CommitsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  commits: [],
  requesting: false,
  requestSuccess: null,
});

export const request = state =>
  state.merge({
    requesting: true,
  });

export const requestFromRepository = state =>
  state.merge({
    requesting: true,
  });

export const requestSuccess = (state, { commits }) =>
  state.merge({
    commits,
    requesting: false,
    requestSuccess: true,
  });

export const requestFailure = state =>
  state.merge({
    requesting: false,
    requestSuccess: false,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COMMITS_REQUEST]: request,
  [Types.COMMITS_REQUEST_FROM_REPOSITORY]: requestFromRepository,
  [Types.COMMITS_REQUEST_SUCCESS]: requestSuccess,
  [Types.COMMITS_REQUEST_FAILURE]: requestFailure,
});
