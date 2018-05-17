import { createAction } from './createAction';
import { createMessageActions } from './message';

export const chatSocketActionTypes = {
  CHAT_SOCKET_CREATE_SOCKET: 'CHAT_SOCKET_CREATE_SOCKET',
  CHAT_SOCKET_INCOMING_MESSAGE: 'CHAT_SOCKET_INCOMING_MESSAGE',
  CHAT_SOCKET_SEND_MESSAGE: 'CHAT_SOCKET_SEND_MESSAGE',
};

export function createChatSocketActions(api) {
  const { createMessage } = createMessageActions(api);

  function createSocket(userId, onMessage) {
    return (dispatch) => {
      const onOpen = () => dispatch(sendToChatSocket(`#{{ ${userId} }}#`));
      const onReceiveMessage = (msg) => {
        dispatch(incomingMessage());
        onMessage(msg);
      };

      dispatch(createAction(chatSocketActionTypes.CHAT_SOCKET_CREATE_SOCKET, { userId }));
      api.createChatSocket(onOpen, onReceiveMessage);
    };
  }

  function sendToChatSocket(message) {
    return (dispatch) => {
      dispatch(createAction(chatSocketActionTypes.CHAT_SOCKET_SEND_MESSAGE));
      api.sendToChatSocket(message);
    };
  }

  function send({ tradeChatId, recipientId, content, token }) {
    return (dispatch) => {
      return dispatch(createMessage({ tradeChatId, content, token })).then((messageId) => {
        const message = `#{{ ${recipientId} }}#: ${content}`;
        dispatch(sendToChatSocket(message));
      });
    };
  }

  function incomingMessage() {
    return (dispatch) => {
      dispatch(createAction(chatSocketActionTypes.CHAT_SOCKET_INCOMING_MESSAGE));
    };
  }

  function close() {
    return (dispatch) => {
      dispatch(createAction(chatSocketActionTypes.CHAT_SOCKET_CLOSE));
      api.closeChatSocket();
    };
  }

  return {
    createSocket,
    send,
    close,
  };
}
