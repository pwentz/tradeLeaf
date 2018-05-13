import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import ChatPreview from '../../components/chat/ChatPreview';
import { handleIfApiError, displayableError } from '../../api/utils';
import globalStyles, { midGray } from '../../styles';

class InboxContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      inProgress: false,
      error: null,
    };
  }

  componentWillMount() {
    const { auth, dispatch, actions } = this.props;

    this.setState({ inProgress: true }, () => {
      dispatch(actions.tradeChat.fetchTradeChats(auth.userId, auth.authToken))
        .then((tradeChats) =>
          Promise.all(
            Object.values(tradeChats).map((tc) => dispatch(actions.user.getUser(tc.recipient)))
          )
        )
        .then(() => this.setState({ inProgress: false }))
        .catch((err) => {
          handleIfApiError(err, (error) => {
            this.setState({ inProgress: false, error });
          });
        });
    });
  }

  handleChatPress = (tradeChatId) => {
    const selectedChat = this.props.tradeChat.tradeChats[tradeChatId];

    this.props.navigation.navigate('Chat', { tradeChat: selectedChat });
  };

  render() {
    if (this.state.inProgress) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={globalStyles.overlay}>
        {!!this.state.error && <Text style={globalStyles.errorText}>{this.state.error}</Text>}

        <View style={globalStyles.scrollContainer}>
          {Object.entries(this.props.tradeChat.tradeChats).map(
            ([tradeChatId, { recipient, messages }]) => (
              <ChatPreview
                key={recipient}
                recipient={this.props.userMeta[recipient]}
                currentUser={this.props.userMeta[this.props.auth.userId]}
                handlePress={() => this.handleChatPress(tradeChatId)}
                lastMessage={messages.slice(-1)[0]}
              />
            )
          )}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { actions } = props.screenProps;

  return { ...state, actions };
}

export default connect(mapStateToProps)(InboxContainer);
