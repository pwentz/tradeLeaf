import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ChatHeader from './ChatHeader';
import ChatClient from '../common/ChatClient';
import { lightWhite } from '../../styles';
import { GiftedChat } from 'react-native-gifted-chat';

export default class extends Component {
  static propTypes = {
    tradeChat: PropTypes.object.isRequired,
    recipient: PropTypes.object.isRequired,
    currentUserId: PropTypes.number.isRequired,
    sendInProgress: PropTypes.boolean.isRequired,
    errorOnSend: PropTypes.boolean.isRequired,
    back: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      messages: props.tradeChat.messages.map(this.toGiftedChatMessage),
      inputText: '',
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
    const { inputText } = this.state;
    this.setState(
      (prevState) => ({
        messages: GiftedChat.append(prevState.messages, messages),
      }),
      () => this.props.onSend(inputText)
    );
  };

  render() {
    const { recipient, tradeChat, currentUserId, sendInProgress, errorOnSend } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: lightWhite }}>
        <ChatHeader recipient={recipient} back={this.props.back} />
        {/* if sendInProgress is true, take last message and make it different.
            Then, when send in progress becomes false...put a little check jawn (ONLY RIGHT)
        */}
        <ChatClient
          text={this.state.inputText}
          onInputTextChanged={(inputText) => this.setState({ inputText })}
          messages={this.state.messages}
          onSend={this.onSend}
          renderBubble={this.renderBubble}
          user={{ _id: currentUserId }}
          sendInProgress={sendInProgress}
          errorOnSend={errorOnSend}
        />
      </View>
    );
  }
}
