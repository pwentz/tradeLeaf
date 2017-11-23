import { matchActionTypes, createMatchActions } from '../../src/actions/match';

import { MockDispatch } from './utils';
import { expect } from 'chai';

const match = {
  user: {
    id: 1,
    username: 'a-a-ron',
    firstName: 'aaron',
    lastName: 'johnson',
    photo: {
      imageUrl: 'https://cat.png'
    },
    offers: []
  },
  offer: {
    id: 1,
    userId: 1,
    description: 'i got stuff to give',
    category: 'stuff',
    photo: {
      imageUrl: 'https://stuff.png'
    }
  },
  distance: 4
}

class MockApi {
  getMatches(authToken) {
    return Promise.resolve([match])
  }
}

const mockDispatch = new MockDispatch();
const actions = createMatchActions(new MockApi());

describe('match actions', () => {
  beforeEach(() => {
    mockDispatch.reset();
  });

  it('can get matches', (done) => {
    mockDispatch.dispatch(actions.getMatches('abc123'))
      .then(res => {

        expect(mockDispatch.actions).to.deep.equal([
          { type: matchActionTypes.MATCH_GET_MATCHES },
          { type: matchActionTypes.MATCH_GET_MATCHES_SUCCESS, matches: [match] }
        ])

        expect(res).to.deep.equal([match])
        done()
      })
      .catch(done)
  });
});
