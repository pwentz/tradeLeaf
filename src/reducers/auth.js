import { authActionTypes } from '../actions/auth';
const initialState = {
  authToken: null,
  userId: null
}

export default function auth(state = initialState, action) {
  switch(action.type) {
    case authActionTypes.AUTH_LOGIN_SUCCESS:
      const { userId, token } = action;

      return Object.assign({}, state, { userId, authToken: token });

    case authActionTypes.AUTH_STORE_TOKEN:
      return Object.assign({}, state, { userId: action.userId, authToken: action.authToken })

    default:
      return state;
  }
}
