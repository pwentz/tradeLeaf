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
import SearchContainer from '../../containers/search/SearchContainer';
import NotificationContainer from '../../containers/notifications/NotificationContainer';
import InboxContainer from '../../containers/inbox/InboxContainer';
import TabBar from '../navigation/TabBar'

const App = StackNavigator({
  Home: { screen: props => <LoginContainer {...props} actions={actions} /> },
  MatchBoard: {
    screen: TabNavigator(
      {
        Index: { screen: props => <MatchBoardContainer {...props} actions={actions} /> },
        Search: { screen: props => <SearchContainer {...props} actions={actions} /> },
        Notifications: { screen: props => <NotificationContainer {...props} actions={actions} /> },
        Inbox: { screen: props => <InboxContainer {...props} actions={actions} /> }
      },
      { initialRouteName: 'Index',
        tabBarComponent: TabBar,
        tabBarPosition: 'top',
        swipeEnabled: true
        // animationEnabled: true
      }
    ),
    navigationOptions: ({navigation}) => ({
      header: null
    })
  }
})

export default App
