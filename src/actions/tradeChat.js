import { createAction } from './createAction'

export const tradeChatActionTypes = {
  TRADE_CHAT_CREATE_TRADE_CHAT: 'TRADE_CHAT_CREATE_TRADE_CHAT',
  TRADE_CHAT_CREATE_TRADE_CHAT_SUCCESS: 'TRADE_CHAT_CREATE_TRADE_CHAT_SUCCESS',
  TRADE_CHAT_CREATE_TRADE_CHAT_FAILURE: 'TRADE_CHAT_CREATE_TRADE_CHAT_FAILURE',

  TRADE_CHAT_FETCH_TRADE_CHATS: 'TRADE_CHAT_FETCH_TRADE_CHATS',
  TRADE_CHAT_FETCH_TRADE_CHATS_SUCCESS: 'TRADE_CHAT_FETCH_TRADE_CHATS_SUCCESS',
  TRADE_CHAT_FETCH_TRADE_CHATS_FAILURE: 'TRADE_CHAT_FETCH_TRADE_CHATS_FAILURE',
}

export function createTradeChatActions(api) {
  function createTradeChat(tradeId) {
    return dispatch => {
      dispatch(createAction(tradeChatActionTypes.TRADE_CHAT_CREATE_TRADE_CHAT, {tradeId}))
      return api.createTradeChat(tradeId)
        .then(tradeChatId => {
          dispatch(createAction(tradeChatActionTypes.TRADE_CHAT_CREATE_TRADE_CHAT_SUCCESS, {tradeChatId}))
          return tradeChatId
        })
        .catch(error => {
          dispatch(createAction(tradeChatActionTypes.TRADE_CHAT_CREATE_TRADE_CHAT_FAILURE, {error}))
          throw error
        })
    }
  }

  function fetchTradeChats(userId, authToken) {
    return dispatch => {
      dispatch(createAction(tradeChatActionTypes.TRADE_CHAT_FETCH_TRADE_CHATS, {userId}))
      return api.fetchTradeChats(userId, authToken)
        .then(tradeChats => {
          dispatch(createAction(tradeChatActionTypes.TRADE_CHAT_FETCH_TRADE_CHATS_SUCCESS, {tradeChats}))
          return tradeChats
        })
        .catch(error => {
          dispatch(createAction(tradeChatActionTypes.TRADE_CHAT_FETCH_TRADE_CHATS_FAILURE, {error}))
          throw error
        })
    }
  }

  return {
    createTradeChat,
    fetchTradeChats
  }
}
