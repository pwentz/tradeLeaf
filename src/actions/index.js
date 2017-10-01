import { createAuthActions } from './auth';

export function createActions(api) {
  return {
    auth: createAuthActions(api)
  }
}
