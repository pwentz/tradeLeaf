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
    currentUser: PropTypes.object.isRequired,
    sendInProgress: PropTypes.bool.isRequired,
    errorOnSend: PropTypes.bool.isRequired,
    back: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      messages: props.tradeChat.messages.map(this.toGiftedChatMessage),
      inputText: '',
      uploadedPhoto: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: nextProps.tradeChat.messages.map(this.toGiftedChatMessage),
    });
  }

  toGiftedChatMessage = (message) => {
    const { currentUser, recipient } = this.props;
    const sender = message.senderId === currentUser.id ? currentUser : recipient;

    return {
      _id: message.id,
      text: message.content,
      createdAt: message.createdAt,
      user: {
        _id: sender.id,
        name: sender.username,
        avatar: sender.photo && sender.photo.imageUrl,
      },
    };
  };

  render() {
    const { recipient, tradeChat, currentUser, sendInProgress, errorOnSend, onSend } = this.props;
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
          onSend={() => onSend(this.state.inputText)}
          user={{ _id: currentUser.id }}
          sendInProgress={sendInProgress}
          errorOnSend={errorOnSend}
        />
      </View>
    );
  }
}
