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
      { username, password }
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
      { method: 'GET', credentials: 'include' }
    );
  };

  updateCoords(userId, authToken, coordinates) {
    return fetchRequest(
      this.apiUrl,
      `users/${userId}`,
      { method: 'PATCH', credentials: 'include' },
      { coordinates },
      authToken
    );
  };

  updateUserWithPhoto(userId, authToken, photoId) {
    return fetchRequest(
      this.apiUrl,
      `users/${userId}`,
      { method: 'PATCH', credentials: 'include' },
      { photoId },
      authToken
    )
  };

  createPhoto(photoReq) {
    return fetchRequest(
      this.apiUrl,
      `photos`,
      { method: 'POST', credential: 'include' },
      photoReq
    );
  };

  uploadToCloudinary(imageResource) {
    return this.cloudinaryUploader.upload(imageResource);
  };
};
