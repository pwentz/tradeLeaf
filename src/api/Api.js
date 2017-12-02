import { fetchRequest } from './utils';

import { createUploader } from './cloudinary/cloudinary';

export default class Api {
  constructor({ apiUrl, cloudinary, locationClient, localStorageClient }) {
    this.apiUrl = apiUrl;
    this.cloudinaryUploader = createUploader(cloudinary);
    this.locationClient = locationClient
    this.localStorageClient = localStorageClient
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
    return this.localStorageClient.storeAuthToken(userId, authToken)
  }

  retrieveAuthToken() {
    return this.localStorageClient.getAuthToken()
  }

  logout() {
    return this.localStorageClient.destroyAuthToken()
  }

  getCurrentPosition() {
    return this.locationClient.getCurrentPosition()
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

  getMatches(authToken) {
    return fetchRequest(
      this.apiUrl,
      'matches',
      { method: 'GET', credential: 'include' },
      null,
      authToken
    );
  };

  createTrade(offer1Id, offer2Id) {
    return fetchRequest(
      this.apiUrl,
      `trades`,
      { method: 'POST', credential: 'include' },
      { offer1Id, offer2Id }
    );
  };
};
