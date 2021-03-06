import { createAction } from '../../src/actions/createAction';
import reducer from '../../src/reducers/index';
import { userActionTypes } from '../../src/actions/user';
import { matchActionTypes } from '../../src/actions/match';

import { expect } from 'chai';

describe('userMeta reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, { data: {} });
  });

  context('GET_USER_SUCCESS', () => {
    beforeEach(() => {
      state = reducer(undefined, { data: {} });
    });

    it('updates state with user id on successful user get', () => {
      let state = reducer(undefined, { data: {} });

      const user = {
        id: 3,
        firstName: 'Fred',
        lastName: 'Jackson',
        username: 'freddy-jack',
      };

      state = reducer(state, createAction(userActionTypes.GET_USER_SUCCESS, { user }));

      storedUser = state.userMeta[3];
      expect(storedUser.firstName).to.equal('Fred');
      expect(storedUser.lastName).to.equal('Jackson');
      expect(storedUser.username).to.equal('freddy-jack');
    });

    it('can update state with more users', () => {
      const user1 = {
        id: 3,
        username: 'freddy-jack',
      };

      const user2 = {
        id: 4,
        username: 'jackie-fred',
      };

      let state = reducer(
        state,
        createAction(userActionTypes.GET_USER_SUCCESS, {
          user: user1,
        })
      );

      state = reducer(
        state,
        createAction(userActionTypes.GET_USER_SUCCESS, {
          user: user2,
        })
      );

      expect(state.userMeta[3].username).to.equal('freddy-jack');
      expect(state.userMeta[4].username).to.equal('jackie-fred');
    });

    it('updates existing user with same id', () => {
      const oldUser = {
        id: 1,
        username: 'johnny-crack',
        firstName: 'John',
      };

      const updatedUser = {
        id: 1,
        username: 'action-crackson',
        lastName: 'Crackson',
      };

      let state = reducer(
        state,
        createAction(userActionTypes.GET_USER_SUCCESS, {
          user: oldUser,
        })
      );

      state = reducer(
        state,
        createAction(userActionTypes.GET_USER_SUCCESS, {
          user: updatedUser,
        })
      );

      const user = state.userMeta[1];
      expect(user.username).to.equal('action-crackson');
      expect(user.firstName).to.equal('John');
      expect(user.lastName).to.equal('Crackson');
    });
  });

  context('IDENTIFY_USER_AS_ONLINE', () => {
    it('updates user id with new boolean value', () => {
      const oldUser = {
        id: 1,
        username: 'phil',
      };

      let state = reducer(undefined, { 1: { id: 1, username: 'phil' } });

      state = reducer(state, createAction(userActionTypes.IDENTIFY_USER_AS_ONLINE, { userId: 1 }));

      const user = state.userMeta[1];
      expect(user.isOnline).to.equal(true);
    });
  });

  context('IDENTIFY_USER_AS_OFFLINE', () => {
    it('updates user id with new boolean value', () => {
      const oldUser = {
        id: 1,
        username: 'phil',
      };

      let state = reducer(undefined, { 1: { id: 1, username: 'phil' } });

      state = reducer(state, createAction(userActionTypes.IDENTIFY_USER_AS_OFFLINE, { userId: 1 }));

      const user = state.userMeta[1];
      expect(user.isOnline).to.equal(false);
    });
  });

  context('MATCHES_GET_MATCHES_SUCCESS', () => {
    it('updates with users on matches', () => {
      const matches = [
        { user: { id: 1, email: 'jim@yahoo.com' } },
        { user: { id: 2, email: 'bill@gmail.com' } },
      ];

      let state = reducer(undefined, {});

      state = reducer(state, createAction(matchActionTypes.MATCH_GET_MATCHES_SUCCESS, { matches }));

      const expected = {
        1: { id: 1, email: 'jim@yahoo.com' },
        2: { id: 2, email: 'bill@gmail.com' },
      };

      expect(state.userMeta).to.deep.equal(expected);
    });
  });
});
