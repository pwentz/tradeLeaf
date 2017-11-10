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

  onSubmitRegister = (username, password, passwordConfirmation) => {
    const { dispatch, screenProps, navigation } = this.props;
    const { actions } = screenProps;

    navigation.navigate('RegisterFinish');
    //
    // this.setState({inProgress: true}, () => {
    //   dispatch(actions.auth.registerUserAndLogin(username, password, passwordConfirmation))
    //     .then(this.handleRegisterSuccess)
    //     .catch((error) => {
    //       handleIfApiError(error, error => {
    //         this.setState({inProgress: false, error})
    //       })
    //     });
    // });
  };

  handleRegisterSuccess = () => {
    this.setState({ inProgress: false })
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
