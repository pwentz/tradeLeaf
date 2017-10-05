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

class AppContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  }
})


export default AppContainer
