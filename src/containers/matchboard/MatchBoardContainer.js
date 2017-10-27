import React, { Component, PropTypes } from 'react';

import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import Card from '../../components/matchboard/Card';

class MatchBoardContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  render() {
    return (
      <Card />
    );
  };
};

function mapStateToProps(state) {
  return state
};

export default connect(mapStateToProps)(MatchBoardContainer)
