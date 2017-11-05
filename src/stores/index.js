import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from '../reducers/index';

function loggerMiddleware(store) {
  return next => action => {
    if (typeof action !== 'function') {
      console.log('ACTION: ', action);
    };

    const nextState = next(action);
    return nextState;
  };
};

export function createStore(initialState, userMiddleware, shouldLog) {
  return reduxCreateStore(
    mainReducer,
    shouldLog ? applyMiddleware(loggerMiddleware, userMiddleware, thunk)
              : applyMiddleware(userMiddleware, thunk)
  );
};
