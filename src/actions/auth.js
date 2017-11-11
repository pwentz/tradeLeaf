import { createAction } from './createAction';

export const authActionTypes = {
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILURE: 'AUTH_LOGIN_FAILURE',

  AUTH_REGISTER: 'AUTH_REGISTER',
  AUTH_REGISTER_SUCCESS: 'AUTH_REGISTER_SUCCESS',
  AUTH_REGISTER_FAILURE: 'AUTH_REGISTER_FAILURE'
}

export function createAuthActions(api) {
  function loginAndStoreToken(username, password) {
    return dispatch => {
      dispatch(createAction(authActionTypes.AUTH_LOGIN));
      return api.login(username, password)
        .then(res => {
          dispatch(createAction(authActionTypes.AUTH_LOGIN_SUCCESS, res))
          return res
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

  return {
    registerUser,
    registerUserAndLogin,
    loginAndStoreToken
  }
};
