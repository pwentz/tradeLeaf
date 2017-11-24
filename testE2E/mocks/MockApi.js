import { createUploader } from './mockCloudinary';

import {
  photos,
  authedUser,
  users,
  authedUserMatches,
  authedUserToken
} from './mockData';

import { findById } from '../../src/reducers/utils';

export default class MockApi {
  constructor() {
    this.apiUrl = 'mockApiUrl';
    this.cloudinaryUploader = createUploader();

    this.photoId = 99;
  }

  login = jest.fn((username, password) => {
    return Promise.resolve({
      userId: authedUser.id,
      token: authedUserToken
    });
  })

  registerUser = jest.fn((firstName, lastName, email, username, password) => {
    return Promise.resolve('user registered');
  })

  persistAuthToken = jest.fn((userId, authToken) => {
    return Promise.resolve('token persisted')
  })

  retrieveAuthToken = jest.fn(() => {
    return Promise.resolve({ userId: authedUser.id, authToken: authedUserToken })
  })

  logout = jest.fn(() => {
    return Promise.resolve('logged out')
  })

  getUser = jest.fn((userId) => {
    const user = users[userId];

    return Promise.resolve(user || {});
  })

  getCurrentPosition = jest.fn(() => {
    return Promise.resolve({lat: 12.345, lng: 678.91})
  })

  updateCoords = jest.fn((userId, token, coordinates) => {
    const user = users[userId];

    if (user) Object.assign(user, {coordinates})
    return Promise.resolve('updated');
  })

  updateUserWithPhoto = jest.fn((userId, token, photoId) => {
    const user = users[userId];
    const photo = photos[photoId];

    if (user && photo) Object.assign(user, {photo})
    return Promise.resolve('updated')
  })

  createPhoto = jest.fn((cloudinaryId, imageUrl) => {
    const photoId = this.photoId++;
    const photo = {
      id: photoId,
      cloudinaryId: cloudinaryId,
      imageUrl: imageUrl,
      createdAt: '2017-11-18T00:12:46.618258Z',
      updatedAt: '2017-11-18T00:12:46.618258Z'
    }

    photos[photoId] = photo;
    return Promise.resolve('created');
  })

  uploadToCloudinary = jest.fn((imageResource) => {
    return this.cloudinaryUploader.upload(imageResource);
  })

  getMatches = jest.fn((authToken) => {
    return Promise.resolve(authedUserMatches);
  })
}
