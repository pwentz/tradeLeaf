import { createAuthActions } from './auth';
import { createUserActions } from './user';
import { createLocationActions } from './location';

export function createActions(api) {
  return {
    auth: createAuthActions(api),
    user: createUserActions(api),
    location: createLocationActions(api)
  }
}
