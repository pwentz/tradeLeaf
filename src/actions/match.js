import { createAction } from './createAction';

export const matchActionTypes = {
  MATCH_GET_MATCHES: 'MATCH_GET_MATCHES',
  MATCH_GET_MATCHES_SUCCESS: 'MATCH_GET_MATCHES_SUCCESS',
  MATCH_GET_MATCHES_FAILURE: 'MATCH_GET_MATCHES_FAILURE'
}

export function createMatchActions(api) {
  function getMatches(token) {
    return dispatch => {
      dispatch(createAction(matchActionTypes.MATCH_GET_MATCHES))
      return api.getMatches(token)
        .then(res => {
          dispatch(createAction(matchActionTypes.MATCH_GET_MATCHES_SUCCESS, {matches: res}))
          return res
        })
        .catch(error => {
          dispatch(createAction(matchActionTypes.MATCH_GET_MATCHES_FAILURE, {error}))
          throw error
        })

    }
  }

  return {
    getMatches
  };
};
