import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  repositoriesRequest: ['token'],
  repositoriesRequestSuccess: ['repositories'],
  repositoriesRequestFailure: null,
});

export const RepositoriesTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  repositories: [],
  requesting: false,
  requestSuccess: null,
});

export const request = state =>
  state.merge({
    requesting: true,
  });

export const requestSuccess = (state, { repositories }) =>
  state.merge({
    repositories,
    requesting: false,
    requestSuccess: true,
  });

export const requestFailure = state =>
  state.merge({
    requesting: false,
    requestSuccess: false,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REPOSITORIES_REQUEST]: request,
  [Types.REPOSITORIES_REQUEST_SUCCESS]: requestSuccess,
  [Types.REPOSITORIES_REQUEST_FAILURE]: requestFailure,
});
