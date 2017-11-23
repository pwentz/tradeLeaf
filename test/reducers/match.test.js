import { createAction } from '../../src/actions/createAction';
import reducer from '../../src/reducers/index';
import { matchActionTypes } from '../../src/actions/match';

import { expect } from 'chai';

describe('match reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, { data: {} })
  })

  context('MATCH_GET_MATCHES_SUCCESS', () => {
    it('saves matches when they are successfully retrieved', () => {
      const matches = [
        { user: {}, offer: {}, distance: 1},
        { user: {}, offer: {}, distance: 2}
      ]

      let state = reducer(undefined, { data: {} })

      state = reducer(state, createAction(matchActionTypes.MATCH_GET_MATCHES_SUCCESS, {
        matches
      }));

      expect(state.match.matches).to.deep.equal(matches);
    });

    it('replaces existing matches when new ones are retrieved', () => {
      const oldMatches = [ { user: {}, offer: {}, distance: 5 } ];
      const newMatches = [ { user: {}, offer: {}, distance: 25 } ];

      let state = reducer({ match: { matches: oldMatches } }, {});

      state = reducer(state, createAction(matchActionTypes.MATCH_GET_MATCHES_SUCCESS, {
        matches: newMatches
      }));

      expect(state.match.matches).to.deep.equal(newMatches);
    });
  });
});
