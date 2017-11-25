import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';

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
      currentMatch: null
    }
  };

  componentWillMount() {
    const { auth, dispatch, actions } = this.props;

    this.setState({ inProgress: true }, () => {
      dispatch(actions.match.getMatches(auth.authToken))
        .then(matches => {
          this.setState({
            inProgress: false,
            currentMatch: matches[0],
            matchStack: matches.slice(1)
          })
        })
        .catch(err => {
          handleIfApiError(err, error => {
            this.setState({ inProgress: false, error })
          })
        })
    })
  }

  handleAcceptOffer = () => {
    console.log("IT'S A MATCH!")
  }

  handleDeclineOffer = () => {
    const { matchStack, currentMatch } = this.state;

    this.setState({
      currentMatch: matchStack[0],
      matchStack: [...matchStack.slice(1), currentMatch]
    })
  }

  render() {
    const { currentMatch, inProgress, error } = this.state;

    return (
      <Card
        onAccept={this.handleAcceptOffer}
        onDecline={this.handleDeclineOffer}
        offer={currentMatch && currentMatch.offer}
        user={currentMatch && currentMatch.user}
        distance={currentMatch && currentMatch.distance}
        inProgress={inProgress}
        apiError={displayableError(error)}
      />
    );
  };
};

function mapStateToProps(state, props) {
  const { actions } = props.screenProps;

  return {...state, actions}
};

export default connect(mapStateToProps)(MatchBoardContainer)
