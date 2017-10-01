import { createApi as createDev } from './createApi.dev'
import { createApi as createProd } from './createApi.prod'

export function createApi(inDev) {
  return inDev ? createDev() : createProd();
};
