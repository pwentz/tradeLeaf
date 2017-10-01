import React, { Component, PropTypes } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { connect } from 'react-redux';

class AppContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


function mapStateToProps(state) {
  return {};
};

export default connect(mapStateToProps)(AppContainer);
