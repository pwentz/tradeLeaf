import { fetchRequest, storeAuthToken, destroyAuthToken, getAuthToken  } from './utils';
import LocationService from '../location/LocationService';

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

  registerUser(firstName, lastName, email, username, password) {
    return fetchRequest(
      this.apiUrl,
      'users',
      { method: 'POST', credentials: 'include' },
      { firstName, lastName, email, username, password }
    );
  };

  persistAuthToken(userId, authToken) {
    return storeAuthToken(userId, authToken)
  }

  retrieveAuthToken() {
    return getAuthToken()
  }

  logout() {
    return destroyAuthToken()
  }

  getCurrentPosition() {
    return LocationService.getCurrentPosition()
  }

  getUser(userId) {
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

  createPhoto(cloudinaryId, imageUrl) {
    return fetchRequest(
      this.apiUrl,
      `photos`,
      { method: 'POST', credential: 'include' },
      { cloudinaryId, imageUrl }
    );
  };

  uploadToCloudinary(imageResource) {
    return this.cloudinaryUploader.upload(imageResource);
  };
};
