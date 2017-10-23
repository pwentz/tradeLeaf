import React, { Component } from 'react';

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

          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(route.routeName);
              }}
              style={[styles.tab]}
            >
              <Text>
                Stuff!
              </Text>
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
    borderBottomColor: yellow
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48
  },
  imageIcon: {
    height: 24,
    width: 24
  }
})
