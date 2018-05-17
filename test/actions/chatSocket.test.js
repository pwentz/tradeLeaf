import { chatSocketActionTypes, createChatSocketActions } from '../../src/actions/chatSocket';
import { messageActionTypes } from '../../src/actions/message';
import { MockDispatch } from './utils';

import { expect } from 'chai';

class MockApi {
  constructor() {
    this.onOpen = null;
    this.onMessage = null;
    this.sentMessage = null;
  }

  createChatSocket(onOpen, onMessage) {
    this.onOpen = onOpen;
    this.onMessage = onMessage;
    return;
  }

  sendToChatSocket(message) {
    this.sentMessage = message;
    return;
  }

  closeChatSocket() {
    return;
  }

  createMessage({ tradeChatId, content, token }) {
    return Promise.resolve(3);
  }

  reset() {
    this.onOpen = null;
    this.onMessage = null;
    this.sentMessage = null;
  }
}

const mockApi = new MockApi();
const mockDispatch = new MockDispatch();
const actions = createChatSocketActions(mockApi);

describe('chat socket actions', () => {
  beforeEach(() => {
    mockDispatch.reset();
    mockApi.reset();
  });

  context('createSocket', () => {
    it('opens the chat socket', () => {
      const userId = 11;
      const onMessage = () => {};
      mockDispatch.dispatch(actions.createSocket(userId, onMessage));

      expect(mockDispatch.actions).to.deep.equal([
        { type: chatSocketActionTypes.CHAT_SOCKET_CREATE_SOCKET, userId },
      ]);
    });

    context('onOpen', () => {
      it('sends a custom message to chat server with interpolated user id', () => {
        const userId = 11;
        const onMessage = () => {};
        mockDispatch.dispatch(actions.createSocket(userId, onMessage));

        mockApi.onOpen();

        expect(mockDispatch.actions).to.deep.equal([
          { type: chatSocketActionTypes.CHAT_SOCKET_CREATE_SOCKET, userId },
          { type: chatSocketActionTypes.CHAT_SOCKET_SEND_MESSAGE },
        ]);

        expect(mockApi.sentMessage).to.equal('#{{ 11 }}#');
      });
    });

    context('onMessage', () => {
      it('wraps the onMessage callback in a separate action', () => {
        const userId = 11;
        const onMessage = () => {};
        mockDispatch.dispatch(actions.createSocket(userId, onMessage));

        mockApi.onMessage();

        expect(mockDispatch.actions).to.deep.equal([
          { type: chatSocketActionTypes.CHAT_SOCKET_CREATE_SOCKET, userId },
          { type: chatSocketActionTypes.CHAT_SOCKET_INCOMING_MESSAGE },
        ]);
      });
    });
  });

  context('send', () => {
    it('creates a message, then sends it to the chat server', (done) => {
      const tradeChatId = 123;
      const recipientId = 12;
      const content = 'hello, world!';
      const token = 'abc123';

      mockDispatch
        .dispatch(actions.send({ tradeChatId, recipientId, content, token }))
        .then(() => {
          expect(mockDispatch.actions).to.deep.equal([
            { type: messageActionTypes.MESSAGE_CREATE_MESSAGE, tradeChatId, content },
            { type: messageActionTypes.MESSSAGE_CREATE_MESSAGE_SUCCESS, messageId: 3 },
            { type: chatSocketActionTypes.CHAT_SOCKET_SEND_MESSAGE },
          ]);

          expect(mockApi.sentMessage).to.equal(`#{{ ${recipientId} }}#: ${content}`);
          done();
        })
        .catch(done);
    });
  });

  context('close', () => {
    it('closes the socket', () => {
      mockDispatch.dispatch(actions.close());

      expect(mockDispatch.actions).to.deep.equal([
        { type: chatSocketActionTypes.CHAT_SOCKET_CLOSE },
      ]);
    });
  });
});
