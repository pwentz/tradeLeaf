import { createAction } from './createAction'

export const tradeChatActionTypes = {
  TRADE_CHAT_CREATE_TRADE_CHAT: 'TRADE_CHAT_CREATE_TRADE_CHAT',
  TRADE_CHAT_CREATE_TRADE_CHAT_SUCCESS: 'TRADE_CHAT_CREATE_TRADE_CHAT_SUCCESS',
  TRADE_CHAT_CREATE_TRADE_CHAT_FAILURE: 'TRADE_CHAT_CREATE_TRADE_CHAT_FAILURE'
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

  return {
    createTradeChat
  }
}
