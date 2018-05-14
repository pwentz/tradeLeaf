import React, { Component } from 'react';
const { View, StyleSheet } = require('react-native');

import { Provider } from 'react-redux';

import MockApi from './mocks/MockApi';
const { setupApp } = require('../setupApp');

__DEV__ = true;

jest.mock('Linking', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.genMockFn().mockReturnValue(Promise.resolve()),
    canOpenURL: jest.genMockFn().mockReturnValue(Promise.resolve()),
    getInitialURL: jest.genMockFn().mockReturnValue(Promise.resolve()),
  };
});

jest.mock('ScrollView', () => jest.genMockFromModule('ScrollView'));

export const renderer = require('react-test-renderer');

const AccountRequirements = require('../src/components/register/AccountRequirements').default;
const App = require('../src/components/app/App').default;
const Avatar = require('../src/components/common/Avatar').default;
const Card = require('../src/components/matchboard/Card').default;
const LoginForm = require('../src/components/login/LoginForm').default;
const RegisterForm = require('../src/components/register/RegisterForm').default;
const TabBar = require('../src/components/app/TabBar').default;
const ChatPreview = require('../src/components/chat/ChatPreview').default;

export const components = {
  LoginForm,
  RegisterForm,
  Card,
  AccountRequirements,
  Avatar,
  TabBar,
  ChatPreview,
};

class TestRouteObserver {}

export function setupTestApp() {
  const api = new MockApi();

  const shouldLog = false;

  const { actions, store } = setupApp(api, shouldLog);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: 'white',
    },
  });

  const testRouteObserver = new TestRouteObserver();

  class TradeLeafApp extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Provider store={store}>
            <App screenProps={{ actions, testRouteObserver }} />
          </Provider>
        </View>
      );
    }
  }

  return {
    TradeLeafApp,
    api,
    actions,
    dispatch: store.dispatch,
    testRouteObserver,
  };
}
