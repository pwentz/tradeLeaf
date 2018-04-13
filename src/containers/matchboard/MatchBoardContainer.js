import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text, View, Alert } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import Swiper from 'react-native-deck-swiper';
import { lightGray } from '../../styles/index';

import {
  handleIfApiError,
  displayableError
} from '../../api/utils';

import Card from '../../components/matchboard/Card';

class MatchBoardContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
      error: null,
      matchStack: props.match.matches,
      isFinishedCards: false,
      enableSwipe: true,
      matchIdx: 0
    };
  };

  componentWillMount() {
    const { auth, dispatch, actions } = this.props;

    this.setState({ inProgress: true }, () => {
      // open web socket!
      dispatch(actions.match.getMatches(auth.authToken))
        .then(matches => {
          this.setState({
            inProgress: false,
            matchStack: matches
          })
        })
        .catch(err => {
          handleIfApiError(err, error => {
            this.setState({ inProgress: false, error })
          })
        })
    });
  };

  handleSwipe = (matchIdx, exchangeOfferId) => {
    const { matchStack } = this.state;
    const acceptedOfferId = matchStack[matchIdx].id
    console.log("SWIPED: ", matchStack[matchIdx])
    /*
      - Get trade to see if it already exists
      - If it does, then we need to make a POST request to create a trade chat
      - If it does not, we make a POST request to create a trade
    */

    dispatch(actions.trade.findTrade({acceptedOfferId, exchangeOfferId }))
      .then(trade => {
        if (trade) {
          return dispatch(actions.tradeChat.createTradeChat(trade.id))
        }

        return dispatch(actions.createTrade({ acceptedOfferId, exchangeOfferId }))
      })
      .then(() => {
        if (matchIdx < matchStack.length - 1) {
          this.setState({
            matchIdx: matchIdx + 1
          });
        };
      })
  };

  handleAcceptOffer = (matchIdx) => {
    const { matchStack } = this.state;
    const approvedMatch = matchStack[matchIdx];
    const handleSwipe = this.handleSwipe

    if (approvedMatch.exchangeOffers.length > 1) {
      const acceptedToFront = (acc, e) => e.isAccepted ? [e, ...acc] : [...acc, e]
      Alert.alert(
        'Multiple exchange offers found',
        "Please select which offer you'd like to trade for",
        approvedMatch.exchangeOffers.reduce(acceptedToFront, []).map(exch => {
          return exch.isAccepted ?
            { text: `${exch.offer.description} (Matched)`, onPress: () => handleSwipe(matchIdx, exch.offer.id) } :
            { text: exch.offer.description, onPress: () => handleSwipe(matchIdx, exch.offer.id) }
        })
      )
    } else {
      this.handleSwipe(matchIdx, approvedMatch.exchangeOffers[0].offer.id);
    }
  };

  handleDeclineOffer = (matchIdx) => {
    this.handleSwipe(matchIdx);
  };

  handleNoCardsLeft = () => {
    this.setState({ isFinishedCards: true });
  };

  enableSwipe = () => {
    this.setState({
      enableSwipe: true
    })
  };

  disableSwipe = () => {
    this.setState({
      enableSwipe: false
    });
  };

  renderMatchStack = () => {
    const { matchStack, inProgress, error, isFinishedCards, matchIdx } = this.state;
    console.log(matchStack)
    const showNextCard = matchIdx < matchStack.length - 1

    if (isFinishedCards) {
      return (
        <Text>
          All done!
        </Text>
      );
    };

    return (
      <Swiper
        ref='swiper'
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
          )
        }}
        showSecondCard={showNextCard}
        verticalSwipe={false}
        horizontalSwipe={this.state.enableSwipe}
        onSwipedRight={this.handleAcceptOffer}
        onSwipedLeft={this.handleDeclineOffer}
        onSwipedAll={this.handleNoCardsLeft}
        backgroundColor={lightGray}
        cardVerticalMargin={0}
        marginTop={0}
      />
    );
  };

  render() {
    const { inProgress } = this.state;
    return inProgress ? <Text>Loading...</Text> : this.renderMatchStack();
  }
};

function mapStateToProps(state, props) {
  const { actions } = props.screenProps;

  return {...state, actions}
};

export default connect(mapStateToProps)(MatchBoardContainer)
