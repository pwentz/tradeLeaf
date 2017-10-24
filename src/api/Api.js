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
}
