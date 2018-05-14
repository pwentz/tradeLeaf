import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ChatHeader from './ChatHeader';
import { GiftedChat } from 'react-native-gifted-chat';

export default class extends Component {
  static propTypes = {
    tradeChat: PropTypes.object.isRequired,
    recipient: PropTypes.object.isRequired,
    back: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      messages: props.tradeChat.messages.map(this.toGiftedChatMessage),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: nextProps.tradeChat.messages.map(this.toGiftedChatMessage),
    });
  }

  toGiftedChatMessage = (message) => ({
    _id: message.id,
    text: message.content,
    createdAt: message.createdAt,
    user: {
      _id: this.props.recipient.id,
      name: this.props.recipient.username,
      avatar: this.props.recipient.photo && this.props.recipient.photo.imageUrl,
    },
    image: this.props.recipient.photo && this.props.recipient.photo.imageUrl,
  });

  onSend = (messages = []) => {
    this.setState((prevState) => ({
      messages: GiftedChat.append(prevState.messages, messages),
    }));
  };

  render() {
    const { recipient, tradeChat } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ChatHeader recipient={recipient} back={this.props.back} />
        <GiftedChat messages={this.state.messages} onSend={this.onSend} />
      </View>
    );
  }
}
