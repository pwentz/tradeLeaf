import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Chat from '../../components/chat/Chat';

class ChatContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    return <Chat tradeChat={this.props.navigation.state.params.tradeChat} />;
  }
}

function mapStateToProps(state, props) {
  const { actions } = props.screenProps;

  return { ...state, actions };
}

export default connect(mapStateToProps)(ChatContainer);
