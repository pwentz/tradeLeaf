import React from 'react';

import { setupTestApp, renderer } from '../setup';

import ApiError from '../../src/api/ApiError';

import {
  photos,
  authedUser,
  users
} from '../mocks/mockData'

let { TradeLeafApp, api, testRouteObserver, actions, dispatch } = {};

beforeEach(() => {
  ({ TradeLeafApp, api, actions, dispatch, testRouteObserver } = setupTestApp());
})

it('tries to get stored auth token', () => {
  const component = renderer.create(
    <TradeLeafApp />
  );
  expect(api.retrieveAuthToken).toBeCalled();
});


it('will update user coords if token is retrieved', () => {
  const component = renderer.create(
    <TradeLeafApp />
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      expect(api.updateCoords).toBeCalled();

      resolve();
    }, 1)
  })
})

it('will get user if token is retrieved', () => {
  const component = renderer.create(
    <TradeLeafApp />
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      expect(api.getUser).toBeCalledWith(authedUser.id)

      resolve();
    }, 1)
  })
})

it('routes to the register page if authed user has offers and location', () => {
  const component = renderer.create(
    <TradeLeafApp />
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      expect(testRouteObserver.currentRoute).toEqual('MatchBoard')
      resolve();
    }, 1)
  })
})
