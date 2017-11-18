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
    <View style={styles.container}>
      <Provider store={store}>
        <App screenProps={{ actions }} />
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white'
  }
})

export default AppContainer
