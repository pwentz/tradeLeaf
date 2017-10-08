function processJson(responseJson, response) {
  const error = responseJson.error || displayableErrors(responseJson.errors);

  if (error) {
    throw new Error(error);
  };

  if (!response.ok) {
    throw new Error('Http Error: ' + response.status + ' ' + (response.statusText || ''))
  }

  return responseJson
}

function processResponse(response) {
  return response.json().then((responseData => processJson(responseData, response)))
}

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
      //TODO: ApiError for display
      throw new Error(error)
    })
}

function displayableErrors(errors) {
  if (!errors) return errors;
  return Object.keys(errors || {}).map(errorKey => `${errorKey} ${errors[errorKey]}`).join('; ');
}
