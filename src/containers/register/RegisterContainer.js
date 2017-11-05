import React, { Component, PropTypes } from 'react';

import {
  handleIfApiError,
  displayableError
} from '../../api/utils';

import { connect } from 'react-redux'

import RegisterForm from '../../components/register/RegisterForm';

class RegisterContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      inProgress: false
    };
  };

  onSubmitRegister = (username, password, passwordConfirmation) => {
    const { dispatch, actions } = this.props;

    this.setState({inProgress: true}, () => {
      dispatch(actions.auth.registerUserAndLogin(username, password, passwordConfirmation))
        .then(({authUserId, token}) => {
          dispatch(actions.location.getCoordsAndUpdate(authUserId, token))
        })
        .then(() => {
          const { auth } = this.props;
          dispatch(actions.user.getUser(auth.userId, auth.token))
        })
        .then(this.handleRegisterSuccess)
        .catch((error) => {
          handleIfApiError(error, error => {
            this.setState({inProgress: false, error})
          })
        });
    });
  };

  handleRegisterSuccess = () => {
    this.setState({ inProgress: false })
  };

  render() {
    return (
      <RegisterForm
        onSubmitRegister={this.onSubmitRegister}
        apiError={displayableError(this.state.error)}
      />
    );
  };
};

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps)(RegisterContainer);
