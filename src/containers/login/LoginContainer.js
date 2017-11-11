import React, { Component, PropTypes } from 'react';
import { NavigationActions } from 'react-navigation';

import {
  handleIfApiError,
  displayableError
} from '../../api/utils';

import { connect } from 'react-redux'

import LoginForm from '../../components/login/LoginForm'

class LoginContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      inProgress: false
    }
  };

  onSubmitLogin = (username, password) => {
    const { screenProps, dispatch, navigation } = this.props
    const { actions } = screenProps

    this.setState({ inProgress: true }, () => {
      dispatch(actions.auth.loginAndStoreToken(username, password))
        .then(({ userId, token }) => {
          return dispatch(actions.location.getCoordsAndUpdate(userId, token))
            .catch(this.handleLocationFailure)
        })
        .then(({ userId, token }) => {
          return dispatch(actions.user.getUser(userId, token))
        })
        .then(this.handleLoginSuccess)
        .catch(err => {
          handleIfApiError(err, error => {
            this.setState({ inProgress: false, error });
          })
        });
    });
  };

  handleLoginSuccess = () => {
    const { navigation, auth, userMeta } = this.props;
    const currentUser = userMeta[auth.userId];

    this.setState({ inProgress: false }, () => {
      if (currentUser.offers.length == 0) {
        // PASS MSG TO PROP SAYING TO CREATE OFFERS?!
        navigation.navigate('RegisterFinish');
        return;
      };

      navigation.navigate('MatchBoard');
    })
  }

  handleLocationFailure = (err) => {
    const errMsg = 'Please enable location services to trade on tradeLeaf';

    this.setState({ inProgress: false }, () => {
      // FIND HOW TO PASS ERROR VIA NAVIGATION
      this.props.navigation.navigate('RegisterFinish');
    });
  };

  render() {
    return (
      <LoginForm
        onSubmitLogin={this.onSubmitLogin}
        apiError={displayableError(this.state.error)}
        navigateToRegister={() => this.props.navigation.navigate('Register')}
      />
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(LoginContainer)
