import React, { Component } from 'react';
import {
  StackNavigator
} from 'react-navigation'

import { createApi } from '../../api/createApi';
import { createActions } from '../../actions/index';

const inDev = __DEV__;
const api = createApi(inDev);
const actions = createActions(api);

import LoginContainer from '../../containers/login/LoginContainer'

const App = StackNavigator({
  Home: { screen: _ => <LoginContainer actions={actions} />  }
})

export default App
