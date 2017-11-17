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
      inProgress: false,
      isLocationEnabled: true
    };
  };

  handleError = (err) => {
    handleIfApiError(err, error => {
      this.setState({ inProgress: false, error })
    })
  }

  onSubmitRegister = ({ firstName, lastName, email, username, password }) => {
    const { dispatch, screenProps } = this.props;
    const { actions } = screenProps;

    this.setState({inProgress: true}, () => {
      dispatch(actions.auth.registerUserAndLogin(firstName, lastName, email, username, password))
        .then(({ userId, authToken }) => {
          return dispatch(actions.location.getCoordsAndUpdate(userId, authToken))
            .then(this.getUserAndFinishRegistration)
            .catch(() => {
              this.setState(
                { isLocationEnabled: false },
                () => this.getUserAndFinishRegistration({ userId })
              )
            })
        })
        .catch(this.handleError);
    });
  };

  getUserAndFinishRegistration = ({ userId }) => {
    const { dispatch, screenProps } = this.props;
    const { actions } = screenProps;

    return dispatch(actions.user.getUser(userId))
      .then(this.handleRegisterSuccess)
      .catch(this.handleError);
  }

  handleRegisterSuccess = () => {
    const { navigation } = this.props;
    const { isLocationEnabled } = this.state;

    this.setState({ inProgress: false }, () => {
      navigation.navigate('RegisterFinish', { isLocationEnabled });
    });
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
