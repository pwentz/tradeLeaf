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

import globalStyles, { yellow, midGray } from '../../styles/index'
const { width } = Dimensions.get('window');

export default class TabBar extends Component {
  render() {
    console.log("PROPS!", this.props)
    const { navigation } = this.props;
    const { routes, index } = navigation.state;

    return (
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
                name="home"
                size={28}
                color={midGray}
              >
              </Icon>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    width,
    borderBottomWidth: 2,
    borderBottomColor: midGray
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48
  },
  inactiveTab: {
    borderBottomWidth: 2,
    borderBottomColor: midGray
  },
  activeTab: {
    borderBottomWidth: 4,
    borderBottomColor: yellow
  }
})
