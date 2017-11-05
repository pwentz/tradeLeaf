import { createAction } from './createAction'

export const locationActionTypes = {
  LOCATION_GET_COORDS: 'LOCATION_GET_COORDS',
  LOCATION_GET_COORDS_SUCCESS: 'LOCATION_GET_COORDS_SUCCESS',
  LOCATION_GET_COORDS_FAILURE: 'LOCATION_GET_COORDS_FAILURE',

  LOCATION_UPDATE_COORDS: 'LOCATION_UPDATE_COORDS',
  LOCATION_UPDATE_COORDS_SUCCESS: 'LOCATION_UPDATE_COORDS_SUCCESS',
  LOCATION_GET_COORDS_FAILURE: 'LOCATION_UPDATE_COORDS_FAILURE'
}

export function createLocationActions(api) {
  function updateCoords(userId, authToken, lat, lng) {
    return dispatch => {
      dispatch(createAction(locationActionTypes.LOCATION_UPDATE_COORDS, {userId}))
      return api.updateCoords(userId, authToken, {lat, lng})
        .then(() => {
          dispatch(createAction(locationActionTypes.LOCATION_UPDATE_COORDS_SUCCESS, {userId, lat, lng}))
        })
        .catch(error => {
          dispatch(createAction(locationActionTypes.LOCATION_UPDATE_COORDS_FAILURE, {userId, error}))
          throw error
        });
    };
  };

  function getCoordsAndUpdate(userId, authToken) {
    return dispatch => {
      dispatch(createAction(locationActionTypes.LOCATION_GET_COORDS, { userId }))
      return navigator.geolocation.getCurrentPosition(
        (position) => {
          const { coords } = position
          dispatch(createAction(locationActionTypes.LOCATION_GET_COORDS_SUCCESS, {userId, coords}))
          return dispatch(updateCoords(userId, authToken, coords.latitude, coords.longitude))
        },
        (error) => {
          dispatch(createAction(locationActionTypes.LOCATION_GET_COORDS_FAILURE))
          throw error
        }
      )
    }
  };

  return {
    getCoordsAndUpdate
  };
};
