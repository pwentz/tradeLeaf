import { createAction } from './createAction';

export const messageActionTypes = {
  MESSAGE_CREATE_MESSAGE: 'MESSAGE_CREATE_MESSAGE',
  MESSSAGE_CREATE_MESSAGE_SUCCESS: 'MESSSAGE_CREATE_MESSAGE_SUCCESS',
  MESSAGE_CREATE_MESSAGE_FAILURE: 'MESSAGE_CREATE_MESSAGE_FAILURE'
}

export function createMessageActions(api) {
  function createMessage({tradeChatId, senderId, content}) {
    return dispatch => {
      dispatch(createAction(messageActionTypes.MESSAGE_CREATE_MESSAGE, { tradeChatId, senderId, content }));
      return api.createMessage({ tradeChatId, senderId, content })
        .then(messageId => {
          dispatch(createAction(messageActionTypes.MESSSAGE_CREATE_MESSAGE_SUCCESS, { messageId }));
          return messageId;
        })
        .catch(error => {
          dispatch(createAction(messageActionTypes.MESSAGE_CREATE_MESSAGE_FAILURE, { error }));
          throw error;
        });
    };
  };

  return {
    createMessage
  };
}
