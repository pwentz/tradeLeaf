import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text, View, Alert, ActivityIndicator } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import Swiper from 'react-native-deck-swiper';
import globalStyles, { lightGray, blue } from '../../styles/index';
import { handleIfApiError, displayableError } from '../../api/utils';
import Card from '../../components/matchboard/Card';

class MatchBoardContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
      error: null,
      matchStack: props.match.matches,
      isFinishedCards: false,
      enableSwipe: true,
      matchIdx: 0,
    };
  }

  componentWillMount() {
    const { auth, dispatch, actions } = this.props;

    this.setState({ inProgress: true }, () => {
      // TODO:
      //  - pass onMessage function that:
      //      - if msg contains "-- DISCONNECTED", then try to somehow update state of Chat/ChatContainer?
      //      - renders a flash when message comes (maybe push in future)
      dispatch(
        actions.chatSocket.createSocket(auth.userId, () => {
          return;
        })
      );
      dispatch(actions.match.getMatches(auth.authToken))
        .then((matches) => {
          this.setState({
            inProgress: false,
            matchStack: matches,
            isFinishedCards: matches.length === 0,
          });
        })
        .catch((err) => {
          handleIfApiError(err, (error) => {
            this.setState({ inProgress: false, error });
          });
        });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ matchStack: nextProps.match.matches });
  }

  handleSwipe = (matchIdx, currentUserExchangeOfferId) => {
    const { dispatch, actions, auth } = this.props;
    const acceptedOfferId = this.state.matchStack[matchIdx].offer.id;

    this.setState(
      {
        inProgress: true,
      },
      () => {
        // see if a trade exists where my offer has already been accepted for their offer
        dispatch(
          actions.trade.findTrade({
            acceptedOfferId: currentUserExchangeOfferId,
            exchangeOfferId: acceptedOfferId,
          })
        )
          .then((trade) => {
            if (trade) {
              // if it does, we know they opted in and we create chat
              return dispatch(actions.tradeChat.createTradeChat(trade.id))
                .then((tradeChatId) => {
                  return dispatch(actions.tradeChat.fetchTradeChats(auth.userId, auth.authToken));
                })
                .then(() => {
                  this.setState(
                    {
                      inProgress: false,
                    },
                    () =>
                      Alert.alert('Congratulations', 'You found a match!', [], {
                        cancelable: true,
                      })
                  );
                });
            }

            this.setState(
              {
                inProgress: false,
              },
              () =>
                // otherwise, we create a new trade
                dispatch(
                  actions.trade.createTrade({
                    acceptedOfferId,
                    exchangeOfferId: currentUserExchangeOfferId,
                  })
                )
            );
          })
          .then(() => this.nextCard(matchIdx))
          .catch((err) => {
            handleIfApiError(err, (error) => {
              this.setState({ inProgress: false, error });
            });
          });
      }
    );
  };

  nextCard = (matchIdx) => {
    if (matchIdx < this.state.matchStack.length - 1) {
      this.setState({
        matchIdx: matchIdx + 1,
      });
    }
  };

  handleAcceptOffer = (matchIdx) => {
    const { matchStack } = this.state;
    const approvedMatch = matchStack[matchIdx];
    const handleSwipe = this.handleSwipe;

    if (approvedMatch.exchangeOffers.length > 1) {
      const acceptedToFront = (acc, e) => (e.isAccepted ? [e, ...acc] : [...acc, e]);
      Alert.alert(
        'Multiple exchange offers found',
        "Please select which offer you'd like to trade for",
        approvedMatch.exchangeOffers.reduce(acceptedToFront, []).map((exch) => ({
          text: exch.isAccepted ? `${exch.offer.description} (Matched)` : exch.offer.description,
          onPress: () => handleSwipe(matchIdx, exch.offer.id),
        }))
      );
    } else {
      this.handleSwipe(matchIdx, approvedMatch.exchangeOffers[0].offer.id);
    }
  };

  handleNoCardsLeft = () => {
    this.setState({ isFinishedCards: true });
  };

  enableSwipe = () => {
    this.setState({
      enableSwipe: true,
    });
  };

  disableSwipe = () => {
    this.setState({
      enableSwipe: false,
    });
  };

  renderMatchStack = () => {
    const { matchStack, inProgress, error, isFinishedCards, matchIdx } = this.state;
    const showNextCard = matchIdx < matchStack.length - 1;

    if (isFinishedCards) {
      return <Text>All done!</Text>;
    }

    return (
      <Swiper
        ref="swiper"
        cards={matchStack}
        cardIndex={matchIdx}
        renderCard={(currentMatch) => {
          return (
            <Card
              onAccept={() => this.refs.swiper.swipeRight()}
              onDecline={() => this.refs.swiper.swipeLeft()}
              offer={currentMatch.offer}
              user={currentMatch.user}
              distance={currentMatch.distance}
              inProgress={inProgress}
              apiError={displayableError(error)}
              onLightboxOpen={this.disableSwipe}
              onLightboxClose={this.enableSwipe}
            />
          );
        }}
        showSecondCard={showNextCard}
        verticalSwipe={false}
        horizontalSwipe={this.state.enableSwipe}
        onSwipedRight={this.handleAcceptOffer}
        onSwipedLeft={this.nextCard}
        onSwipedAll={this.handleNoCardsLeft}
        backgroundColor={lightGray}
        cardVerticalMargin={0}
        marginTop={0}
      />
    );
  };

  render() {
    if (this.state.inProgress) {
      return (
        <View style={{ height: '100%', opacity: 0.5 }}>
          <View style={globalStyles.loadingOverlay}>
            <ActivityIndicator size="large" color={blue} />
          </View>
        </View>
      );
    }

    return this.renderMatchStack();
  }
}

function mapStateToProps(state, props) {
  const { actions } = props.screenProps;

  return { ...state, actions };
}

export default connect(mapStateToProps)(MatchBoardContainer);
