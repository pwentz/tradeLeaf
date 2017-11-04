import { userActionTypes } from '../actions/user';

const initialState = {};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.GET_USER_SUCCESS:
      return Object.assign({}, state,
      { [action.user.id]: {...(state[action.user.id] || {}), ...action.user}});

    default:
      return state;
  };
};
