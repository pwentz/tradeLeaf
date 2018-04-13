import { combineReducers } from 'redux';
import auth from './auth';
import userMeta from './userMeta';
import match from './match';
import trade from './trade';
import tradeChat from './tradeChat';

const mainReducer = combineReducers({
  auth,
  userMeta,
  match,
  trade,
  tradeChat
});

export default mainReducer;
