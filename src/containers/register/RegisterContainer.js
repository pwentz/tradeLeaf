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
    const location = { lat: 0, lng: 0 }

    this.setState({inProgress: true}, () => {
      dispatch(actions.auth.registerUserAndLogin(username, password, passwordConfirmation, location))
        .then(({authUserId, token}) => {
          dispatch(actions.user.getUser(authUserId, token))
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
