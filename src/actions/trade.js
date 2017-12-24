import { createAction } from './createAction';

export const tradeActionTypes = {
  TRADE_CREATE_TRADE: 'TRADE_CREATE_TRADE',
  TRADE_CREATE_TRADE_SUCCESS: 'TRADE_CREATE_TRADE_SUCCESS',
  TRADE_CREATE_TRADE_FAILURE: 'TRADE_CREATE_TRADE_FAILURE'
};

export function createTradeActions(api) {
  function createTrade(offer1Id, offer2Id) {
    return dispatch => {
      dispatch(createAction(tradeActionTypes.TRADE_CREATE_TRADE, {offer1Id, offer2Id}))
      return api.createTrade(offer1Id, offer2Id)
        .then(trade => {
          dispatch(createAction(tradeActionTypes.TRADE_CREATE_TRADE_SUCCESS, {trade}))
          return trade
        })
        .catch(error => {
          dispatch(createAction(tradeActionTypes.TRADE_CREATE_TRADE_FAILURE, {error}))
          throw error
        });
    };
  };

  return {
    createTrade
  };
};
