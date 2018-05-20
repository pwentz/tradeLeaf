import { createAction } from './createAction';

export const chatSocketActionTypes = {
  CHAT_SOCKET_CREATE_SOCKET: 'CHAT_SOCKET_CREATE_SOCKET',
  CHAT_SOCKET_INCOMING_MESSAGE: 'CHAT_SOCKET_INCOMING_MESSAGE',
  CHAT_SOCKET_SEND_MESSAGE: 'CHAT_SOCKET_SEND_MESSAGE',
};

export function createChatSocketActions(api) {
  function createSocket(userId, onMessage) {
    return (dispatch) => {
      const onOpen = () => dispatch(sendToChatSocket(`#{{ ${userId} }}#`));
      const onReceiveMessage = (msgEvent) => {
        const msg = msgEvent.__proto__.__proto__.data;
        dispatch(incomingMessage(msg));
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

  function send({ recipientId, content }) {
    return (dispatch) => {
      dispatch(sendToChatSocket(`#{{ ${recipientId} }}#: ${content}`));
    };
  }

  function incomingMessage(message) {
    return (dispatch) => {
      dispatch(createAction(chatSocketActionTypes.CHAT_SOCKET_INCOMING_MESSAGE, { message }));
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
