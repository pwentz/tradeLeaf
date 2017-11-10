import React, { Component, PropTypes } from 'react';

import globalStyles from '../../styles/index';

import {
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import { connect } from 'react-redux'

class FinishRegistrationContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  render() {
    return (
      <View>
        <View style={{height:80}}></View>
        <Text>
          HELLO!
        </Text>

        <TouchableHighlight
          style={globalStyles.actionButton}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={globalStyles.actionButtonText}>
            back
          </Text>
        </TouchableHighlight>
      </View>
    );
  };
};

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps)(FinishRegistrationContainer);
