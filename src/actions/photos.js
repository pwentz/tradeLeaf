
import { createAction } from './createAction';

export const photoActionTypes = {
  PHOTO_UPLOAD_TO_CLOUDINARY: 'PHOTO_UPLOAD_TO_CLOUDINARY',
  PHOTO_UPLOAD_TO_CLOUDINARY_SUCCESS: 'PHOTO_UPLOAD_TO_CLOUDINARY_SUCCESS',
  PHOTO_UPLOAD_TO_CLOUDINARY_FAILURE: 'PHOTO_UPLOAD_TO_CLOUDINARY_FAILURE',

  PHOTO_CREATE_PROFILE: 'PHOTO_CREATE_PROFILE',
  PHOTO_CREATE_PROFILE_SUCCESS: 'PHOTO_CREATE_PROFILE_SUCCESS',
  PHOTO_CREATE_PROFILE_FAILURE: 'PHOTO_CREATE_PROFILE_FAILURE'
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

  function createUserProfilePhoto(userId, authToken) {
    return dispatch => {
      dispatch(createAction(photoActionTypes.PHOTO_CREATE_PROFILE, {userId, photo: {cloudinaryId, imageUrl}}));
      return api.createUserProfilePhoto(userId, authToken, {cloudinaryId, imageUrl})
        .then(created => {
          dispatch(createAction(photoActionTypes.PHOTO_CREATE_PROFILE_SUCCESS, {userId, authToken, photo: created.photo}));
          return created.photo;
        })
        .catch(error => {
          dispatch(createAction(photoActionTypes.PHOTO_CREATE_PROFILE_FAILURE, {userId, photo: {cloudinaryId, imageUrl}, error}));
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
          return dispatch(createUserProfilePhoto(userId, authToken, {
            cloudinaryId: uploaded.public_id,
            imageUrl: uploaded.secure_url || uploaded.url
          }));
        })
    };
  };

  return {
    uploadToCloudinary,
    createUserProfilePhoto,
    uploadAndCreateProfilePhoto
  };
};
