import ApiError from './ApiError'

function processJson(responseJson, response) {
  const error = responseJson.error || displayableErrors(responseJson.errors);

  if (error) {
    throw new Error(error);
  };

  if (!response.ok) {
    //TODO: pull from somewhere else
    if (response.url && response.url.includes("localhost")) {
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
  return fetch(apiUrl + route, {
    body: body ? JSON.stringify(body) : null,
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: '*/*'
    }),
    credentials: 'include',
    ...request
  })
    .then(processResponse)
    .catch(error => {
      if (error instanceof ApiError) throw error
      //TODO: ApiError for display
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
