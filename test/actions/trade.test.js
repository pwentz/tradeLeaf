import { tradeActionTypes, createTradeActions } from '../../src/actions/trade';
import { MockDispatch } from './utils';

import { expect } from 'chai';

const trade = {
  id: 1,
  offer1Id: 1,
  offer2Id: 2,
  isOpen: true,
  createdAt: '2017-11-18T00:12:46.618258Z',
  updatedAt: '2017-11-18T00:12:46.618258Z'
}

class MockApi {
  createTrade(offer1Id, offer2Id) {
    return Promise.resolve(trade);
  };
};

const mockDispatch = new MockDispatch();
const actions = createTradeActions(new MockApi());

describe('trade actions', () => {
  beforeEach(() => {
    mockDispatch.reset();
  });

  it('creates a trade', (done) => {
    const offer1Id = 1;
    const offer2Id = 2;
    mockDispatch.dispatch(actions.createTrade(1, 2))
      .then(res => {

        expect(mockDispatch.actions).to.deep.equal([
          { type: tradeActionTypes.TRADE_CREATE_TRADE, offer1Id, offer2Id},
          { type: tradeActionTypes.TRADE_CREATE_TRADE_SUCCESS, trade }
        ])

        expect(res).to.deep.equal(trade);
        done();
      })
      .catch(done);
  });
});
