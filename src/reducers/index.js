import { combineReducers } from 'redux';
import auth from './auth';
import userMeta from './userMeta';
import match from './match';
import trade from './trade';
import tradeChat from './tradeChat';
import category from './category';

const mainReducer = combineReducers({
  auth,
  userMeta,
  match,
  trade,
  tradeChat,
  category,
});

export default mainReducer;
