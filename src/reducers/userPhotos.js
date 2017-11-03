import { photoActionTypes } from '../actions/photos';
import { findById } from './utils';

const initalState = {};

export default function userPhotos(state = initalState, action) {
  switch (action.type) {
    case photoActionTypes.PHOTO_CREATE_SUCCESS:
    case photoActionTypes.PHOTO_CREATE_PROFILE_SUCCESS:
      if (findById(action.photo, state[action.userId])) {
        return state;
      };

      return Object.assign({}, state, { [action.userId]:
        [...(state[action.userId] || []), action.photo]
      });
  };
};
