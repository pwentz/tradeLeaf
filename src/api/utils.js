import ApiError from './ApiError'
import { AsyncStorage } from 'react-native';

function processJson(responseJson, response) {
  const error = responseJson.error || displayableErrors(responseJson.errors);

  if (error) {
    throw new Error(error);
  };

  if (!response.ok) {
    if (responseJson.detail) {
      throw new ApiError(responseJson.detail)
    }

    throw new Error('Http Error: ' + response.status + ' ' + (response.statusText || ''));
  };

  return responseJson;
};

function processResponse(response) {
  return response.json().then((responseData => processJson(responseData, response)));
};

export function handleIfApiError(error, handler) {
  if (error instanceof ApiError) {
    handler(error);
    return;
  };
  throw error;
};

export function fetchRequest(apiUrl, route, request, body, authToken) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: '*/*'
  }

  return fetch(apiUrl + route, {
    body: body ? JSON.stringify(body) : null,
    headers: new Headers(
      authToken ? {...headers, 'Authorization': authToken} : headers
    ),
    credentials: 'include',
    ...request
  })
    .then(processResponse)
    .catch(error => {
      if (error instanceof ApiError) throw error
      throw new ApiError(displayableError(error));
    })
}

function displayableErrors(errors) {
  if (!errors) return errors;
  return Object.keys(errors || {}).map(errorKey => `${errorKey} ${errors[errorKey]}`).join('; ');
};

function cappedString(str, maxLen = 20) {
  if (!str || !str.substr) return '';
  return (str.length > maxLen ? str.substr(0, maxLen) + '...' : str)
};

export function displayableError(error) {
  if (!error) return error;
  return error.message ? cappedString(error.message, 150) : JSON.stringify(error);
};

export function secureImageSource(imageSource) {
  if (imageSource && imageSource.uri && imageSource.uri.replace) {
    return {
      uri: imageSource.uri.replace('http://', 'https://')
    };
  };

  return imageSource;
};

export function maybePermissionsError(error) {
  return (error || '').toLowerCase().indexOf('permission') >= 0;
};

export function storeAuthToken(userId, authToken) {
  return AsyncStorage.multiSet([['userId', String(userId)], ['authToken', authToken]]);
}

export function getAuthToken() {
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

export function destroyAuthToken() {
  return AsyncStorage.multiRemove(['userId', 'authToken']);
}
