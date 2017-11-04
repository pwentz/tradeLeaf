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

    // REGISTER:
    // - create user and update redux store with userId
    // - make request to login and update redux store with token (under auth)
    // - make request to get session info and update redux store with new data
    this.setState({inProgress: true}, () => {
      dispatch(actions.auth.registerUserAndLogin(username, password, passwordConfirmation, location))
        .then(({authUserId, token}) => {
          dispatch(actions.user.getUser(authUserId, token))
          this.setState({ inProgress: false })
        })
        .catch((error) => {
          handleIfApiError(error, error => {
            this.setState({inProgress: false, error})
          })
        })
    })
  }

  render() {
    console.log("REGISTER CONTAINER PROPS", this.props)
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
