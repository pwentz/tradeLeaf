import { createAction } from './createAction';

export const offerActionTypes = {
  OFFER_REMOVE_OFFER: 'OFFER_REMOVE_OFFER',
  OFFER_REMOVE_OFFER_SUCCESS: 'OFFER_REMOVE_OFFER_SUCCESS',
  OFFER_REMOVE_OFFER_FAILURE: 'OFFER_REMOVE_OFFER_FAILURE',

  OFFER_CREATE_OFFER: 'OFFER_CREATE_OFFER',
  OFFER_CREATE_OFFER_SUCCESS: 'OFFER_CREATE_OFFER_SUCCESS',
  OFFER_CREATE_OFFER_FAILURE: 'OFFER_CREATE_OFFER_FAILURE',
};

export function createOfferActions(api) {
  function removeOffer({ offerId, token }) {
    return (dispatch) => {
      dispatch(createAction(offerActionTypes.OFFER_REMOVE_OFFER, { offerId }));
      return api
        .removeOffer({ offerId, token })
        .then(() => {
          dispatch(createAction(offerActionTypes.OFFER_REMOVE_OFFER_SUCCESS));
        })
        .catch((err) => {
          dispatch(createAction(offerActionTypes.OFFER_REMOVE_OFFER_FAILURE, { err }));
          throw err;
        });
    };
  }

  function createOffer({ categoryId, photoId, description, radius, token }) {
    return (dispatch) => {
      dispatch(
        createAction(offerActionTypes.OFFER_CREATE_OFFER, {
          categoryId,
          photoId,
          description,
          radius,
        })
      );
      return api
        .createOffer({ categoryId, photoId, description, radius, token })
        .then((offerId) => {
          dispatch(createAction(offerActionTypes.OFFER_CREATE_OFFER_SUCCESS, { offerId }));
          return offerId;
        })
        .catch((err) => {
          dispatch(createAction(offerActionTypes.OFFER_CREATE_OFFER_FAILURE, { err }));
          throw err;
        });
    };
  }

  return {
    removeOffer,
    createOffer,
  };
}
