import { combineReducers } from 'redux';
import auth from './auth'
import userMeta from './userMeta'

const mainReducer = combineReducers({
  auth,
  userMeta
});

export default mainReducer;
