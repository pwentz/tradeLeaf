import React, { Component } from 'react';
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation'

import LoginContainer from '../../containers/login/LoginContainer';
import MatchBoardContainer from '../../containers/matchboard/MatchBoardContainer';
import SearchContainer from '../../containers/search/SearchContainer';
import NotificationContainer from '../../containers/notifications/NotificationContainer';
import InboxContainer from '../../containers/inbox/InboxContainer';
import RegisterContainer from '../../containers/register/RegisterContainer';
import TabBar from '../navigation/TabBar'

const App = StackNavigator({
  Home: { screen: props => <LoginContainer {...props} /> },
  Register: { screen: props => <RegisterContainer {...props} /> },
  MatchBoard: {
    screen: TabNavigator(
      {
        Index: { screen: props => <MatchBoardContainer {...props} /> },
        Search: { screen: props => <SearchContainer {...props} /> },
        Notifications: { screen: props => <NotificationContainer {...props} /> },
        Inbox: { screen: props => <InboxContainer {...props} /> }
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
