import React, { Component, PropTypes } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { Provider } from 'react-redux';

import App from '../../components/app/App'

import { createApi } from '../../api/createApi';
import { createStore } from '../../stores/index';
import { createActions } from '../../actions/index';
import { createUserMiddleware } from '../../middleware/userMiddleware';

const inDev = __DEV__;
const api = createApi(inDev)
const actions = createActions(api)
const store = createStore(undefined /*initialState*/, createUserMiddleware(actions), inDev);

const AppContainer = () => {
  return (
      <Provider store={store}>
        <App screenProps={{ actions }} />
      </Provider>
  );
};

export default AppContainer
