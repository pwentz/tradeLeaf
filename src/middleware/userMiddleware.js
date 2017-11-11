
import { authActionTypes } from '../actions/auth';
import { locationActionTypes } from '../actions/location';

export function createUserMiddleware(actions) {
  const userActions = actions.user;
  const locationActions = actions.location;

  function userMiddleware(store) {
    const { dispatch } = store;

    function handleAction(state, action) {

      switch (action.type) {
        case authActionTypes.AUTH_LOGIN_SUCCESS:
          // dispatch(locationActions.getCoordsAndUpdate(action.userId, action.token));
          return;

        case locationActionTypes.LOCATION_UPDATE_COORDS_SUCCESS:
          // dispatch(userActions.getUser(action.userId, action.authToken));
          return;

        default:
          return state;
      };
    };

    return next => action => {
      const state = store.getState();
      handleAction(state, action);
      const nextState = next(action);
      return nextState;
    };
  };

  return userMiddleware;
};
