import { call, put } from 'redux-saga/effects';
import FixtureService from '../../services/FixtureService';
import UserActions from './redux';
import userSignIn from './sagas';

const stepper = fn => mock => fn.next(mock).value;
const token = 'secret';

describe('Profile Sagas', () => {
  test('profileRequest', () => {
    const step = stepper(
      userSignIn(FixtureService, { token }),
    );

    expect(
      step(),
    ).toEqual(
      call(FixtureService.userSignIn, token),
    );
  });

  test('profileRequestSuccess', () => {
    const response = { ok: true };
    const step = stepper(
      userSignIn(FixtureService, { token }),
    );

    step();

    expect(
      step(response),
    ).toEqual(
      put(UserActions.userSignInSuccess()),
    );
  });

  test('profileRequestFailure', () => {
    const response = { ok: false };
    const step = stepper(
      userSignIn(FixtureService, { token }),
    );

    step();

    expect(
      step(response),
    ).toEqual(
      put(UserActions.userSignInFailure()),
    );
  });
});
