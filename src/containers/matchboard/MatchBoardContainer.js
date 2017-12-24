import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text, View } from 'react-native';
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

  handleSwipe = (matchIdx) => {
    const { matchStack } = this.state;

    if (matchIdx < matchStack.length - 1) {
      this.setState({
        matchIdx: matchIdx + 1
      });
    };
  };

  handleAcceptOffer = (matchIdx) => {
    const { matchStack } = this.state;
    const approvedMatch = matchStack[matchIdx];
    this.handleSwipe(matchIdx);
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
