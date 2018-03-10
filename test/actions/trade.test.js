import { tradeActionTypes, createTradeActions } from '../../src/actions/trade';
import { MockDispatch } from './utils';

import { expect } from 'chai';

const trade = {
  id: 1,
  acceptedOfferId: 1,
  exchangeOfferId: 2,
  isOpen: true,
  createdAt: '2017-11-18T00:12:46.618258Z',
  updatedAt: '2017-11-18T00:12:46.618258Z'
}

class MockApi {
  createTrade({acceptedOfferId, exchangeOfferId}) {
    return Promise.resolve(trade.id);
  };

  findTrade({acceptedOfferId, exchangeOfferId}) {
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
    const acceptedOfferId = 1;
    const exchangeOfferId = 2;
    mockDispatch.dispatch(actions.createTrade({acceptedOfferId, exchangeOfferId}))
      .then(res => {

        expect(mockDispatch.actions).to.deep.equal([
          { type: tradeActionTypes.TRADE_CREATE_TRADE, acceptedOfferId, exchangeOfferId },
          { type: tradeActionTypes.TRADE_CREATE_TRADE_SUCCESS, tradeId: trade.id }
        ])

        expect(res).to.equal(trade.id);
        done();
      })
      .catch(done);
  });

  it('finds a trade', (done) => {
    const acceptedOfferId = 1;
    const exchangeOfferId = 2;
    mockDispatch.dispatch(actions.findTrade({acceptedOfferId, exchangeOfferId}))
      .then(res => {
        expect(mockDispatch.actions).to.deep.equal([
          { type: tradeActionTypes.TRADE_FIND_TRADE, acceptedOfferId, exchangeOfferId },
          { type: tradeActionTypes.TRADE_FIND_TRADE_SUCCESS, trade }
        ]);

        expect(res).to.deep.equal(trade);
        done();
      })
      .catch(done)
  })
});
