import { createAction } from '../../src/actions/createAction';
import reducer from '../../src/reducers/index';
import { authActionTypes } from '../../src/actions/auth';

import assert from 'assert';

describe('auth reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, { data: {} })
  })

  it('saves login data on successful login', () => {
    let state = reducer(undefined, { data: {} })

    state = reducer(state, createAction(authActionTypes.AUTH_LOGIN_SUCCESS, {
      userId: 123,
      authToken: 'xyz'
    }));

    assert.equal(state.auth.userId, 123);
    assert.equal(state.auth.authToken, 'xyz');
  })

  it('stores token with login data', () => {
    let state = reducer(undefined, { data: {} })

    state = reducer(state, createAction(authActionTypes.AUTH_STORE_TOKEN, {
      userId: 321,
      authToken: 'abc'
    }));

    assert.equal(state.auth.userId, 321);
    assert.equal(state.auth.authToken, 'abc');
  })
})
