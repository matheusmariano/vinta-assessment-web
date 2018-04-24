import Actions, { INITIAL_STATE, reducer } from './redux';

describe('Commits Redux', () => {
  test('request', () => {
    const state = reducer(INITIAL_STATE, Actions.commitsRequest());

    expect(state).toEqual(
      expect.objectContaining({
        requesting: true,
      }),
    );
  });

  test('requestSuccess', () => {
    const commits = [];

    const state = reducer(INITIAL_STATE, Actions.commitsRequestSuccess(commits));

    expect(state).toEqual(
      expect.objectContaining({
        commits,
        requesting: false,
        requestSuccess: true,
      }),
    );
  });

  test('requestFailure', () => {
    const state = reducer(INITIAL_STATE, Actions.commitsRequestFailure());

    expect(state).toEqual(
      expect.objectContaining({
        requesting: false,
        requestSuccess: false,
      }),
    );
  });
});
