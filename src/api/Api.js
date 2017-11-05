import { fetchRequest } from './utils'

export default class Api {
  constructor({apiUrl}) {
    this.apiUrl = apiUrl;
  }

  login(username, password) {
    return fetchRequest(
      this.apiUrl,
      'login',
      { method: 'POST', credentials: 'include' },
      { authUsername: username, authPassword: password }
    )
  }

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
      { method: 'POST', credentials: 'include' },
      coords,
      authToken
    );
  };
};
