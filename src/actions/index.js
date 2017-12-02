import { createAuthActions } from './auth';
import { createUserActions } from './user';
import { createLocationActions } from './location';
import { createPhotoActions } from './photo';
import { createMatchActions } from './match';
import { createTradeActions } from './trade';

export function createActions(api) {
  return {
    auth: createAuthActions(api),
    user: createUserActions(api),
    location: createLocationActions(api),
    photo: createPhotoActions(api),
    match: createMatchActions(api),
    trade: createTradeActions(api)
  }
}
