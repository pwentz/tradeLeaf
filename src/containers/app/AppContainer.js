import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { createApi } from '../../api/createApi';
import { setupApp } from '../../../setupApp';

const inDev = __DEV__;
const { actions, store } = setupApp(createApi(inDev), inDev)

import { Provider } from 'react-redux';

import App from '../../components/app/App'

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
