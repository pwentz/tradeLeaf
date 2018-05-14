import React, { Component } from 'react';
import Avatar from '../common/Avatar';
import PropTypes from 'prop-types';
import { yellow, blue, midGray, lightWhite, windowWidth, windowHeight } from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';

import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default class extends Component {
  static propTypes = {
    recipient: PropTypes.object.isRequired,
    back: PropTypes.func.isRequired,
  };

  render() {
    const { recipient } = this.props;
    const photo = recipient.photo ? { uri: recipient.photo.imageUrl } : undefined;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.filler} />
        <View style={styles.container}>
          <View style={styles.backContainer}>
            <TouchableOpacity onPress={this.props.back}>
              <Icon name="ios-arrow-back" size={32} color={lightWhite} />
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.recipientName}>
              {`${recipient.firstName} ${recipient.lastName}`}
            </Text>
            <Text style={styles.recipientUsername}>@{recipient.username}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerContainer: {
    width: '100%',
    height: windowHeight * 0.15,
    backgroundColor: yellow,
    borderBottomColor: midGray,
    borderBottomWidth: 1,
    position: 'relative',
  },
  textContainer: {
    height: '80%',
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  filler: {
    height: '20%',
    backgroundColor: lightWhite,
  },
  backContainer: {
    width: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipientName: {
    fontSize: 24,
    fontWeight: '200',
    color: lightWhite,
  },
  recipientUsername: {
    fontSize: 16,
    color: blue,
  },
});
