import { createAction } from './createAction';
import { createMessageActions } from './message'

export const chatSocketActionTypes = {
  CHAT_SOCKET_CREATE_SOCKET: 'CHAT_SOCKET_CREATE_SOCKET',
  CHAT_SOCKET_INCOMING_MESSAGE: 'CHAT_SOCKET_INCOMING_MESSAGE',
  CHAT_SOCKET_SEND_MESSAGE: 'CHAT_SOCKET_SEND_MESSAGE',
  CHAT_SOCKET_INITIATE_CONVERSATION: 'CHAT_SOCKET_INITIATE_CONVERSATION'
}

// passes onOpen fn to api
  // sends interpolated user id to WS server

// passes an onMessage fn to api
  //  have an action called onReceiveChatMessage(?) that will get called
  //  when we receive a message -> middleware subscribes to update for refetch

  // TODO:
    // -- subscribe middleware to refetch chatData on CHAT_SOCKET_INCOMING_MESSAGE

export function createChatSocketActions(api) {
  const { createMessage } = createMessageActions(api);

  function createSocket(userId, onMessage) {
    return dispatch => {
      const onOpen = () => dispatch(sendToChatSocket(`#{{ ${userId} }}#`))
      const onReceiveMessage = (msg) => {
        dispatch(incomingMessage());
        onMessage(msg);
      }

      dispatch(createAction(chatSocketActionTypes.CHAT_SOCKET_CREATE_SOCKET, {userId}))
      api.createChatSocket(onOpen, onReceiveMessage)
    }
  }

  function initiateConversation({ tradeChatId, recipientId }) {
    return dispatch => {
      const message = `^{{ ${tradeChatId} - ${recipientId} }}^`
      dispatch(createAction(chatSocketActionTypes.CHAT_SOCKET_INITIATE_CONVERSATION, {tradeChatId, recipientId}))
      dispatch(sendToChatSocket(message))
    }
  }

  function sendToChatSocket(message) {
    return dispatch => {
      dispatch(createAction(chatSocketActionTypes.CHAT_SOCKET_SEND_MESSAGE))
      api.sendToChatSocket(message)
    }
  }

  function send({ tradeChatId, senderId, content, token }) {
    return dispatch => {
      return dispatch(createMessage({ tradeChatId, senderId, content, token }))
        .then(messageId => {
          const message = `#{{ ${tradeChatId} }}#: ${content}`
          dispatch(sendToChatSocket(message))
        })
    }
  }

  function incomingMessage() {
    return dispatch => {
      dispatch(createAction(chatSocketActionTypes.CHAT_SOCKET_INCOMING_MESSAGE))
    }
  }

  function close() {
    return dispatch => {
      dispatch(createAction(chatSocketActionTypes.CHAT_SOCKET_CLOSE))
      api.closeChatSocket()
    }
  }

  return {
    createSocket,
    initiateConversation,
    send,
    close
  }
}
