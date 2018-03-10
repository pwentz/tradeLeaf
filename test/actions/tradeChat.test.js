import { tradeChatActionTypes, createTradeChatActions } from '../../src/actions/tradeChat';
import { MockDispatch } from './utils';

import { expect } from 'chai';

class MockApi {
  createTradeChat(tradeId) {
    return Promise.resolve(1)
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
})
