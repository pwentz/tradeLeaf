import React, { Component, PropTypes } from 'react';

import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import MatchBoard from '../../components/matchboard/MatchBoard';

class MatchBoardContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={{flex:1}}>
        <Text>Cool!</Text>
      </View>
    );
  };
};

function mapStateToProps(state) {
  return state
};

export default connect(mapStateToProps)(MatchBoardContainer)
