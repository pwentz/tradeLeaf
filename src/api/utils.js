import ApiError from './ApiError'

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

export function fetchRequest(apiUrl, route, request, body, token) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: '*/*'
  }

  return fetch(apiUrl + route, {
    body: body ? JSON.stringify(body) : null,
    headers: new Headers(
      token ? {...headers, 'Authorization': token} : headers
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
