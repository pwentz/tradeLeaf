
import { createAction } from './createAction';

export const photoActionTypes = {
  PHOTO_UPLOAD_TO_CLOUDINARY: 'PHOTO_UPLOAD_TO_CLOUDINARY',
  PHOTO_UPLOAD_TO_CLOUDINARY_SUCCESS: 'PHOTO_UPLOAD_TO_CLOUDINARY_SUCCESS',
  PHOTO_UPLOAD_TO_CLOUDINARY_FAILURE: 'PHOTO_UPLOAD_TO_CLOUDINARY_FAILURE'

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

  function createUserProfilePhoto(userId) {
    return dispatch => {
      dispatch(createAction(photoActionTypes.PHOTO_CREATE_PROFILE, {userId, photo: {cloudinary_id, image_url}}));
      return api.createUserProfilePhoto(userId, {cloudinary_id, image_url})
        .then(created => {
          dispatch(createAction(photoActionTypes.PHOTO_CREATE_PROFILE_SUCCESS, {userId, photo: created.photo}));
          return created.photo;
        })
        .catch(error => {
          dispatch(createAction(photoActionTypes.PHOTO_CREATE_PROFILE_FAILURE, {userId, photo: {cloudinary_id, image_url}, error}));
          throw error
        })
    };
  };

  function uploadAndCreateProfilePhoto(userId, imageSource) {
    return dispatch => {
      return dispatch(uploadToCloudinary(imageSource))
        .then(uploaded => {
          if (uploaded.error) {
            throw new Error('Upload Error: ' + (uploaded.error.message || JSON.stringify(uploaded.error)));
          }
          return dispatch(createUserProfilePhoto(userId, {
            cloudinary_id: uploaded.public_id,
            image_url: uploaded.secure_url || uploaded.url
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
