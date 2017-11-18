import { locationActionTypes, createLocationActions } from '../../src/actions/location';
import { MockDispatch } from './utils';

import { expect } from 'chai';

class MockApi {
  updateCoords(userId, authToken, lat, lng) {
    return Promise.resolve();
  };

  getCurrentPosition(userId, authToken) {
    return Promise.resolve({ lat: 12.345, lng: 678.91 });
  };
};

const mockDispatch = new MockDispatch();
const actions = createLocationActions(new MockApi());

describe('location actions', () => {
  beforeEach(() => {
    mockDispatch.reset();
  });

  it('can get coords and update user', (done) => {
    mockDispatch.dispatch(actions.getCoordsAndUpdate(1, 'abc123'))
      .then(res => {
        const coords = { lat: 12.345, lng: 678.91 }

        expect(mockDispatch.actions).to.deep.equal([
          { type: locationActionTypes.LOCATION_GET_COORDS, userId: 1 },
          { type: locationActionTypes.LOCATION_GET_COORDS_SUCCESS, userId: 1, coords },
          { type: locationActionTypes.LOCATION_UPDATE_COORDS, userId: 1 },
          { type: locationActionTypes.LOCATION_UPDATE_COORDS_SUCCESS,
            userId: 1, authToken: 'abc123', ...coords }
        ]);

        expect(res).to.deep.equal({ userId: 1, authToken: 'abc123', ...coords })

        done();
      })
      .catch(done);
  });
});
