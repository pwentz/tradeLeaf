import React, { Component } from 'react';
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation'

import { createApi } from '../../api/createApi';
import { createActions } from '../../actions/index';

const inDev = __DEV__;
const api = createApi(inDev);
const actions = createActions(api);

import LoginContainer from '../../containers/login/LoginContainer';
import MatchBoardContainer from '../../containers/matchboard/MatchBoardContainer';
import TabBar from '../navigation/TabBar'

const App = StackNavigator({
  Home: { screen: props => <LoginContainer {...props} actions={actions} /> },
  MatchBoard: {
    screen: TabNavigator(
      {
        Index: { screen: props => <MatchBoardContainer {...props} actions={actions} /> }
      },
      { initialRouteName: 'Index',
        tabBarComponent: TabBar,
        tabBarPosition: 'top'
      }
    )
  }
})

export default App
