import { tradeChatActionTypes } from '../actions/tradeChat';

const initialState = {
  tradeChats: {}
}

export default function tradeChat(state = initialState, action) {
  switch(action.type) {
    case(tradeChatActionTypes.TRADE_CHAT_FETCH_TRADE_CHATS_SUCCESS):
      return Object.assign({}, state, { tradeChats: action.tradeChats })
    default:
      return state;
  }
}
