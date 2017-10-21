import React, { Component, PropTypes } from 'react';

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
      error: null
    }
  };

  onSubmitLogin = (username, password) => {
    const { actions, dispatch } = this.props

    dispatch(actions.auth.loginAndStoreToken(username, password))
      .then(this.handleLoginSuccess)
      .catch(err => {
        handleIfApiError(err, error => {
          this.setState({ error })
        })
      })
  }

  handleLoginSuccess = () => { /*TODO*/ }

  render() {
    return (
      <LoginForm
        onSubmitLogin={this.onSubmitLogin}
        apiError={displayableError(this.state.error)}
      />
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(LoginContainer)
