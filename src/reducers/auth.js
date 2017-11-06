import { authActionTypes } from '../actions/auth';
const initialState = {
  token: null,
  userId: null
}

export default function auth(state = initialState, action) {
  switch(action.type) {
    case authActionTypes.AUTH_LOGIN_SUCCESS:
      const { userId, token } = action;

      return Object.assign({}, state, { userId, token });

    default:
      return state;
  }
}
