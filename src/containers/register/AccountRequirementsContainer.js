import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import OpenSettings from 'react-native-open-settings';

import { AppState } from 'react-native';

import AccountRequirements from '../../components/register/AccountRequirements';

import { displayableError } from '../../api/utils';

import { connect } from 'react-redux';

class AccountRequirementsContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { params } = props.navigation.state;

    this.state = {
      inProgress: false,
      error: null,
      isPhotoUploaded: false,
      appState: AppState.currentState,
      isLocationEnabled: params && params.isLocationEnabled,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    const { appState } = this.state;
    if (appState && appState.match(/inactive|background/) && nextAppState === 'active') {
      this.getCoords();
    }

    this.setState({ appState: nextAppState });
  };

  getCoords = () => {
    const { dispatch, actions, auth } = this.props;
    const { userId, authToken } = auth;

    dispatch(actions.location.getCoordsAndUpdate(userId, authToken))
      .then(() => {
        this.setState({ isLocationEnabled: true }, () => {
          dispatch(actions.user.getUser(userId, authToken));
        });
      })
      .catch(() => this.setState({ isLocationEnabled: false }));
  };

  upload = (imageSource) => {
    const { auth, actions, dispatch } = this.props;
    const { userId, authToken } = auth;

    this.setState({ inProgress: true }, () => {
      dispatch(actions.photo.uploadAndCreateProfilePhoto(userId, authToken, imageSource))
        .then(() => dispatch(actions.user.getUser(userId, authToken)))
        .then(() => {
          this.setState({ inProgress: false, isPhotoUploaded: true });
        })
        .catch((error) => {
          handleIfApiError(error, (err) => {
            this.setState({ inProgress: false, error: err });
          });
        });
    });
  };

  render() {
    const { auth, userMeta, navigation } = this.props;
    const { inProgress, error, isPhotoUploaded, isLocationEnabled } = this.state;

    const currentUser = userMeta[auth.userId];
    const hasOffers = currentUser.offers.length > 0;

    return (
      <AccountRequirements
        upload={this.upload}
        inProgress={inProgress}
        isPhotoUploaded={isPhotoUploaded}
        hasOffers={hasOffers}
        isLocationEnabled={isLocationEnabled}
        uploadedPhoto={currentUser.photo}
        apiError={displayableError(error)}
        userFirstName={currentUser.firstName}
        onLocationRequirementPress={() => OpenSettings.openSettings()}
        onContinuePress={() => navigation.navigate('MatchBoard')}
      />
    );
  }
}

function mapStateToProps(state, props) {
  const { actions } = props.screenProps;

  return { ...state, actions };
}

export default connect(mapStateToProps)(AccountRequirementsContainer);
