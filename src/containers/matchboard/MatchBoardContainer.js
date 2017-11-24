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
      error: null
    }
  };

  componentWillMount() {
    const { auth, dispatch, actions } = this.props;

    this.setState({ inProgress: true }, () => {
      dispatch(actions.match.getMatches(auth.authToken))
        .then(() => {
          this.setState({ inProgress: false })
        })
        .catch(err => {
          handleIfApiError(err, error => {
            this.setState({ inProgress: false, error })
          })
        })
    })
  }

  render() {
    return (
      <Card />
    );
  };
};

function mapStateToProps(state, props) {
  const { actions } = props.screenProps;

  return {...state, actions}
};

export default connect(mapStateToProps)(MatchBoardContainer)
