import { createAction } from './createAction';

export const tradeActionTypes = {
  TRADE_CREATE_TRADE: 'TRADE_CREATE_TRADE',
  TRADE_CREATE_TRADE_SUCCESS: 'TRADE_CREATE_TRADE_SUCCESS',
  TRADE_CREATE_TRADE_FAILURE: 'TRADE_CREATE_TRADE_FAILURE',

  TRADE_FIND_TRADE: 'TRADE_FIND_TRADE',
  TRADE_FIND_TRADE_SUCCESS: 'TRADE_FIND_TRADE_SUCCESS',
  TRADE_FIND_TRADE_FAILURE: 'TRADE_FIND_TRADE_FAILURE'
};

export function createTradeActions(api) {
  function createTrade({ acceptedOfferId, exchangeOfferId }) {
    return dispatch => {
      dispatch(createAction(tradeActionTypes.TRADE_CREATE_TRADE, {acceptedOfferId, exchangeOfferId}))
      return api.createTrade({acceptedOfferId, exchangeOfferId})
        .then(tradeId => {
          dispatch(createAction(tradeActionTypes.TRADE_CREATE_TRADE_SUCCESS, {tradeId}))
          return tradeId
        })
        .catch(error => {
          dispatch(createAction(tradeActionTypes.TRADE_CREATE_TRADE_FAILURE, {error}))
          throw error
        });
    };
  };

  function findTrade({ acceptedOfferId, exchangeOfferId }) {
    return dispatch => {
      dispatch(createAction(tradeActionTypes.TRADE_FIND_TRADE, {acceptedOfferId, exchangeOfferId}))
      return api.findTrade({ acceptedOfferId, exchangeOfferId })
        .then(trade => {
          dispatch(createAction(tradeActionTypes.TRADE_FIND_TRADE_SUCCESS, {trade}))
          return trade
        })
        .catch(error => {
          dispatch(createAction(tradeActionTypes.TRADE_FIND_TRADE_FAILURE, {error}))
          throw error
        })
    }
  }

  return {
    createTrade,
    findTrade
  };
};
