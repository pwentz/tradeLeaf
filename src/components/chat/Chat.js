import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Avatar from '../common/Avatar';
import globalStyles, {
  windowHeight,
  windowWidth,
  midGray,
  lightGray,
  lightWhite,
  blue,
} from '../../styles';
const moment = require('moment');

export default class extends React.Component {
  static propTypes = {
    recipient: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    lastMessage: PropTypes.object,
  };

  render() {
    const { recipient, currentUser, lastMessage } = this.props;
    const recipientPhoto = recipient.photo ? { uri: recipient.photo.imageUrl } : undefined;
    return (
      <TouchableOpacity style={styles.chatContainer}>
        <View style={styles.avatarContainer}>
          <Avatar size={50} imageSource={recipientPhoto} />
        </View>
        <View style={styles.previewContainer}>
          <Text>
            <Text style={{ fontWeight: 'bold', color: blue }}>
              {recipient.firstName} {recipient.lastName}
            </Text>
            <Text style={{ color: midGray }}> @{recipient.username}</Text>
          </Text>
          {lastMessage && (
            <Text style={styles.preview}>
              {lastMessage.content.length > 75
                ? `${lastMessage.content.slice(0, 75)}...`
                : lastMessage.content}
            </Text>
          )}
        </View>
        {lastMessage && (
          <View style={styles.timestampContainer}>
            <Text style={styles.timestamp}>{moment(lastMessage.createdAt).format('M/D/YY')}</Text>
          </View>
        )}
        <View />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  chatContainer: {
    height: '15%',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: midGray,
    backgroundColor: lightWhite,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  previewContainer: {
    width: '65%',
    height: '75%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  preview: { color: blue, opacity: 0.75, fontSize: 14 },
  timestampContainer: {
    position: 'relative',
    width: '15%',
    zIndex: -1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  timestamp: {
    color: blue,
    marginBottom: 30,
    opacity: 0.7,
    fontSize: 12,
  },
});
