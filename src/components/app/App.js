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
import AccountRequirementsContainer from '../../containers/register/AccountRequirementsContainer';
import TabBar from '../navigation/TabBar'

const App = StackNavigator({
  Login: {
    screen: props => <LoginContainer {...props} />,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  Register: {
    screen: StackNavigator(
      {
        RegisterHome: {
          screen: props => <RegisterContainer {...props} />,
          navigationOptions: ({navigation}) => ({
            header: null
          })
        },
        RegisterFinish: {
          screen: props => <AccountRequirementsContainer {...props} />,
          navigationOptions: ({navigation}) => ({
            header: null
          })
        }
      },
      { initialRouteName: 'RegisterHome' }
  ),
  navigationOptions: ({navigation}) => ({
    header: null
  })},
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
