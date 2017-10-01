import { authActionTypes } from '../actions/auth';
const initialState = {
  noOp: null
}

export default function auth(state = initialState, action) {
  switch(action.type) {
    case authActionTypes.AUTH_LOGIN:
      return state;

    case authActionTypes.AUTH_LOGIN_SUCCESS:
      return state;

    case authActionTypes.AUTH_LOGIN_FAILURE:
      return state;

    default:
      return state;
  }
}
