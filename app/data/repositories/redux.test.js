import Actions, { INITIAL_STATE, reducer } from './redux';

describe('Repositories Redux', () => {
  test('request', () => {
    const state = reducer(INITIAL_STATE, Actions.repositoriesRequest());

    expect(state).toEqual(
      expect.objectContaining({
        requesting: true,
      }),
    );
  });

  test('requestSuccess', () => {
    const repositories = [];

    const state = reducer(INITIAL_STATE, Actions.repositoriesRequestSuccess(repositories));

    expect(state).toEqual(
      expect.objectContaining({
        repositories,
        requesting: false,
        requestSuccess: true,
      }),
    );
  });

  test('requestFailure', () => {
    const state = reducer(INITIAL_STATE, Actions.repositoriesRequestFailure());

    expect(state).toEqual(
      expect.objectContaining({
        requesting: false,
        requestSuccess: false,
      }),
    );
  });
});
