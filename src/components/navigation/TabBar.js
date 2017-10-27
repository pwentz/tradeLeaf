import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Octicons';

import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image
} from 'react-native';

import globalStyles, {
  yellow,
  midGray,
  windowWidth,
  windowHeight
} from '../../styles/index'
const { width } = Dimensions.get('window');

export default class TabBar extends Component {
  render() {
    const routeIcons = {
      Index: 'home',
      Search: 'search',
      Notifications: 'bell',
      Inbox: 'mail'
    }

    const { navigation } = this.props;
    const { routes, index } = navigation.state;

    return (
      <View>
        <View style={styles.tabHeader}></View>

        <View style={styles.tabContainer}>
          {routes.map((route, idx) => {
            const color = (index == idx) ? yellow : midGray;
            const isActive = index == idx;
            const tabStyles = isActive ? styles.activeTab : styles.inactiveTab

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(route.routeName);
                }}
                key={idx}
                style={[styles.tab, tabStyles]}
              >
                <Icon
                  name={routeIcons[route.routeName]}
                  size={28}
                  color={color}
                >
                </Icon>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  tabHeader: {
    width: windowWidth,
    height: (windowHeight * 0.15)
  },
  tabContainer: {
    flexDirection: 'row',
    width,
    borderBottomWidth: 1,
    borderBottomColor: midGray
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48
  },
  inactiveTab: {
    borderBottomWidth: 1,
    borderBottomColor: midGray
  },
  activeTab: {
    borderBottomWidth: 4,
    borderBottomColor: yellow
  }
})
