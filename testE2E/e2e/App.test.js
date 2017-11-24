import React from 'react';

import { setupTestApp, renderer } from '../setup';

import ApiError from '../../src/api/ApiError';

import {
  photos,
  authedUser,
  authedUserToken,
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

it('routes to the register page if token is found and authed user has enabled location', () => {
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

it('routes to the account requirements page if authed user has no offers', () => {
  const retrieveTokenForOfferlessUser = () => {
    return Promise.resolve({userId: 2, authToken: 'abc123'})
  };
  api.retrieveAuthToken.mockImplementationOnce(retrieveTokenForOfferlessUser);
  const component = renderer.create(
    <TradeLeafApp />
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      expect(testRouteObserver.currentRoute).toEqual('AccountRequirements')
      resolve();
    }, 1)
  })
})

it('will route to account requirements page if authed user has location off', () => {
  const component = renderer.create(
    <TradeLeafApp />
  );
  const disabledLocationServices = () => {
    return Promise.reject()
  };
  api.getCurrentPosition.mockImplementationOnce(disabledLocationServices);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      expect(testRouteObserver.currentRoute).toEqual('AccountRequirements')
      resolve();
    }, 1)
  })
})

it('does not route anywhere if no auth token is found', () => {
  const emptyAuthToken = () => {
    return Promise.resolve({ userId: null, authToken: null })
  }
  api.retrieveAuthToken.mockImplementationOnce(emptyAuthToken);
  const component = renderer.create(
    <TradeLeafApp />
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      expect(testRouteObserver.currentRoute).toBeUndefined()
      resolve();
    }, 1)
  })
})
//
// it('gets matches when Matchboard is mounted', () => {
//   const component = renderer.create(
//     <TradeLeafApp />
//   );
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       expect(testRouteObserver.currentRoute).toEqual('MatchBoard');
//       expect(api.getMatches).toBeCalledWith(authedUserToken);
//       resolve();
//     }, 1)
//   })
// })
