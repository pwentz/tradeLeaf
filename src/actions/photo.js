
import { createAction } from './createAction';

export const photoActionTypes = {
  PHOTO_UPLOAD_TO_CLOUDINARY: 'PHOTO_UPLOAD_TO_CLOUDINARY',
  PHOTO_UPLOAD_TO_CLOUDINARY_SUCCESS: 'PHOTO_UPLOAD_TO_CLOUDINARY_SUCCESS',
  PHOTO_UPLOAD_TO_CLOUDINARY_FAILURE: 'PHOTO_UPLOAD_TO_CLOUDINARY_FAILURE',

  PHOTO_CREATE: 'PHOTO_CREATE',
  PHOTO_CREATE_SUCCESS: 'PHOTO_CREATE_SUCCESS',
  PHOTO_CREATE_FAILURE: 'PHOTO_CREATE_FAILURE',

  PHOTO_UPDATE_USER: 'PHOTO_UPDATE_USER',
  PHOTO_UPDATE_USER_SUCCESS: 'PHOTO_UPDATE_USER_SUCCESS',
  PHOTO_UPDATE_USER_FAILURE: 'PHOTO_UPDATE_USER_FAILURE'
}

export function createPhotoActions(api) {
  function uploadToCloudinary(imageSource) {
    return dispatch => {
      dispatch(createAction(photoActionTypes.PHOTO_UPLOAD_TO_CLOUDINARY, {imageSource}));
      return api.uploadToCloudinary(imageSource)
        .then(uploaded => {
          dispatch(createAction(photoActionTypes.PHOTO_UPLOAD_TO_CLOUDINARY_SUCCESS, {uploaded}))
          return uploaded;
        })
        .catch(error => {
          dispatch(createAction(photoActionTypes.PHOTO_UPLOAD_TO_CLOUDINARY_FAILURE, {error}))
          throw error;
        });
    };
  };

  function createPhoto({ cloudinaryId, imageUrl }) {
    return dispatch => {
      dispatch(createAction(photoActionTypes.PHOTO_CREATE, {cloudinaryId, imageUrl}));
      return api.createPhoto(cloudinaryId, imageUrl)
        .then(photoId => {
          dispatch(createAction(photoActionTypes.PHOTO_CREATE_SUCCESS, { photoId }));
          return photoId
        })
        .catch(error => {
          dispatch(createAction(photoActionTypes.PHOTO_CREATE_FAILURE, {photo: {cloudinaryId, imageUrl}, error}));
          throw error
        })
    };
  };

  function updateUserWithPhoto(userId, authToken, photoId) {
    return dispatch => {
      dispatch(createAction(photoActionTypes.PHOTO_UPDATE_USER, { userId, photoId }))
      return api.updateUserWithPhoto(userId, authToken, photoId)
        .then(() => {
          return dispatch(createAction(photoActionTypes.PHOTO_UPDATE_USER_SUCCESS, { userId, authToken, photoId }))
        })
        .catch(error => {
          dispatch(createAction(photoActionTypes.PHOTO_UPDATE_USER_FAILURE, { error, userId }))
          throw error
        })
    };
  };

  function uploadAndCreateProfilePhoto(userId, authToken, imageSource) {
    return dispatch => {
      return dispatch(uploadToCloudinary(imageSource))
        .then(uploaded => {
          if (uploaded.error) {
            throw new Error('Upload Error: ' + (uploaded.error.message || JSON.stringify(uploaded.error)));
          }
          return dispatch(createPhoto({
            cloudinaryId: uploaded.public_id,
            imageUrl: uploaded.secure_url || uploaded.url
          }))
        })
        .then(photoId => {
          return dispatch(updateUserWithPhoto(userId, authToken, photoId))
        })
    };
  };

  return {
    uploadAndCreateProfilePhoto
  };
};
