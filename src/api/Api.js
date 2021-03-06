import { fetchRequest } from './utils';

import { createUploader } from './cloudinary/cloudinary';

export default class Api {
  constructor({ apiUrl, cloudinary, locationClient, localStorageClient, chatClient }) {
    this.apiUrl = apiUrl;
    this.cloudinaryUploader = createUploader(cloudinary);
    this.locationClient = locationClient;
    this.localStorageClient = localStorageClient;
    this.chatClient = chatClient;
  }

  login(username, password) {
    return fetchRequest(
      this.apiUrl,
      'login',
      { method: 'POST', credentials: 'include' },
      { username, password }
    );
  }

  registerUser(firstName, lastName, email, username, password) {
    return fetchRequest(
      this.apiUrl,
      'users',
      { method: 'POST', credentials: 'include' },
      { firstName, lastName, email, username, password }
    );
  }

  persistAuthToken(userId, authToken) {
    return this.localStorageClient.storeAuthToken(userId, authToken);
  }

  retrieveAuthToken() {
    return this.localStorageClient.getAuthToken();
  }

  logout() {
    return this.localStorageClient.destroyAuthToken();
  }

  getCurrentPosition() {
    return this.locationClient.getCurrentPosition();
  }

  getUser(userId) {
    return fetchRequest(this.apiUrl, `users/${userId}`, { method: 'GET', credentials: 'include' });
  }

  updateCoords(userId, authToken, coordinates) {
    return fetchRequest(
      this.apiUrl,
      `users/${userId}`,
      { method: 'PATCH', credentials: 'include' },
      { coordinates },
      authToken
    );
  }

  updateUserWithPhoto(userId, authToken, photoId) {
    return fetchRequest(
      this.apiUrl,
      `users/${userId}`,
      { method: 'PATCH', credentials: 'include' },
      { photoId },
      authToken
    );
  }

  createPhoto(cloudinaryId, imageUrl) {
    return fetchRequest(
      this.apiUrl,
      `photos`,
      { method: 'POST', credentials: 'include' },
      { cloudinaryId, imageUrl }
    );
  }

  uploadToCloudinary(imageResource) {
    return this.cloudinaryUploader.upload(imageResource);
  }

  getMatches(authToken) {
    return fetchRequest(
      this.apiUrl,
      'matches',
      { method: 'GET', credentials: 'include' },
      null,
      authToken
    );
  }

  createTrade({ acceptedOfferId, exchangeOfferId }) {
    return fetchRequest(
      this.apiUrl,
      `trades`,
      { method: 'POST', credentials: 'include' },
      { acceptedOfferId, exchangeOfferId }
    );
  }

  findTrade({ acceptedOfferId, exchangeOfferId }) {
    return fetchRequest(
      this.apiUrl,
      `trades?acceptedOfferId=${acceptedOfferId}&exchangeOfferId=${exchangeOfferId}`,
      { method: 'GET', credentials: 'include' }
    );
  }

  createTradeChat(tradeId) {
    return fetchRequest(
      this.apiUrl,
      `trade-chat`,
      { method: 'POST', credentials: 'include' },
      { tradeId }
    );
  }

  createMessage({ tradeChatId, content, token }) {
    return fetchRequest(
      this.apiUrl,
      `messages`,
      { method: 'POST', credentials: 'include' },
      { tradeChatId, content },
      token
    );
  }

  fetchTradeChats(userId, authToken) {
    return fetchRequest(
      this.apiUrl,
      `trade-chat/${userId}`,
      { method: 'GET', credentials: 'include' },
      null,
      authToken
    );
  }

  createChatSocket(onOpen, onMessage) {
    this.chatClient.createSocket(onOpen, onMessage);
  }

  sendToChatSocket(message) {
    this.chatClient.send(message);
  }

  closeChatSocket() {
    this.chatClient.close();
  }

  removeOffer({ offerId, token }) {
    return fetchRequest(
      this.apiUrl,
      `offers/${offerId}`,
      { method: 'DELETE', credentials: 'include' },
      null,
      token
    );
  }

  getCategories() {
    return fetchRequest(this.apiUrl, `categories`, { method: 'GET', credentials: 'include' });
  }

  createOffer({ categoryId, photoId, description, radius, token }) {
    return fetchRequest(
      this.apiUrl,
      'offers',
      { method: 'POST', credentials: 'include' },
      { categoryId, photoId, description, radius },
      token
    );
  }

  createRequest({ offerId, categoryId, description, token }) {
    return fetchRequest(
      this.apiUrl,
      'requests',
      { method: 'POST', credentials: 'include' },
      { offerId, categoryId, description },
      token
    );
  }
}
