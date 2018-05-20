import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Chat from '../../components/chat/Chat';

class ChatContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  get tradeChatId() {
    return this.props.navigation.state.params.tradeChatId;
  }

  constructor(props) {
    super(props);
    const tradeChat = props.tradeChat.chats[this.tradeChatId];

    this.state = {
      sendInProgress: false,
      errorOnSend: false,
      tradeChat: { ...tradeChat, id: parseInt(this.tradeChatId) },
      recipient: props.userMeta[tradeChat.recipient],
    };
  }

  componentWillReceiveProps(nextProps) {
    const tradeChat = nextProps.tradeChat.chats[this.tradeChatId];

    this.setState({
      tradeChat: { ...tradeChat, id: parseInt(this.tradeChatId) },
      recipient: nextProps.userMeta[tradeChat.recipient],
    });
  }

  back = () => {
    this.props.navigation.goBack(this.props.navigation.state.key);
  };

  handleSend = (text) => {
    const { dispatch, actions, auth } = this.props;
    this.setState({ sendInProgress: true }, () =>
      dispatch(
        actions.message.createMessage({
          tradeChatId: this.state.tradeChat.id,
          content: text,
          token: auth.authToken,
        })
      )
        .then(() =>
          dispatch(
            actions.chatSocket.send({
              recipientId: this.state.recipient.id,
              content: text,
            })
          )
        )
        .then(() => this.setState({ sendInProgress: false }))
        .catch(() => this.setState({ sendInProgress: false, errorOnSend: true }))
    );
  };

  render() {
    return (
      <Chat
        tradeChat={this.state.tradeChat}
        recipient={this.state.recipient}
        currentUser={this.props.userMeta[this.props.auth.userId]}
        onSend={this.handleSend}
        sendInProgress={this.state.sendInProgress}
        errorOnSend={this.state.errorOnSend}
        back={this.back}
      />
    );
  }
}

function mapStateToProps(state, props) {
  const { actions } = props.screenProps;

  return { ...state, actions };
}

export default connect(mapStateToProps)(ChatContainer);
