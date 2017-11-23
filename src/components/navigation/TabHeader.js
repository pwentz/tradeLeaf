import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../common/Avatar';

import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import globalStyles, {
  yellow,
  windowWidth,
  windowHeight
} from '../../styles/index';

export default class TabHeader extends Component {
  static propTypes = {
    headerTitle: PropTypes.string.isRequired,
    profilePhoto: PropTypes.object
  }

  render() {
    const { profilePhoto, headerTitle } = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.itemsContainer}>
          <Avatar
            imageSource={profilePhoto}
            size={50}
          />
          <Text style={styles.headerText}>
            {headerTitle.toLowerCase()}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    width: windowWidth,
    height: (windowHeight * 0.15)
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '7.5%',
    marginLeft: '3%'
  },
  headerText: {
    color: yellow,
    fontSize: 20,
    marginLeft: '5%',
    marginBottom: '1%'
  }
})
