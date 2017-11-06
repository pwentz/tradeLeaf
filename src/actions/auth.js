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
          const authRes = { userId: res.authUserId, token: res.authToken }
          dispatch(createAction(authActionTypes.AUTH_LOGIN_SUCCESS, authRes))
          return authRes
        })
        .catch(error => {
          dispatch(createAction(authActionTypes.AUTH_LOGIN_FAILURE, {error}))
          throw error
        })
    };
  };

  function registerUser(username, password, passwordConfirmation) {
    return dispatch => {
      dispatch(createAction(authActionTypes.AUTH_REGISTER, {username}))
      return api.registerUser(username, password, passwordConfirmation)
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

  function registerUserAndLogin(username, password, passwordConfirmation) {
    return dispatch => {
      return dispatch(registerUser(username, password, passwordConfirmation))
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
