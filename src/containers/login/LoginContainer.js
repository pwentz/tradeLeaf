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
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      inProgress: false
    }
  };

  onSubmitLogin = (username, password) => {
    const { actions, dispatch, navigation } = this.props

    this.setState({ inProgress: true }, () => {
      dispatch(actions.auth.loginAndStoreToken(username, password))
        .then(({authUserId, token}) => {
          dispatch(actions.location.getCoordsAndUpdate(authUserId, token))
        })
        .then(() => {
          const { auth } = this.props;
          dispatch(actions.user.getUser(auth.userId, auth.token))
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
    const { navigation } = this.props;
    this.setState({ inProgress: false })
    navigation.navigate('MatchBoard')
  }

  render() {
    console.log("LOGIN PROPS:", this.props)
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
