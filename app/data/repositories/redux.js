import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import R from 'ramda';

const { Types, Creators } = createActions({
  repositoriesRequest: ['token'],
  repositoriesRequestSuccess: ['repositories'],
  repositoriesRequestFailure: null,
  repositoriesAdd: ['token', 'name'],
  repositoriesAddSuccess: ['repository'],
  repositoriesAddFailure: null,
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
    requestSuccess: null,
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

export const add = state =>
  state.merge({
    requesting: true,
    requestSuccess: null,
  });

export const addSuccess = (state, { repository }) =>
  state.merge({
    repositories: R.prepend(repository, state.repositories),
    requesting: false,
    requestSuccess: true,
  });

export const addFailure = state =>
  state.merge({
    requesting: false,
    requestSuccess: false,
  })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REPOSITORIES_REQUEST]: request,
  [Types.REPOSITORIES_REQUEST_SUCCESS]: requestSuccess,
  [Types.REPOSITORIES_REQUEST_FAILURE]: requestFailure,
  [Types.REPOSITORIES_ADD]: add,
  [Types.REPOSITORIES_ADD_SUCCESS]: addSuccess,
  [Types.REPOSITORIES_ADD_FAILURE]: addFailure,
});
