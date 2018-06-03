import { messageActionTypes } from '../actions/message';
import { chatSocketActionTypes } from '../actions/chatSocket';
import { authActionTypes } from '../actions/auth';
import { locationActionTypes } from '../actions/location';
import { userActionTypes } from '../actions/user';

export function createUserMiddleware(actions) {
  const userActions = actions.user;
  const locationActions = actions.location;
  const authActions = actions.auth;
  const tradeChatActions = actions.tradeChat;
  const matchActions = actions.match;

  function userMiddleware(store) {
    const { dispatch } = store;

    async function handleAction(state, action) {
      switch (action.type) {
        case authActionTypes.AUTH_LOGIN_SUCCESS:
          dispatch(authActions.persistAuthToken(action.userId, action.authToken));
          return;

        case messageActionTypes.MESSSAGE_CREATE_MESSAGE_SUCCESS:
          dispatch(tradeChatActions.fetchTradeChats(state.auth.userId, state.auth.authToken));
          return;

        case chatSocketActionTypes.CHAT_SOCKET_INCOMING_MESSAGE:
          if (action.message.startsWith('-- ') && action.message.includes('DISCONNECTED')) {
            const [recipientId, ..._] = action.message.slice(3).split(':');

            dispatch(userActions.identifyUserAsOffline(parseInt(recipientId)));
            return;
          }

          // send some sort of push notification or flash message
          const [recipientId, msg] = action.message.split(': ');

          // get user for scenarios when they are the last to opt in and message first
          if (!state.userMeta[parseInt(recipientId)]) {
            await dispatch(userActions.getUser(recipientId));
          }

          dispatch(userActions.identifyUserAsOnline(parseInt(recipientId)));
          dispatch(tradeChatActions.fetchTradeChats(state.auth.userId, state.auth.authToken));
          return;

        case userActionTypes.REMOVE_OFFER_SUCCESS:
          dispatch(matchActions.getMatches(state.auth.authToken));
          return;

        default:
          return state;
      }
    }

    return (next) => (action) => {
      const state = store.getState();
      handleAction(state, action);
      const nextState = next(action);
      return nextState;
    };
  }

  return userMiddleware;
}
