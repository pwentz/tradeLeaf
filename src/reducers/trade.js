import { tradeActionTypes } from '../actions/trade';

const initialState = {
  trades: []
};

export default function trade(state = initialState, action) {
  switch(action.type) {
    case tradeActionTypes.TRADE_CREATE_TRADE_SUCCESS:
      return Object.assign({}, state, { trades: [...state.trades, action.tradeId] })

    default:
      return state;
  };
};
