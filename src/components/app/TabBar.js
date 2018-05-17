import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import PropTypes from 'prop-types';
import TabHeader from './TabHeader';

import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

import globalStyles, { yellow, midGray, windowWidth, windowHeight } from '../../styles/index';

export default class TabBar extends Component {
  static propTypes = {
    profilePhoto: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'home',
    };
  }

  navigateToTab = (routeName) => {
    this.setState(
      {
        currentTab: routeName,
      },
      () => {
        this.props.navigation.navigate(routeName);
      }
    );
  };

  render() {
    const routeIcons = {
      Home: 'home',
      Search: 'search',
      Notifications: 'bell',
      Inbox: 'mail',
    };

    const { navigation, profilePhoto } = this.props;
    const { routes, index } = navigation.state;

    return (
      <View style={{ backgroundColor: 'white' }}>
        <TabHeader profilePhoto={profilePhoto} headerTitle={this.state.currentTab} />

        <View style={styles.tabContainer}>
          {routes.map((route, idx) => {
            const color = index == idx ? yellow : midGray;
            const isActive = index == idx;
            const tabStyles = isActive ? styles.activeTab : styles.inactiveTab;

            return (
              <TouchableOpacity
                onPress={() => this.navigateToTab(route.routeName)}
                key={idx}
                style={[styles.tab, tabStyles]}
              >
                <Icon name={routeIcons[route.routeName]} size={28} color={color} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    width: windowWidth,
    borderBottomWidth: 1,
    borderBottomColor: midGray,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  inactiveTab: {
    borderBottomWidth: 1,
    borderBottomColor: midGray,
  },
  activeTab: {
    borderBottomWidth: 4,
    borderBottomColor: yellow,
  },
});
