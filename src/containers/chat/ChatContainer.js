import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Chat from '../../components/chat/Chat';

class ChatContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { tradeChat } = props.navigation.state.params;
    this.tradeChat = tradeChat;
    this.recipient = props.userMeta[tradeChat.recipient];

    this.state = { sendInProgress: false, errorOnSend: false };
  }

  back = () => {
    this.props.navigation.goBack(this.props.navigation.state.key);
  };

  handleSend = (text) => {
    const { dispatch, actions, auth } = this.props;
    this.setState({ sendInProgress: true }, () =>
      dispatch(
        actions.chatSocket.send({
          tradeChatId: this.tradeChat.id,
          recipientId: this.recipient.id,
          content: text,
          token: auth.authToken,
        })
      )
        .then(() => this.setState({ sendInProgress: false }))
        .catch(() => this.setState({ sendInProgress: false, errorOnSend: true }))
    );
  };

  render() {
    return (
      <Chat
        tradeChat={this.tradeChat}
        recipient={this.recipient}
        currentUserId={this.props.auth.userId}
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
