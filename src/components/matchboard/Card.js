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

import Avatar from '../common/Avatar';

export default class Card extends Component {
  render() {
    return (
      <View style={globalStyles.container}>

        <View style={{height: 20}}></View>

        <View style={styles.cardContainer}>

          <View style={styles.userContainer}>
            <Avatar
              size={90}
            />

            <View style={styles.userDataContainer}>
              <Text>
                @tannerLemon
              </Text>
              <Text>
                Simple Logo
              </Text>
              <Text>
                Icons
              </Text>
            </View>
          </View>

          <View style={styles.tradeContainer}>
            <View style={styles.needContainer}>
            </View>
          </View>

          <View style={styles.cardActionContainer}>

            <View style={styles.mailIconContainer}>
              <TouchableOpacity>
                <Icon
                  name='mail'
                  size={38}
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
                  size={38}
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
    height: (windowHeight * 0.7),
    width: (windowWidth * 0.85),
    backgroundColor: darkWhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: midGray,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  cardActionContainer: {
    height: (windowHeight * 0.1),
    width: (windowWidth * 0.85),
    borderTopWidth: 1,
    borderTopColor: midGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  mainButton: {
    height: 42,
    width: 42,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: yellow
  },
  xIconContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 20
  },
  mailIconContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 20
  },
  tradeContainer: {
    width: (windowWidth * 0.6375),
    height: (windowHeight * 0.41),
    borderWidth: 2,
    borderColor: blue,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  needContainer: {
    width: (windowWidth * 0.6375),
    height: (windowHeight * 0.105),
    borderWidth: 2,
    borderColor: blue
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: (windowWidth * 0.695)
  },
  userDataContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 0.85
  }
})
