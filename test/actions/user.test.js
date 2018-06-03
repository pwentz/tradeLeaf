import { userActionTypes, createUserActions } from '../../src/actions/user';
import { MockDispatch } from './utils';

import { expect } from 'chai';

const sampleUser = {
  id: 1,
  firstName: 'Fred',
  lastName: 'Jackson',
  username: 'freddy-jack',
  email: 'fjack10@yahoo.com',
  password: 'password',
  coordinates: { lat: 12.34, lng: -45.67 },
  offers: [],
  photo: null,
};

class MockApi {
  getUser(userId) {
    return Promise.resolve(sampleUser);
  }

  removeOffer({ offerId, token }) {
    return Promise.resolve();
  }
}

const mockDispatch = new MockDispatch();
const actions = createUserActions(new MockApi());

describe('user actions', () => {
  beforeEach(() => {
    mockDispatch.reset();
  });

  describe('GET_USER', () => {
    it('can get a user', (done) => {
      mockDispatch
        .dispatch(actions.getUser(1))
        .then((res) => {
          expect(mockDispatch.actions).to.deep.equal([
            { type: userActionTypes.GET_USER, userId: 1 },
            { type: userActionTypes.GET_USER_SUCCESS, user: sampleUser },
          ]);

          expect(res).to.deep.equal(sampleUser);
          done();
        })
        .catch(done);
    });
  });

  describe('REMOVE_OFFER', () => {
    it('sends request to delete offer', (done) => {
      const token = 'abc-123';
      const offerId = 1;
      mockDispatch
        .dispatch(actions.removeOffer({ offerId, token }))
        .then(() => {
          expect(mockDispatch.actions).to.deep.equal([
            { type: userActionTypes.REMOVE_OFFER, offerId: 1 },
            { type: userActionTypes.REMOVE_OFFER_SUCCESS },
          ]);

          done();
        })
        .catch(done);
    });
  });
});
