import { matchActionTypes } from '../actions/match';
const initialState = {
  matches: []
}

export default function match(state = initialState, action) {
  switch(action.type) {
    case matchActionTypes.MATCH_GET_MATCHES_SUCCESS:
      return Object.assign({}, state, { matches: action.matches })

    default:
      return state;
  }
};
