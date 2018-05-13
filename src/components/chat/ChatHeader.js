import React, { Component } from 'react';
import Avatar from '../common/Avatar';
import PropTypes from 'prop-types';
import { blue, midGray, lightWhite, windowWidth, windowHeight } from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';

import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default class extends Component {
  static propTypes = {
    recipientName: PropTypes.string.isRequired,
    back: PropTypes.func.isRequired,
    recipientPhoto: PropTypes.object,
  };

  render() {
    const { recipientName, recipientPhoto } = this.props;
    const photo = recipientPhoto ? { uri: recipientPhoto.imageUrl } : undefined;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.filler} />
        <View style={styles.backContainer}>
          <TouchableOpacity onPress={this.props.back}>
            <Icon name="ios-arrow-back" size={32} color={blue} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Avatar imageSource={photo} size={50} />
          <View>
            <Text>@{recipientName}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: windowHeight * 0.15,
    backgroundColor: lightWhite,
    borderBottomColor: midGray,
    borderBottomWidth: 1,
    position: 'relative',
  },
  container: {
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  filler: {
    height: '20%',
  },
  backContainer: {
    position: 'absolute',
    top: windowHeight * 0.06,
    left: windowWidth * 0.05,
    zIndex: 99,
  },
});
