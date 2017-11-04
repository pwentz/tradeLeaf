import { createAuthActions } from './auth';
import { createUserActions } from './user';

export function createActions(api) {
  return {
    auth: createAuthActions(api),
    user: createUserActions(api)
  }
}
