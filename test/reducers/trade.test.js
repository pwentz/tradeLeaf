import { createAction } from '../../src/actions/createAction';
import reducer from '../../src/reducers/index';
import { tradeActionTypes } from '../../src/actions/trade';

import { expect } from 'chai';

describe('trade reducer', () => {
  context(tradeActionTypes.TRADE_CREATE_TRADE_SUCCESS, () => {
    it('appends a tradeId when it is successfully retrieved', () => {
      let state = reducer({ trade: { trades: [1] }}, {})

      state = reducer(state, createAction(tradeActionTypes.TRADE_CREATE_TRADE_SUCCESS, {
        tradeId: 3
      }));

      expect(state.trade.trades).to.deep.equal([1, 3]);
    });
  });
});
