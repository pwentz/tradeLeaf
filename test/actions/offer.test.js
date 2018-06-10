import { offerActionTypes, createOfferActions } from '../../src/actions/offer';
import { MockDispatch } from './utils';

import { expect } from 'chai';

class MockApi {
  removeOffer({ offerId, token }) {
    return Promise.resolve();
  }

  createOffer({ categoryId, photoId, description, radius, token }) {
    return Promise.resolve(1);
  }
}

const mockDispatch = new MockDispatch();
const actions = createOfferActions(new MockApi());

describe('offer actions', () => {
  beforeEach(() => {
    mockDispatch.reset();
  });

  describe('OFFER_REMOVE_OFFER', () => {
    it('sends request to delete offer', (done) => {
      const token = 'abc-123';
      const offerId = 1;
      mockDispatch
        .dispatch(actions.removeOffer({ offerId, token }))
        .then(() => {
          expect(mockDispatch.actions).to.deep.equal([
            { type: offerActionTypes.OFFER_REMOVE_OFFER, offerId: 1 },
            { type: offerActionTypes.OFFER_REMOVE_OFFER_SUCCESS },
          ]);

          done();
        })
        .catch(done);
    });
  });

  describe('OFFER_CREATE_OFFER', () => {
    it('sends a POST request to create a new offer', (done) => {
      const token = 'abc-123';
      const categoryId = 1;
      const photoId = 2;
      const description = 'worth lotz of money';
      const radius = 99;

      mockDispatch
        .dispatch(actions.createOffer({ categoryId, photoId, description, radius, token }))
        .then(() => {
          expect(mockDispatch.actions).to.deep.equal([
            { type: offerActionTypes.OFFER_CREATE_OFFER, categoryId, photoId, description, radius },
            { type: offerActionTypes.OFFER_CREATE_OFFER_SUCCESS, offerId: 1 },
          ]);

          done();
        })
        .catch(done);
    });
  });
});
