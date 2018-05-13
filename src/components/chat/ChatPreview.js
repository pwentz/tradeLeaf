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
    handlePress: PropTypes.func.isRequired,
    lastMessage: PropTypes.object,
  };

  dayOfWeek(date) {
    switch (moment(date).day()) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
    }
  }

  get formattedDate() {
    const { lastMessage } = this.props;
    const wasLaterThanWeekAgo = (then) =>
      moment(then)
        .add(7, 'days')
        .isAfter(new Date());
    if (wasLaterThanWeekAgo(lastMessage.createdAt)) {
      return this.dayOfWeek(lastMessage.createdAt);
    }
    return moment(lastMessage.createAt).format('M/D/YY');
  }

  render() {
    const { recipient, currentUser, lastMessage, handlePress } = this.props;
    const recipientPhoto = recipient.photo ? { uri: recipient.photo.imageUrl } : undefined;
    return (
      <TouchableOpacity style={styles.chatContainer} onPress={handlePress}>
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
            <Text style={styles.timestamp}>{this.formattedDate}</Text>
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
    width: '60%',
    height: '75%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  preview: {
    color: blue,
    opacity: 0.75,
    fontSize: 12,
  },
  timestampContainer: {
    position: 'relative',
    width: '20%',
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
