import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Chat from '../../components/chat/Chat';

class ChatContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  back = () => {
    this.props.navigation.goBack(this.props.navigation.state.key);
  };

  render() {
    const { tradeChat } = this.props.navigation.state.params;

    return (
      <Chat
        tradeChat={tradeChat}
        recipient={this.props.userMeta[tradeChat.recipient]}
        currentUserId={this.props.auth.userId}
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
