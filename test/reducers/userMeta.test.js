import { createAction } from '../../src/actions/createAction';
import reducer from '../../src/reducers/index';
import { userActionTypes } from '../../src/actions/user';

import { expect } from 'chai';

describe('userMeta reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, { data: {} })
  })

  context('GET_USER_SUCCESS', () => {
    beforeEach(() => {
      state = reducer(undefined, { data: {} })
    })

    it('updates state with user id on successful user get', () => {
      let state = reducer(undefined, { data: {} })

      const user = {
        "id": 3,
        "firstName": "Fred",
        "lastName": "Jackson",
        "username": "freddy-jack"
      }

      state = reducer(state, createAction(userActionTypes.GET_USER_SUCCESS, { user }))

      storedUser = state.userMeta[3]
      expect(storedUser.firstName).to.equal("Fred")
      expect(storedUser.lastName).to.equal("Jackson")
      expect(storedUser.username).to.equal("freddy-jack")
    })

    it('can update state with more users', () => {
      const user1 = {
        "id": 3,
        "username": "freddy-jack"
      }

      const user2 = {
        "id": 4,
        "username": "jackie-fred"
      }

      let state = reducer(state, createAction(userActionTypes.GET_USER_SUCCESS, {
        user: user1
      }))

      state = reducer(state, createAction(userActionTypes.GET_USER_SUCCESS, {
        user: user2
      }))

      expect(state.userMeta[3].username).to.equal("freddy-jack")
      expect(state.userMeta[4].username).to.equal("jackie-fred")
    })

    it('updates existing user with same id', () => {
      const oldUser = {
        "id": 1,
        "username": "johnny-crack",
        "firstName": "John",
      }

      const updatedUser = {
        "id": 1,
        "username": "action-crackson",
        "lastName": "Crackson"
      }

      let state = reducer(state, createAction(userActionTypes.GET_USER_SUCCESS, {
        user: oldUser
      }))

      state = reducer(state, createAction(userActionTypes.GET_USER_SUCCESS, {
        user: updatedUser
      }))

      const user = state.userMeta[1]
      expect(user.username).to.equal("action-crackson")
      expect(user.firstName).to.equal("John")
      expect(user.lastName).to.equal("Crackson")
    });
  })
})
