import React, { Component, PropTypes } from 'react';
import Icon from 'react-native-vector-icons/Feather'

import { AppState } from 'react-native';

import FinishRegistration from '../../components/register/FinishRegistration';

import { displayableError } from '../../api/utils';

import { connect } from 'react-redux'

class FinishRegistrationContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const { params } = props.navigation.state;

    this.state = {
      inProgress: false,
      error: null,
      isPhotoUploaded: false,
      appState: AppState.currentState,
      isLocationEnabled: params && params.isLocationEnabled
    };
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = (nextAppState) => {
    const { appState } = this.state
    if (appState && appState.match(/inactive|background/) && nextAppState === 'active') {
      this.getCoords();
    }

    this.setState({ appState: nextAppState })
  }

  getCoords = () => {
    const { dispatch, screenProps, auth } = this.props;
    const { actions } = screenProps;
    const { userId, token } = auth;

    dispatch(actions.location.getCoordsAndUpdate(userId, token))
      .then(() => {
        this.setState({ isLocationEnabled: true }, () => {
          dispatch(actions.user.getUser(userId, token))
        })
      })
      .catch(() => this.setState({ isLocationEnabled: false }))
  }

  upload = (imageSource) => {
    const { auth, screenProps, dispatch } = this.props;
    const { userId, authToken } = auth;
    const { actions } = screenProps;

    this.setState({ inProgress: true }, () => {
      dispatch(actions.photo.uploadAndCreateProfilePhoto(userId, authToken, imageSource))
        .then(() => {
          return dispatch(actions.user.getUser(userId, authToken))
        })
        .then(() => {
          this.setState({ inProgress: false, isPhotoUploaded: true })
        })
        .catch(error => {
          handleIfApiError(error, err => {
            this.setState({ inProgress: false, error: err })
          })
        })
    })
  }

  logout = () => {
    const { dispatch, navigation } = this.props
    const { actions } = this.props.screenProps;

    dispatch(actions.auth.logout())
      .then(() => navigation.navigate('Login'))
  }

  render() {
    const { auth, userMeta } = this.props;
    const { inProgress, error, isPhotoUploaded, isLocationEnabled } = this.state;

    const currentUser = userMeta[auth.userId];
    const hasOffers = currentUser.offers.length > 0

    return (
      <FinishRegistration
        upload={this.upload}
        inProgress={inProgress}
        isPhotoUploaded={isPhotoUploaded}
        hasOffers={hasOffers}
        isLocationEnabled={isLocationEnabled}
        uploadedPhoto={currentUser.photo}
        apiError={displayableError(error)}
        userFirstName={currentUser.firstName}
        logout={this.logout}
      />
    );
  };
};

function mapStateToProps(state, props) {
  return state;
};

export default connect(mapStateToProps)(FinishRegistrationContainer);
