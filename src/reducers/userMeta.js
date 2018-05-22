import { userActionTypes } from '../actions/user';
import { locationActionTypes } from '../actions/location';
import { matchActionTypes } from '../actions/match';

const initialState = {};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.GET_USER_SUCCESS:
      return Object.assign({}, state, {
        [action.user.id]: { ...(state[action.user.id] || {}), ...action.user },
      });

    case userActionTypes.IDENTIFY_USER_AS_ONLINE:
      return Object.assign({}, state, {
        [action.userId]: { ...(state[action.userId] || {}), isOnline: true },
      });

    case userActionTypes.IDENTIFY_USER_AS_OFFLINE:
      return Object.assign({}, state, {
        [action.userId]: { ...(state[action.userId] || {}), isOnline: false },
      });

    case matchActionTypes.MATCH_GET_MATCHES_SUCCESS:
      return Object.assign(
        {},
        state,
        action.matches.reduce((acc, match) => ({ ...acc, [match.user.id]: match.user }), {})
      );

    default:
      return state;
  }
}
