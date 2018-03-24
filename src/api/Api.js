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
      { method: 'POST', credentials: 'include' },
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
      { method: 'GET', credentials: 'include' },
      null,
      authToken
    );
  };

  createTrade({acceptedOfferId, exchangeOfferId}) {
    return fetchRequest(
      this.apiUrl,
      `trades`,
      { method: 'POST', credentials: 'include' },
      { acceptedOfferId, exchangeOfferId }
    );
  };

  findTrade({acceptedOfferId, exchangeOfferId}) {
    return fetchRequest(
      this.apiUrl,
      `trades?acceptedOfferId=${acceptedOfferId}&exchangeOfferId=${exchangeOfferId}`,
      { method: 'GET', credentials: 'include' }
    )
  }

  createTradeChat(tradeId) {
    return fetchRequest(
      this.apiUrl,
      `trade-chat`,
      { method: 'POST', credentials: 'include' },
      { tradeId }
    )
  }

  createMessage({tradeChatId, senderId, content}) {
    return fetchRequest(
      this.apiUrl,
      `messages`,
      { method: 'POST', credentials: 'include' },
      { tradeChatId, senderId, content }
    )
  }
};
