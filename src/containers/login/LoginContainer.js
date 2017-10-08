import React, { Component, PropTypes } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { connect } from 'react-redux'

import LoginForm from '../../components/login/LoginForm'

class LoginContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    logoHeader1: require('../../images/tradeLeafHeader1.png'),
    logoHeader2: require('../../images/tradeLeafHeader2.png')
  };

  constructor(props) {
    super(props);
  };

  onSubmitLogin = (username, password) => {
    const { actions, dispatch } = this.props

    dispatch(actions.auth.loginAndStoreToken(username, password))
      .then(this.handleLoginSuccess)
      .catch(error => {
        // TODO!
      })
  }

  handleLoginSuccess = () => { /*TODO*/ }

  render() {
    return (
      <View style={styles.overlay}>
        <View style={styles.filler}></View>
        <View style={styles.logoContainer}>
          <Image
            source={this.props.logoHeader1}
          />
          <Image
            source={this.props.logoHeader2}
            style={styles.logoHeader2}
          />
          <View style={{height: 70}}></View>
          <LoginForm
            onSubmitLogin={this.onSubmitLogin}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white'
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
}

export default connect(mapStateToProps)(LoginContainer)
