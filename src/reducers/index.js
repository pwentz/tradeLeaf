import { combineReducers } from 'redux';
import auth from './auth';
import userMeta from './userMeta';
import match from './match';

const mainReducer = combineReducers({
  auth,
  userMeta,
  match
});

export default mainReducer;
