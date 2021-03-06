import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import ChatPreview from '../../components/chat/ChatPreview';
import { handleIfApiError, displayableError } from '../../api/utils';
import globalStyles, { midGray, lightGray } from '../../styles';
import { sortByRecency } from '../../util/list';

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
    const { auth, dispatch, actions, userMeta } = this.props;

    this.setState({ inProgress: true }, () => {
      dispatch(actions.tradeChat.fetchTradeChats(auth.userId, auth.authToken))
        .then((chats) =>
          Promise.all(
            Object.values(chats)
              .filter((chat) => !userMeta[chat])
              .map((chat) => dispatch(actions.user.getUser(chat.recipient)))
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
    const selectedChat = this.props.tradeChat.chats[tradeChatId];

    this.props.navigation.navigate('Chat', { tradeChatId });
  };

  render() {
    const { chats } = this.props.tradeChat;

    if (this.state.inProgress) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={[globalStyles.overlay, { backgroundColor: lightGray }]}>
        {!!this.state.error && <Text style={globalStyles.errorText}>{this.state.error}</Text>}

        <ScrollView contentContainerStyle={globalStyles.container}>
          {sortByRecency(Object.values(chats)).map(({ id, recipient, messages, ...rest }) => (
            <ChatPreview
              key={recipient}
              recipient={this.props.userMeta[recipient]}
              handlePress={() => this.handleChatPress(id)}
              lastMessage={messages[0]}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { actions } = props.screenProps;

  return { ...state, actions };
}

export default connect(mapStateToProps)(InboxContainer);
