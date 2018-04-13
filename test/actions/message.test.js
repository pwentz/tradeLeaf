import { messageActionTypes, createMessageActions } from '../../src/actions/message';
import { MockDispatch } from './utils';

import { expect } from 'chai';

class MockApi {
  createMessage({ token, tradeChatId, senderId, content }) {
    return Promise.resolve(1);
  };
};

const mockDispatch = new MockDispatch();
const actions = createMessageActions(new MockApi())

describe('message actions', () => {
  beforeEach(() => mockDispatch.reset());

  it('creates a message', (done) => {
    const senderId = 1;
    const tradeChatId = 1;
    const token = 'abc123';
    const content = 'hello, world!';

    mockDispatch.dispatch(actions.createMessage({ token, senderId, tradeChatId, content }))
      .then(res => {

        expect(mockDispatch.actions).to.deep.equal([
          { type: messageActionTypes.MESSAGE_CREATE_MESSAGE, senderId, tradeChatId, content },
          { type: messageActionTypes.MESSSAGE_CREATE_MESSAGE_SUCCESS, messageId: 1 }
        ]);

        expect(res).to.equal(1);
        done();
      })
      .catch(done);
  })
})
