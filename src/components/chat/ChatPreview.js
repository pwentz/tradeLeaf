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
import * as time from '../../util/time';
import { cappedString } from '../../api/utils';

export default class extends React.Component {
  static propTypes = {
    recipient: PropTypes.object.isRequired,
    handlePress: PropTypes.func.isRequired,
    lastMessage: PropTypes.object,
  };

  get formattedDate() {
    const { lastMessage } = this.props;

    if (time.daysAgo(lastMessage.createdAt) === 0) {
      return time.fromNow(lastMessage.createdAt);
    }

    if (time.daysAgo(lastMessage.createdAt) <= 7) {
      return time.dayOfWeek(lastMessage.createdAt);
    }

    return time.format(lastMessage.createdAt, 'M/D/YY');
  }

  render() {
    const { recipient, lastMessage, handlePress } = this.props;
    const recipientPhoto = recipient.photo ? { uri: recipient.photo.imageUrl } : undefined;
    return (
      <TouchableOpacity style={globalStyles.rowContainer} onPress={handlePress}>
        <View style={globalStyles.rowAvatarContainer}>
          <Avatar size={52} imageSource={recipientPhoto} />
        </View>

        <View style={{ width: '75%' }}>
          <View style={styles.previewDetailsContainer}>
            <Text>
              <Text style={{ fontWeight: 'bold', color: blue }}>
                {recipient.firstName} {recipient.lastName}
              </Text>
              <Text style={{ color: midGray }}> @{recipient.username}</Text>
            </Text>
            {!!lastMessage && (
              <View>
                <Text style={styles.timestamp}>{this.formattedDate}</Text>
              </View>
            )}
          </View>
          {!!lastMessage && (
            <Text style={styles.preview}>{cappedString(lastMessage.content, 85)}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  previewDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },
  preview: {
    color: blue,
    opacity: 0.9,
    fontSize: 14,
  },
  timestamp: {
    color: blue,
    opacity: 0.8,
    fontSize: 12,
  },
});
