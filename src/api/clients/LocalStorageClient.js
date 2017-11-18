import { AsyncStorage } from 'react-native';

export default class LocalStorageClient {
  static storeAuthToken(userId, authToken) {
    return AsyncStorage.multiSet([['userId', String(userId)], ['authToken', authToken]]);
  }

  static getAuthToken() {
    return new Promise((resolve, reject) => {
      return AsyncStorage.multiGet(['userId', 'authToken'])
        .then((vals) => {
          const userId = vals[0][1] ? parseInt(vals[0][1]) : undefined
          const authToken = vals[1][1]

          resolve({ userId, authToken })
        })
        .catch(reject)
    })
  }

  static destroyAuthToken() {
    return AsyncStorage.multiRemove(['userId', 'authToken']);
  }

}
