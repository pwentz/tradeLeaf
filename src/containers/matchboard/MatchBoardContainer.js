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
      isFinishedCards: false
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

  handleAcceptOffer = (matchIdx) => {
    console.log("ACCEPTED!");
  };

  handleDeclineOffer = (matchIdx) => {
    console.log("DECLINED!");
  };

  handleNoCardsLeft = () => {
    this.setState({ isFinishedCards: true });
  };

  renderMatchStack = () => {
    const { matchStack, inProgress, error, isFinishedCards } = this.state;

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
            />
          )
        }}
        verticalSwipe={false}
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
