import { createAction } from './createAction';

export const authActionTypes = {
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILURE: 'AUTH_LOGIN_FAILURE',

  AUTH_REGISTER: 'AUTH_REGISTER',
  AUTH_REGISTER_SUCCESS: 'AUTH_REGISTER_SUCCESS',
  AUTH_REGISTER_FAILURE: 'AUTH_REGISTER_FAILURE',

  AUTH_PERSIST_TOKEN: 'AUTH_PERSIST_TOKEN',
  AUTH_PERSIST_TOKEN_SUCCESS: 'AUTH_PERSIST_TOKEN_SUCCESS',
  AUTH_PERSIST_TOKEN_FAILURE: 'AUTH_PERSIST_TOKEN_FAILURE',

  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS',
  AUTH_LOGOUT_FAILURE: 'AUTH_LOGOUT_FAILURE',

  AUTH_STORE_TOKEN: 'AUTH_STORE_TOKEN',

  AUTH_RETRIEVE_TOKEN: 'AUTH_RETRIEVE_TOKEN',
  AUTH_RETRIEVE_TOKEN_SUCCESS: 'AUTH_RETRIEVE_TOKEN_SUCCESS',
  AUTH_RETRIEVE_TOKEN_FAILURE: 'AUTH_RETRIEVE_TOKEN_FAILURE'
}

export function createAuthActions(api) {
  function loginAndStoreToken(username, password) {
    return dispatch => {
      dispatch(createAction(authActionTypes.AUTH_LOGIN));
      return api.login(username, password)
        .then(res => {
          const data = { userId: res.userId, authToken: res.token }
          dispatch(createAction(authActionTypes.AUTH_LOGIN_SUCCESS, data))
          return data
        })
        .catch(error => {
          dispatch(createAction(authActionTypes.AUTH_LOGIN_FAILURE, {error}))
          throw error
        })
    };
  };

  function registerUser(firstName, lastName, email, username, password) {
    return dispatch => {
      dispatch(createAction(authActionTypes.AUTH_REGISTER, {username}))
      return api.registerUser(firstName, lastName, email, username, password)
        .then(userId => {
          dispatch(createAction(authActionTypes.AUTH_REGISTER_SUCCESS, {userId}));
          return userId;
        })
        .catch(error => {
          dispatch(createAction(authActionTypes.AUTH_REGISTER_FAILURE, {username, error}));
          throw error;
        });
    };
  };

  function registerUserAndLogin(firstName, lastName, email, username, password) {
    return dispatch => {
      return dispatch(registerUser(firstName, lastName, email, username, password))
        .then((userId) => {
          return dispatch(loginAndStoreToken(username, password));
        });
    }
  }

  function storeToken(userId, authToken) {
    return dispatch => {
      dispatch(createAction(authActionTypes.AUTH_STORE_TOKEN, {userId, authToken}))
    }
  }

  function persistAuthToken(userId, authToken) {
    return dispatch => {
      dispatch(createAction(authActionTypes.AUTH_PERSIST_TOKEN, {userId, authToken}))
      return api.persistAuthToken(userId, authToken)
        .then(() => {
          dispatch(createAction(authActionTypes.AUTH_PERSIST_TOKEN_SUCCESS, {userId, authToken}))
        })
        .catch(err => {
          dispatch(createAction(authActionTypes.AUTH_PERSIST_TOKEN_FAILURE, {err}))
          throw err
        })
    }
  }

  function retrieveAuthToken() {
    return dispatch => {
      dispatch(createAction(authActionTypes.AUTH_RETRIEVE_TOKEN))
      return api.retrieveAuthToken()
        .then(data => {
          dispatch(createAction(authActionTypes.AUTH_RETRIEVE_TOKEN_SUCCESS, data))
          return data
        })
        .catch(err => {
          dispatch(createAction(authActionTypes.AUTH_RETRIEVE_TOKEN_FAILURE, {err}))
          throw err
        })
    }
  }

  function logout() {
    return dispatch => {
      dispatch(createAction(authActionTypes.AUTH_LOGOUT))
      return api.logout()
        .then(() => {
          dispatch(createAction(authActionTypes.AUTH_LOGOUT_SUCCESS))
        })
        .catch(err => {
          dispatch(createAction(authActionTypes.AUTH_LOGOUT_FAILURE, {err}))
          throw err
        })
    }
  }

  return {
    registerUser,
    registerUserAndLogin,
    loginAndStoreToken,
    storeToken,
    persistAuthToken,
    retrieveAuthToken,
    logout
  }
};
