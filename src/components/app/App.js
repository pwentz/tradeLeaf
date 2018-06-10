import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import LoginContainer from '../../containers/login/LoginContainer';
import MatchBoardContainer from '../../containers/matchboard/MatchBoardContainer';
import CreateContainer from '../../containers/create/CreateContainer';
import OffersContainer from '../../containers/offers/OffersContainer';
import InboxContainer from '../../containers/chat/InboxContainer';
import RegisterContainer from '../../containers/register/RegisterContainer';
import AccountRequirementsContainer from '../../containers/register/AccountRequirementsContainer';
import TabBarContainer from '../../containers/app/TabBarContainer';
import ChatContainer from '../../containers/chat/ChatContainer';

function addListener(props) {
  const { navigate } = props.navigation;

  const newNav = (routeName, ...rest) => {
    if (props.screenProps.testRouteObserver) {
      props.screenProps.testRouteObserver.currentRoute = routeName;
    }
    navigate(routeName, ...rest);
  };

  props.navigation.navigate = newNav;

  if (props.screenProps.testRouteObserver) {
    props.screenProps.testRouteObserver.navigate = newNav;
  }

  return props;
}

const App = StackNavigator(
  {
    Login: {
      screen: (props) => <LoginContainer {...addListener(props)} />,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    Register: {
      screen: (props) => <RegisterContainer {...addListener(props)} />,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    AccountRequirements: {
      screen: (props) => <AccountRequirementsContainer {...addListener(props)} />,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    MatchBoard: {
      screen: TabNavigator(
        {
          Home: { screen: (props) => <MatchBoardContainer {...props} /> },
          Create: { screen: (props) => <CreateContainer {...props} /> },
          Offers: { screen: (props) => <OffersContainer {...props} /> },
          Inbox: { screen: (props) => <InboxContainer {...props} /> },
        },
        {
          initialRouteName: 'Home',
          tabBarComponent: TabBarContainer,
          tabBarPosition: 'top',
        }
      ),
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    Chat: {
      screen: (props) => <ChatContainer {...props} />,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);

export default App;
