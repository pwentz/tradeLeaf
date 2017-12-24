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
import TabBarContainer from '../../containers/app/TabBarContainer';

function addListener(props) {
  const { navigate } = props.navigation;

  const newNav = (routeName, ...rest) => {
    if (props.screenProps.testRouteObserver) {
      props.screenProps.testRouteObserver.currentRoute = routeName
    }
    navigate(routeName, ...rest)
  }

  props.navigation.navigate = newNav

  if (props.screenProps.testRouteObserver) {
    props.screenProps.testRouteObserver.navigate = newNav
  }

  return props;
};

const App = StackNavigator({
  Login: {
    screen: props => <LoginContainer {...addListener(props)} />,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  Register: {
    screen: props => <RegisterContainer {...addListener(props)} />,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  AccountRequirements: {
    screen: props => <AccountRequirementsContainer {...addListener(props)} />,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  MatchBoard: {
    screen: TabNavigator(
      {
        Home: { screen: props => <MatchBoardContainer {...props} /> },
        Search: { screen: props => <SearchContainer {...props} /> },
        Notifications: { screen: props => <NotificationContainer {...props} /> },
        Inbox: { screen: props => <InboxContainer {...props} /> }
      },
      { initialRouteName: 'Home',
        tabBarComponent: TabBarContainer,
        tabBarPosition: 'top',
        // animationEnabled: true
      }
    ),
    navigationOptions: ({navigation}) => ({
      header: null
    })
  }
})

export default App
