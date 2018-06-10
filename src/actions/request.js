import { createAction } from './createAction';

export const requestActionTypes = {
  REQUEST_CREATE_REQUEST: 'REQUEST_CREATE_REQUEST',
  REQUEST_CREATE_REQUEST_SUCCESS: 'REQUEST_CREATE_REQUEST_SUCCESS',
  REQUEST_CREATE_REQUEST_FAILURE: 'REQUEST_CREATE_REQUEST_FAILURE',
};

export function createRequestActions(api) {
  function createRequest({ offerId, categoryId, description, token }) {
    return (dispatch) => {
      dispatch(
        createAction(requestActionTypes.REQUEST_CREATE_REQUEST, {
          offerId,
          categoryId,
          description,
        })
      );
      return api
        .createRequest({ offerId, categoryId, description, token })
        .then((requestId) => {
          dispatch(createAction(requestActionTypes.REQUEST_CREATE_REQUEST_SUCCESS, { requestId }));
          return requestId;
        })
        .catch((err) => {
          dispatch(createAction(requestActionTypes.REQUEST_CREATE_REQUEST_FAILURE, { err }));
          throw err;
        });
    };
  }

  return {
    createRequest,
  };
}
