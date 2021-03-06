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
    const user = {};

    const state = reducer(INITIAL_STATE, Actions.userSignInSuccess(user));

    expect(state).toEqual(
      expect.objectContaining({
        user,
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
