import { createApi } from './src/api/createApi';
import { createStore } from './src/stores/index';
import { createActions } from './src/actions/index';
import { createUserMiddleware } from './src/middleware/userMiddleware';

export function setupApp(api, shouldLog) {
  const actions = createActions(api);
  const userMiddleware = createUserMiddleware(actions)
  const store = createStore(undefined /*initialState*/, userMiddleware, shouldLog)

  return {
    actions,
    store
  };
};
