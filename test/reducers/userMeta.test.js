import { createAction } from '../../src/actions/createAction';
import reducer from '../../src/reducers/index';
import { userActionTypes } from '../../src/actions/user';

import assert from 'assert';

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
      assert.equal(storedUser.firstName, "Fred")
      assert.equal(storedUser.lastName, "Jackson")
      assert.equal(storedUser.username, "freddy-jack")
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

      assert.equal(state.userMeta[3].username, "freddy-jack")
      assert.equal(state.userMeta[4].username, "jackie-fred")
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
      assert.equal(user.username, "action-crackson")
      assert.equal(user.firstName, "John")
      assert.equal(user.lastName, "Crackson")
    });
  })
})
