import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      isLocationEnabled: true
    }
  };

  componentWillMount() {
    // THIS FOLLOWS TOP LEVEL COMPONENT
    const { navigation, actions, dispatch } = this.props;

    dispatch(actions.auth.retrieveAuthToken())
      .then(({userId, authToken}) => {
        if (userId && authToken) {
          dispatch(actions.auth.storeToken(userId, authToken))
          this.getCoordsAndUser({userId, authToken})
        };
      })
      .catch(this.handleError)
  };

  handleError = (err) => {
    handleIfApiError(err, error => {
      this.setState({ inProgress: false, error })
    })
  }

  onSubmitLogin = (username, password) => {
    const { actions, dispatch, navigation } = this.props

    this.setState({ inProgress: true }, () => {
      dispatch(actions.auth.loginAndStoreToken(username, password))
        .then(this.getCoordsAndUser)
        .catch(this.handleError)
    });
  };

  getCoordsAndUser = ({userId, authToken}) => {
    const { actions, dispatch, navigation } = this.props

    return dispatch(actions.location.getCoordsAndUpdate(userId, authToken))
      .then(this.getUserAndFinishLogin)
      .catch(() => {
        this.setState(
          { isLocationEnabled: false },
          () => this.getUserAndFinishLogin({ userId, authToken })
        )
      })
  }

  getUserAndFinishLogin = ({ userId }) => {
    const { dispatch, actions } = this.props;

    return dispatch(actions.user.getUser(userId))
      .then(this.handleLoginSuccess)
      .catch(this.handleError);
  }

  handleLoginSuccess = () => {
    const { navigation, auth, userMeta } = this.props;
    const { isLocationEnabled } = this.state;
    const currentUser = userMeta[auth.userId];

    this.setState({ inProgress: false }, () => {
      if (currentUser.offers.length == 0 || !isLocationEnabled) {
        navigation.navigate('AccountRequirements', { isLocationEnabled });
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

function mapStateToProps(state, props) {
  const { actions } = props.screenProps;

  return {...state, actions};
}

export default connect(mapStateToProps)(LoginContainer)
