import Actions, { INITIAL_STATE, reducer } from './redux';

describe('User Redux', () => {
  test('signIn', () => {
    const state = reducer(INITIAL_STATE, Actions.userSignIn());

    expect(state).toEqual(
      expect.objectContaining({
        requesting: true,
      }),
    );
  });

  test('signInSuccess', () => {
    const state = reducer(INITIAL_STATE, Actions.userSignInSuccess());

    expect(state).toEqual(
      expect.objectContaining({
        requesting: false,
        requestSuccess: true,
      }),
    );
  });

  test('signInFailure', () => {
    const state = reducer(INITIAL_STATE, Actions.userSignInFailure());

    expect(state).toEqual(
      expect.objectContaining({
        requesting: false,
        requestSuccess: false,
      }),
    );
  });
});
