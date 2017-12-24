import { combineReducers } from 'redux';
import auth from './auth';
import userMeta from './userMeta';
import match from './match';
import trade from './trade';

const mainReducer = combineReducers({
  auth,
  userMeta,
  match,
  trade
});

export default mainReducer;
