import { createAction } from './createAction';

export const authActionTypes = {
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILURE: 'AUTH_LOGIN_FAILURE'
}

export function createAuthActions(api) {
  function loginAndStoreToken(username, password) {
    return dispatch => {
      dispatch(createAction(authActionTypes.AUTH_LOGIN));
      return api.login(username, password)
        .then(res => {
          dispatch(createAction(authActionTypes.AUTH_LOGIN_SUCCESS, { token: res.token }))
          return res
        })
        .catch(err => {
          dispatch(createAction(authActionTypes.AUTH_LOGIN_FAILURE))
          return err
        })
    };
  };

  return {
    loginAndStoreToken
  }
};
