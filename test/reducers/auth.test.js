import { createAction } from '../../src/actions/createAction';
import reducer from '../../src/reducers/index';
import { authActionTypes } from '../../src/actions/auth';

import { expect } from 'chai';

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

    expect(state.auth.userId).to.equal(123)
    expect(state.auth.authToken).to.equal('xyz')
  })

  it('stores token with login data', () => {
    let state = reducer(undefined, { data: {} })

    state = reducer(state, createAction(authActionTypes.AUTH_STORE_TOKEN, {
      userId: 321,
      authToken: 'abc'
    }));

    expect(state.auth.userId).to.equal(321)
    expect(state.auth.authToken).to.equal('abc')
  })
})
