import { authActionTypes } from '../actions/auth';
const initialState = {
  token: null
}

export default function auth(state = initialState, action) {
  switch(action.type) {
    case authActionTypes.AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        token: action.token
      });

    default:
      return state;
  }
}
