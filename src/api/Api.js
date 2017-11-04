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

  registerUser(username, password, passwordConfirmation, location) {
    return fetchRequest(
      this.apiUrl,
      'users',
      { method: 'POST', credentials: 'include' },
      { username, password, passwordConfirmation, location }
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
};
