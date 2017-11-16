import React, { Component, PropTypes } from 'react';
import Icon from 'react-native-vector-icons/Feather'

import FinishRegistration from '../../components/register/FinishRegistration';

import { displayableError } from '../../api/utils';

import { connect } from 'react-redux'

class FinishRegistrationContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
      error: null,
      isPhotoUploaded: false
    };
  };

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
    const { auth, userMeta, hasLocationEnabled, screenProps } = this.props;
    const { inProgress, error, isPhotoUploaded } = this.state;

    const currentUser = userMeta[auth.userId];
    const hasOffers = currentUser.offers.length > 0

    return (
      <FinishRegistration
        upload={this.upload}
        inProgress={inProgress}
        isPhotoUploaded={isPhotoUploaded}
        hasOffers={hasOffers}
        hasLocationEnabled={hasLocationEnabled}
        uploadedPhoto={currentUser.photo}
        apiError={displayableError(error)}
        userFirstName={currentUser.firstName}
        logout={this.logout}
      />
    );
  };
};

function mapStateToProps(state, props) {
  const { params } = props.navigation.state

  return {
    ...state,
    hasLocationEnabled: params && params.hasLocationEnabled,
  };
};

export default connect(mapStateToProps)(FinishRegistrationContainer);
