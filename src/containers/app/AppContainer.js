import React, { Component, PropTypes } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm'

class AppContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
  }

  static defaultProps = {
    logoHeader1: require('../../images/tradeLeafHeader1.png'),
    logoHeader2: require('../../images/tradeLeafHeader2.png')
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={styles.filler}></View>
        <View style={styles.logoContainer}>
          <Image
            source={this.props.logoHeader1}
          />
          <Image
            source={this.props.logoHeader2}
            style={styles.logoHeader2}
          />
        </View>
        <LoginForm />
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
  filler: {
    height: 140
  },
  logoHeader2: {
    marginTop: 15,
    marginLeft: 70
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  }
});


function mapStateToProps(state) {
  return {};
};

export default connect(mapStateToProps)(AppContainer);
