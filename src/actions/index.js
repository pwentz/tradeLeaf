import { createAuthActions } from './auth';
import { createUserActions } from './user';
import { createLocationActions } from './location';
import { createPhotoActions } from './photo';
import { createMatchActions } from './match';
import { createTradeActions } from './trade';
import { createTradeChatActions } from './tradeChat';
import { createMessageActions } from './message';
import { createChatSocketActions } from './chatSocket';
import { createCategoryActions } from './category';
import { createOfferActions } from './offer';
import { createRequestActions } from './request';

export function createActions(api) {
  return {
    auth: createAuthActions(api),
    user: createUserActions(api),
    location: createLocationActions(api),
    photo: createPhotoActions(api),
    match: createMatchActions(api),
    trade: createTradeActions(api),
    tradeChat: createTradeChatActions(api),
    message: createMessageActions(api),
    chatSocket: createChatSocketActions(api),
    category: createCategoryActions(api),
    offer: createOfferActions(api),
    request: createRequestActions(api),
  };
}
