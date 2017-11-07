import { fetchRequest } from './utils';

import { createUploader } from './cloudinary/cloudinary';

export default class Api {
  constructor({apiUrl, cloudinary}) {
    this.apiUrl = apiUrl;
    this.cloudinaryUploader = createUploader(cloudinary);
  };

  login(username, password) {
    return fetchRequest(
      this.apiUrl,
      'login',
      { method: 'POST', credentials: 'include' },
      { authUsername: username, authPassword: password }
    );
  };

  registerUser(username, password, passwordConfirmation) {
    return fetchRequest(
      this.apiUrl,
      'users',
      { method: 'POST', credentials: 'include' },
      { username, password, passwordConfirmation }
    );
  };

  getUser(userId, authToken) {
    return fetchRequest(
      this.apiUrl,
      `users/${userId}`,
      { method: 'GET', credentials: 'include' },
      null,
      authToken
    );
  };

  updateCoords(userId, authToken, coords) {
    return fetchRequest(
      this.apiUrl,
      `users/${userId}/coordinates`,
      { method: 'PUT', credentials: 'include' },
      coords,
      authToken
    );
  };

  createUserProfilePhoto(userId, authToken, {cloudinary_id, image_url}) {
    return fetchRequest(
      this.apiUrl,
      `users/${userId}/profilePhoto`,
      { method: 'POST', credential: 'include' },
      { cloudinary_id, image_url },
      authToken
    );
  };

  uploadToCloudinary(imageResource) {
    return this.cloudinaryUploader.upload(imageResource);
  };
};
