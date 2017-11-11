import React, { Component, PropTypes } from 'react';

import { NavigationActions } from 'react-navigation'

import {
  handleIfApiError,
  displayableError
} from '../../api/utils';

import { connect } from 'react-redux'

import RegisterForm from '../../components/register/RegisterForm';

class RegisterContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      inProgress: false
    };
  };

  onSubmitRegister = ({ firstName, lastName, email, username, password }) => {
    const { dispatch, screenProps } = this.props;
    const { actions } = screenProps;

    this.setState({inProgress: true}, () => {
      dispatch(actions.auth.registerUserAndLogin(firstName, lastName, email, username, password))
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
    this.props.navigation.navigate('RegisterFinish');
  };

  render() {
    return (
      <RegisterForm
        onSubmitRegister={this.onSubmitRegister}
        backToLogin={() => this.props.navigation.dispatch(NavigationActions.back())}
        apiError={displayableError(this.state.error)}
      />
    );
  };
};

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps)(RegisterContainer);
