import { authActionTypes } from '../actions/auth';
const initialState = {
  authToken: null,
  userId: null
}

export default function auth(state = initialState, action) {
  switch(action.type) {
    case authActionTypes.AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, { userId: action.userId, authToken: action.authToken });

    case authActionTypes.AUTH_STORE_TOKEN:
      return Object.assign({}, state, { userId: action.userId, authToken: action.authToken })

    default:
      return state;
  }
}
