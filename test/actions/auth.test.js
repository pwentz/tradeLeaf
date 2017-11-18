import { authActionTypes, createAuthActions } from '../../src/actions/auth';
import { createAction } from '../../src/actions/createAction';

import { MockDispatch } from './utils';
import { expect } from 'chai'

class MockApi {
  login(username, password) {
    return Promise.resolve({ userId: 1, token: 'abc123' })
  }

  registerUser(firstName, lastName, email, username, password) {
    return Promise.resolve(1)
  }

  persistAuthToken(userId, authToken) {
    return Promise.resolve()
  }

  retrieveAuthToken() {
    return Promise.resolve({ userId: 1, authToken: 'abc123' })
  }

  logout() {
    return Promise.resolve()
  }
}

const mockDispatch = new MockDispatch();
const actions = createAuthActions(new MockApi());

describe('createAction', () => {
  it('throws on payload with a "type" key', () => {
    expect(() => createAction('SOME_TYPE', {type:123})).to.throw();
  });
});

describe('auth actions', () => {
  beforeEach(() => {
    mockDispatch.reset();
  })

  it('can login and get auth token', (done) => {
    mockDispatch.dispatch(actions.loginAndStoreToken('fred2', 'password'))
      .then(res => {

        expect(mockDispatch.actions).to.deep.equal([
          { type: authActionTypes.AUTH_LOGIN, username: 'fred2' },
          { type: authActionTypes.AUTH_LOGIN_SUCCESS, userId: 1, authToken: 'abc123' }
        ])

        expect(res).to.deep.equal({ userId: 1, authToken: 'abc123' });
        done()
      })
      .catch(done)
  });

  it('logs the user in after registering', (done) => {
    const user = {
      firstName: 'fred',
      lastName: 'jackson',
      email: 'fjack@yahoo.com',
      username: 'freddyjack1',
      password: 'password'
    }

    const { firstName, lastName, email, username, password } = user;
    mockDispatch.dispatch(
      actions.registerUserAndLogin(firstName, lastName, email, username, password)
    )
      .then(res => {

        expect(mockDispatch.actions).to.deep.equal([
          { type: authActionTypes.AUTH_REGISTER, username: 'freddyjack1' },
          { type: authActionTypes.AUTH_REGISTER_SUCCESS, userId: 1 },
          { type: authActionTypes.AUTH_LOGIN, username: 'freddyjack1' },
          { type: authActionTypes.AUTH_LOGIN_SUCCESS, userId: 1, authToken: 'abc123' }
        ]);

        expect(res).to.deep.equal({ userId: 1, authToken: 'abc123' });

        done();
      })
      .catch(done);
  });

  it('can store the auth token directly', () => {
    mockDispatch.dispatch(actions.storeToken(1, 'abc123'))

    expect(mockDispatch.actions).to.deep.equal([
      { type: authActionTypes.AUTH_STORE_TOKEN, userId: 1, authToken: 'abc123'}
    ]);
  });

  it('can persist auth token and user id', (done) => {
    mockDispatch.dispatch(actions.persistAuthToken(1, 'abc123'))
      .then(() => {

        expect(mockDispatch.actions).to.deep.equal([
          { type: authActionTypes.AUTH_PERSIST_TOKEN, userId: 1, authToken: 'abc123' },
          { type: authActionTypes.AUTH_PERSIST_TOKEN_SUCCESS, userId: 1, authToken: 'abc123' }
        ]);

        done();
      })
      .catch(done);
  });

  it('can retrieve the auth token', (done) => {
    mockDispatch.dispatch(actions.retrieveAuthToken())
      .then(res => {

        expect(mockDispatch.actions).to.deep.equal([
          { type: authActionTypes.AUTH_RETRIEVE_TOKEN },
          { type: authActionTypes.AUTH_RETRIEVE_TOKEN_SUCCESS, userId: 1, authToken: 'abc123' }
        ]);

        expect(res).to.deep.equal({ userId: 1, authToken: 'abc123' });
        done();
      })
      .catch(done);
  });

  it('can logout', (done) => {
    mockDispatch.dispatch(actions.logout())
      .then(() => {

        expect(mockDispatch.actions).to.deep.equal([
          { type: authActionTypes.AUTH_LOGOUT },
          { type: authActionTypes.AUTH_LOGOUT_SUCCESS }
        ])

        done();
      })
      .catch(done);
  });
});
