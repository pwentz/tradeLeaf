import { createAction } from '../../src/actions/createAction';
import reducer from '../../src/reducers/index';
import { tradeActionTypes } from '../../src/actions/trade';

import { expect } from 'chai';

describe('trade reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, { data: {} });
  });

  context(tradeActionTypes.TRADE_CREATE_TRADE_SUCCESS, () => {
    it('adds a trade when it is successfully retrieved', () => {
      const trade = {
        id: 1,
        offer1Id: 1,
        offer2Id: 2,
        isOpen: true,
        createdAt: '2017-11-18T00:12:46.618258Z',
        updatedAt: '2017-11-18T00:12:46.618258Z'
      }

      let state = reducer(undefined, { data: {} })

      state = reducer(state, createAction(tradeActionTypes.TRADE_CREATE_TRADE_SUCCESS, {
        trade
      }));

      expect(state.trade.trades[1]).to.deep.equal(trade);
    });

    it('updates existing trades object', () => {
      const existingTrade = {
        id: 1,
        offer1Id: 1,
        offer2Id: 2,
        isOpen: true,
        createdAt: '2017-11-18T00:12:46.618258Z',
        updatedAt: '2017-11-18T00:12:46.618258Z'
      };

      const newTrade = {
        id: 2,
        offer1Id: 2,
        offer2Id: 3,
        isOpen: false,
        createdAt: '2017-11-18T00:12:46.618258Z',
        updatedAt: '2017-11-18T00:12:46.618258Z'
      };

      let state = reducer({ trade: { trades: { [existingTrade.id]: existingTrade } } }, {})

      state = reducer(state, createAction(tradeActionTypes.TRADE_CREATE_TRADE_SUCCESS, {
        trade: newTrade
      }));

      expect(state.trade.trades[existingTrade.id]).to.deep.equal(existingTrade);
      expect(state.trade.trades[newTrade.id]).to.deep.equal(newTrade);
    });
  });
});
