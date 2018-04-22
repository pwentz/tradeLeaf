import { tradeChatActionTypes, createTradeChatActions } from '../../src/actions/tradeChat';
import { MockDispatch } from './utils';

import { expect } from 'chai';

class MockApi {
  createTradeChat(tradeId) {
    return Promise.resolve(1)
  }

  fetchTradeChats(userId) {
    return Promise.resolve({
      5: {
        recipient: 2,
        messages: [
          { id: 1, senderId: 1, tradeChatId: 5, content: 'hello' }
        ]
      }
    })
  }
}

const mockDispatch = new MockDispatch()
const actions = createTradeChatActions(new MockApi())

describe('trade chat actions', () => {
  beforeEach(() => mockDispatch.reset())

  it('creates a trade chat', (done) => {
    const tradeId = 2
    mockDispatch.dispatch(actions.createTradeChat(tradeId))
      .then(res => {
        expect(mockDispatch.actions).to.deep.equal([
          { type: tradeChatActionTypes.TRADE_CHAT_CREATE_TRADE_CHAT, tradeId },
          { type: tradeChatActionTypes.TRADE_CHAT_CREATE_TRADE_CHAT_SUCCESS, tradeChatId: 1}
        ])

        expect(res).to.equal(1)
        done()
      })
      .catch(done)
  })

  it('fetches trade chat data', (done) => {
    const userId = 1
    const authToken = 'abc123'
    const expectedResponse = {
      5: {
        recipient: 2,
        messages: [
          { id: 1, senderId: 1, tradeChatId: 5, content: 'hello' }
        ]
      }
    }

    mockDispatch.dispatch(actions.fetchTradeChats(userId, authToken))
      .then(res => {
        expect(mockDispatch.actions).to.deep.equal([
          { type: tradeChatActionTypes.TRADE_CHAT_FETCH_TRADE_CHATS, userId },
          { type: tradeChatActionTypes.TRADE_CHAT_FETCH_TRADE_CHATS_SUCCESS, tradeChats: expectedResponse }
        ])

        expect(res).to.deep.equal(expectedResponse)
        done()
      })
      .catch(done)
  })
})
