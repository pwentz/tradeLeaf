import React, { Component, PropTypes } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { Provider } from 'react-redux';

import App from '../../components/app/App'

import { createStore } from '../../stores/index';

const inDev = __DEV__;
const store = createStore(undefined /*initialState*/, inDev);

const AppContainer = () => {
  return (
      <Provider store={store}>
        <App />
      </Provider>
  );
};

export default AppContainer
