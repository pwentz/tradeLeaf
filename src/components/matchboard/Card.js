import React, { Component, PropTypes } from 'react';
import Icon from 'react-native-vector-icons/Octicons';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import globalStyles, {
  darkWhite,
  midGray,
  yellow,
  blue,
  windowWidth,
  windowHeight
} from '../../styles/index'

export default class Card extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <View style={{height: 20}}></View>
        <View style={styles.cardContainer}>
          <View style={styles.cardActionContainer}>
            <View style={styles.mailIconContainer}>
              <TouchableOpacity>
                <Icon
                  name='mail'
                  size={26}
                  color={midGray}
                >
                </Icon>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.mainButton}></TouchableOpacity>
            <View style={styles.xIconContainer}>
              <TouchableOpacity>
                <Icon
                  name='x'
                  size={30}
                  color={blue}
                >
                </Icon>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    height: (windowHeight * 0.6),
    width: (windowWidth * 0.8),
    backgroundColor: darkWhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: midGray,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cardActionContainer: {
    height: 80,
    width: (windowWidth * 0.8),
    borderTopWidth: 1,
    borderTopColor: midGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  mainButton: {
    // marginTop: 15,
    height: 40,
    width: 40,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: yellow
  },
  xIconContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 25
  },
  mailIconContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 25
    // justifyContent: 'center'
  }
})
