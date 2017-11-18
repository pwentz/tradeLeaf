import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import Card from '../../components/matchboard/Card';

class MatchBoardContainer extends Component {
  static propTypes = {
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
