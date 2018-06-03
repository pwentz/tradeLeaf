import { createAction } from './createAction';

export const userActionTypes = {
  GET_USER: 'GET_USER',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',
  IDENTIFY_USER_AS_ONLINE: 'IDENTIFY_USER_AS_ONLINE',
  IDENTIFY_USER_AS_OFFLINE: 'IDENTIFY_USER_AS_OFFLINE',
  REMOVE_OFFER: 'REMOVE_OFFER',
  REMOVE_OFFER_SUCCESS: 'REMOVE_OFFER_SUCCESS',
  REMOVE_OFFER_FAILURE: 'REMOVE_OFFER_FAILURE',
};

export function createUserActions(api) {
  function getUser(userId) {
    return (dispatch) => {
      dispatch(createAction(userActionTypes.GET_USER, { userId }));
      return api
        .getUser(userId)
        .then((res) => {
          dispatch(createAction(userActionTypes.GET_USER_SUCCESS, { user: res }));
          return res;
        })
        .catch((error) => {
          dispatch(createAction(userActionTypes.GET_USER_FAILURE, { error }));
          throw error;
        });
    };
  }

  function identifyUserAsOnline(userId) {
    return (dispatch) => {
      dispatch(createAction(userActionTypes.IDENTIFY_USER_AS_ONLINE, { userId }));
    };
  }

  function identifyUserAsOffline(userId) {
    return (dispatch) => {
      dispatch(createAction(userActionTypes.IDENTIFY_USER_AS_OFFLINE, { userId }));
    };
  }

  function removeOffer({ offerId, token }) {
    return (dispatch) => {
      dispatch(createAction(userActionTypes.REMOVE_OFFER, { offerId }));
      return api
        .removeOffer({ offerId, token })
        .then(() => {
          dispatch(createAction(userActionTypes.REMOVE_OFFER_SUCCESS));
        })
        .catch((err) => {
          dispatch(createAction(userActionTypes.REMOVE_OFFER_FAILURE, { err }));
          throw err;
        });
    };
  }

  return {
    getUser,
    identifyUserAsOnline,
    identifyUserAsOffline,
    removeOffer,
  };
}
