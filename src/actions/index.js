import { createAuthActions } from './auth';
import { createUserActions } from './user';
import { createLocationActions } from './location';
import { createPhotoActions } from './photo';
import { createMatchActions } from './match';
import { createTradeActions } from './trade';
import { createTradeChatActions } from './tradeChat';
import { createMessageActions } from './message'

export function createActions(api) {
  return {
    auth: createAuthActions(api),
    user: createUserActions(api),
    location: createLocationActions(api),
    photo: createPhotoActions(api),
    match: createMatchActions(api),
    trade: createTradeActions(api),
    tradeChat: createTradeChatActions(api),
    message: createMessageActions(api)
  }
}
