import { createAction } from './createAction';

export const userActionTypes = {
  GET_USER: 'GET_USER',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE'
};

export function createUserActions(api) {
  function getUser(userId) {
    return dispatch => {
      dispatch(createAction(userActionTypes.GET_USER, {userId}))
      return api.getUser(userId)
        .then(res => {
          dispatch(createAction(userActionTypes.GET_USER_SUCCESS, { user: res }));
          return res;
        })
        .catch(error => {
          dispatch(createAction(userActionTypes.GET_USER_FAILURE, {error}));
          throw error;
        });
    };
  };

  return {
    getUser
  };
};
