import React, { Component } from 'react';

import { Text } from 'react-native';

import {
  handleIfApiError,
  displayableError
} from '../../api/utils';

import { connect } from 'react-redux';

class NotificationContainer extends Component {
  render() {
    return (
      <Text>
        Notifications!
      </Text>
    )
  }
}

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps)(NotificationContainer);
