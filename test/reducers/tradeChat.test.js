import { createAction } from '../../src/actions/createAction';
import reducer from '../../src/reducers/index';
import { tradeChatActionTypes } from '../../src/actions/tradeChat';

import { expect } from 'chai';

describe('trade chat reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, { data: {} });
  });

  context(tradeChatActionTypes.TRADE_CHAT_FETCH_TRADE_CHATS_SUCCESS, () => {
    it('adds trade chat data', () => {
      const tradeChats = {
        5: {
          recipient: 2,
          messages: [
            { id: 1, senderId: 1, tradeChatId: 5, content: 'hello' }
          ]
        }
      }

      let state = reducer(undefined, { data: {} })

      state = reducer(state, createAction(tradeChatActionTypes.TRADE_CHAT_FETCH_TRADE_CHATS_SUCCESS, {
        tradeChats
      }));

      expect(state.tradeChat.tradeChats).to.deep.equal(tradeChats);
    });

    it('clobbers the existing trade chat data', () => {
      const existingTradeChats = {
        5: {
          recipient: 2,
          messages: [
            { id: 1, senderId: 1, tradeChatId: 5, content: 'hello' }
          ]
        }
      }
      const newTradeChats = {
        6: {
          recipient: 5,
          messages: [
            { id: 2, senderId: 99, tradeChatId: 6, content: 'goodbye' }
          ]
        }
      }

      let state = reducer({ tradeChat: { tradeChats: existingTradeChats }}, {})

      state = reducer(state, createAction(tradeChatActionTypes.TRADE_CHAT_FETCH_TRADE_CHATS_SUCCESS, {
        tradeChats: newTradeChats
      }));

      expect(state.tradeChat.tradeChats).to.deep.equal(newTradeChats);
    })
  });
});
