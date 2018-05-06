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

// Message
// { id, tradeChatId, senderId, content, createdAt }

export default class extends React.Component {
  static propTypes = {
    recipient: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
  };

  render() {
    const { recipient, currentUser } = this.props;
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
        </View>
        {/* PUT TIMESTAMP OF MESSAGE BELOW */}
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
    width: '75%',
    height: '90%',
  },
});
