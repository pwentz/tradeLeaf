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
      inProgress: false,
      hasLocationEnabled: true
    }
  };

  handleError = (err) => {
    handleIfApiError(err, error => {
      this.setState({ inProgress: false, error })
    })
  }

  onSubmitLogin = (username, password) => {
    const { screenProps, dispatch, navigation } = this.props
    const { actions } = screenProps

    this.setState({ inProgress: true }, () => {
      dispatch(actions.auth.loginAndStoreToken(username, password))
        .then(({ userId, token }) => {
          return dispatch(actions.location.getCoordsAndUpdate(userId, token))
            .then(this.getUserAndFinishLogin)
            .catch(() => {
              this.setState(
                { hasLocationEnabled: false },
                () => this.getUserAndFinishLogin({ userId, token })
              )
            })
        })
        .catch(this.handleError)
    });
  };

  getUserAndFinishLogin = ({ userId, token }) => {
    const { dispatch, screenProps } = this.props;
    const { actions } = screenProps;

    return dispatch(actions.user.getUser(userId, token))
      .then(this.handleLoginSuccess)
      .catch(this.handleError);
  }

  handleLoginSuccess = () => {
    const { navigation, auth, userMeta } = this.props;
    const { hasLocationEnabled } = this.state;
    const currentUser = userMeta[auth.userId];

    this.setState({ inProgress: false }, () => {
      if (currentUser.offers.length == 0 || !hasLocationEnabled) {
        navigation.navigate('RegisterFinish', { hasLocationEnabled });
        return;
      };

      navigation.navigate('MatchBoard');
    })
  }

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
