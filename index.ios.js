import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StyleSheet
} from 'react-native';

import { Provider } from 'react-redux';

import AppContainer from './src/containers/app/AppContainer';

import { createApi } from './src/api/createApi';
import { createActions } from './src/actions/index';
import { createStore } from './src/stores/index';

const inDev = __DEV__;
const api = createApi(inDev);
const actions = createActions(api);
const store = createStore(undefined /*initialState*/, inDev);


export default class tradeLeaf extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <AppContainer actions={actions} />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  }
})

AppRegistry.registerComponent('tradeLeaf', () => tradeLeaf);
