import { requestActionTypes, createRequestActions } from '../../src/actions/request';
import { MockDispatch } from './utils';

import { expect } from 'chai';

class MockApi {
  createRequest({ offerId, categoryId, description, token }) {
    return Promise.resolve(1);
  }
}

const mockDispatch = new MockDispatch();
const actions = createRequestActions(new MockApi());

describe('request actions', () => {
  beforeEach(() => {
    mockDispatch.reset();
  });

  describe('REQUEST_CREATE_REQUEST', () => {
    it('creates a new request', (done) => {
      const token = 'abc-123';
      const offerId = 1;
      const categoryId = 2;
      const description = 'play-doh...lots of play-doh';

      mockDispatch
        .dispatch(actions.createRequest({ offerId, categoryId, description, token }))
        .then(() => {
          expect(mockDispatch.actions).to.deep.equal([
            { type: requestActionTypes.REQUEST_CREATE_REQUEST, offerId, categoryId, description },
            { type: requestActionTypes.REQUEST_CREATE_REQUEST_SUCCESS, requestId: 1 },
          ]);

          done();
        })
        .catch(done);
    });
  });
});
