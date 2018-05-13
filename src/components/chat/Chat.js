import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ChatHeader from './ChatHeader';

export default class extends Component {
  static propTypes = {
    tradeChat: PropTypes.object.isRequired,
    recipient: PropTypes.object.isRequired,
    back: PropTypes.func.isRequired,
  };

  render() {
    const { recipient, tradeChat } = this.props;
    return (
      <View>
        <ChatHeader
          recipientName={recipient.username}
          recipientPhoto={recipient.photo}
          back={this.props.back}
        />
        <View>
          <Text>hi!</Text>
        </View>
      </View>
    );
  }
}
