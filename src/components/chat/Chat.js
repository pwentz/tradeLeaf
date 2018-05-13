import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

export default class extends Component {
  static propTypes = {
    tradeChat: PropTypes.object.isRequired,
  };

  render() {
    console.log('TC:', this.props.tradeChat);
    return <Text>I'm a chat!</Text>;
  }
}
